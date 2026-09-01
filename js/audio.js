(function () {
  let ctx = null;
  let enabled = false;

  function ensureContext() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function tone(freq, duration, type, gainValue) {
    if (!enabled) return;
    const audio = ensureContext();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = type || "sine";
    oscillator.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(gainValue || 0.035, audio.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + duration + 0.02);
  }

  window.PipoAudio = {
    isEnabled() {
      return enabled;
    },
    toggle() {
      enabled = !enabled;
      if (enabled) ensureContext().resume();
      return enabled;
    },
    beep() {
      tone(720, 0.055, "square", 0.025);
    },
    ok() {
      tone(660, 0.07, "sine", 0.03);
      setTimeout(() => tone(990, 0.08, "sine", 0.025), 75);
    },
    error() {
      tone(180, 0.12, "sawtooth", 0.025);
    },
    final() {
      tone(440, 0.18, "sine", 0.025);
      setTimeout(() => tone(554, 0.18, "sine", 0.02), 190);
      setTimeout(() => tone(660, 0.28, "sine", 0.018), 380);
    }
  };
})();
