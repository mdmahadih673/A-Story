export type ParticleType = 
  | 'golden_dust' 
  | 'cherry_blossoms' 
  | 'sun_dapples' 
  | 'autumn_leaves' 
  | 'fireflies_stars' 
  | 'cozy_rain' 
  | 'mist_rain' 
  | 'flower_petals' 
  | 'candle_embers' 
  | 'cosmic_stardust';

export type FontStyle = 'serif' | 'sans' | 'calligraphy';

export interface PoetryLine {
  id: string;
  bengaliText: string;
  englishTranslation?: string;
}

export interface Scene {
  id: string;
  number: number;
  titleEnglish: string;
  titleBengali: string;
  subtitle: string;
  theme: string;
  mood: string[];
  visualPrompt: string[];
  textLines: PoetryLine[];
  image: string;
  particleType: ParticleType;
  ambientSound: 'morning_village' | 'school_breeze' | 'childhood_sunset' | 'autumn_wind' | 'starlit_night' | 'rainy_desk' | 'rainy_street' | 'flower_valley' | 'candle_room' | 'cosmic_silence';
  bgOverlayGradient: string;
}

export interface AudioSettings {
  masterVolume: number; // 0 to 1
  isMuted: boolean;
  ambientVolume: number;
  enableTTS: boolean;
  ttsSpeed: number; // 0.8 to 1.2
}

export interface DisplaySettings {
  fontStyle: FontStyle;
  fontSizeMultiplier: number; // 0.9 to 1.3
  particleDensity: 'off' | 'low' | 'medium' | 'high';
  autoPlayInterval: number; // seconds per line
  showEnglishSubtitle: boolean;
  kenBurnsEffect: boolean;
}
