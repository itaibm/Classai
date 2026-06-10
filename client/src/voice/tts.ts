/**
 * Text-to-speech with lip-sync levels.
 *
 *  - Default: the browser's built-in SpeechSynthesis (instant, no download).
 *  - Opt-in HD: Kokoro-82M (open weights) loaded in-browser via kokoro-js +
 *    WebGPU/WASM — higher quality, fully private, runs on the user's machine.
 *
 * Either way `speak()` reports a 0..1 `onLevel` stream so the character can
 * lip-sync. For Kokoro we read real audio amplitude via a Web Audio analyser;
 * for SpeechSynthesis (which exposes no audio) we synthesise a plausible level
 * pulsed by word boundaries.
 */

export interface SpeakOpts {
  text: string;
  rate?: number;
  voice?: string; // SpeechSynthesis voice name, or Kokoro voice id when hd
  hd?: boolean;
  onStart?: () => void;
  onLevel?: (level: number) => void;
  onEnd?: () => void;
}
export interface SpeakHandle {
  stop: () => void;
}

export function listVoices(): SpeechSynthesisVoice[] {
  return typeof speechSynthesis !== 'undefined' ? speechSynthesis.getVoices() : [];
}
export function voicesReady(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof speechSynthesis === 'undefined') return resolve([]);
    const v = speechSynthesis.getVoices();
    if (v.length) return resolve(v);
    speechSynthesis.onvoiceschanged = () => resolve(speechSynthesis.getVoices());
    setTimeout(() => resolve(speechSynthesis.getVoices()), 1000);
  });
}

export function speak(opts: SpeakOpts): SpeakHandle {
  if (opts.hd) {
    return speakKokoro(opts);
  }
  return speakBrowser(opts);
}

// ---- browser SpeechSynthesis ----------------------------------------------

function speakBrowser(opts: SpeakOpts): SpeakHandle {
  if (typeof speechSynthesis === 'undefined') {
    opts.onStart?.();
    setTimeout(() => opts.onEnd?.(), 200);
    return { stop() {} };
  }
  const u = new SpeechSynthesisUtterance(opts.text);
  u.rate = opts.rate ?? 1;
  if (opts.voice) {
    const v = speechSynthesis.getVoices().find((x) => x.name === opts.voice);
    if (v) u.voice = v;
  }
  let raf = 0;
  let speaking = false;
  let pulse = 0; // decays; bumped on word boundaries
  const tick = () => {
    if (!speaking) return;
    pulse *= 0.86;
    const base = 0.28 + 0.22 * Math.abs(Math.sin(performance.now() / 90));
    opts.onLevel?.(Math.min(1, base + pulse));
    raf = requestAnimationFrame(tick);
  };
  u.onstart = () => {
    speaking = true;
    opts.onStart?.();
    raf = requestAnimationFrame(tick);
  };
  u.onboundary = () => {
    pulse = 0.5;
  };
  u.onend = () => {
    speaking = false;
    cancelAnimationFrame(raf);
    opts.onLevel?.(0);
    opts.onEnd?.();
  };
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
  return {
    stop() {
      speaking = false;
      cancelAnimationFrame(raf);
      // Detach onend BEFORE cancel() — cancel() fires onend, which would
      // otherwise call opts.onEnd and advance the UI for an interrupted turn.
      u.onend = null;
      u.onboundary = null;
      speechSynthesis.cancel();
    }
  };
}

// ---- Kokoro (HD, in-browser) ----------------------------------------------

let kokoroPromise: Promise<any> | null = null;
async function getKokoro(): Promise<any> {
  if (!kokoroPromise) {
    kokoroPromise = (async () => {
      // @ts-ignore remote ESM module loaded at runtime
      const mod = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/+esm');
      const device = (navigator as any).gpu ? 'webgpu' : 'wasm';
      return await mod.KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', {
        dtype: device === 'webgpu' ? 'fp32' : 'q8',
        device
      });
    })();
  }
  return kokoroPromise;
}

/** Has the HD voice model been requested before? (used to show a loading hint) */
export function kokoroLoading(): boolean {
  return kokoroPromise !== null;
}

function speakKokoro(opts: SpeakOpts): SpeakHandle {
  let stopped = false;
  let raf = 0;
  let ctx: AudioContext | null = null;
  let src: AudioBufferSourceNode | null = null;
  let stopRef: () => void = () => {};

  (async () => {
    try {
      const tts = await getKokoro();
      if (stopped) return;
      const out = await tts.generate(opts.text, { voice: opts.voice || 'af_heart' });
      if (stopped) return;
      const float = new Float32Array(out.audio);
      const sr: number = out.sampling_rate || 24000;
      ctx = new AudioContext();
      const buffer = ctx.createBuffer(1, float.length, sr);
      buffer.copyToChannel(float, 0);
      src = ctx.createBufferSource();
      src.buffer = buffer;
      src.playbackRate.value = opts.rate ?? 1;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      const data = new Uint8Array(analyser.frequencyBinCount);
      src.connect(analyser);
      analyser.connect(ctx.destination);
      const tick = () => {
        if (stopped) return;
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (const v of data) {
          const c = (v - 128) / 128;
          sum += c * c;
        }
        const rms = Math.sqrt(sum / data.length);
        opts.onLevel?.(Math.min(1, rms * 3));
        raf = requestAnimationFrame(tick);
      };
      opts.onStart?.();
      src.onended = () => {
        cancelAnimationFrame(raf);
        opts.onLevel?.(0);
        opts.onEnd?.();
      };
      src.start();
      raf = requestAnimationFrame(tick);
    } catch (err) {
      // HD failed (no network / unsupported) — fall back to browser voice.
      console.warn('Kokoro HD voice unavailable, using browser voice', err);
      const h = speakBrowser(opts);
      stopRef = h.stop;
    }
  })();

  return {
    stop() {
      stopped = true;
      cancelAnimationFrame(raf);
      try {
        src?.stop();
        ctx?.close();
      } catch {
        /* ignore */
      }
      stopRef();
    }
  };
}
