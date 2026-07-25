import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AudioSettings } from '../types';
import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface AudioEngineProps {
  settings: AudioSettings;
  ambientSoundType: string;
  currentBengaliText?: string;
  onTTSStart?: () => void;
  onTTSEnd?: () => void;
}

// Pentatonic frequencies for gentle anime piano chimes
const PIANO_NOTES = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.00, // G4
  440.00, // A4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.00, // A5
];

export const AudioEngine: React.FC<AudioEngineProps> = ({
  settings,
  ambientSoundType,
  currentBengaliText,
  onTTSStart,
  onTTSEnd
}) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const delayNodeRef = useRef<DelayNode | null>(null);
  const activeNodesRef = useRef<AudioNode[]>([]);
  const intervalTimerRef = useRef<number | null>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Initialize Web Audio Context & Delay Reverb Effect
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      setHasUserInteracted(true);
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const masterGain = ctx.createGain();
      const ambientGain = ctx.createGain();

      // Delay / Reverb Effect for Lofi Anime Piano
      const delay = ctx.createDelay();
      const feedback = ctx.createGain();
      const delayFilter = ctx.createBiquadFilter();

      delay.delayTime.value = 0.38; // 380ms echo
      feedback.gain.value = 0.4;
      delayFilter.type = 'lowpass';
      delayFilter.frequency.value = 1800;

      delay.connect(feedback);
      feedback.connect(delayFilter);
      delayFilter.connect(delay);
      delay.connect(ambientGain);

      delayNodeRef.current = delay;

      masterGain.gain.value = settings.isMuted ? 0 : settings.masterVolume;
      ambientGain.gain.value = settings.ambientVolume;

      ambientGain.connect(masterGain);
      masterGain.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = masterGain;
      ambientGainRef.current = ambientGain;

      setHasUserInteracted(true);
      setIsPlayingMusic(true);
    } catch {
      console.warn("Web Audio API not supported");
    }
  }, [settings.isMuted, settings.masterVolume, settings.ambientVolume]);

  // Auto initialize on first click or scroll
  useEffect(() => {
    const handleFirstUserAction = () => {
      initAudio();
    };

    window.addEventListener('click', handleFirstUserAction, { once: true });
    window.addEventListener('wheel', handleFirstUserAction, { once: true });
    window.addEventListener('keydown', handleFirstUserAction, { once: true });
    window.addEventListener('touchstart', handleFirstUserAction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstUserAction);
      window.removeEventListener('wheel', handleFirstUserAction);
      window.removeEventListener('keydown', handleFirstUserAction);
      window.removeEventListener('touchstart', handleFirstUserAction);
    };
  }, [initAudio]);

  // Update Master & Ambient Volumes
  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = settings.isMuted ? 0 : settings.masterVolume;
    }
    if (ambientGainRef.current) {
      ambientGainRef.current.gain.value = settings.ambientVolume;
    }
  }, [settings.masterVolume, settings.isMuted, settings.ambientVolume]);

  // Stop active ambient nodes
  const stopAmbient = useCallback(() => {
    if (intervalTimerRef.current) {
      window.clearInterval(intervalTimerRef.current);
      intervalTimerRef.current = null;
    }

    activeNodesRef.current.forEach(node => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // ignore
      }
    });
    activeNodesRef.current = [];
  }, []);

  // Helper to play a soft piano key note
  const playPianoNote = useCallback((freq: number, gainVal: number = 0.15) => {
    if (!audioCtxRef.current || !ambientGainRef.current || settings.isMuted) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') return;

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);

    const now = ctx.currentTime;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(gainVal, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(ambientGainRef.current);

    // Also send to stereo delay for echo effect
    if (delayNodeRef.current) {
      noteGain.connect(delayNodeRef.current);
    }

    osc.start(now);
    osc.stop(now + 2.8);
  }, [settings.isMuted]);

  // Generate Procedural Cinematic Anime Soundtrack
  useEffect(() => {
    if (!hasUserInteracted || !audioCtxRef.current || !ambientGainRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    stopAmbient();

    const dest = ambientGainRef.current;

    // 1. Lush Background Warm Pad Chord Synth
    const padOsc1 = ctx.createOscillator();
    const padOsc2 = ctx.createOscillator();
    const padOsc3 = ctx.createOscillator();
    const padFilter = ctx.createBiquadFilter();
    const padGain = ctx.createGain();

    padOsc1.type = 'sine';
    padOsc2.type = 'triangle';
    padOsc3.type = 'sine';

    // A minor 9th / F maj7 chord frequencies based on scene
    if (ambientSoundType.includes('rain')) {
      padOsc1.frequency.setValueAtTime(110.00, ctx.currentTime); // A2
      padOsc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E3
      padOsc3.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
    } else if (ambientSoundType === 'starlit_night' || ambientSoundType === 'cosmic_silence') {
      padOsc1.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
      padOsc2.frequency.setValueAtTime(196.00, ctx.currentTime); // G3
      padOsc3.frequency.setValueAtTime(293.66, ctx.currentTime); // D4
    } else {
      padOsc1.frequency.setValueAtTime(146.83, ctx.currentTime); // D3
      padOsc2.frequency.setValueAtTime(220.00, ctx.currentTime); // A3
      padOsc3.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
    }

    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(450, ctx.currentTime);

    padGain.gain.setValueAtTime(0.08, ctx.currentTime);

    padOsc1.connect(padFilter);
    padOsc2.connect(padFilter);
    padOsc3.connect(padFilter);
    padFilter.connect(padGain);
    padGain.connect(dest);

    padOsc1.start();
    padOsc2.start();
    padOsc3.start();

    activeNodesRef.current.push(padOsc1, padOsc2, padOsc3, padFilter, padGain);

    // 2. Rain / Breeze White Noise Filter layer
    if (ambientSoundType.includes('rain') || ambientSoundType === 'rainy_desk' || ambientSoundType === 'rainy_street') {
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.setValueAtTime(850, ctx.currentTime);

      const rainGain = ctx.createGain();
      rainGain.gain.value = 0.05;

      whiteNoise.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(dest);

      whiteNoise.start();
      activeNodesRef.current.push(whiteNoise, rainFilter, rainGain);
    }

    // 3. Arpeggiated Anime Piano Melody Loop
    const triggerPianoArpeggio = () => {
      // Pick 2 or 3 harmonizing piano notes
      const randomIndex1 = Math.floor(Math.random() * PIANO_NOTES.length);
      const randomIndex2 = (randomIndex1 + 2) % PIANO_NOTES.length;
      
      playPianoNote(PIANO_NOTES[randomIndex1], 0.12);
      
      setTimeout(() => {
        playPianoNote(PIANO_NOTES[randomIndex2], 0.09);
      }, 350);
    };

    // Trigger initial chime
    triggerPianoArpeggio();

    // Schedule periodic piano notes every 2.2 seconds
    intervalTimerRef.current = window.setInterval(() => {
      triggerPianoArpeggio();
    }, 2200);

    return () => {
      stopAmbient();
    };
  }, [ambientSoundType, hasUserInteracted, stopAmbient, playPianoNote]);

  // Handle Bengali Speech Narration (TTS)
  useEffect(() => {
    if (!settings.enableTTS || !currentBengaliText || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop prior narration

    if (currentBengaliText.includes('— The End') || currentBengaliText.includes('— সমাপ্ত')) return;

    const utterance = new SpeechSynthesisUtterance(currentBengaliText);
    utterance.rate = settings.ttsSpeed;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const bengaliVoice = voices.find(v => v.lang.includes('bn') || v.lang.includes('BD') || v.lang.includes('IN'));
    if (bengaliVoice) {
      utterance.voice = bengaliVoice;
      utterance.lang = bengaliVoice.lang;
    } else {
      utterance.lang = 'bn-BD';
    }

    utterance.onstart = () => {
      if (onTTSStart) onTTSStart();
    };
    utterance.onend = () => {
      if (onTTSEnd) onTTSEnd();
    };
    utterance.onerror = () => {
      if (onTTSEnd) onTTSEnd();
    };

    window.speechSynthesis.speak(utterance);

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentBengaliText, settings.enableTTS, settings.ttsSpeed, onTTSStart, onTTSEnd]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!hasUserInteracted ? (
        <button
          onClick={initAudio}
          className="flex items-center gap-2 rounded-full bg-[#ff4e00] px-4 py-2.5 text-xs font-bold text-white uppercase tracking-wider shadow-2xl shadow-[#ff4e00]/50 hover:bg-white hover:text-black transition-all animate-bounce"
        >
          <Music className="h-4 w-4" />
          <span>🎵 Enable Anime Music & Scroll</span>
        </button>
      ) : (
        <div className="flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md text-[11px] font-mono text-[#e0d8d0]/80 shadow-xl">
          <Sparkles className="h-3.5 w-3.5 text-[#ff4e00] animate-spin" />
          <span className="tracking-wide">Soundscape Active</span>
        </div>
      )}
    </div>
  );
};

