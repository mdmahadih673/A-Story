import { Scene } from '../types';

import imgVillage from '../assets/images/scene_golden_village_1784991756595.jpg';
import imgCampus from '../assets/images/scene_cherry_campus_1784991786610.jpg';
import imgStarlit from '../assets/images/scene_starlit_tree_1784991769431.jpg';
import imgRainy from '../assets/images/scene_rainy_street_1784991801422.jpg';
import imgFlower from '../assets/images/scene_flower_valley_1784991818957.jpg';

export const STORY_TITLE_ENGLISH = "A Story That Never Asked To Be Finished";
export const STORY_TITLE_BENGALI = "যে গল্প শেষ হতে চায়নি";
export const STORY_QUOTE = "Some people leave without staying. Some memories stay without leaving.";
export const STORY_QUOTE_BENGALI = "কিছু মানুষ থেকে যাওয়ার জন্য আসে না, কিছু স্মৃতি ছেড়ে যাওয়ার জন্য তৈরি হয় না।";

export const SCENES: Scene[] = [
  {
    id: 'scene-01',
    number: 1,
    titleEnglish: 'The Beginning',
    titleBengali: 'সূচনা',
    subtitle: 'Where Everything Quietly Started',
    theme: 'The beginning of an ordinary childhood that unknowingly became the start of an unforgettable memory.',
    mood: ['Warm', 'Peaceful', 'Innocent', 'Golden Hour', 'Hopeful'],
    visualPrompt: [
      'A breathtaking cinematic anime landscape during golden sunrise.',
      'A peaceful rural village surrounded by lush green fields.',
      'Morning mist floating gently over the grass.',
      'Golden sunlight filtering through enormous trees.',
      'A narrow village road disappearing into the horizon.',
      'Makoto Shinkai lighting & Studio Ghibli atmosphere.'
    ],
    textLines: [
      { id: '1-1', bengaliText: 'সব গল্পের শুরুটা খুব সাধারণ হয়।', englishTranslation: 'The start of every story is remarkably ordinary.' },
      { id: '1-2', bengaliText: 'আমার গল্পটাও তেমনই ছিল।', englishTranslation: 'My story was no different.' },
      { id: '1-3', bengaliText: 'তখন জানতাম না...', englishTranslation: 'Back then, I had no idea...' },
      { id: '1-4', bengaliText: 'একটা সাধারণ দিন', englishTranslation: 'That an unassuming, ordinary day' },
      { id: '1-5', bengaliText: 'একদিন সবচেয়ে সুন্দর স্মৃতি হয়ে যাবে।', englishTranslation: 'Would one day turn into my most cherished memory.' }
    ],
    image: imgVillage,
    particleType: 'golden_dust',
    ambientSound: 'morning_village',
    bgOverlayGradient: 'from-amber-950/40 via-amber-900/20 to-zinc-950/80'
  },
  {
    id: 'scene-02',
    number: 2,
    titleEnglish: 'The Glance',
    titleBengali: 'দৃষ্টির স্পর্শ',
    subtitle: 'The Moment That Changed Everything',
    theme: 'The first silent glance.',
    mood: ['Soft', 'Curious', 'Innocent', 'Romantic without romance'],
    visualPrompt: [
      'A premium anime school campus during late afternoon.',
      'Cherry blossom petals floating.',
      'A girl walking naturally in the distance.',
      'A boy standing far away.',
      'Neither looking directly at each other.',
      'Warm cinematic sunlight with soft lens flare.'
    ],
    textLines: [
      { id: '2-1', bengaliText: 'সেদিন কিছুই বদলায়নি।', englishTranslation: 'On that day, nothing really changed on the surface.' },
      { id: '2-2', bengaliText: 'শুধু...', englishTranslation: 'Except...' },
      { id: '2-3', bengaliText: 'আমি একজন মানুষকে', englishTranslation: 'I began looking at one particular person' },
      { id: '2-4', bengaliText: 'অন্যরকমভাবে দেখতে শুরু করেছিলাম।', englishTranslation: 'In a completely different light.' }
    ],
    image: imgCampus,
    particleType: 'cherry_blossoms',
    ambientSound: 'school_breeze',
    bgOverlayGradient: 'from-rose-950/40 via-pink-900/20 to-zinc-950/80'
  },
  {
    id: 'scene-03',
    number: 3,
    titleEnglish: 'The Innocent Days',
    titleBengali: 'সহজ দিনগুলো',
    subtitle: 'When Every Moment Felt Ordinary',
    theme: 'Childhood memories.',
    mood: ['Cute', 'Nostalgic', 'Warm'],
    visualPrompt: [
      'Children walking home along a village road in evening sunlight.',
      'Playground, books, bicycles, flying birds, wildflowers.',
      'Soft painterly style with a warm sunset color palette.'
    ],
    textLines: [
      { id: '3-1', bengaliText: 'ছোটবেলায়', englishTranslation: 'During childhood' },
      { id: '3-2', bengaliText: 'কিছু মুহূর্তকে', englishTranslation: 'Certain fleeting moments' },
      { id: '3-3', bengaliText: 'আমরা কখনো বিশেষ মনে করি না।', englishTranslation: 'We never stop to think of as special.' },
      { id: '3-4', bengaliText: 'বহু বছর পরে', englishTranslation: 'Yet decades later' },
      { id: '3-5', bengaliText: 'সেগুলোই সবচেয়ে মূল্যবান হয়ে যায়।', englishTranslation: 'Those very moments become priceless treasures.' }
    ],
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop',
    particleType: 'sun_dapples',
    ambientSound: 'childhood_sunset',
    bgOverlayGradient: 'from-orange-950/40 via-amber-900/20 to-zinc-950/80'
  },
  {
    id: 'scene-04',
    number: 4,
    titleEnglish: 'Growing Apart',
    titleBengali: 'দূরে সরে যাওয়া',
    subtitle: 'Time Never Asked For Permission',
    theme: 'Growing older.',
    mood: ['Quiet', 'Reflective', 'Emotional'],
    visualPrompt: [
      'Changing seasons: rain, autumn, winter, spring.',
      'Roads becoming longer, familiar village feeling unfamiliar.',
      'Moving clouds over a bittersweet sunset.'
    ],
    textLines: [
      { id: '4-1', bengaliText: 'সময়', englishTranslation: 'Time' },
      { id: '4-2', bengaliText: 'নিজের মতো করে', englishTranslation: 'In its unyielding rhythm' },
      { id: '4-3', bengaliText: 'সবকিছু বদলে দেয়।', englishTranslation: 'Quietly changes everything.' },
      { id: '4-4', bengaliText: 'কিন্তু...', englishTranslation: 'And yet...' },
      { id: '4-5', bengaliText: 'সব অনুভূতি বদলায় না।', englishTranslation: 'Not every feeling fades away.' }
    ],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop',
    particleType: 'autumn_leaves',
    ambientSound: 'autumn_wind',
    bgOverlayGradient: 'from-yellow-950/40 via-amber-950/20 to-zinc-950/85'
  },
  {
    id: 'scene-05',
    number: 5,
    titleEnglish: 'The Wait',
    titleBengali: 'প্রতীক্ষা',
    subtitle: 'Hope Stayed Longer Than Time',
    theme: 'Waiting without expectation.',
    mood: ['Lonely', 'Peaceful', 'Hopeful'],
    visualPrompt: [
      'A huge tree at blue hour under a purple starry sky with fireflies.',
      'A lonely boy sitting quietly under the canopy.',
      'Swaying tall grass, gentle night breeze, moonlight.'
    ],
    textLines: [
      { id: '5-1', bengaliText: 'অনেকবার গিয়েছি।', englishTranslation: 'I returned to that place countless times.' },
      { id: '5-2', bengaliText: 'কিছু পাওয়ার জন্য নয়।', englishTranslation: 'Not expecting to gain anything back.' },
      { id: '5-3', bengaliText: 'শুধু...', englishTranslation: 'Only...' },
      { id: '5-4', bengaliText: 'হয়তো আজ দেখা হবে।', englishTranslation: 'Hoping that maybe, just maybe, today our paths would cross.' }
    ],
    image: imgStarlit,
    particleType: 'fireflies_stars',
    ambientSound: 'starlit_night',
    bgOverlayGradient: 'from-indigo-950/50 via-purple-950/30 to-zinc-950/90'
  },
  {
    id: 'scene-06',
    number: 6,
    titleEnglish: 'One Message',
    titleBengali: 'একটি বার্তা',
    subtitle: 'The Words I Could No Longer Hide',
    theme: 'The confession.',
    mood: ['Nervous', 'Quiet', 'Honest'],
    visualPrompt: [
      'Nighttime study desk, warm lamp, phone screen glowing.',
      'Raindrops on window glass, coffee cup, open notebook.'
    ],
    textLines: [
      { id: '6-1', bengaliText: 'অনেক বছরের সাহস', englishTranslation: 'Courage built up over years' },
      { id: '6-2', bengaliText: 'একদিন', englishTranslation: 'One quiet evening' },
      { id: '6-3', bengaliText: 'কয়েকটা শব্দ হয়ে গেল।', englishTranslation: 'Condensed into a few unsent words.' }
    ],
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1920&auto=format&fit=crop',
    particleType: 'cozy_rain',
    ambientSound: 'rainy_desk',
    bgOverlayGradient: 'from-blue-950/50 via-slate-900/30 to-zinc-950/90'
  },
  {
    id: 'scene-07',
    number: 7,
    titleEnglish: 'The Silence',
    titleBengali: 'নীরবতা',
    subtitle: 'Some Answers Never Need Words',
    theme: 'Acceptance.',
    mood: ['Calm', 'Mature', 'Peaceful'],
    visualPrompt: [
      'Rainy empty road at night with street light reflections on wet pavement.',
      'Soft fog, quiet atmosphere, cinematic mood.'
    ],
    textLines: [
      { id: '7-1', bengaliText: 'সব উত্তর', englishTranslation: 'Not every answer' },
      { id: '7-2', bengaliText: 'শব্দ দিয়ে আসে না।', englishTranslation: 'Needs to be spoken in words.' },
      { id: '7-3', bengaliText: 'কিছু উত্তর', englishTranslation: 'Some of life’s deepest answers' },
      { id: '7-4', bengaliText: 'নীরবতাও দিয়ে দেয়।', englishTranslation: 'Are given gently through silence.' }
    ],
    image: imgRainy,
    particleType: 'mist_rain',
    ambientSound: 'rainy_street',
    bgOverlayGradient: 'from-slate-950/60 via-cyan-950/30 to-zinc-950/90'
  },
  {
    id: 'scene-08',
    number: 8,
    titleEnglish: 'The Bloom',
    titleBengali: 'ফুল ও গল্প',
    subtitle: 'Not Every Flower Is Meant To Be Picked',
    theme: 'Acceptance & Beauty.',
    mood: ['Beautiful', 'Hopeful', 'Peaceful'],
    visualPrompt: [
      'Massive flower valley at golden sunrise with morning fog.',
      'Butterflies dancing, volumetric god rays, dreamlike bloom.'
    ],
    textLines: [
      { id: '8-1', bengaliText: 'সব গল্প', englishTranslation: 'Not every story' },
      { id: '8-2', bengaliText: 'একসাথে শেষ হয় না।', englishTranslation: 'Reaches a shared happily ever after.' },
      { id: '8-3', bengaliText: 'তবুও...', englishTranslation: 'And yet...' },
      { id: '8-4', bengaliText: 'সব গল্প', englishTranslation: 'Every story remains' },
      { id: '8-5', bengaliText: 'অমূল্য হয়ে থাকে।', englishTranslation: 'An irreplaceable work of art.' }
    ],
    image: imgFlower,
    particleType: 'flower_petals',
    ambientSound: 'flower_valley',
    bgOverlayGradient: 'from-emerald-950/40 via-teal-950/20 to-zinc-950/85'
  },
  {
    id: 'scene-09',
    number: 9,
    titleEnglish: 'The Letter',
    titleBengali: 'অনুপস্থিত চিঠি',
    subtitle: 'A Page That Was Never Sent',
    theme: 'Final letter.',
    mood: ['Emotional', 'Honest', 'Mature'],
    visualPrompt: [
      'Old wooden table, vintage paper with wax seal, candle light.',
      'Dust particles in warm ambient glow, typewriter vibe.'
    ],
    textLines: [
      { id: '9-1', bengaliText: 'কিছু কথা', englishTranslation: 'Certain feelings' },
      { id: '9-2', bengaliText: 'বলতে হয় না।', englishTranslation: 'Never need to be spoken aloud.' },
      { id: '9-3', bengaliText: 'লিখে রাখলেই যথেষ্ট।', englishTranslation: 'Leaving them written on paper is more than enough.' }
    ],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920&auto=format&fit=crop',
    particleType: 'candle_embers',
    ambientSound: 'candle_room',
    bgOverlayGradient: 'from-amber-950/60 via-stone-900/40 to-zinc-950/95'
  },
  {
    id: 'scene-10',
    number: 10,
    titleEnglish: 'The Memory',
    titleBengali: 'চিরন্তন স্মৃতি',
    subtitle: 'Some Stories Never Really End',
    theme: 'Ending, Gratitude, Closure.',
    mood: ['Peace', 'Gratitude', 'Closure'],
    visualPrompt: [
      'A giant solitary tree on a hill under a starry cosmic sky.',
      'Countless glowing stars, fireflies, gentle breeze fading into black.'
    ],
    textLines: [
      { id: '10-1', bengaliText: 'কিছু মানুষ', englishTranslation: 'Some people' },
      { id: '10-2', bengaliText: 'থেকে যাওয়ার জন্য আসে না।', englishTranslation: 'Do not cross our paths to stay forever.' },
      { id: '10-3', bengaliText: 'তারা আসে...', englishTranslation: 'They enter our lives...' },
      { id: '10-4', bengaliText: 'আমাদের জীবনের', englishTranslation: 'To become one of' },
      { id: '10-5', bengaliText: 'সবচেয়ে সুন্দর স্মৃতিগুলোর', englishTranslation: 'The most breathtaking memories' },
      { id: '10-6', bengaliText: 'একটা হয়ে থাকার জন্য।', englishTranslation: 'That we hold onto for a lifetime.' },
      { id: '10-7', bengaliText: '— The End', englishTranslation: '— সমাপ্ত' }
    ],
    image: imgStarlit,
    particleType: 'cosmic_stardust',
    ambientSound: 'cosmic_silence',
    bgOverlayGradient: 'from-slate-950/80 via-purple-950/50 to-black'
  }
];
