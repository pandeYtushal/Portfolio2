let isSoundEnabled = true;

if (typeof window !== "undefined") {
  const saved = localStorage.getItem("sound-enabled");
  isSoundEnabled = saved !== null ? saved === "true" : true;
}

export const getSoundEnabled = () => isSoundEnabled;

export const setSoundEnabled = (enabled: boolean) => {
  isSoundEnabled = enabled;
  if (typeof window !== "undefined") {
    localStorage.setItem("sound-enabled", String(enabled));
  }
};

// Web Audio API Synthesizer
let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playHoverSound = () => {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    // Soft high-frequency blip
    osc.frequency.setValueAtTime(1000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.04);

    gainNode.gain.setValueAtTime(0.008, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Fail silently if browser blocks context
  }
};

export const playClickSound = () => {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "triangle";
    // Soft click/pop
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);

    gainNode.gain.setValueAtTime(0.025, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch {
    // Fail silently
  }
};
