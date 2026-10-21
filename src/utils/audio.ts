// Web Audio API synthesizer for sorting sound effects

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.15;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  /**
   * Play a clean tone based on array element value.
   * @param val The value of the bar (e.g. 10 - 100)
   * @param minVal Minimum possible array value
   * @param maxVal Maximum possible array value
   * @param duration Duration in ms (default 25ms)
   * @param type Waveform type ('sine' | 'triangle')
   */
  public playTone(val: number, minVal: number = 10, maxVal: number = 100, duration: number = 30, type: OscillatorType = 'sine') {
    if (!this.enabled || this.volume <= 0) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const normalized = Math.max(0, Math.min(1, (val - minVal) / Math.max(1, maxVal - minVal)));
      // Musical frequency range: 160Hz (low bass) to 980Hz (bright soprano)
      const freq = 160 + normalized * 820;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      const durSec = Math.max(0.015, duration / 1000);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(this.volume, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + durSec + 0.01);
    } catch {
      // Audio autoplay policy or device restriction safely ignored
    }
  }

  /**
   * Play a quick celebratory arpeggio when sorting finishes
   */
  public playFinishFanfare() {
    if (!this.enabled || this.volume <= 0) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          this.initContext();
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          const now = this.ctx.currentTime;
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(this.volume * 0.8, now + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.22);
        } catch {
          // ignore
        }
      }, idx * 60);
    });
  }
}

export const soundSynth = new SoundSynthesizer();
