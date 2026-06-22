import type { MoodId } from './moods';
import type { Record as MusicRecord } from './records';
import { records } from './records';

export type MusicStyle =
  | 'Cantopop'
  | 'Mandopop'
  | 'Ballad'
  | 'Rock'
  | 'R&B'
  | 'Electronic'
  | 'Jazz'
  | 'Orchestral'
  | 'Acoustic'
  | 'Folk'
  | 'Pop';

export type SongTheme =
  | '失恋'
  | '暗恋'
  | '热恋'
  | '友情'
  | '亲情'
  | '孤独'
  | '成长'
  | '怀旧'
  | '遗憾'
  | '释然'
  | '励志'
  | '社会观察'
  | '思念'
  | '自由'
  | '自我认同';

export interface SongDetail {
  id: string;
  title: string;
  artist: string;
  year: number;
  album: string;
  mood: MoodId;
  style: MusicStyle[];
  themes: SongTheme[];
  lyricist: string;
  composer: string;
  arranger?: string;
  producer?: string;
  coverEmoji: string;
  coverColors: [string, string];
  language: '粤语' | '国语';
  duration: string;
  tags: string[];
  story: string;
  lyricQuote: string;
  recommended?: boolean;
}

export interface GraphNode {
  id: string;
  type: 'song' | 'lyricist' | 'composer' | 'album' | 'style' | 'theme';
  name: string;
  color: string;
  size: number;
  x?: number;
  y?: number;
  relatedSongIds?: string[];
}

export interface GraphEdge {
  source: string;
  target: string;
  type: string;
  weight: number;
}

