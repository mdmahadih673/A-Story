import React, { useState, useCallback } from 'react';
import { SCENES } from './data/scenes';
import { Scene, AudioSettings, DisplaySettings } from './types';
import { HeaderControls } from './components/HeaderControls';
import { CinematicViewer } from './components/CinematicViewer';
import { SceneSelectorModal } from './components/SceneSelectorModal';
import { FullPoemReader } from './components/FullPoemReader';
import { QuoteCardCreator } from './components/QuoteCardCreator';
import { SettingsDrawer } from './components/SettingsDrawer';
import { AudioEngine } from './components/AudioEngine';

export default function App() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTextForTTS, setCurrentTextForTTS] = useState('');

  // Modals & Drawers state
  const [isSceneSelectorOpen, setIsSceneSelectorOpen] = useState(false);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [isQuoteCreatorOpen, setIsQuoteCreatorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Audio Settings
  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    masterVolume: 0.8,
    isMuted: false,
    ambientVolume: 0.7,
    enableTTS: false,
    ttsSpeed: 1.0
  });

  // Display Settings
  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>({
    fontStyle: 'serif',
    fontSizeMultiplier: 1.0,
    particleDensity: 'medium',
    autoPlayInterval: 5,
    showEnglishSubtitle: true,
    kenBurnsEffect: true
  });

  const currentScene = SCENES[currentSceneIndex] || SCENES[0];

  const handleNextScene = useCallback(() => {
    setCurrentSceneIndex((prev) => (prev < SCENES.length - 1 ? prev + 1 : 0));
  }, []);

  const handlePrevScene = useCallback(() => {
    setCurrentSceneIndex((prev) => (prev > 0 ? prev - 1 : SCENES.length - 1));
  }, []);

  const handleSelectScene = (selectedScene: Scene) => {
    const idx = SCENES.findIndex((s) => s.id === selectedScene.id);
    if (idx !== -1) {
      setCurrentSceneIndex(idx);
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0502] font-sans text-[#e0d8d0] overflow-hidden">
      {/* Navigation Top Control Bar */}
      <HeaderControls
        currentSceneNumber={currentScene.number}
        totalScenes={SCENES.length}
        isPlaying={isPlaying}
        audioSettings={audioSettings}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onPrevScene={handlePrevScene}
        onNextScene={handleNextScene}
        onOpenSceneSelector={() => setIsSceneSelectorOpen(true)}
        onOpenReader={() => setIsReaderOpen(true)}
        onOpenQuoteCreator={() => setIsQuoteCreatorOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleMute={() => setAudioSettings((prev) => ({ ...prev, isMuted: !prev.isMuted }))}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Main Full-Screen Cinematic Scene Canvas */}
      <CinematicViewer
        scene={currentScene}
        displaySettings={displaySettings}
        isPlaying={isPlaying}
        onNextScene={handleNextScene}
        onPrevScene={handlePrevScene}
        onSelectScene={handleSelectScene}
        onLineChange={(text) => setCurrentTextForTTS(text)}
      />

      {/* Web Audio & Bengali Voice Narration Engine */}
      <AudioEngine
        settings={audioSettings}
        ambientSoundType={currentScene.ambientSound}
        currentBengaliText={currentTextForTTS}
      />

      {/* Scene Map & Gallery Modal */}
      <SceneSelectorModal
        isOpen={isSceneSelectorOpen}
        currentSceneId={currentScene.id}
        onClose={() => setIsSceneSelectorOpen(false)}
        onSelectScene={handleSelectScene}
      />

      {/* Full Poem Book View */}
      <FullPoemReader
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
        onJumpToScene={handleSelectScene}
      />

      {/* Quote Card Creator */}
      <QuoteCardCreator
        isOpen={isQuoteCreatorOpen}
        currentScene={currentScene}
        onClose={() => setIsQuoteCreatorOpen(false)}
      />

      {/* Preferences & Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        displaySettings={displaySettings}
        audioSettings={audioSettings}
        onClose={() => setIsSettingsOpen(false)}
        onUpdateDisplay={(upd) => setDisplaySettings((prev) => ({ ...prev, ...upd }))}
        onUpdateAudio={(upd) => setAudioSettings((prev) => ({ ...prev, ...upd }))}
      />
    </div>
  );
}
