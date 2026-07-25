import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, SlidersHorizontal, Volume2, Type, Sparkles, Eye, Mic } from 'lucide-react';
import { DisplaySettings, AudioSettings, FontStyle } from '../types';

interface SettingsDrawerProps {
  isOpen: boolean;
  displaySettings: DisplaySettings;
  audioSettings: AudioSettings;
  onClose: () => void;
  onUpdateDisplay: (updated: Partial<DisplaySettings>) => void;
  onUpdateAudio: (updated: Partial<AudioSettings>) => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  displaySettings,
  audioSettings,
  onClose,
  onUpdateDisplay,
  onUpdateAudio
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-[#0a0502]/80 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative h-full w-full max-w-md bg-[#151619] border-l border-white/10 p-6 shadow-2xl text-[#e0d8d0] flex flex-col justify-between overflow-y-auto"
        >
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-[#ff4e00]" />
                <h2 className="text-lg font-light font-serif text-[#e0d8d0]">
                  Preferences & Settings
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Typography Section */}
            <div className="mt-6 space-y-6">
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-[#ff4e00] uppercase tracking-wider mb-2">
                  <Type className="h-4 w-4" />
                  <span>Bengali Typography Style</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'serif', label: 'Classic Serif', font: 'font-serif-bengali' },
                    { id: 'sans', label: 'Modern Sans', font: 'font-hind' },
                    { id: 'calligraphy', label: 'Expressive', font: 'font-anek' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => onUpdateDisplay({ fontStyle: f.id as FontStyle })}
                      className={`rounded-lg p-2 text-center text-xs border transition-all ${
                        displaySettings.fontStyle === f.id
                          ? 'border-[#ff4e00] bg-[#ff4e00]/20 text-white font-bold'
                          : 'border-white/10 bg-black/50 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      <span className={f.font}>{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Multiplier */}
              <div>
                <label className="flex items-center justify-between text-xs font-semibold text-white/70 mb-2">
                  <span>Font Scale</span>
                  <span className="text-[#ff4e00] font-mono">{Math.round(displaySettings.fontSizeMultiplier * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0.8"
                  max="1.4"
                  step="0.1"
                  value={displaySettings.fontSizeMultiplier}
                  onChange={(e) => onUpdateDisplay({ fontSizeMultiplier: parseFloat(e.target.value) })}
                  className="w-full accent-[#ff4e00] bg-black/60 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slideshow Speed */}
              <div>
                <label className="flex items-center justify-between text-xs font-semibold text-white/70 mb-2">
                  <span>Auto-Play Slideshow Speed</span>
                  <span className="text-[#ff4e00] font-mono">{displaySettings.autoPlayInterval}s / line</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 5, 8, 12].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => onUpdateDisplay({ autoPlayInterval: sec })}
                      className={`rounded-lg py-1.5 text-center text-xs border transition-all ${
                        displaySettings.autoPlayInterval === sec
                          ? 'border-[#ff4e00] bg-[#ff4e00]/20 text-white font-bold'
                          : 'border-white/10 bg-black/50 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Particle Density */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-[#ff4e00] uppercase tracking-wider mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Anime Canvas Particles</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['off', 'low', 'medium', 'high'] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => onUpdateDisplay({ particleDensity: d })}
                      className={`rounded-lg py-1.5 text-center text-xs border capitalize transition-all ${
                        displaySettings.particleDensity === d
                          ? 'border-[#ff4e00] bg-[#ff4e00]/20 text-white font-bold'
                          : 'border-white/10 bg-black/50 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bengali Speech TTS Narration */}
              <div className="pt-2 border-t border-white/10">
                <label className="flex items-center justify-between text-xs font-semibold text-white/70 mb-2">
                  <span className="flex items-center gap-2">
                    <Mic className="h-4 w-4 text-[#ff4e00]" />
                    <span>Bengali Voice Narration</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={audioSettings.enableTTS}
                    onChange={(e) => onUpdateAudio({ enableTTS: e.target.checked })}
                    className="h-4 w-4 accent-[#ff4e00] rounded cursor-pointer"
                  />
                </label>
              </div>

              {/* Audio Volume Controls */}
              <div>
                <label className="flex items-center justify-between text-xs font-semibold text-white/70 mb-2">
                  <span className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-[#ff4e00]" />
                    <span>Ambient Volume</span>
                  </span>
                  <span className="text-[#ff4e00] font-mono">{Math.round(audioSettings.ambientVolume * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audioSettings.ambientVolume}
                  onChange={(e) => onUpdateAudio({ ambientVolume: parseFloat(e.target.value) })}
                  className="w-full accent-[#ff4e00] bg-black/60 rounded-lg cursor-pointer"
                />
              </div>

              {/* English Subtitles Toggle */}
              <div className="pt-2 border-t border-white/10">
                <label className="flex items-center justify-between text-xs font-semibold text-white/70 cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-[#ff4e00]" />
                    <span>Show English Subtitles</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={displaySettings.showEnglishSubtitle}
                    onChange={(e) => onUpdateDisplay({ showEnglishSubtitle: e.target.checked })}
                    className="h-4 w-4 accent-[#ff4e00] rounded cursor-pointer"
                  />
                </label>
              </div>

              {/* Ken Burns Effect */}
              <div>
                <label className="flex items-center justify-between text-xs font-semibold text-white/70 cursor-pointer">
                  <span>Cinematic Camera Motion (Ken Burns)</span>
                  <input
                    type="checkbox"
                    checked={displaySettings.kenBurnsEffect}
                    onChange={(e) => onUpdateDisplay({ kenBurnsEffect: e.target.checked })}
                    className="h-4 w-4 accent-[#ff4e00] rounded cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-[11px] text-white/40 font-serif">
              A Story That Never Asked To Be Finished
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