export const songDetails: SongDetail[] = [
  {
    id: 'fu-shi',
    title: '富士山下',
    artist: '陈奕迅',
    year: 2006,
    album: "What's Going On...?",
    mood: 'lonely',
    style: ['Cantopop', 'Ballad'],
    themes: ['失恋', '释然', '思念'],
    lyricist: '林夕',
    composer: '泽日生',
    arranger: '陈珀',
    producer: '梁荣骏',
    coverEmoji: '🗻',
    coverColors: ['#1e3a5f', '#4a90a4'],
    language: '粤语',
    duration: '4:21',
    tags: ['林夕', '泽日生', '粤语经典'],
    story: '东京的冬天总是来得特别早。你站在富士山下，看着雪一片一片落在肩上，忽然明白有些感情就像这雪景——美得让人心碎，却握不住、留不下。',
    lyricQuote: '谁能凭爱意要富士山私有',
    recommended: true,
  },
  {
    id: 'hao-jiu',
    title: '好久不见',
    artist: '陈奕迅',
    year: 2007,
    album: '认了吧',
    mood: 'lonely',
    style: ['Mandopop', 'Ballad'],
    themes: ['思念', '失恋', '怀旧'],
    lyricist: '施立',
    composer: '陈小霞',
    arranger: '刘志远',
    producer: '陈小霞',
    coverEmoji: '☕',
    coverColors: ['#3d2817', '#8b5a3c'],
    language: '国语',
    duration: '4:05',
    tags: ['国语', '施立', '陈小霞'],
    story: '你会不会忽然的出现，在街角的咖啡店？你无数次走过那条街，每次都下意识地往靠窗的位置看。',
    lyricQuote: '我来到你的城市，走过你来时的路',
    recommended: true,
  },
  {
    id: 'guo-lai',
    title: '不如不见',
    artist: '陈奕迅',
    year: 2006,
    album: "What's Going On...?",
    mood: 'lonely',
    style: ['Cantopop', 'Ballad'],
    themes: ['遗憾', '思念', '怀旧'],
    lyricist: '林夕',
    composer: '陈小霞',
    arranger: '刘志远',
    coverEmoji: '🌧️',
    coverColors: ['#2c3e50', '#606c76'],
    language: '粤语',
    duration: '4:48',
    tags: ['林夕', '陈小霞', '粤语'],
    story: '越渴望见面然后发现，中间隔著那十年。原来想见的是记忆里的那个人，而不是眼前这个被岁月改变了的陌生人。',
    lyricQuote: '越渴望见面然后发现，中间隔著那十年',
  },
  {
    id: 'zhong-xie',
    title: '防不胜防',
    artist: '陈奕迅',
    year: 2002,
    album: 'The Line-Up',
    mood: 'lonely',
    style: ['Cantopop', 'Ballad'],
    themes: ['暗恋', '孤独'],
    lyricist: '黄伟文',
    composer: '张继聪',
    arranger: '刘志远',
    coverEmoji: '📖',
    coverColors: ['#5c3d2e', '#a0522d'],
    language: '粤语',
    duration: '4:25',
    tags: ['黄伟文', '张继聪', '病态三部曲'],
    story: '你偷偷帮她付了电费，在她书架上放了一本你最喜欢的小说，趁她不在的时候去帮她浇花。你做了那么多她不知道的事。',
    lyricQuote: '从你工作间带走废纸是我，照着你的笔迹写封信给我',
  },
  {
    id: 'ye-lai',
    title: '一个灵魂的独白',
    artist: '陈奕迅',
    year: 2017,
    album: "C'mon In~",
    mood: 'lonely',
    style: ['Mandopop', 'Ballad', 'Acoustic'],
    themes: ['孤独', '自我认同'],
    lyricist: '陈咏谦',
    composer: 'C.Y.Kong',
    coverEmoji: '🌃',
    coverColors: ['#1a1423', '#4a3f6b'],
    language: '国语',
    duration: '3:58',
    tags: ['国语', '陈咏谦'],
    story: '凌晨三点，你对着镜子里的自己说话。那些白天不能讲的话，你只能说给自己听。',
    lyricQuote: '若你喜欢怪人，其实我很美',
  },
  {
    id: 'kong',
    title: '孤独患者',
    artist: '陈奕迅',
    year: 2011,
    album: '?',
    mood: 'lonely',
    style: ['Mandopop', 'Ballad'],
    themes: ['孤独', '自我认同', '社会观察'],
    lyricist: '小霞',
    composer: '小霞',
    coverEmoji: '🎭',
    coverColors: ['#2a1a2a', '#6b3a5a'],
    language: '国语',
    duration: '4:32',
    tags: ['国语', '小霞', '社会共鸣'],
    story: '你是派对上笑得最大声的那个人，可是回到家关上门的那一刻，你像被扎破的气球。',
    lyricQuote: '我不唱声嘶力竭的情歌，不表示没有心碎的时刻',
    recommended: true,
  },
  {
    id: 'shi-nian',
    title: '十年',
    artist: '陈奕迅',
    year: 2003,
    album: '黑白灰',
    mood: 'regret',
    style: ['Mandopop', 'Ballad'],
    themes: ['遗憾', '失恋', '怀旧'],
    lyricist: '林夕',
    composer: '陈小霞',
    arranger: '刘志远',
    coverEmoji: '⏳',
    coverColors: ['#333333', '#666666'],
    language: '国语',
    duration: '3:25',
    tags: ['陈小霞', '林夕', '国民神曲'],
    story: '十年前你们在大学食堂的同一张桌子上吃饭，十年后你们在超市偶遇，礼貌地打招呼，像两个普通的老朋友。',
    lyricQuote: '十年之后，我们是朋友，还可以问候',
    recommended: true,
  },
  {
    id: 'ming-xi',
    title: '明年今日',
    artist: '陈奕迅',
    year: 2002,
    album: 'The Line-Up',
    mood: 'regret',
    style: ['Cantopop', 'Ballad'],
    themes: ['遗憾', '失恋'],
    lyricist: '林夕',
    composer: '陈小霞',
    arranger: '刘志远',
    coverEmoji: '🕰️',
    coverColors: ['#4a3728', '#7a5230'],
    language: '粤语',
    duration: '3:25',
    tags: ['粤语', '陈小霞', '林夕'],
    story: '分手的那天晚上，你在沙发上坐了一整夜，手机屏幕亮了又暗。你删掉了她的号码，却记得每一位数字。',
    lyricQuote: '在有生的瞬间能遇到你，竟花光所有运气',
  },
  {
    id: 'zui-hao',
    title: '最佳损友',
    artist: '陈奕迅',
    year: 2006,
    album: 'Life Continues...',
    mood: 'regret',
    style: ['Cantopop', 'Ballad'],
    themes: ['友情', '遗憾', '怀旧'],
    lyricist: '黄伟文',
    composer: 'Eric Kwok',
    arranger: '刘志远',
    coverEmoji: '🍻',
    coverColors: ['#8b4513', '#cd853f'],
    language: '粤语',
    duration: '3:55',
    tags: ['黄伟文', 'Eric Kwok', '友情'],
    story: '那年你们一起逃课去看海，勾着手指说要做一辈子的兄弟。后来因为一次误会，你们断了联系。',
    lyricQuote: '来年陌生的，是昨日最亲的某某',
    recommended: true,
  },
  {
    id: 'chang-an',
    title: '爱情转移',
    artist: '陈奕迅',
    year: 2007,
    album: '认了吧',
    mood: 'regret',
    style: ['Mandopop', 'Ballad', 'Orchestral'],
    themes: ['遗憾', '失恋', '成长'],
    lyricist: '林夕',
    composer: '泽日生',
    arranger: '陈珀',
    coverEmoji: '📱',
    coverColors: ['#1f2937', '#4b5563'],
    language: '国语',
    duration: '4:30',
    tags: ['林夕', '泽日生', '电影主题曲'],
    story: '你换过几个恋人，搬过几次家，删除过几次聊天记录。爱情从来不是替换品，而是一次次带着伤疤的成长。',
    lyricQuote: '把一个人的温暖，转移到另一个的胸膛',
  },
  {
    id: 'qi-xiao',
    title: '七百年后',
    artist: '陈奕迅',
    year: 2009,
    album: 'H3M',
    mood: 'regret',
    style: ['Cantopop', 'Rock', 'Orchestral'],
    themes: ['遗憾', '思念'],
    lyricist: '林若宁',
    composer: '柳重言',
    coverEmoji: '🚀',
    coverColors: ['#0f172a', '#334155'],
    language: '粤语',
    duration: '4:38',
    tags: ['林若宁', '柳重言'],
    story: '如果七百年后人类可以穿越时空，你第一件事会做什么？勇敢一点，去牵她的手。',
    lyricQuote: '文明能压碎，情怀不衰，无论枯干山水',
  },
  {
    id: 'wan-hui',
    title: '当这地球没有花',
    artist: '陈奕迅',
    year: 2000,
    album: 'Nothing Really Matters',
    mood: 'reunion',
    style: ['Cantopop', 'Ballad'],
    themes: ['热恋', '思念'],
    lyricist: '林夕',
    composer: 'Eric Kwok',
    coverEmoji: '🌼',
    coverColors: ['#166534', '#4ade80'],
    language: '粤语',
    duration: '4:05',
    tags: ['林夕', 'Eric Kwok'],
    story: '分开的第五年，你们在朋友的婚礼上遇见。有些人即使隔了万水千山，再见时还是会心动。',
    lyricQuote: '当赤道留住雪花，眼泪融掉细沙，你肯珍惜我吗',
    recommended: true,
  },
  {
    id: 'hao-dan',
    title: '单车',
    artist: '陈奕迅',
    year: 2001,
    album: 'Shall We Dance? Shall We Talk!',
    mood: 'reunion',
    style: ['Cantopop', 'Folk', 'Ballad'],
    themes: ['亲情', '成长', '怀旧'],
    lyricist: '黄伟文',
    composer: '柳重言',
    coverEmoji: '🚲',
    coverColors: ['#15803d', '#86efac'],
    language: '粤语',
    duration: '3:31',
    tags: ['黄伟文', '柳重言', '亲情'],
    story: '你很久没坐过父亲的单车了。现在父亲的头发白了，你提议载他去兜兜风。那一刻，你们的角色好像互换了。',
    lyricQuote: '难离难舍想抱紧些，茫茫人生好象荒野',
    recommended: true,
  },
  {
    id: 'kuai-le',
    title: '与我常在',
    artist: '陈奕迅',
    year: 1997,
    album: '与我常在',
    mood: 'reunion',
    style: ['Cantopop', 'Ballad'],
    themes: ['热恋', '友情'],
    lyricist: '林夕',
    composer: '林健华',
    coverEmoji: '🤝',
    coverColors: ['#0c4a6e', '#38bdf8'],
    language: '粤语',
    duration: '4:02',
    tags: ['林夕', '林健华', '经典'],
    story: '从陌生到熟悉，从熟悉到疏离，从疏离又回到熟悉。你们兜兜转转走了十几年，最后还是坐在了同一张桌子前。',
    lyricQuote: '在一起，会有多美，在一起，会有多好',
  },
  {
    id: 'da-jia',
    title: '大浪漫主义',
    artist: '陈奕迅',
    year: 2002,
    album: 'The Line-Up',
    mood: 'reunion',
    style: ['Cantopop', 'Ballad'],
    themes: ['热恋', '怀旧'],
    lyricist: '黄伟文',
    composer: '陈辉阳',
    coverEmoji: '🎆',
    coverColors: ['#9d174d', '#ec4899'],
    language: '粤语',
    duration: '3:42',
    tags: ['黄伟文', '陈辉阳'],
    story: '你们约在老地方见面，那家奶茶店已经换了三任老板，可是珍珠奶茶的味道还和当年一样。',
    lyricQuote: '今日我，与你又试肩并肩，当年情，再度添上新鲜',
  },
  {
    id: 'chun-tian',
    title: '春天里',
    artist: '陈奕迅',
    year: 2011,
    album: 'Stranger Under My Skin',
    mood: 'reunion',
    style: ['Mandopop', 'Rock', 'Folk'],
    themes: ['怀旧', '成长', '自由'],
    lyricist: '汪峰',
    composer: '汪峰',
    coverEmoji: '🌷',
    coverColors: ['#9a3412', '#fb923c'],
    language: '国语',
    duration: '4:43',
    tags: ['国语', '翻唱'],
    story: '你们在春天相遇，也在春天重逢。那棵你们刻过名字的树，已经长得很高了。',
    lyricQuote: '如果有一天，我老无所依，请把我留在，在这时光里',
  },
  {
    id: 'xin-qing',
    title: '时光倒流二十年',
    artist: '陈奕迅',
    year: 2005,
    album: 'U-87',
    mood: 'reunion',
    style: ['Cantopop', 'Ballad'],
    themes: ['怀旧', '成长', '亲情'],
    lyricist: '林夕',
    composer: '伍乐城',
    coverEmoji: '📷',
    coverColors: ['#7c2d12', '#f97316'],
    language: '粤语',
    duration: '3:28',
    tags: ['林夕', '伍乐城'],
    story: '小学同学会，你们翻出了毕业照。照片上的你留着锅盖头，她扎着羊角辫。',
    lyricQuote: '遗憾我当时年纪不可亲手拥抱你欣赏',
  },
  {
    id: 'shang-xin',
    title: '伤心证明书',
    artist: '陈奕迅',
    year: 2009,
    album: '上五楼的快活',
    mood: 'growth',
    style: ['Mandopop', 'Ballad', 'Jazz'],
    themes: ['成长', '失恋', '释然'],
    lyricist: '陈奂仁',
    composer: '陈奂仁',
    coverEmoji: '📜',
    coverColors: ['#581c87', '#a78bfa'],
    language: '国语',
    duration: '4:16',
    tags: ['国语', '陈奂仁'],
    story: '你终于可以平静地谈起那段感情了。不再哭，不再怨，只是像讲一个别人的故事。',
    lyricQuote: '我以为若是爱得够深，就能够改变什么',
  },
  {
    id: 'yao-gan',
    title: '路一直都在',
    artist: '陈奕迅',
    year: 2008,
    album: '不想放手',
    mood: 'growth',
    style: ['Mandopop', 'Rock'],
    themes: ['励志', '成长', '自由'],
    lyricist: '吴向飞',
    composer: 'Adrian Fu',
    coverEmoji: '🛤️',
    coverColors: ['#1e3a8a', '#60a5fa'],
    language: '国语',
    duration: '4:45',
    tags: ['国语', '励志', '吴向飞'],
    story: '你失业了，失恋了，搬家了。你以为人生就这样了，可是第二天早上闹钟响的时候，你还是爬起来了。',
    lyricQuote: '不能后退的时候，不再徬徨的时候，永远向前，路一直都在',
    recommended: true,
  },
  {
    id: 'wei-lai',
    title: '今天只做一件事',
    artist: '陈奕迅',
    year: 2009,
    album: 'H3M',
    mood: 'growth',
    style: ['Cantopop', 'Acoustic', 'Folk'],
    themes: ['成长', '自由', '释然'],
    lyricist: '周耀辉',
    composer: '邓建明',
    coverEmoji: '🌅',
    coverColors: ['#b45309', '#fbbf24'],
    language: '粤语',
    duration: '3:56',
    tags: ['周耀辉', '邓建明', '治愈'],
    story: '以前的你总想要很多。某天你在公园的长椅上坐了一个下午，什么也不做，只是看云飘来飘去。',
    lyricQuote: '慢慢地迈向明天，默默地坚守信念',
  },
  {
    id: 'zhuo-dao',
    title: '任我行',
    artist: '陈奕迅',
    year: 2013,
    album: 'The Key',
    mood: 'growth',
    style: ['Cantopop', 'Ballad', 'Folk'],
    themes: ['成长', '自由', '自我认同'],
    lyricist: '林夕',
    composer: '泽日生',
    arranger: '陈珀',
    coverEmoji: '⛰️',
    coverColors: ['#134e4a', '#2dd4bf'],
    language: '粤语',
    duration: '4:04',
    tags: ['林夕', '泽日生'],
    story: '你终于辞职了，去了那个想了很多年的地方。你爬了很高的山，看了很美的海。',
    lyricQuote: '天真得只有你，令神仙鱼归天要怪谁',
    recommended: true,
  },
  {
    id: 'ying-yuan',
    title: '梦想天空分外蓝',
    artist: '陈奕迅',
    year: 2012,
    album: '..3mm',
    mood: 'growth',
    style: ['Cantopop', 'Pop'],
    themes: ['励志', '成长', '自由'],
    lyricist: '林夕',
    composer: 'Eric Kwok',
    coverEmoji: '☁️',
    coverColors: ['#0369a1', '#7dd3fc'],
    language: '粤语',
    duration: '3:44',
    tags: ['林夕', 'Eric Kwok', '励志'],
    story: '你还记得小时候站在屋顶上喊的梦想吗？你周末去学画画，年假去一个新的城市，偶尔在深夜写几行诗。',
    lyricQuote: '一天天的生活，一边怀念，一边体验',
  },
  {
    id: 'jian-ding',
    title: '披风',
    artist: '陈奕迅',
    year: 2017,
    album: "C'mon In~",
    mood: 'growth',
    style: ['Mandopop', 'Ballad'],
    themes: ['励志', '成长'],
    lyricist: '易家扬',
    composer: '林俊杰',
    coverEmoji: '🧥',
    coverColors: ['#6d28d9', '#c4b5fd'],
    language: '国语',
    duration: '3:58',
    tags: ['国语', '易家扬'],
    story: '每个人心里都有一件披风，让你在最艰难的时候也能站起来。',
    lyricQuote: '你总有办法撑到天明，披件温柔的披风',
  },
  {
    id: 'ke-xi',
    title: '可惜我是水瓶座',
    artist: '陈奕迅',
    year: 2004,
    album: 'Live for Today',
    mood: 'regret',
    style: ['Cantopop', 'Ballad'],
    themes: ['失恋', '孤独', '自我认同'],
    lyricist: '黄伟文',
    composer: '雷颂德',
    coverEmoji: '♒',
    coverColors: ['#1e40af', '#60a5fa'],
    language: '粤语',
    duration: '3:38',
    tags: ['黄伟文', '雷颂德', '翻唱'],
    story: '他说你太坚强了，坚强到让人觉得不需要被照顾。水瓶座的眼泪从来不在人前流。',
    lyricQuote: '我就回去，别引出我泪水',
  },
];

