import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Share2, Copy, Check, Download, Sparkles, Image as ImageIcon } from 'lucide-react';
import { SCENES, STORY_TITLE_BENGALI, STORY_TITLE_ENGLISH } from '../data/scenes';
import { Scene } from '../types';

interface QuoteCardCreatorProps {
  isOpen: boolean;
  currentScene: Scene;
  onClose: () => void;
}

export const QuoteCardCreator: React.FC<QuoteCardCreatorProps> = ({
  isOpen,
  currentScene,
  onClose
}) => {
  const [selectedSceneId, setSelectedSceneId] = useState(currentScene.id);
  const [selectedLineIndex, setSelectedLineIndex] = useState(0);
  const [cardTheme, setCardTheme] = useState<'amber' | 'indigo' | 'rose' | 'emerald' | 'monochrome'>('amber');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const activeScene = SCENES.find((s) => s.id === selectedSceneId) || currentScene;
  const activeLine = activeScene.textLines[selectedLineIndex] || activeScene.textLines[0];

  const handleCopyText = () => {
    const quoteText = `"${activeLine.bengaliText}"\n— ${STORY_TITLE_BENGALI} (${activeScene.titleEnglish})`;
    navigator.clipboard.writeText(quoteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const themeGradients = {
    amber: 'from-amber-950 via-zinc-900 to-amber-900/80 border-amber-500/30 text-amber-100',
    indigo: 'from-indigo-950 via-zinc-900 to-purple-950/80 border-indigo-500/30 text-indigo-100',
    rose: 'from-rose-950 via-zinc-900 to-pink-950/80 border-rose-500/30 text-rose-100',
    emerald: 'from-emerald-950 via-zinc-900 to-teal-950/80 border-emerald-500/30 text-emerald-100',
    monochrome: 'from-zinc-950 via-zinc-900 to-stone-900 border-zinc-700/40 text-stone-100'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#0a0502]/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl rounded-2xl bg-[#151619] border border-white/10 p-6 md:p-8 shadow-2xl text-[#e0d8d0] max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-[#ff4e00]" />
            <h2 className="text-xl font-light tracking-tight font-serif text-[#e0d8d0]">
              Poetry Quote Card Creator
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-1">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                1. Select Scene
              </label>
              <select
                value={selectedSceneId}
                onChange={(e) => {
                  setSelectedSceneId(e.target.value);
                  setSelectedLineIndex(0);
                }}
                className="w-full rounded-lg bg-black/60 border border-white/10 p-2.5 text-xs text-[#e0d8d0] focus:border-[#ff4e00] focus:outline-none"
              >
                {SCENES.map((s) => (
                  <option key={s.id} value={s.id}>
                    Scene {String(s.number).padStart(2, '0')}: {s.titleEnglish} ({s.titleBengali})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                2. Select Poetry Line
              </label>
              <select
                value={selectedLineIndex}
                onChange={(e) => setSelectedLineIndex(Number(e.target.value))}
                className="w-full rounded-lg bg-black/60 border border-white/10 p-2.5 text-xs text-[#e0d8d0] focus:border-[#ff4e00] focus:outline-none"
              >
                {activeScene.textLines.map((line, idx) => (
                  <option key={line.id} value={idx}>
                    Line {idx + 1}: {line.bengaliText}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                3. Card Aesthetic Theme
              </label>
              <div className="flex gap-2">
                {(['amber', 'indigo', 'rose', 'emerald', 'monochrome'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setCardTheme(t)}
                    className={`h-8 w-8 rounded-full border-2 transition-transform ${
                      cardTheme === t ? 'scale-110 border-white ring-2 ring-[#ff4e00]' : 'border-transparent opacity-70 hover:opacity-100'
                    } ${
                      t === 'amber' ? 'bg-[#ff4e00]' :
                      t === 'indigo' ? 'bg-indigo-600' :
                      t === 'rose' ? 'bg-rose-600' :
                      t === 'emerald' ? 'bg-emerald-600' : 'bg-zinc-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={handleCopyText}
                className="flex items-center justify-center gap-2 rounded-lg bg-white text-black hover:bg-[#ff4e00] hover:text-white px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied Quote!' : 'Copy Quote Text'}</span>
              </button>
            </div>
          </div>

          {/* Live Quote Card Preview */}
          <div className="flex flex-col items-center justify-center">
            <div className={`relative w-full aspect-[4/5] rounded-2xl p-6 md:p-8 flex flex-col justify-between border shadow-2xl bg-gradient-to-b ${themeGradients[cardTheme]} overflow-hidden`}>
              {/* Background artwork watermark */}
              <img
                src={activeScene.image}
                alt=""
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-15 mix-blend-overlay pointer-events-none"
              />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">
                  SCENE {String(activeScene.number).padStart(2, '0')}
                </span>
                <Sparkles className="h-4 w-4 text-amber-400 opacity-80" />
              </div>

              <div className="relative z-10 my-auto text-center space-y-4">
                <p className="text-2xl sm:text-3xl font-bengali font-bold leading-relaxed drop-shadow-md">
                  "{activeLine?.bengaliText}"
                </p>
                {activeLine?.englishTranslation && (
                  <p className="text-xs font-serif italic opacity-75 max-w-xs mx-auto">
                    "{activeLine.englishTranslation}"
                  </p>
                )}
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] opacity-80">
                <span className="font-bengali font-medium">
                  {STORY_TITLE_BENGALI}
                </span>
                <span className="font-serif italic">
                  {STORY_TITLE_ENGLISH}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
