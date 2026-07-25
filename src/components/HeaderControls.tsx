import React from 'react';
import { 
  Play, 
  Pause, 
  Grid, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  SlidersHorizontal, 
  Share2, 
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AudioSettings } from '../types';

interface HeaderControlsProps {
  currentSceneNumber: number;
  totalScenes: number;
  isPlaying: boolean;
  audioSettings: AudioSettings;
  onTogglePlay: () => void;
  onPrevScene: () => void;
  onNextScene: () => void;
  onOpenSceneSelector: () => void;
  onOpenReader: () => void;
  onOpenQuoteCreator: () => void;
  onOpenSettings: () => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  currentSceneNumber,
  totalScenes,
  isPlaying,
  audioSettings,
  onTogglePlay,
  onPrevScene,
  onNextScene,
  onOpenSceneSelector,
  onOpenReader,
  onOpenQuoteCreator,
  onOpenSettings,
  onToggleMute,
  onToggleFullscreen
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-4 md:px-10 bg-gradient-to-b from-[#0a0502]/95 via-[#0a0502]/70 to-transparent backdrop-blur-md transition-all">
      {/* Brand & Story Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSceneSelector}
          className="group flex items-center gap-2.5 rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-mono text-[#e0d8d0] border border-white/10 hover:border-[#ff4e00]/60 hover:bg-white/10 transition-all shadow-xl shadow-black/60"
          title="Open Scene Map"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#ff4e00] group-hover:rotate-12 transition-transform" />
          <span className="tracking-wider">SCENE {String(currentSceneNumber).padStart(2, '0')} / {String(totalScenes).padStart(2, '0')}</span>
        </button>

        <div className="hidden sm:flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#e0d8d0]/50 font-sans">
            Memoir Collection
          </span>
          <h1 className="text-xs md:text-sm font-light tracking-tight text-[#e0d8d0] font-serif">
            A Story That Never Asked To Be Finished
          </h1>
        </div>
      </div>

      {/* Navigation & Play Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevScene}
          disabled={currentSceneNumber <= 1}
          className="rounded-full p-2 text-[#e0d8d0]/70 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
          title="Previous Scene (Left Arrow)"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          onClick={onTogglePlay}
          className={`flex items-center gap-2 rounded-sm px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-lg ${
            isPlaying 
              ? 'bg-[#ff4e00] text-white shadow-[#ff4e00]/30' 
              : 'bg-white text-black hover:bg-[#ff4e00] hover:text-white'
          }`}
          title={isPlaying ? "Pause Cinema Mode" : "Start Auto Cinema Mode"}
        >
          {isPlaying ? (
            <>
              <Pause className="h-3 w-3 fill-current" />
              <span className="hidden md:inline">Pause</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3 fill-current ml-0.5" />
              <span className="hidden md:inline">Cinema Play</span>
            </>
          )}
        </button>

        <button
          onClick={onNextScene}
          disabled={currentSceneNumber >= totalScenes}
          className="rounded-full p-2 text-[#e0d8d0]/70 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
          title="Next Scene (Right Arrow / Space)"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 md:gap-2">
        <button
          onClick={onOpenSceneSelector}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-[#e0d8d0]/80 hover:text-white hover:bg-white/10 transition-all"
          title="Scene Index & Gallery"
        >
          <Grid className="h-4 w-4 text-[#ff4e00]" />
          <span className="hidden lg:inline text-[11px] tracking-wider uppercase">Scenes</span>
        </button>

        <button
          onClick={onOpenReader}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-[#e0d8d0]/80 hover:text-white hover:bg-white/10 transition-all"
          title="Read Full Poem & Book View"
        >
          <BookOpen className="h-4 w-4 text-[#ff4e00]" />
          <span className="hidden lg:inline text-[11px] tracking-wider uppercase">Full Story</span>
        </button>

        <button
          onClick={onOpenQuoteCreator}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-[#e0d8d0]/80 hover:text-white hover:bg-white/10 transition-all"
          title="Create Poetry Quote Card"
        >
          <Share2 className="h-4 w-4 text-[#ff4e00]" />
          <span className="hidden lg:inline text-[11px] tracking-wider uppercase">Quote Card</span>
        </button>

        <button
          onClick={onToggleMute}
          className="rounded-lg p-2 text-[#e0d8d0]/80 hover:text-white hover:bg-white/10 transition-all"
          title={audioSettings.isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {audioSettings.isMuted ? (
            <VolumeX className="h-4 w-4 text-rose-400" />
          ) : (
            <Volume2 className="h-4 w-4 text-[#ff4e00]" />
          )}
        </button>

        <button
          onClick={onOpenSettings}
          className="rounded-lg p-2 text-[#e0d8d0]/80 hover:text-white hover:bg-white/10 transition-all"
          title="Display & Audio Settings"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>

        <button
          onClick={onToggleFullscreen}
          className="hidden sm:block rounded-lg p-2 text-[#e0d8d0]/80 hover:text-white hover:bg-white/10 transition-all"
          title="Toggle Fullscreen Mode"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};
