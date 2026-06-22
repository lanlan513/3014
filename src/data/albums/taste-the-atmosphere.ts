import type { Album } from '../albums';

export const albumDetail: Album = {
    id: 'taste-the-atmosphere',
    title: 'Taste the Atmosphere',
    artist: '陈奕迅',
    year: 2010,
    month: 10,
    coverEmoji: '🌫️',
    coverColors: ['#2c3e50', '#95a5a6'],
    primaryMood: 'lonely',
    recordLabel: '新艺宝唱片',
    language: '粤语',
    totalTracks: 6,
    totalDuration: '23:40',
    tracks: [
      { id: 'ta-1', title: 'Welcome to the Future', duration: '4:12' },
      { id: 'ta-2', title: '讲男讲女', duration: '3:58' },
      { id: 'ta-3', title: '叶问风中转', duration: '4:05' },
      { id: 'ta-4', title: '花花世界', duration: '3:52' },
      { id: 'ta-5', title: '我杯茶', duration: '3:45' },
      { id: 'ta-6', title: '超错', duration: '3:48' },
    ],
    productionTeam: [
      { role: '制作人', name: '苏永康、C.Y. Kong' },
      { role: '作曲', name: 'C.Y. Kong、郭伟亮等' },
      { role: '作词', name: '林敏骢、林夕等' },
      { role: '编曲', name: 'C.Y. Kong、刘志远等' },
    ],
    backgroundStory:
      '《Taste the Atmosphere》是陈奕迅2010年发行的第二张粤语EP，专辑名称意为"品味氛围"，展现了陈奕迅对不同音乐氛围的探索。这张EP在音乐风格上更加多元和前卫，融合了电子、摇滚等多种元素。《讲男讲女》由陈奕迅与露云娜合唱，以轻松幽默的方式探讨了男女关系，创意十足。《叶问风中转》则以叶问为主题，融合了中国功夫元素，展现了陈奕迅的搞怪一面。',
    criticalReception:
      '这张EP获得了广泛好评，评论家认为陈奕迅在音乐上的探索和突破值得肯定。虽然商业成绩不如《Time Flies》亮眼，但在音乐性上有很多创新和尝试。《讲男讲女》的对唱形式和《叶问风中转》的搞怪风格，都展现了陈奕迅音乐的多样性。',
    funFacts: [
      '专辑名称"Taste the Atmosphere"意为"品味氛围"，是对音乐氛围的探索',
      '《讲男讲女》是陈奕迅与露云娜的经典合唱',
      '《叶问风中转》的MV中陈奕迅一人分饰多角，展现了他的演技',
    ],
    relatedAlbumIds: ['time-flies', 'stranger-under-skin'],
    eraNote: '2010年，Taste the Atmosphere，陈奕迅用音乐带我们品味不同的氛围。',
  };