export const getSongById = (id: string): SongDetail | undefined => {
  return songDetails.find((s) => s.id === id);
};

export const getAllLyricists = (): { name: string; count: number; color: string }[] => {
  const map: { [k: string]: number } = {};
  songDetails.forEach((s) => {
    map[s.lyricist] = (map[s.lyricist] || 0) + 1;
  });
  const colors = ['#ff6b9d', '#f4c542', '#4ecdc4', '#a855f7', '#22c55e', '#f97316', '#06b6d4', '#ec4899'];
  return Object.entries(map)
    .map(([name, count], i) => ({ name, count, color: colors[i % colors.length] }))
    .sort((a, b) => b.count - a.count);
};

export const getAllComposers = (): { name: string; count: number; color: string }[] => {
  const map: { [k: string]: number } = {};
  songDetails.forEach((s) => {
    map[s.composer] = (map[s.composer] || 0) + 1;
  });
  const colors = ['#4ecdc4', '#a855f7', '#ff6b9d', '#f4c542', '#06b6d4', '#22c55e', '#ec4899', '#f97316'];
  return Object.entries(map)
    .map(([name, count], i) => ({ name, count, color: colors[i % colors.length] }))
    .sort((a, b) => b.count - a.count);
};

export const getAllAlbums = (): { name: string; year: number; count: number; songs: SongDetail[] }[] => {
  const map: { [k: string]: SongDetail[] } = {};
  songDetails.forEach((s) => {
    if (!map[s.album]) map[s.album] = [];
    map[s.album].push(s);
  });
  return Object.entries(map)
    .map(([name, songs]) => ({
      name,
      year: songs[0].year,
      count: songs.length,
      songs,
    }))
    .sort((a, b) => a.year - b.year);
};

