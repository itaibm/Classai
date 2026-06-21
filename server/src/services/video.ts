/**
 * Real teaching-video lookup. The tutor emits a video block with a search
 * `query` (an intent, e.g. "the water cycle for kids"); we resolve it to a real,
 * embeddable YouTube video via the YouTube Data API v3 so the embed is always
 * valid — instead of letting the model guess a URL that 404s.
 *
 * Gated on YOUTUBE_API_KEY. Without it (or on any failure) we return null and
 * the lesson falls back to a generated visual. The search query leaves the
 * device (the one privacy tradeoff, accepted for this feature).
 */
const KEY = process.env.YOUTUBE_API_KEY || '';

export function videoSearchEnabled(): boolean {
  return !!KEY;
}

const cache = new Map<string, { url: string; title: string } | null>();

export async function findVideo(query: string): Promise<{ url: string; title: string } | null> {
  const q = (query || '').trim();
  if (!KEY || !q) return null;
  const key = q.toLowerCase();
  if (cache.has(key)) return cache.get(key)!;

  try {
    const u = new URL('https://www.googleapis.com/youtube/v3/search');
    u.searchParams.set('key', KEY);
    u.searchParams.set('part', 'snippet');
    u.searchParams.set('q', q);
    u.searchParams.set('type', 'video');
    u.searchParams.set('maxResults', '3');
    u.searchParams.set('safeSearch', 'strict');
    u.searchParams.set('videoEmbeddable', 'true');
    u.searchParams.set('videoSyndicated', 'true');
    u.searchParams.set('relevanceLanguage', 'en');

    const res = await fetch(u, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) {
      console.warn('[video] YouTube search failed', res.status);
      cache.set(key, null);
      return null;
    }
    const data = (await res.json()) as { items?: Array<{ id?: { videoId?: string }; snippet?: { title?: string } }> };
    const item = data.items?.find((i) => i.id?.videoId);
    if (!item?.id?.videoId) {
      cache.set(key, null);
      return null;
    }
    const out = {
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      title: item.snippet?.title || q
    };
    cache.set(key, out);
    return out;
  } catch (e) {
    console.warn('[video] search error', (e as Error)?.message);
    cache.set(key, null);
    return null;
  }
}
