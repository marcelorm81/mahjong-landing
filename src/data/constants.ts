export const NAV_SECTIONS = [
  { id: 'hero', label: 'HOME' },
  { id: 'features', label: 'FEATURES' },
  { id: 'game', label: 'GAME' },
  { id: 'characters', label: 'CHARACTER' },
  { id: 'download', label: 'DOWNLOAD' },
] as const

export interface Character {
  name: string
  quote: string
  desc: string
  img: string
  videoWebm: string
  videoMp4: string
}

export const CHARACTERS: Character[] = [
  {
    name: 'Tony Kong',
    quote: '"I don\'t chase Luck. I create it."',
    desc: 'Confident. Calculated. Already read your hand. Turns bad tiles into winning moves. Every. Single. Time.',
    img: '/img/Tony_2586.webp',
    videoWebm: '/video/tony.webm',
    videoMp4: '/video/tony.mp4',
  },
  {
    name: 'Bubble Tea Girl',
    quote: '"Watch closely \u2014 you might miss it."',
    desc: 'Bright. Bold. Lightning fast. Turns every match into a show. Plays with style, confidence, and just enough chaos to keep you guessing.',
    img: '/img/Bubble_2585.webp',
    videoWebm: '/video/bubbletea.webm',
    videoMp4: '/video/bubbletea.mp4',
  },
  {
    name: 'Mrs Cheng',
    quote: '"Let me show you how it\'s really done."',
    desc: 'Decades of experience. Nerves of steel. Plays the long game \u2014 and she always finishes it. Don\'t let the silence fool you.',
    img: '/img/Granny_2583.webp',
    videoWebm: '/video/granny.webm',
    videoMp4: '/video/granny.mp4',
  },
  {
    name: '\u201cBusy\u201dness Man',
    quote: '"I don\'t have time for this. Wait\u2026 one more round."',
    desc: 'Busy. Stressed. Somehow still winning. Briefcase in one hand, phone in the other. Always late. Never loses.',
    img: '/img/executive_2584.webp',
    videoWebm: '/video/executive.webm',
    videoMp4: '/video/executive.mp4',
  },
]

export interface GameMode {
  name: string
  desc: string
  img: string
}

export const GAME_MODES: GameMode[] = [
  { name: 'Bang Bang Mahjong', desc: "Fast. Loud. No time to think. That's the point.", img: '/img/tablephone1.webp' },
  { name: 'Riichi Mahjong', desc: "Looks simple. It's not. Welcome to the deep end.", img: '/img/tablephone2.webp' },
]

export interface Feature {
  title: string
  desc: string
  image: string
  isAI?: boolean
  aiGlowImage?: string
}

export const FEATURES: Feature[] = [
  { title: 'Play Your Way', desc: 'Ranked, casual, or practice.<br/>Your pace, your rules.', image: '/img/win.webp' },
  { title: 'Smart AI', desc: 'AI that learns how you play.<br/>Train, improve, level up.', image: '/img/AI_off.webp', isAI: true, aiGlowImage: '/img/AI.webp' },
  { title: 'Collect Them All', desc: 'Characters. Styles. Flex on friends. Repeat.', image: '/img/grannytreasure.webp' },
  { title: 'Social Play', desc: 'Invite friends or rivals. Mahjong is better shared.', image: '/img/selfie.webp' },
]

export const TILE_FACE_IMAGES = [
  '/img/tiles/dragon.jpg',
  '/img/tiles/greendragon.jpg',
  '/img/tiles/bamboo.jpg',
  '/img/tiles/dot.jpg',
  '/img/tiles/5dots.jpg',
  '/img/tiles/typecharac.jpg',
]

export const GAME_URL = 'https://game.mstardev.com/login'
export const LOGO_URL = 'https://web.mstardev.com/images/Logo.png'
export const BG_PATTERN_URL = 'https://web.mstardev.com/images/bg/bg_pattern_v2.png'
export const CHARACTER_OVERLAY_URL = 'https://web.mstardev.com/images/bg/Character_overlay.png'
export const CHARACTER_BG_URL = 'https://web.mstardev.com/images/bg/Character_bg_v3.png'