export const getAllStyles = (): { name: MusicStyle; count: number; color: string }[] => {
  const map: { [k in MusicStyle]?: number } = {};
  songDetails.forEach((s) => {
    s.style.forEach((st) => {
      map[st] = (map[st] || 0) + 1;
    });
  });
  const colors: { [k in MusicStyle]: string } = {
    Cantopop: '#f4c542',
    Mandopop: '#ff6b9d',
    Ballad: '#4ecdc4',
    Rock: '#ef4444',
    R_B: '#a855f7',
    Electronic: '#22d3ee',
    Jazz: '#f97316',
    Orchestral: '#8b5cf6',
    Acoustic: '#22c55e',
    Folk: '#84cc16',
    RnB: '#a855f7',
    Pop: '#ec4899',
    'R&B': '#a855f7',
  } as { [k in MusicStyle]: string };
  return Object.entries(map)
    .map(([name, count]) => ({
      name: name as MusicStyle,
      count,
      color: colors[name as MusicStyle] || '#888',
    }))
    .sort((a, b) => b.count - a.count);
};

export const getAllThemes = (): { name: SongTheme; count: number; color: string }[] => {
  const map: { [k in SongTheme]?: number } = {};
  songDetails.forEach((s) => {
    s.themes.forEach((t) => {
      map[t] = (map[t] || 0) + 1;
    });
  });
  const colors = ['#ff6b9d', '#f4c542', '#4ecdc4', '#a855f7', '#22c55e', '#f97316', '#06b6d4', '#ec4899', '#8b5cf6', '#ef4444', '#84cc16', '#fbbf24', '#22d3ee', '#fb7185', '#60a5fa'];
  return Object.entries(map)
    .map(([name, count], i) => ({
      name: name as SongTheme,
      count,
      color: colors[i % colors.length],
    }))
    .sort((a, b) => b.count - a.count);
};

