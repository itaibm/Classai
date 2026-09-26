/**
 * Unit tests for the AI layer: the slim authored-lesson voicing prompt, the
 * Anthropic request shape (identity block order + prompt-cache breakpoint), and
 * local Claude-login token selection. No network.
 *
 * Run with `npm run test:ai`.
 */
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

process.env.CLASSAI_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'classai-ai-test-'));

let prompts: typeof import('./prompts.ts');
let provider: typeof import('./provider.ts');
let oauth: typeof import('./oauth.ts');
let subjectProfile: typeof import('./subjects.ts')['subjectProfile'];

before(async () => {
  prompts = await import('./prompts.ts');
  provider = await import('./provider.ts');
  oauth = await import('./oauth.ts');
  ({ subjectProfile } = await import('./subjects.ts'));
});

const kid = {
  id: 'k', name: 'Alex', age: 7, gradeLevel: 'Year 2', interests: ['dinosaurs'],
  avatar: { character: 'sage', hue: 210, voice: 'default', rate: 1 }, createdAt: '2026-01-01T00:00:00.000Z'
} as any;
const course = { title: 'Year 2 Mathematics', subjectKey: 'math' } as any;
const lesson = {
  format: 'classai-lesson/1', title: 'Adding with regrouping', topic: 'Addition', objectives: ['Add two-digit numbers.'],
  emphasize: ['Ten ones become one ten'], vocabulary: [{ term: 'exchange', definition: 'swap ten ones for one ten' }],
  analysis: { keyConcepts: [], misconceptions: ["45 + 38 = '713'"], hooks: [], priorKnowledge: [] },
  plan: [{ kind: 'explain', goal: 'secret beat goal', note: '', successCriteria: '' }]
} as any;
const model = {
  summary: 'Quick with facts.', preferences: '', strengths: [], struggles: [], misconceptions: [], interests: [],
  topicMastery: { Adding: { mastery: 0.6, updatedAt: '2026-01-01' } }
} as any;

test('voicingSystemPrompt: safety + what must land, no tool belt or block contract', () => {
  const v = prompts.voicingSystemPrompt(kid, course, lesson, subjectProfile('math'), model);
  const flat = provider.flattenSystem(v);
  assert.ok(v.cached.includes(prompts.safetyRules(7)), 'full age-aware safety rules are in the cached part');
  assert.ok(v.cached.includes('Ten ones become one ten'), 'emphasize / MUST land is included');
  assert.ok(v.cached.includes('"answerEval"') && v.cached.includes('"memoryUpdates"') && v.cached.includes('"concern"'));
  assert.ok(!flat.includes('LESSON TOOL BELT'), 'no BLOCK_CATALOG');
  for (const field of ['"awaitResponse"', '"autoAdvance"', '"blocks"', '"block"', '"lessonComplete"', '"beatComplete"']) {
    assert.ok(!flat.includes(field), `contract omits ${field}`);
  }
  // Learner mastery changes between turns, so it must stay out of the cached block.
  assert.ok(!v.cached.includes('Recent mastery'), 'volatile learner context is not cached');
  assert.ok(v.dynamic?.includes('Recent mastery — Adding: 60%'));
  // Much smaller than the free-teaching prompt it replaces.
  const full = prompts.teachSystemPrompt(kid, course, lesson, subjectProfile('math'), model);
  assert.ok(flat.length < full.length / 2, `voicing ${flat.length} vs full ${full.length}`);
});

test('voicingSystemPrompt: the cached part is stable across learner-model updates', () => {
  const a = prompts.voicingSystemPrompt(kid, course, lesson, subjectProfile('math'), model);
  const later = { ...model, topicMastery: { Adding: { mastery: 0.8, updatedAt: '2026-01-02' } } };
  const b = prompts.voicingSystemPrompt(kid, course, lesson, subjectProfile('math'), later);
  assert.equal(a.cached, b.cached);
  assert.notEqual(a.dynamic, b.dynamic);
});

const split = { cached: 'STABLE', dynamic: 'LEARNER' };
const messages = [{ role: 'user' as const, content: 'DIRECTIVE' }];

test('buildAnthropicRequest (api key): cached stable block, then dynamic, then JSON hint', () => {
  const req = provider.buildAnthropicRequest({ model: 'claude-opus-4-8', system: split, messages, maxTokens: 900, json: true, oauth: false });
  assert.deepEqual(req.system, [
    { type: 'text', text: 'STABLE', cache_control: { type: 'ephemeral' } },
    { type: 'text', text: 'LEARNER' },
    { type: 'text', text: provider.JSON_ONLY_HINT }
  ]);
  assert.deepEqual(req.messages, [{ role: 'user', content: 'DIRECTIVE' }], 'per-turn directive stays in messages');
  assert.equal(req.max_tokens, 900);
  assert.equal(req.thinking, undefined, 'fast turns do not think');
});

