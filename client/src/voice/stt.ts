/**
 * Speech-to-text for the kid's spoken answers — all on-device for privacy.
 *
 *  - Default: the browser's SpeechRecognition (Web Speech API), instant.
 *  - Fallback: record with MediaRecorder and transcribe with Whisper
 *    (transformers.js, in-browser) for browsers without SpeechRecognition.
 *
 * Audio never leaves the device; only the resulting text is sent to the brain.
 */

const SR: any =
  typeof window !== 'undefined' ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : null;

export function liveSttSupported(): boolean {
  return Boolean(SR);
}

export interface ListenOpts {
  lang?: string;
  onPartial?: (text: string) => void;
  onFinal?: (text: string) => void;
  onEnd?: () => void;
  onError?: (e: string) => void;
}
export interface ListenHandle {
  stop: () => void;
}

/** Live transcription via the Web Speech API. */
export function listen(opts: ListenOpts): ListenHandle {
  if (!SR) {
    opts.onError?.('not_supported');
    opts.onEnd?.();
    return { stop() {} };
  }
  const rec = new SR();
  rec.lang = opts.lang || 'en-US';
  rec.interimResults = true;
  rec.continuous = false;
  let finalText = '';
  rec.onresult = (e: any) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) finalText += t;
      else interim += t;
    }
    if (interim) opts.onPartial?.(interim);
    if (finalText) opts.onPartial?.(finalText + interim);
  };
  rec.onerror = (e: any) => opts.onError?.(e.error || 'error');
  rec.onend = () => {
    if (finalText.trim()) opts.onFinal?.(finalText.trim());
    opts.onEnd?.();
  };
  rec.start();
  return {
    stop() {
      try {
        rec.stop();
      } catch {
        /* ignore */
      }
    }
  };
}

// ---- Whisper fallback (transformers.js) -----------------------------------

let whisperPromise: Promise<any> | null = null;
async function getWhisper(): Promise<any> {
  if (!whisperPromise) {
    whisperPromise = (async () => {
      // @ts-ignore remote ESM module loaded at runtime
      const mod = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.3/+esm');
      const device = (navigator as any).gpu ? 'webgpu' : 'wasm';
      return await mod.pipeline('automatic-speech-recognition', 'onnx-community/whisper-base', { device });
    })();
  }
  return whisperPromise;
}

/** Record a short clip and transcribe it with in-browser Whisper. */
export async function recordAndTranscribe(maxMs = 12000): Promise<string> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const chunks: BlobPart[] = [];
  const rec = new MediaRecorder(stream);
  rec.ondataavailable = (e) => chunks.push(e.data);
  const stopped = new Promise<void>((resolve) => (rec.onstop = () => resolve()));
  rec.start();
  const stopTimer = setTimeout(() => rec.state !== 'inactive' && rec.stop(), maxMs);
  // caller stops via the returned controller in a fuller impl; here we cap by time
  await stopped;
  clearTimeout(stopTimer);
  stream.getTracks().forEach((t) => t.stop());

  const blob = new Blob(chunks, { type: 'audio/webm' });
  const buf = await blob.arrayBuffer();
  const ctx = new AudioContext({ sampleRate: 16000 });
  const audio = await ctx.decodeAudioData(buf);
  const mono = audio.getChannelData(0);
  const asr = await getWhisper();
  const out = await asr(mono);
  return (out?.text || '').trim();
}