export const getRelatedSongs = (songId: string, limit = 5): { song: SongDetail; relation: number; reasons: string[] }[] => {
  const current = getSongById(songId);
  if (!current) return [];

  const scored = songDetails
    .filter((s) => s.id !== songId)
    .map((s) => {
      let score = 0;
      const reasons: string[] = [];

      if (s.lyricist === current.lyricist) {
        score += 5;
        reasons.push(`同作词：${s.lyricist}`);
      }
      if (s.composer === current.composer) {
        score += 4;
        reasons.push(`同作曲：${s.composer}`);
      }
      if (s.album === current.album) {
        score += 3;
        reasons.push(`同专辑：${s.album}`);
      }
      const sharedStyles = s.style.filter((st) => current.style.includes(st));
      if (sharedStyles.length > 0) {
        score += sharedStyles.length * 2;
        reasons.push(`同风格：${sharedStyles.join('、')}`);
      }
      const sharedThemes = s.themes.filter((t) => current.themes.includes(t));
      if (sharedThemes.length > 0) {
        score += sharedThemes.length * 1.5;
        reasons.push(`同主题：${sharedThemes.join('、')}`);
      }
      if (s.mood === current.mood) {
        score += 2;
        reasons.push(`同情绪：${s.mood}`);
      }
      if (Math.abs(s.year - current.year) <= 2) {
        score += 1;
        reasons.push('同期作品');
      }

      return { song: s, relation: score, reasons };
    })
    .filter((s) => s.relation > 0)
    .sort((a, b) => b.relation - a.relation)
    .slice(0, limit);

  return scored;
};

