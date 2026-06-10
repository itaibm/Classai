import { useState } from 'react';
import type { BrainVendor } from '@shared/types';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { TopBar, Loading, ErrorNote, useAsync, useToast, Toast } from '../lib/ui.tsx';

export function ConnectBrain() {
  const { data, loading, error, reload } = useAsync(() => api.brainProfiles());
  const { msg, show } = useToast();

  const [vendor, setVendor] = useState<BrainVendor>('anthropic');
  const [method, setMethod] = useState<'api_key' | 'local_login' | 'oauth' | 'none'>('api_key');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('');
  const [baseUrl, setBaseUrl] = useState('http://localhost:11434/v1');
  const [busy, setBusy] = useState(false);

  // OpenAI OAuth state
  const [oauthState, setOauthState] = useState('');
  const [oauthCode, setOauthCode] = useState('');

  const models = data?.models?.[vendor] || [];
  const chosenModel = model || models[0]?.id || '';

  function pickVendor(v: BrainVendor) {
    setVendor(v);
    setMethod(v === 'local' ? 'none' : 'api_key');
    setModel('');
    setOauthState('');
  }

  async function connect() {
    setBusy(true);
    try {
      if (vendor === 'openai' && method === 'oauth') {
        const { authorizeUrl, state } = await api.brainOauthStart();
        setOauthState(state);
        window.open(authorizeUrl, '_blank', 'noopener');
        show('Finish signing in, then paste the code if asked.');
        // also poll for loopback success
        pollConnected();
        return;
      }
      await api.brainConnect({
        vendor,
        method: method === 'oauth' ? 'api_key' : (method as any),
        model: chosenModel,
        apiKey: apiKey || undefined,
        baseUrl: vendor === 'local' ? baseUrl : undefined
      });
      show('Brain connected ✓');
      reload();
    } catch (e: any) {
      show(e.message || 'Could not connect');
    } finally {
      setBusy(false);
    }
  }

  async function finishOauth() {
    setBusy(true);
    try {
      await api.brainOauthPaste(oauthState, oauthCode.trim(), chosenModel);
      show('ChatGPT connected ✓');
      setOauthState('');
      setOauthCode('');
      reload();
    } catch (e: any) {
      show(e.message || 'Could not finish sign-in');
    } finally {
      setBusy(false);
    }
  }

  function pollConnected() {
    let n = 0;
    const t = setInterval(async () => {
      n++;
      const { profiles } = await api.brainProfiles();
      if (profiles.some((p) => p.vendor === 'openai' && p.connected)) {
        clearInterval(t);
        setOauthState('');
        show('ChatGPT connected ✓');
        reload();
      }
      if (n > 60) clearInterval(t);
    }, 2000);
  }

  async function test(id: string) {
    show('Testing…');
    const r = await api.brainTest(id);
    show(r.ok ? `Working: ${r.model}` : `Failed: ${r.error}`);
  }

  return (
    <div className="app">
      <TopBar />
      <div className="container">
        <h1>Connect your brain</h1>
        <p className="muted">
          Classai uses <strong>your own</strong> AI — no developer key is baked in. Connect your Anthropic or OpenAI
          account, or run a free local model. Credentials stay on this machine.
        </p>

        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}

        {data && (
          <>
            {data.profiles.length > 0 && (
              <div className="card" style={{ marginBottom: 18 }}>
                <h3>Connected</h3>
                {data.profiles.map((p) => (
                  <div key={p.id} className="kv">
                    <span>
                      <input
                        type="radio"
                        name="default"
                        checked={data.defaultId === p.id}
                        onChange={() => api.brainDefault(p.id).then(reload)}
                      />{' '}
                      <strong>{p.label}</strong> <span className="muted small">· {p.model}</span>{' '}
                      {p.connected ? <span className="pill good">ready</span> : <span className="pill bad">needs auth</span>}
                    </span>
                    <span className="row" style={{ gap: 8 }}>
                      <button className="btn ghost small" onClick={() => test(p.id)}>Test</button>
                      <button className="btn ghost small" onClick={() => api.brainRemove(p.id).then(reload)}>Remove</button>
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="card">
              <h3>Add a brain</h3>
              <label className="field">
                Provider
                <div className="row" style={{ marginTop: 6 }}>
                  {(['anthropic', 'openai', 'local'] as BrainVendor[]).map((v) => (
                    <button key={v} className={`btn ${vendor === v ? '' : 'ghost'} small`} onClick={() => pickVendor(v)}>
                      {v === 'anthropic' ? 'Claude (Anthropic)' : v === 'openai' ? 'OpenAI' : 'Local (Ollama)'}
                    </button>
                  ))}
                </div>
              </label>

              {vendor === 'anthropic' && (
                <label className="field">
                  How to connect
                  <div className="row" style={{ marginTop: 6 }}>
                    <button className={`btn ${method === 'api_key' ? '' : 'ghost'} small`} onClick={() => setMethod('api_key')}>API key</button>
                    <button className={`btn ${method === 'local_login' ? '' : 'ghost'} small`} onClick={() => setMethod('local_login')}>Reuse my Claude login</button>
                  </div>
                  <span className="hint small">
                    “Reuse my Claude login” uses the token from your local Claude CLI (`claude` / `ant auth login`).
                  </span>
                </label>
              )}

              {vendor === 'openai' && (
                <label className="field">
                  How to connect
                  <div className="row" style={{ marginTop: 6 }}>
                    <button className={`btn ${method === 'api_key' ? '' : 'ghost'} small`} onClick={() => setMethod('api_key')}>API key</button>
                    <button className={`btn ${method === 'oauth' ? '' : 'ghost'} small`} onClick={() => setMethod('oauth')}>Sign in with ChatGPT</button>
                  </div>
                </label>
              )}

              {(method === 'api_key') && vendor !== 'local' && (
                <label className="field">
                  API key <span className="hint">(stored only on this machine)</span>
                  <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder={vendor === 'anthropic' ? 'sk-ant-…' : 'sk-…'} />
                </label>
              )}

              {vendor === 'local' && (
                <label className="field">
                  Endpoint <span className="hint">(OpenAI-compatible, e.g. Ollama)</span>
                  <input type="text" value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} />
                </label>
              )}

              <label className="field">
                Model
                {vendor === 'local' ? (
                  <input type="text" value={chosenModel} onChange={(e) => setModel(e.target.value)} placeholder="qwen2.5" />
                ) : (
                  <select value={chosenModel} onChange={(e) => setModel(e.target.value)}>
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>{m.label}{m.note ? ` — ${m.note}` : ''}</option>
                    ))}
                  </select>
                )}
              </label>

              {oauthState ? (
                <div className="banner" style={{ marginTop: 8 }}>
                  Finishing ChatGPT sign-in… if it doesn't connect automatically, paste the code from the redirect URL:
                  <div className="answer-row" style={{ marginTop: 8 }}>
                    <input type="text" value={oauthCode} onChange={(e) => setOauthCode(e.target.value)} placeholder="authorization code" />
                    <button className="btn" disabled={busy || !oauthCode.trim()} onClick={finishOauth}>Finish</button>
                  </div>
                </div>
              ) : (
                <button className="btn" disabled={busy} onClick={connect}>
                  {busy ? 'Connecting…' : vendor === 'openai' && method === 'oauth' ? 'Sign in with ChatGPT' : 'Connect'}
                </button>
              )}
            </div>

            <div className="row center" style={{ marginTop: 18 }}>
              <button className="btn ghost" onClick={() => navigate('/parent')}>Done</button>
            </div>
          </>
        )}
      </div>
      <Toast msg={msg} />
    </div>
  );
}