test('buildAnthropicRequest (oauth / local login): Claude Code identity stays the FIRST block', () => {
  const req = provider.buildAnthropicRequest({ model: 'claude-opus-4-8', system: split, messages, oauth: true });
  const sys = req.system as any[];
  assert.deepEqual(sys[0], { type: 'text', text: provider.CLAUDE_CODE_IDENTITY });
  assert.ok(!('cache_control' in sys[0]), 'identity block is not itself a breakpoint');
  assert.deepEqual(sys[1], { type: 'text', text: 'STABLE', cache_control: { type: 'ephemeral' } });
  assert.deepEqual(sys[2], { type: 'text', text: 'LEARNER' });
  assert.equal(sys.length, 3, 'no JSON hint unless asked');
  assert.equal(sys.filter((b) => b.cache_control).length, 1, 'exactly one breakpoint');
});

test('buildAnthropicRequest: a plain-string system prompt is sent uncached', () => {
  const req = provider.buildAnthropicRequest({ model: 'claude-opus-4-8', system: 'PLAIN', messages, oauth: false });
  assert.deepEqual(req.system, [{ type: 'text', text: 'PLAIN' }]);
  const o = provider.buildAnthropicRequest({ model: 'claude-opus-4-8', system: 'PLAIN', messages, oauth: true });
  assert.deepEqual(o.system, [{ type: 'text', text: provider.CLAUDE_CODE_IDENTITY }, { type: 'text', text: 'PLAIN' }]);
});

test('buildAnthropicRequest: deep quality thinks (adaptive) on opus/sonnet only, with token headroom', () => {
  const deep = provider.buildAnthropicRequest({ model: 'claude-opus-4-8', system: 'S', messages, maxTokens: 1000, quality: 'deep', oauth: false });
  assert.deepEqual(deep.thinking, { type: 'adaptive' });
  assert.equal(deep.max_tokens, 7000);
  const haiku = provider.buildAnthropicRequest({ model: 'claude-haiku-4-5', system: 'S', messages, maxTokens: 1000, quality: 'deep', oauth: false });
  assert.equal(haiku.thinking, undefined);
  assert.equal(haiku.max_tokens, 1000);
});

test('flattenSystem: strings pass through; split prompts join cached + dynamic', () => {
  assert.equal(provider.flattenSystem('x'), 'x');
  assert.equal(provider.flattenSystem({ cached: 'a' }), 'a');
  assert.equal(provider.flattenSystem({ cached: 'a', dynamic: 'b' }), 'a\n\nb');
});

test('local Claude login: expired tokens are missing; the later expiry wins', () => {
  const now = 1_000_000_000;
  const hour = 3_600_000;
  assert.equal(oauth.pickLocalCreds([{ token: 'old', expiresAt: now - 1 }], now), undefined, 'expired → missing');
  assert.equal(oauth.pickLocalCreds([{ token: 'edge', expiresAt: now + 30_000 }], now), undefined, 'inside the 60s margin → missing');
  assert.equal(
    oauth.pickLocalCreds([{ token: 'file', expiresAt: now + hour }, { token: 'keychain', expiresAt: now + 2 * hour }], now)?.token,
    'keychain'
  );
  assert.equal(
    oauth.pickLocalCreds([{ token: 'file', expiresAt: now + 2 * hour }, { token: 'keychain', expiresAt: now - hour }], now)?.token,
    'file'
  );
  assert.equal(
    oauth.pickLocalCreds([{ token: 'unknown' }, { token: 'known', expiresAt: now + hour }], now)?.token,
    'known',
    'a known-valid expiry beats an unknown one'
  );
  assert.equal(oauth.pickLocalCreds([{ token: 'unknown' }], now)?.token, 'unknown');
});

test('credsFromJson reads accessToken + expiresAt from a Claude Code credentials blob', () => {
  assert.deepEqual(oauth.credsFromJson('{"claudeAiOauth":{"accessToken":"t","expiresAt":123}}'), { token: 't', expiresAt: 123 });
  assert.deepEqual(oauth.credsFromJson('{"claudeAiOauth":{"accessToken":"t"}}'), { token: 't', expiresAt: undefined });
  assert.equal(oauth.credsFromJson('{"claudeAiOauth":{}}'), undefined);
  assert.equal(oauth.credsFromJson('not json'), undefined);
});