export const buildSongGraph = (): { nodes: GraphNode[]; edges: GraphEdge[] } => {
  const nodes: Map<string, GraphNode> = new Map();
  const edges: GraphEdge[] = [];

  const lyricistColors: { [k: string]: string } = {};
  const composerColors: { [k: string]: string } = {};
  const lColors = ['#ff6b9d', '#f97316', '#ec4899', '#fb7185'];
  const cColors = ['#4ecdc4', '#22d3ee', '#06b6d4', '#0891b2'];
  let lIdx = 0;
  let cIdx = 0;

  songDetails.forEach((song) => {
    nodes.set(`song-${song.id}`, {
      id: `song-${song.id}`,
      type: 'song',
      name: song.title,
      color: song.coverColors[0],
      size: song.recommended ? 22 : 16,
      relatedSongIds: [],
    });

    if (!lyricistColors[song.lyricist]) {
      lyricistColors[song.lyricist] = lColors[lIdx++ % lColors.length];
    }
    if (!nodes.has(`lyricist-${song.lyricist}`)) {
      nodes.set(`lyricist-${song.lyricist}`, {
        id: `lyricist-${song.lyricist}`,
        type: 'lyricist',
        name: song.lyricist,
        color: lyricistColors[song.lyricist],
        size: 28,
        relatedSongIds: [],
      });
    }
    edges.push({
      source: `song-${song.id}`,
      target: `lyricist-${song.lyricist}`,
      type: '作词',
      weight: 5,
    });

    if (!composerColors[song.composer]) {
      composerColors[song.composer] = cColors[cIdx++ % cColors.length];
    }
    if (!nodes.has(`composer-${song.composer}`)) {
      nodes.set(`composer-${song.composer}`, {
        id: `composer-${song.composer}`,
        type: 'composer',
        name: song.composer,
        color: composerColors[song.composer],
        size: 28,
        relatedSongIds: [],
      });
    }
    edges.push({
      source: `song-${song.id}`,
      target: `composer-${song.composer}`,
      type: '作曲',
      weight: 4,
    });

    if (!nodes.has(`album-${song.album}`)) {
      const albumColor = song.coverColors[0];
      nodes.set(`album-${song.album}`, {
        id: `album-${song.album}`,
        type: 'album',
        name: song.album,
        color: albumColor,
        size: 24,
        relatedSongIds: [],
      });
    }
    edges.push({
      source: `song-${song.id}`,
      target: `album-${song.album}`,
      type: '收录',
      weight: 3,
    });

    song.style.forEach((st) => {
      if (!nodes.has(`style-${st}`)) {
        const stColors: { [k: string]: string } = {
          Cantopop: '#f4c542',
          Mandopop: '#ff6b9d',
          Ballad: '#4ecdc4',
          Rock: '#ef4444',
          R_B: '#a855f7',
          RnB: '#a855f7',
          Electronic: '#22d3ee',
          Jazz: '#f97316',
          Orchestral: '#8b5cf6',
          Acoustic: '#22c55e',
          Folk: '#84cc16',
          Pop: '#ec4899',
        };
        nodes.set(`style-${st}`, {
          id: `style-${st}`,
          type: 'style',
          name: st,
          color: stColors[st] || '#888',
          size: 20,
          relatedSongIds: [],
        });
      }
      edges.push({
        source: `song-${song.id}`,
        target: `style-${st}`,
        type: '风格',
        weight: 2,
      });
    });
  });

  return {
    nodes: Array.from(nodes.values()),
    edges,
  };
};

