let audioCtx: AudioContext | null = null;

const ctx = (): AudioContext => {
  if (!audioCtx)
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
};

export const playClickSound = () => {
  try {
    const c = ctx();
    const osc = c.createOscillator();
    const gain = c.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(450, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.06);
    gain.gain.setValueAtTime(0.025, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + 0.06);
  } catch {
    // silent fail
  }
};
