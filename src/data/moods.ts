export type MoodId = 'lonely' | 'regret' | 'reunion' | 'growth';

export interface Mood {
  id: MoodId;
  name: string;
  description: string;
  neonColor: string;
  neonTextClass: string;
  neonBorderClass: string;
  bgGradient: string;
  emoji: string;
  quote: string;
}

export const moods: Mood[] = [
  {
    id: 'lonely',
    name: '孤独',
    description: '一个人的深夜，城市灯火阑珊处',
    neonColor: '#4ecdc4',
    neonTextClass: 'text-neon-cyan',
    neonBorderClass: 'border-neon-cyan',
    bgGradient: 'from-cyan-900/20 via-night-300 to-night-400',
    emoji: '🌙',
    quote: '我来到你的城市，走过你来时的路',
  },
  {
    id: 'regret',
    name: '遗憾',
    description: '那些年错过的大雨，那些年错过的爱情',
    neonColor: '#ff6b9d',
    neonTextClass: 'text-neon-pink',
    neonBorderClass: 'border-neon-pink',
    bgGradient: 'from-pink-900/20 via-night-300 to-night-400',
    emoji: '🥀',
    quote: '来年陌生的，是昨日最亲的某某',
  },
  {
    id: 'reunion',
    name: '重逢',
    description: '好久不见，你是否还记得那个夏天',
    neonColor: '#f4c542',
    neonTextClass: 'text-neon-warm',
    neonBorderClass: 'border-neon-warm',
    bgGradient: 'from-yellow-900/20 via-night-300 to-night-400',
    emoji: '🌸',
    quote: '十年之后，我们是朋友，还可以问候',
  },
  {
    id: 'growth',
    name: '成长',
    description: '岁月如歌，你我都在时光里慢慢长大',
    neonColor: '#a855f7',
    neonTextClass: 'text-neon-purple',
    neonBorderClass: 'border-neon-purple',
    bgGradient: 'from-purple-900/20 via-night-300 to-night-400',
    emoji: '🌿',
    quote: '曾梦想仗剑走天涯，看一看世界的繁华',
  },
];

export const getMoodById = (id: MoodId): Mood | undefined => {
  return moods.find((m) => m.id === id);
};