export interface EraStyle {
  startYear: number;
  endYear: number;
  name: string;
  description: string;
  dominantStyles: string[];
  dominantThemes: string[];
  keyAlbums: string[];
  keySongs: string[];
  color: string;
}

export const styleEvolution: EraStyle[] = [
  {
    startYear: 1996,
    endYear: 1999,
    name: '青涩出道期',
    description: '华星唱片时期，初出茅庐的陈奕迅以情歌路线为主，嗓音清亮，歌曲多为传统港式情歌。这个时期的他正在寻找属于自己的音乐风格，专辑中既有商业情歌，也有一些新颖的尝试。',
    dominantStyles: ['Cantopop', 'Ballad'],
    dominantThemes: ['热恋', '怀旧', '成长'],
    keyAlbums: ['陈奕迅', '与我常在', '我的快乐时代', '天佑爱人'],
    keySongs: ['与我常在', '天下无双', '每一个明天'],
    color: '#38bdf8',
  },
  {
    startYear: 2000,
    endYear: 2003,
    name: '英皇崛起期',
    description: '转投英皇娱乐后，陈奕迅迎来了事业的第一个高峰。陈辉阳+林夕的黄金组合打造了《K歌之王》《明年今日》等经典，黄伟文也开始深度合作。音乐风格开始多元化，加入了摇滚、电子等元素。',
    dominantStyles: ['Cantopop', 'Ballad', 'Rock', 'Electronic'],
    dominantThemes: ['失恋', '遗憾', '社会观察'],
    keyAlbums: ['打得火热', 'Shall We Dance? Shall We Talk!', 'The Line-Up', '黑白灰'],
    keySongs: ['K歌之王', '单车', '明年今日', '十年'],
    color: '#a855f7',
  },
  {
    startYear: 2005,
    endYear: 2009,
    name: '巅峰成熟期',
    description: '转投新艺宝唱片后，陈奕迅迎来了艺术生涯的巅峰。《U-87》被《时代》杂志评为值得购买的亚洲唱片。这个时期他尝试更多音乐风格，专辑概念性极强，林夕和黄伟文的词作达到了新的高度。',
    dominantStyles: ['Cantopop', 'Mandopop', 'Rock', 'Orchestral', 'Ballad'],
    dominantThemes: ['成长', '遗憾', '释然', '社会观察'],
    keyAlbums: ['U-87', "What's Going On...?", 'Life Continues...', 'H3M'],
    keySongs: ['浮夸', '富士山下', '最佳损友', '七百年后'],
    color: '#f4c542',
  },
  {
    startYear: 2010,
    endYear: 2014,
    name: '国语突破期',
    description: '在国语市场持续发力，推出了《孤独患者》《梦想天空分外蓝》等脍炙人口的作品。音乐风格更加包容，与更多不同风格的音乐人合作，专辑主题更加关注内心世界和社会议题。',
    dominantStyles: ['Mandopop', 'Cantopop', 'Folk', 'Acoustic'],
    dominantThemes: ['孤独', '成长', '自由', '自我认同'],
    keyAlbums: ['?', 'Stranger Under My Skin', 'The Key', '..3mm'],
    keySongs: ['孤独患者', '任我行', '梦想天空分外蓝', '春天里'],
    color: '#4ecdc4',
  },
  {
    startYear: 2015,
    endYear: 2020,
    name: '回归本真期',
    description: '经过多年的探索，陈奕迅开始回归音乐本身，作品更加简约、真诚。无论是国语专辑《C\'mon In~》还是后续作品，都更加注重情感的直接表达，编曲回归极简，用最纯粹的歌声打动人心。',
    dominantStyles: ['Mandopop', 'Ballad', 'Acoustic', 'Jazz'],
    dominantThemes: ['成长', '释然', '自我认同', '励志'],
    keyAlbums: ["C'mon In~", 'L.O.V.E.'],
    keySongs: ['披风', '一个灵魂的独白', '可一可再'],
    color: '#ff6b9d',
  },
];

