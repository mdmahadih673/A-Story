import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Sparkles, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { SCENES } from '../data/scenes';
import { Scene } from '../types';

interface SceneSelectorModalProps {
  isOpen: boolean;
  currentSceneId: string;
  onClose: () => void;
  onSelectScene: (scene: Scene) => void;
}

export const SceneSelectorModal: React.FC<SceneSelectorModalProps> = ({
  isOpen,
  currentSceneId,
  onClose,
  onSelectScene
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#0a0502]/90 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl rounded-2xl bg-[#151619] border border-white/10 p-6 md:p-8 shadow-2xl text-[#e0d8d0] max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#ff4e00]" />
                <h2 className="text-xl md:text-2xl font-light tracking-tight font-serif text-[#e0d8d0]">
                  Scene Gallery & Story Map
                </h2>
              </div>
              <p className="text-xs md:text-sm text-white/50 font-bengali mt-1">
                গল্পের ১০টি দৃশ্য ও কবিতার মানচিত্র
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Grid of Scenes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 overflow-y-auto pr-2 custom-scrollbar">
            {SCENES.map((s) => {
              const isActive = s.id === currentSceneId;
              const firstLine = s.textLines[0]?.bengaliText || '';

              return (
                <div
                  key={s.id}
                  onClick={() => {
                    onSelectScene(s);
                    onClose();
                  }}
                  className={`group relative rounded-xl overflow-hidden border transition-all cursor-pointer flex flex-col ${
                    isActive 
                      ? 'border-[#ff4e00] ring-1 ring-[#ff4e00] bg-white/10 shadow-xl shadow-[#ff4e00]/10' 
                      : 'border-white/5 hover:border-white/20 bg-black/40 hover:bg-white/5'
                  }`}
                >
                  {/* Scene Image Thumbnail */}
                  <div className="relative h-36 w-full overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.titleEnglish}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151619] via-transparent to-transparent" />

                    <div className="absolute top-2 left-2 rounded-full bg-black/80 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#e0d8d0] border border-white/10">
                      SCENE {String(s.number).padStart(2, '0')}
                    </div>

                    {isActive && (
                      <div className="absolute top-2 right-2 rounded-full bg-[#ff4e00] px-2.5 py-0.5 text-[10px] font-bold text-white flex items-center gap-1 shadow-md">
                        <Play className="h-2.5 w-2.5 fill-current" />
                        <span>ACTIVE</span>
                      </div>
                    )}
                  </div>

                  {/* Scene Details */}
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-sm font-light text-[#e0d8d0] font-serif">
                          {s.titleEnglish}
                        </h3>
                        <span className="text-xs text-[#e0d8d0]/80 font-bengali font-medium">
                          {s.titleBengali}
                        </span>
                      </div>

                      <p className="text-[11px] text-white/40 font-serif italic mt-0.5">
                        {s.subtitle}
                      </p>

                      <p className="text-xs text-[#e0d8d0]/90 font-bengali mt-3 line-clamp-2 italic bg-black/50 p-2.5 rounded-md border border-white/5">
                        "{firstLine}"
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1 pt-2 border-t border-white/5">
                      {s.mood.slice(0, 3).map((m, idx) => (
                        <span 
                          key={idx}
                          className="rounded bg-white/5 px-2 py-0.5 text-[9px] text-white/50"
                        >
                          #{m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
