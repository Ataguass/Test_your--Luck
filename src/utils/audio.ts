// Synthetic Mechanical Ticking Engine & Ambient Atmosphere
let audioCtx: AudioContext | null = null;
let ambientOsc: OscillatorNode | null = null;
let isAmbientRunning = false;

export const playSynthTick = () => {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(100, audioCtx.currentTime); 
    osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);

    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  } catch(e) {
    console.log("Audio synthesizer blocked by browser policy without user interaction", e);
  }
};

export const startTickLoop = (durationMs: number) => {
  const startTime = Date.now();
  let currentDelay = 20; 
  let isActive = true;
  let timeoutId: number;

  const nextTick = () => {
    if (!isActive) return;
    const elapsed = Date.now() - startTime;
    if (elapsed > durationMs) return;
    
    playSynthTick();
    
    const progress = elapsed / durationMs; 
    currentDelay = 20 + Math.pow(progress, 3) * 500;
    
    timeoutId = window.setTimeout(nextTick, currentDelay);
  };
  
  nextTick();

  return () => {
    isActive = false;
    clearTimeout(timeoutId);
  };
};

export const startAmbientEngine = () => {
  if (isAmbientRunning) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    ambientOsc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // Low freq rumble mimicking ship engine
    ambientOsc.type = 'sawtooth';
    ambientOsc.frequency.value = 55; // Sub bass

    filter.type = 'lowpass';
    filter.frequency.value = 120; // Dampen high freqs completely

    // Keeps the volume extremely quiet to sit in the background
    gainNode.gain.value = 0.03; 

    ambientOsc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    ambientOsc.start();
    isAmbientRunning = true;
  } catch(e) {
    console.log("Ambient audio blocked", e);
  }
}