export const getEraByYear = (year: number): EraStyle | undefined => {
  return styleEvolution.find((era) => year >= era.startYear && year <= era.endYear);
};

export const themeClusters: {
  id: string;
  name: string;
  color: string;
  themes: SongTheme[];
  description: string;
  songIds: string[];
}[] = [
  {
    id: 'heartbreak',
    name: '💔 心碎往事',
    color: '#ff6b9d',
    themes: ['失恋', '遗憾', '思念'],
    description: '那些关于爱而不得的故事，每一首都是深夜的眼泪',
    songIds: [],
  },
  {
    id: 'relationships',
    name: '💞 情感联结',
    color: '#f4c542',
    themes: ['热恋', '友情', '亲情'],
    description: '关于爱与陪伴的温暖，是生命中最珍贵的礼物',
    songIds: [],
  },
  {
    id: 'inner-world',
    name: '🌙 内心独白',
    color: '#4ecdc4',
    themes: ['孤独', '自我认同', '社会观察'],
    description: '与自己对话的时刻，在人群中寻找自我的位置',
    songIds: [],
  },
  {
    id: 'memories',
    name: '📷 时光记忆',
    color: '#a855f7',
    themes: ['怀旧', '思念', '遗憾'],
    description: '那些年的人、那些年的事，都变成了泛黄的照片',
    songIds: [],
  },
  {
    id: 'growth',
    name: '🌿 成长蜕变',
    color: '#22c55e',
    themes: ['成长', '励志', '释然', '自由'],
    description: '从青涩到成熟，每一步都是生命的礼物',
    songIds: [],
  },
];

songDetails.forEach((song) => {
  themeClusters.forEach((cluster) => {
    const overlap = song.themes.filter((t) => cluster.themes.includes(t));
    if (overlap.length >= 2 || (overlap.length >= 1 && cluster.themes.includes(song.themes[0]))) {
      if (!cluster.songIds.includes(song.id)) {
        cluster.songIds.push(song.id);
      }
    }
  });
});

// 占位引用，避免 TS unused 警告
void (0 as unknown as MusicRecord | undefined);
