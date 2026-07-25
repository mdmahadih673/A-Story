import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Copy, Check, Sparkles, BookOpen, Heart, Share2, Volume2 } from 'lucide-react';
import { SCENES, STORY_TITLE_BENGALI, STORY_TITLE_ENGLISH, STORY_QUOTE } from '../data/scenes';
import { Scene } from '../types';

interface FullPoemReaderProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToScene: (scene: Scene) => void;
}

export const FullPoemReader: React.FC<FullPoemReaderProps> = ({
  isOpen,
  onClose,
  onJumpToScene
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showTranslations, setShowTranslations] = useState(true);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#0a0502]/95 backdrop-blur-lg overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl rounded-2xl bg-[#151619] border border-white/10 shadow-2xl p-6 md:p-12 text-[#e0d8d0] max-h-[92vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-[#ff4e00]" />
            <div>
              <h2 className="text-xl md:text-2xl font-light tracking-tight font-serif text-[#e0d8d0]">
                Full Poetry Reader
              </h2>
              <p className="text-xs text-white/50 font-bengali">
                {STORY_TITLE_BENGALI} — সম্পূর্ণ কবিতা ও গল্প
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTranslations(!showTranslations)}
              className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5"
            >
              {showTranslations ? 'Hide Translations' : 'Show English'}
            </button>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Story Quote banner */}
        <div className="my-6 rounded-xl bg-gradient-to-r from-[#3a1510]/40 via-[#ff4e00]/10 to-[#151619] p-4 border border-white/10 text-center">
          <p className="text-sm font-serif italic text-[#e0d8d0]">
            "{STORY_QUOTE}"
          </p>
          <p className="text-xs font-bengali text-white/60 mt-1">
            "কিছু মানুষ থেকে যাওয়ার জন্য আসে না, কিছু স্মৃতি ছেড়ে যাওয়ার জন্য তৈরি হয় না।"
          </p>
        </div>

        {/* Scrolling Poem Body */}
        <div className="overflow-y-auto space-y-8 pr-3 custom-scrollbar py-4">
          {SCENES.map((scene) => (
            <div 
              key={scene.id} 
              className="group relative rounded-2xl bg-black/40 p-6 border border-white/5 hover:border-[#ff4e00]/40 transition-all"
            >
              {/* Scene Title Banner */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-mono font-bold text-[#ff4e00] border border-white/10">
                    {String(scene.number).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-base font-light font-serif text-[#e0d8d0]">
                      {scene.titleEnglish} • <span className="font-bengali text-[#e0d8d0]/80">{scene.titleBengali}</span>
                    </h3>
                    <p className="text-xs text-white/40 font-serif italic">
                      {scene.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onJumpToScene(scene);
                    onClose();
                  }}
                  className="rounded-lg bg-[#ff4e00]/10 px-3 py-1.5 text-xs font-medium text-[#ff4e00] hover:bg-[#ff4e00]/20 border border-[#ff4e00]/30 transition-all"
                >
                  Jump to Scene ➔
                </button>
              </div>

              {/* Poetry Lines */}
              <div className="space-y-4">
                {scene.textLines.map((line) => (
                  <div 
                    key={line.id} 
                    className="flex items-start justify-between gap-4 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-lg md:text-xl font-bengali text-[#e0d8d0] font-light leading-relaxed">
                        {line.bengaliText}
                      </p>
                      {showTranslations && line.englishTranslation && (
                        <p className="text-xs font-serif italic text-white/40">
                          {line.englishTranslation}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleCopy(line.bengaliText, line.id)}
                      className="rounded p-1.5 text-white/30 hover:text-[#ff4e00] hover:bg-white/10 transition-all"
                      title="Copy Bengali poetry line"
                    >
                      {copiedId === line.id ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
