import type { Album } from '../albums';

export const albumDetail: Album = {
    id: 'the-line-up',
    title: 'The Line-Up',
    artist: '陈奕迅',
    year: 2002,
    month: 7,
    coverEmoji: '📖',
    coverColors: ['#5c3d2e', '#a0522d'],
    primaryMood: 'lonely',
    recordLabel: '英皇娱乐',
    language: '粤语',
    totalTracks: 10,
    totalDuration: '39:45',
    tracks: [
      { id: 't-1', title: '明年今日', duration: '3:25' },
      { id: 't-2', title: '防不胜防', duration: '4:25' },
      { id: 't-3', title: '大浪漫主义', duration: '3:42' },
      { id: 't-4', title: '黑面', duration: '3:38' },
      { id: 't-5', title: '小孩', duration: '4:05' },
      { id: 't-6', title: '没有', duration: '3:52' },
      { id: 't-7', title: '心里有鬼', duration: '3:58' },
      { id: 't-8', title: '季军', duration: '4:12' },
      { id: 't-9', title: '1874', duration: '3:35' },
      { id: 't-10', title: '一疋布', duration: '3:13' },
    ],
    productionTeam: [
      { role: '制作人', name: '陈辉阳、林夕' },
      { role: '作曲', name: '陈小霞、张继聪、陈辉阳等' },
      { role: '作词', name: '林夕、黄伟文' },
      { role: '编曲', name: '陈辉阳、刘诺生等' },
    ],
    backgroundStory:
      '《The Line-Up》是陈奕迅2002年发行的粤语专辑，专辑名称意为"阵容"，意指这张专辑集结了香港乐坛最顶级的创作阵容。这张专辑最大的特色是林夕和黄伟文两位顶级填词人各写五首歌，形成了一场精彩的"歌词对决"。专辑中的《明年今日》由陈小霞作曲、林夕作词，以深刻的情感和动人的旋律，成为陈奕迅最具代表性的作品之一。而黄伟文创作的《防不胜防》则是他"病态三部曲"的第二部，以独特的视角描绘了暗恋的极致状态。',
    criticalReception:
      '这张专辑被认为是陈奕迅音乐生涯的巅峰之作之一，无论是词曲创作还是演唱表现都达到了极高水准。《明年今日》获得了2002年度香港十大劲歌金曲奖等多个重要奖项，其国语版《十年》更是红遍两岸三地，成为国民级神曲。评论家认为，这张专辑充分展现了陈奕迅对不同风格歌曲的驾驭能力，无论是深情的情歌还是另类的作品，他都能演绎得淋漓尽致。',
    funFacts: [
      '专辑名称"The Line-Up"暗示林夕和黄伟文两大词人的"对阵"，各写五首歌',
      '《防不胜防》是黄伟文"病态三部曲"的第二部，前作是《打回原形》',
      '《明年今日》后来被翻唱成国语版《十年》，让陈奕迅红遍整个华语乐坛',
    ],
    relatedAlbumIds: ['shall-we-dance', 'h3m'],
    eraNote: '2002年，陈奕迅用《The Line-Up》证明了自己的实力，也留下了无数经典。',
  };
