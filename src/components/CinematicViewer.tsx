import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scene, DisplaySettings } from '../types';
import { CanvasParticles } from './CanvasParticles';
import { ChevronRight, Sparkles, Volume2 } from 'lucide-react';
import { SCENES } from '../data/scenes';

interface CinematicViewerProps {
  scene: Scene;
  displaySettings: DisplaySettings;
  isPlaying: boolean;
  onNextScene: () => void;
  onPrevScene: () => void;
  onSelectScene?: (scene: Scene) => void;
  onLineChange?: (text: string) => void;
}

export const CinematicViewer: React.FC<CinematicViewerProps> = ({
  scene,
  displaySettings,
  isPlaying,
  onNextScene,
  onPrevScene,
  onSelectScene,
  onLineChange
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Reset line index when scene changes
  useEffect(() => {
    setCurrentLineIndex(0);
  }, [scene.id]);

  // Report current line text for narration/TTS
  useEffect(() => {
    const activeLine = scene.textLines[currentLineIndex];
    if (activeLine && onLineChange) {
      onLineChange(activeLine.bengaliText);
    }
  }, [currentLineIndex, scene, onLineChange]);

  const advanceLine = useCallback(() => {
    if (currentLineIndex < scene.textLines.length - 1) {
      setCurrentLineIndex((prev) => prev + 1);
    } else {
      onNextScene();
    }
  }, [currentLineIndex, scene.textLines.length, onNextScene]);

  const rewindLine = useCallback(() => {
    if (currentLineIndex > 0) {
      setCurrentLineIndex((prev) => prev - 1);
    } else {
      onPrevScene();
    }
  }, [currentLineIndex, onPrevScene]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        advanceLine();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        rewindLine();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [advanceLine, rewindLine]);

  // Auto-play slideshow timer
  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = displaySettings.autoPlayInterval * 1000;
    const timer = setTimeout(() => {
      advanceLine();
    }, intervalTime);
    return () => clearTimeout(timer);
  }, [isPlaying, currentLineIndex, displaySettings.autoPlayInterval, advanceLine]);

  // Handle Mouse Wheel Scroll Navigation (Scroll down = next line, Scroll up = prev line)
  const lastScrollTimeRef = React.useRef<number>(0);
  const touchStartYRef = React.useRef<number>(0);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Prevent fast rapid skipping with cooldown
    const now = Date.now();
    if (now - lastScrollTimeRef.current < 350) return;

    if (Math.abs(e.deltaY) > 12) {
      lastScrollTimeRef.current = now;
      if (e.deltaY > 0) {
        advanceLine();
      } else {
        rewindLine();
      }
    }
  }, [advanceLine, rewindLine]);

  // Touch Swipe for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchStartYRef.current - touchEndY;
    if (Math.abs(diffY) > 35) {
      if (diffY > 0) {
        advanceLine(); // Swiped up = next
      } else {
        rewindLine(); // Swiped down = previous
      }
    }
  };

  const fontClass = 
    displaySettings.fontStyle === 'serif' ? 'font-serif-bengali' :
    displaySettings.fontStyle === 'calligraphy' ? 'font-anek' : 'font-hind';

  const currentLine = scene.textLines[currentLineIndex];

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0502] flex flex-col justify-between select-none"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => {
        // Prevent trigger if clicking on interactive controls
        if ((e.target as HTMLElement).closest('button, input, a, header, footer')) return;
        advanceLine();
      }}
    >
      {/* Background Anime Image with Ken Burns animation & Atmospheric Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Soft Background Blur Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#3a1510] opacity-40 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-[#ff4e00] opacity-15 blur-[140px] pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#1a2a40] opacity-30 blur-[100px] pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ 
              opacity: 1, 
              scale: displaySettings.kenBurnsEffect ? 1.0 : 1.0,
              transition: { duration: 1.8, ease: 'easeOut' }
            }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={scene.image}
              alt={scene.titleEnglish}
              referrerPolicy="no-referrer"
              className={`h-full w-full object-cover object-center opacity-85 ${
                displaySettings.kenBurnsEffect ? 'animate-kenburns' : ''
              }`}
            />
            {/* Moody cinematic color overlay gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t ${scene.bgOverlayGradient}`} />
            <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* HTML5 Canvas Particle Engine */}
      <CanvasParticles type={scene.particleType} density={displaySettings.particleDensity} />

      {/* Top Margin Spacer */}
      <div className="pt-24 z-10" />

      {/* Center Atmospheric Narrative Stage */}
      <main className="relative z-20 mx-auto max-w-5xl px-6 md:px-12 text-center my-auto flex flex-col items-center justify-center">
        {/* Scene Header Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          key={`header-${scene.id}`}
          className="mb-6 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="inline-block px-3.5 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.25em] text-[#e0d8d0] bg-black/40 backdrop-blur-md">
            SCENE {String(scene.number).padStart(2, '0')}: {scene.titleEnglish}
          </span>
          <span className="text-xs text-[#e0d8d0]/70 font-bengali">
            ({scene.titleBengali})
          </span>
        </motion.div>

        {/* Primary Bengali Poetry Text Display */}
        <div className="min-h-[200px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${scene.id}-${currentLineIndex}`}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center gap-5"
            >
              <p 
                className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-[#e0d8d0] leading-relaxed drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] ${fontClass}`}
                style={{ fontSize: `calc(2.5rem * ${displaySettings.fontSizeMultiplier})` }}
              >
                {currentLine?.bengaliText}
              </p>

              {/* English Subtitle */}
              {displaySettings.showEnglishSubtitle && currentLine?.englishTranslation && (
                <p className="mt-1 text-xs sm:text-sm md:text-base font-serif italic text-white/50 max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  "{currentLine.englishTranslation}"
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Memory Button & Scroll Indicator */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <button 
              onClick={advanceLine}
              className="px-8 py-3 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#ff4e00] hover:text-white transition-colors shadow-2xl shadow-black"
            >
              Next Memory
            </button>
            <button 
              onClick={rewindLine}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e0d8d0]/50 hover:text-white transition-opacity"
            >
              Previous
            </button>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-[#e0d8d0]/40 font-mono tracking-widest uppercase mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4e00] animate-ping" />
            <span>Scroll ↕ or Swipe to Navigate</span>
          </div>
        </div>
      </main>

      {/* Bottom Scene Rail & Atmospheric Metadata */}
      <footer className="relative z-30 px-6 pb-8 md:px-12 bg-gradient-to-t from-[#0a0502] via-[#0a0502]/90 to-transparent pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-6 gap-4 max-w-6xl mx-auto w-full">
          
          {/* Thumbnail Rail */}
          <div className="flex gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 custom-scrollbar">
            {SCENES.slice(0, 7).map((s) => {
              const isActive = s.id === scene.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectScene && onSelectScene(s)}
                  className={`w-20 h-12 rounded-lg border transition-all relative overflow-hidden flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'border-[#ff4e00] bg-white/10 ring-1 ring-[#ff4e00]'
                      : 'border-white/5 bg-white/5 opacity-50 hover:opacity-100'
                  }`}
                  title={`${s.titleEnglish} (${s.titleBengali})`}
                >
                  <img src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
                  <div className={`absolute inset-0 ${isActive ? 'bg-[#ff4e00]/20' : 'bg-black/40'}`} />
                  <span className="relative z-10 text-[10px] font-mono text-white font-bold">{String(s.number).padStart(2, '0')}</span>
                  {isActive && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ff4e00] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Line Progress & Mood Metadata */}
          <div className="flex items-center gap-6 text-[11px]">
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase text-white/40 tracking-wider">Mood</span>
              <span className="text-[11px] italic text-[#e0d8d0]">{scene.mood[0] || 'Atmospheric'}</span>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase text-white/40 tracking-wider">Audio</span>
              <span className="text-[11px] italic text-[#e0d8d0] capitalize">{scene.ambientSound.replace('_', ' ')}</span>
            </div>

            {/* Line Progress Bar */}
            <div className="flex flex-col items-end gap-1 min-w-[120px]">
              <span className="text-[9px] font-mono text-white/50">
                LINE {currentLineIndex + 1} / {scene.textLines.length}
              </span>
              <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#ff4e00] transition-all duration-300" 
                  style={{ width: `${((currentLineIndex + 1) / scene.textLines.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

