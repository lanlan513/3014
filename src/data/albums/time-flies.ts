import type { Album } from '../albums';

export const albumDetail: Album = {
    id: 'time-flies',
    title: 'Time Flies',
    artist: '陈奕迅',
    year: 2010,
    month: 3,
    coverEmoji: '⏰',
    coverColors: ['#e74c3c', '#f39c12'],
    primaryMood: 'regret',
    recordLabel: '新艺宝唱片',
    language: '粤语',
    totalTracks: 6,
    totalDuration: '22:15',
    tracks: [
      { id: 'tf-1', title: '无人之境', duration: '3:45' },
      { id: 'tf-2', title: '大人', duration: '3:32' },
      { id: 'tf-3', title: '一丝不挂', duration: '4:05' },
      { id: 'tf-4', title: '陀飞轮', duration: '3:58' },
      { id: 'tf-5', title: '心腹', duration: '3:28' },
      { id: 'tf-6', title: '味之素', duration: '3:27' },
    ],
    productionTeam: [
      { role: '制作人', name: '梁荣骏、郭伟亮' },
      { role: '作曲', name: '郭伟亮、Eric Kwok等' },
      { role: '作词', name: '林夕、黄伟文' },
      { role: '编曲', name: '郭伟亮、C.Y. Kong等' },
    ],
    backgroundStory:
      '《Time Flies》是陈奕迅2010年发行的粤语EP，专辑名称意为"时光飞逝"，表达了对时间流逝的感慨。这张EP收录了6首歌曲，由林夕和黄伟文两位顶级填词人各写三首，延续了《The Line-Up》的双词人对垒模式。《一丝不挂》由泽日生作曲、林夕作词，以精湛的歌词和动人的旋律，讲述了爱情中的纠葛与无奈，成为陈奕迅后期的经典之作。《陀飞轮》则由黄伟文作词，以名表为意象，讲述了人生的取舍与感悟。',
    criticalReception:
      '这张EP获得了压倒性的好评，被认为是陈奕迅最经典的EP之一。《一丝不挂》获得了2010年度叱咤乐坛流行榜颁奖典礼的专业推介叱咤十大歌曲奖等多个重要奖项。《陀飞轮》也获得了广泛好评，黄伟文的歌词被誉为"神来之笔"。整张EP在音乐品质上达到了极高水准，6首歌首首经典，被誉为"全主打"的优质作品。',
    funFacts: [
      '专辑名称"Time Flies"意为"时光飞逝"，表达了对时间的感慨',
      '《一丝不挂》的MV采用一镜到底的拍摄方式，难度极高',
      '《陀飞轮》是黄伟文"男人四部曲"的收官之作',
    ],
    relatedAlbumIds: ['taste-the-atmosphere', 'the-key'],
    eraNote: '2010年，Time Flies，陈奕迅用《一丝不挂》和《陀飞轮》再次征服了香港乐坛。',
  };
