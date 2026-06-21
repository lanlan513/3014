import type { MoodId } from './moods';

export interface AlbumTrack {
  id: string;
  title: string;
  duration: string;
  isFavorite?: boolean;
}

export interface ProductionTeam {
  role: string;
  name: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  month?: number;
  coverEmoji: string;
  coverColors: [string, string];
  primaryMood: MoodId;
  recordLabel: string;
  language: string;
  totalTracks: number;
  totalDuration: string;
  tracks: AlbumTrack[];
  productionTeam: ProductionTeam[];
  backgroundStory: string;
  criticalReception: string;
  funFacts: string[];
  relatedAlbumIds: string[];
  eraNote: string;
}

export const albums: Album[] = [
  {
    id: 'yu-wo-chang-zai',
    title: '与我常在',
    artist: '陈奕迅',
    year: 1997,
    month: 4,
    coverEmoji: '🤝',
    coverColors: ['#0c4a6e', '#38bdf8'],
    primaryMood: 'reunion',
    recordLabel: '华星唱片',
    language: '粤语',
    totalTracks: 11,
    totalDuration: '43:25',
    tracks: [
      { id: 'y-1', title: '与我常在', duration: '4:02' },
      { id: 'y-2', title: '抱拥这分钟', duration: '4:15' },
      { id: 'y-3', title: '天下无双', duration: '3:58' },
      { id: 'y-4', title: '黄金时代', duration: '4:32' },
      { id: 'y-5', title: '我的快乐时代', duration: '4:05' },
      { id: 'y-6', title: '我什么都没有', duration: '3:42' },
      { id: 'y-7', title: '生命有几好', duration: '3:28' },
      { id: 'y-8', title: '与你常在', duration: '3:55' },
      { id: 'y-9', title: '今天等我来', duration: '4:10' },
      { id: 'y-10', title: '跟我走好吗', duration: '3:38' },
      { id: 'y-11', title: '我感激', duration: '3:40' },
    ],
    productionTeam: [
      { role: '制作人', name: '林夕、林健华' },
      { role: '作曲', name: '林健华、柳重言等' },
      { role: '作词', name: '林夕、黄伟文等' },
      { role: '编曲', name: '陈辉阳、赵增熹等' },
    ],
    backgroundStory:
      '《与我常在》是陈奕迅加盟华星唱片后的第三张粤语专辑，也是他音乐生涯早期的重要作品。这张专辑发行于1997年，正值香港回归的特殊年份，整张专辑充满了对时代变迁的细腻观察和对人情世故的温暖诠释。专辑由林夕和林健华联手打造，奠定了陈奕迅"情歌王子"的初步定位。标题曲《与我常在》由林夕作词、林健华作曲，以温暖的旋律和深情的歌词，讲述了陪伴与守候的主题，成为当时广受欢迎的情歌经典。',
    criticalReception:
      '这张专辑在推出后获得了乐评界的一致好评，被誉为陈奕迅早期最具代表性的作品之一。专辑中的多首歌曲如《与我常在》《天下无双》等，不仅在商业上取得了成功，更在音乐品质上获得了广泛认可。评论家认为，这张专辑展现了陈奕迅独特的嗓音魅力和情感表达能力，为他日后的音乐事业奠定了坚实基础。',
    funFacts: [
      '《与我常在》是陈奕迅首次与林夕深度合作的专辑，开启了两人长达数十年的黄金搭档',
      '专辑封面拍摄于香港中环的一条老街，展现了陈奕迅年轻时的青涩模样',
      '《天下无双》这首歌后来被多位歌手翻唱，成为华语乐坛的经典之作',
    ],
    relatedAlbumIds: ['nothing-really-matters', 'shall-we-dance'],
    eraNote: '1997年，香港回归，陈奕迅用歌声记录了这个特殊的时代。',
  },
  {
    id: 'nothing-really-matters',
    title: 'Nothing Really Matters',
    artist: '陈奕迅',
    year: 2000,
    month: 7,
    coverEmoji: '🌼',
    coverColors: ['#166534', '#4ade80'],
    primaryMood: 'reunion',
    recordLabel: '华星唱片',
    language: '粤语',
    totalTracks: 12,
    totalDuration: '48:30',
    tracks: [
      { id: 'n-1', title: '当这地球没有花', duration: '4:05' },
      { id: 'n-2', title: 'Made in Hong Kong', duration: '3:42' },
      { id: 'n-3', title: '黑夜不再来', duration: '3:28' },
      { id: 'n-4', title: '美丽有罪', duration: '3:55' },
      { id: 'n-5', title: '戏迷情人', duration: '4:18' },
      { id: 'n-6', title: '和平饭店', duration: '3:38' },
      { id: 'n-7', title: '幸福摩天轮', duration: '4:10' },
      { id: 'n-8', title: '飘飘飘飘', duration: '3:45' },
      { id: 'n-9', title: '地狱咒', duration: '4:02' },
      { id: 'n-10', title: '当这地球没有花 (Remix)', duration: '3:52' },
      { id: 'n-11', title: '美丽有罪 (Remix)', duration: '4:20' },
      { id: 'n-12', title: '黑夜不再来 (Piano Version)', duration: '3:15' },
    ],
    productionTeam: [
      { role: '制作人', name: 'Eric Kwok、林夕' },
      { role: '作曲', name: 'Eric Kwok、柳重言等' },
      { role: '作词', name: '林夕、黄伟文等' },
      { role: '编曲', name: '陈辉阳、金培达等' },
    ],
    backgroundStory:
      '《Nothing Really Matters》是陈奕迅在华星唱片时期的一张重要粤语专辑，发行于2000年。这张专辑的名字取自英文谚语"Nothing really matters"，表达了一种豁达通透的人生态度。专辑在音乐风格上更加多元，融合了流行、电子、摇滚等多种元素，展现了陈奕迅不断突破自我的音乐探索。其中《当这地球没有花》由林夕作词、Eric Kwok作曲，以浪漫的想象和深情的演绎，成为专辑中最受欢迎的歌曲之一。',
    criticalReception:
      '这张专辑被认为是陈奕迅音乐风格转型的重要作品，从早期的纯情歌路线逐渐向更多元化的音乐风格探索。专辑中的多首歌曲在编曲和演唱上都有新的尝试，获得了乐评人的高度评价。《黑夜不再来》等歌曲展现了陈奕迅在不同音乐风格上的驾驭能力，证明他不仅是一位优秀的情歌歌手，更是一位全能的音乐人。',
    funFacts: [
      '专辑名称"Nothing Really Matters"是陈奕迅对人生态度的一种表达，体现了他豁达开朗的性格',
      '《幸福摩天轮》这首歌后来成为香港游乐园的代表性歌曲',
      '这是陈奕迅在华星唱片的最后几张专辑之一，之后他转投英皇娱乐',
    ],
    relatedAlbumIds: ['yu-wo-chang-zai', 'shall-we-dance'],
    eraNote: '2000年，千禧年的钟声敲响，陈奕迅用音乐迎接新时代。',
  },
  {
    id: 'shall-we-dance',
    title: 'Shall We Dance? Shall We Talk!',
    artist: '陈奕迅',
    year: 2001,
    month: 3,
    coverEmoji: '🚲',
    coverColors: ['#15803d', '#86efac'],
    primaryMood: 'reunion',
    recordLabel: '英皇娱乐',
    language: '粤语',
    totalTracks: 13,
    totalDuration: '52:15',
    tracks: [
      { id: 's-1', title: 'Shall We Dance', duration: '4:32' },
      { id: 's-2', title: 'Shall We Talk', duration: '3:48' },
      { id: 's-3', title: '单车', duration: '3:31' },
      { id: 's-4', title: '失恋太少', duration: '3:55' },
      { id: 's-5', title: '孤独探戈', duration: '4:12' },
      { id: 's-6', title: '天使的礼物', duration: '4:05' },
      { id: 's-7', title: '怪物', duration: '3:42' },
      { id: 's-8', title: '2001太空漫游', duration: '4:28' },
      { id: 's-9', title: '失恋太少 (Piano Version)', duration: '3:40' },
      { id: 's-10', title: 'Shall We Dance (Remix)', duration: '4:15' },
      { id: 's-11', title: '黑暗中漫舞', duration: '3:58' },
      { id: 's-12', title: '风筝', duration: '4:20' },
      { id: 's-13', title: 'Shall We Talk (国语版)', duration: '3:48' },
    ],
    productionTeam: [
      { role: '制作人', name: '陈辉阳、林夕' },
      { role: '作曲', name: '陈辉阳、柳重言等' },
      { role: '作词', name: '林夕、黄伟文等' },
      { role: '编曲', name: '陈辉阳、赵增熹等' },
    ],
    backgroundStory:
      '《Shall We Dance? Shall We Talk!》是陈奕迅加盟英皇娱乐后的首张粤语专辑，也是他音乐生涯的重要里程碑。这张专辑由陈辉阳担任制作人，林夕负责主要词作，打造了一张既有商业性又有音乐性的高品质专辑。专辑名称"Shall We Dance? Shall We Talk!"表达了现代都市人在情感交流中的困惑与渴望——是该跳舞还是该谈心？《单车》这首歌由黄伟文作词、柳重言作曲，以父子间的单车回忆为载体，讲述了深沉含蓄的亲情，成为无数人的催泪神曲。',
    criticalReception:
      '这张专辑一经推出便获得了巨大成功，不仅在销量上取得了亮眼成绩，更在音乐奖项上收获颇丰。专辑获得了第22届香港十大中文金曲的多个奖项，《Shall We Talk》获得了四台联颁歌曲大奖。《单车》更是被誉为华语乐坛最经典的亲情歌曲之一，至今仍被广泛传唱。评论家认为，这张专辑标志着陈奕迅正式迈入香港一线歌手行列。',
    funFacts: [
      '《Shall We Talk》这首歌是林夕根据自己童年与母亲的关系创作的',
      '《单车》的创作灵感来源于黄伟文童年时与父亲骑单车的回忆',
      '这张专辑是陈奕迅与陈辉阳黄金搭档的开始，两人之后合作了众多经典',
    ],
    relatedAlbumIds: ['the-line-up', 'u87'],
    eraNote: '2001年，陈奕迅加盟英皇娱乐，开启了音乐生涯的新篇章。',
  },
  {
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
  },
  {
    id: 'hei-bai-hui',
    title: '黑白灰',
    artist: '陈奕迅',
    year: 2003,
    month: 4,
    coverEmoji: '⏳',
    coverColors: ['#333333', '#666666'],
    primaryMood: 'regret',
    recordLabel: '英皇娱乐',
    language: '国语',
    totalTracks: 10,
    totalDuration: '41:20',
    tracks: [
      { id: 'h-1', title: '十年', duration: '3:25' },
      { id: 'h-2', title: '兄妹', duration: '4:12' },
      { id: 'h-3', title: '世界', duration: '3:58' },
      { id: 'h-4', title: '谢谢', duration: '4:05' },
      { id: 'h-5', title: '十年 (国)', duration: '3:25' },
      { id: 'h-6', title: '要你的', duration: '4:18' },
      { id: 'h-7', title: '故事', duration: '3:52' },
      { id: 'h-8', title: '想哭', duration: '4:28' },
      { id: 'h-9', title: '还要走多久', duration: '3:45' },
      { id: 'h-10', title: '我们都寂寞', duration: '3:42' },
    ],
    productionTeam: [
      { role: '制作人', name: '陈小霞、林夕' },
      { role: '作曲', name: '陈小霞、徐伟贤等' },
      { role: '作词', name: '林夕、施立等' },
      { role: '编曲', name: '陈辉阳、刘志远等' },
    ],
    backgroundStory:
      '《黑白灰》是陈奕迅的第三张国语专辑，也是他正式进军台湾市场的重要作品。专辑名称"黑白灰"象征着人生的三种状态——黑是坚持，白是纯真，灰是妥协。这张专辑以深刻的人生哲理和动人的旋律，打动了无数听众。其中《十年》由陈小霞作曲、林夕作词，以简单朴实的旋律和深入人心的歌词，成为陈奕迅最广为人知的代表作，也让他成功打开了国语市场的大门。这张专辑的成功，标志着陈奕迅从香港本地歌手成长为华语乐坛的超级巨星。',
    criticalReception:
      '《黑白灰》是陈奕迅在国语乐坛的里程碑之作，获得了第15届台湾金曲奖最佳国语男歌手奖。专辑在台湾销量超过25万张，全亚洲销量突破100万张。《十年》这首歌更是成为现象级歌曲，无论在KTV还是街头巷尾都被广泛传唱。评论家认为，这张专辑的成功不仅在于其优秀的音乐品质，更在于它触动了一代人的情感记忆，成为了一个时代的文化符号。',
    funFacts: [
      '《十年》的粤语版是《明年今日》，收录于2002年的《The Line-Up》专辑',
      '这张专辑让陈奕迅获得了第15届台湾金曲奖最佳国语男歌手奖',
      '专辑封面采用了黑白灰三种色调，与专辑名称相呼应',
    ],
    relatedAlbumIds: ['ren-le-ba', 'wen-ma'],
    eraNote: '2003年，《十年》唱遍大街小巷，陈奕迅成为全民偶像。',
  },
  {
    id: 'live-for-today',
    title: 'Live for Today',
    artist: '陈奕迅',
    year: 2003,
    month: 7,
    coverEmoji: '♒',
    coverColors: ['#1e40af', '#60a5fa'],
    primaryMood: 'regret',
    recordLabel: '英皇娱乐',
    language: '粤语',
    totalTracks: 11,
    totalDuration: '42:30',
    tracks: [
      { id: 'l-1', title: '幸灾乐祸', duration: '3:45' },
      { id: 'l-2', title: 'Katrina', duration: '3:52' },
      { id: 'l-3', title: '十面埋伏', duration: '4:12' },
      { id: 'l-4', title: '呀边个边个', duration: '3:38' },
      { id: 'l-5', title: '小孩不懂怕', duration: '4:05' },
      { id: 'l-6', title: '谎言', duration: '3:58' },
      { id: 'l-7', title: '真相', duration: '4:02' },
      { id: 'l-8', title: '忘记歌词', duration: '3:42' },
      { id: 'l-9', title: 'New Order', duration: '3:55' },
      { id: 'l-10', title: '岁月如歌', duration: '3:50' },
      { id: 'l-11', title: '绵绵', duration: '4:11' },
    ],
    productionTeam: [
      { role: '制作人', name: 'Eric Kwok、林夕' },
      { role: '作曲', name: 'Eric Kwok、雷颂德等' },
      { role: '作词', name: '林夕、黄伟文等' },
      { role: '编曲', name: '刘志远、梁基爵等' },
    ],
    backgroundStory:
      '《Live for Today》是陈奕迅2003年发行的粤语专辑，专辑名称表达了"活在当下"的人生态度。这张专辑在音乐风格上更加多元化，融合了流行、摇滚、电子等多种元素。专辑中的《十面埋伏》由黄伟文作词，以中国传统武术为意象，讲述了爱情中的追逐与逃避，创意十足。而《岁月如歌》则是一首温暖励志的歌曲，鼓励人们珍惜当下，勇敢面对生活的挑战。这张专辑也展现了陈奕迅在音乐上的不断突破和创新精神。',
    criticalReception:
      '这张专辑获得了业内人士的高度评价，被认为是陈奕迅音乐风格更加成熟的代表作。《十面埋伏》以其独特的创意和精湛的演唱，获得了多个音乐奖项。专辑在商业上也取得了不错的成绩，继续巩固了陈奕迅在香港乐坛的地位。评论家认为，这张专辑展现了陈奕迅作为全能歌手的实力，无论是快歌还是慢歌，都能演绎得游刃有余。',
    funFacts: [
      '专辑名称"Live for Today"体现了陈奕迅"活在当下"的人生哲学',
      '《十面埋伏》的歌词融入了中国传统武术元素，创意独特',
      '《岁月如歌》后来被选为电视剧主题曲，获得更多听众喜爱',
    ],
    relatedAlbumIds: ['the-line-up', 'u87'],
    eraNote: '2003年，陈奕迅用音乐告诉我们：活在当下，珍惜眼前。',
  },
  {
    id: 'u87',
    title: 'U-87',
    artist: '陈奕迅',
    year: 2005,
    month: 6,
    coverEmoji: '📷',
    coverColors: ['#7c2d12', '#f97316'],
    primaryMood: 'reunion',
    recordLabel: '新艺宝唱片',
    language: '粤语',
    totalTracks: 12,
    totalDuration: '47:35',
    tracks: [
      { id: 'u-1', title: '时光倒流二十年', duration: '3:28' },
      { id: 'u-2', title: '夕阳无限好', duration: '4:02' },
      { id: 'u-3', title: '浮夸', duration: '4:35' },
      { id: 'u-4', title: '葡萄成熟时', duration: '4:45' },
      { id: 'u-5', title: '三个人的探戈', duration: '3:52' },
      { id: 'u-6', title: '不良嗜好', duration: '3:48' },
      { id: 'u-7', title: '怕死', duration: '4:15' },
      { id: 'u-8', title: '大个女', duration: '4:08' },
      { id: 'u-9', title: '新美人主义', duration: '3:55' },
      { id: 'u-10', title: '遇见了你', duration: '3:42' },
      { id: 'u-11', title: '阿牛', duration: '3:58' },
      { id: 'u-12', title: '烂', duration: '3:27' },
    ],
    productionTeam: [
      { role: '制作人', name: '梁荣骏、林夕' },
      { role: '作曲', name: 'Eric Kwok、伍乐城、雷颂德等' },
      { role: '作词', name: '林夕、黄伟文等' },
      { role: '编曲', name: '刘志远、陈辉阳等' },
    ],
    backgroundStory:
      '《U-87》是陈奕迅转投新艺宝唱片后的首张粤语专辑，也是他音乐生涯的巅峰之作。专辑名称"U-87"来源于他在录音室使用的一支U-87麦克风，象征着对音乐品质的极致追求。这张专辑集结了林夕、黄伟文两大词人，以及Eric Kwok、伍乐城等顶级作曲人，打造了一张首首经典的高品质专辑。《浮夸》由江志仁作曲、黄伟文作词，以夸张的演绎和深刻的歌词，唱出了小人物的心声，成为陈奕迅最具代表性的作品之一。',
    criticalReception:
      '《U-87》被公认为陈奕迅最经典的专辑之一，获得了第20届香港十大中文金曲的全年最高销量男歌手等多个奖项。专辑中的《浮夸》《夕阳无限好》《葡萄成熟时》等歌曲，都成为了粤语乐坛的经典之作。这张专辑不仅在商业上取得了巨大成功，更在音乐艺术性上达到了新的高度。《时代》杂志曾评价这张专辑为"2005年最值得购买的亚洲唱片"之一。',
    funFacts: [
      '专辑名称"U-87"来自陈奕迅录音时使用的 Neumann U-87 麦克风',
      '《浮夸》的创作灵感来源于张国荣的去世，黄伟文想表达对生命的思考',
      '这张专辑是陈奕迅从英皇转投新艺宝后的首张专辑，被寄予厚望',
    ],
    relatedAlbumIds: ['life-continues', 'h3m'],
    eraNote: '2005年，《U-87》横空出世，陈奕迅迎来事业巅峰。',
  },
  {
    id: 'life-continues',
    title: 'Life Continues...',
    artist: '陈奕迅',
    year: 2006,
    month: 2,
    coverEmoji: '🍻',
    coverColors: ['#8b4513', '#cd853f'],
    primaryMood: 'regret',
    recordLabel: '新艺宝唱片',
    language: '粤语',
    totalTracks: 7,
    totalDuration: '26:40',
    tracks: [
      { id: 'lc-1', title: '最佳损友', duration: '3:55' },
      { id: 'lc-2', title: '低调', duration: '3:48' },
      { id: 'lc-3', title: '人神斗', duration: '4:12' },
      { id: 'lc-4', title: '暴殄天物', duration: '3:42' },
      { id: 'lc-5', title: '落花流水', duration: '4:05' },
      { id: 'lc-6', title: '裙下之臣', duration: '3:58' },
      { id: 'lc-7', title: '最佳损友 (To My Friend Special Mix)', duration: '3:00' },
    ],
    productionTeam: [
      { role: '制作人', name: 'Eric Kwok、林夕' },
      { role: '作曲', name: 'Eric Kwok、周炳辉等' },
      { role: '作词', name: '黄伟文、林夕等' },
      { role: '编曲', name: '刘志远、Eric Kwok等' },
    ],
    backgroundStory:
      '《Life Continues...》是陈奕迅2006年发行的一张EP（迷你专辑），专辑名称表达了"生活还在继续"的积极态度。虽然是一张EP，但品质极高，收录的歌曲首首经典。其中《最佳损友》由Eric Kwok作曲、黄伟文作词，以友情为主题，讲述了朋友之间从亲密到疏远的遗憾，深深触动了无数人的心声。这首歌据说灵感来源于黄伟文与杨千嬅之间的友情纠葛，因此特别真挚动人。《落花流水》则以流水与落花的意象，讲述了爱情中的无奈与释然。',
    criticalReception:
      '这张EP虽然只有7首歌，但被认为是一张"全主打"的高品质作品，每首歌都有成为主打歌的实力。《最佳损友》获得了2006年度香港十大劲歌金曲奖、叱咤乐坛流行榜颁奖典礼的我最喜爱的歌曲大奖等多个重要奖项。评论家认为，这张EP虽然篇幅不长，但在音乐品质和情感深度上都达到了极高水准，是陈奕迅音乐生涯中的重要作品。',
    funFacts: [
      '《最佳损友》据说灵感来源于黄伟文与杨千嬅之间的友情',
      '这是一张EP专辑，虽然只有7首歌，但首首经典',
      '专辑名称"Life Continues..."表达了积极向上的人生态度',
    ],
    relatedAlbumIds: ['u87', 'whats-going-on'],
    eraNote: '2006年，《最佳损友》唱哭了无数人，友情是我们永远的课题。',
  },
  {
    id: 'whats-going-on',
    title: "What's Going On...?",
    artist: '陈奕迅',
    year: 2006,
    month: 11,
    coverEmoji: '🗻',
    coverColors: ['#1e3a5f', '#4a90a4'],
    primaryMood: 'lonely',
    recordLabel: '新艺宝唱片',
    language: '粤语',
    totalTracks: 10,
    totalDuration: '38:50',
    tracks: [
      { id: 'w-1', title: '美中不足', duration: '3:45' },
      { id: 'w-2', title: '白玫瑰', duration: '4:12' },
      { id: 'w-3', title: '不如不见', duration: '4:48' },
      { id: 'w-4', title: '心深伤透', duration: '3:52' },
      { id: 'w-5', title: '爱情是幼稚的', duration: '3:48' },
      { id: 'w-6', title: '天公地道', duration: '4:05' },
      { id: 'w-7', title: '富士山下', duration: '4:21' },
      { id: 'w-8', title: '黑择明', duration: '3:58' },
      { id: 'w-9', title: '粤语残片', duration: '4:02' },
      { id: 'w-10', title: '裙下之臣 (Remix)', duration: '2:59' },
    ],
    productionTeam: [
      { role: '制作人', name: '梁荣骏、林夕' },
      { role: '作曲', name: '泽日生、陈小霞等' },
      { role: '作词', name: '林夕、黄伟文' },
      { role: '编曲', name: '陈珀、刘志远等' },
    ],
    backgroundStory:
      "《What's Going On...?》是陈奕迅2006年发行的粤语专辑，专辑名称取自 Marvin Gaye 的经典歌曲，表达了对社会和人生的思考。这张专辑延续了陈奕迅一贯的高品质水准，收录了多首经典之作。《富士山下》由泽日生作曲、林夕作词，以日本富士山为意象，讲述了爱情中的放手与释然，旋律优美动人，歌词意境深远，被誉为陈奕迅最经典的情歌之一。《不如不见》则是《好久不见》的粤语原版，更加深刻地表达了久别重逢的复杂心情。",
    criticalReception:
      '这张专辑获得了广泛好评，被认为是陈奕迅音乐风格更加成熟的代表作。《富士山下》获得了2007年度香港十大劲歌金曲奖、叱咤乐坛流行榜颁奖典礼的专业推介叱咤十大等多个奖项。专辑在商业上也取得了优异成绩，销量突破20万张。评论家认为，这张专辑展现了陈奕迅作为"歌神接班人"的实力，无论是演唱技巧还是情感表达都达到了炉火纯青的境界。',
    funFacts: [
      '《富士山下》的创作灵感来自林夕的一次日本旅行经历',
      '专辑名称"What\'s Going On"致敬了Marvin Gaye的经典专辑',
      '《白玫瑰》是《红玫瑰》的粤语版，两版歌词各有深意',
    ],
    relatedAlbumIds: ['life-continues', 'ren-le-ba'],
    eraNote: '2006年，谁能凭爱意要富士山私有？林夕用歌词给了我们答案。',
  },
  {
    id: 'ren-le-ba',
    title: '认了吧',
    artist: '陈奕迅',
    year: 2007,
    month: 4,
    coverEmoji: '☕',
    coverColors: ['#3d2817', '#8b5a3c'],
    primaryMood: 'lonely',
    recordLabel: '新艺宝唱片',
    language: '国语',
    totalTracks: 11,
    totalDuration: '43:15',
    tracks: [
      { id: 'r-1', title: '烟味', duration: '4:12' },
      { id: 'r-2', title: '淘汰', duration: '4:05' },
      { id: 'r-3', title: '快乐男生', duration: '3:52' },
      { id: 'r-4', title: '红玫瑰', duration: '4:18' },
      { id: 'r-5', title: '月黑风高', duration: '4:22' },
      { id: 'r-6', title: '爱情转移', duration: '4:30' },
      { id: 'r-7', title: '好久不见', duration: '4:05' },
      { id: 'r-8', title: '白色球鞋', duration: '4:15' },
      { id: 'r-9', title: '那一夜有没有说', duration: '3:58' },
      { id: 'r-10', title: '月球上的人', duration: '4:02' },
      { id: 'r-11', title: '爱情转移 (电影版)', duration: '3:36' },
    ],
    productionTeam: [
      { role: '制作人', name: '陈小霞、林夕' },
      { role: '作曲', name: '陈小霞、泽日生等' },
      { role: '作词', name: '林夕、施立等' },
      { role: '编曲', name: '陈珀、刘志远等' },
    ],
    backgroundStory:
      '《认了吧》是陈奕迅的第五张国语专辑，也是他国语作品中的经典之作。专辑名称"认了吧"表达了一种对人生的释然态度——对爱情、对生活、对那些无法改变的事情，或许认了吧也是一种智慧。这张专辑收录了多首经典歌曲，其中《爱情转移》是电影《爱情呼叫转移》的主题曲，由《富士山下》重新填词而成，在两岸三地广为传唱。《好久不见》则以简单朴实的旋律和深情的歌词，讲述了分手后的思念与遗憾，成为无数人心中的催泪神曲。',
    criticalReception:
      '这张专辑在国语乐坛取得了巨大成功，《爱情转移》获得了第1届无线音乐盛典年度最畅销金曲奖等多个奖项。专辑在台湾销量超过20万张，全亚洲销量突破100万张。《淘汰》由周杰伦为陈奕迅量身打造，两大天王的合作也成为乐坛佳话。评论家认为，这张专辑是陈奕迅在国语市场的又一次成功，证明了他不仅是香港的"歌神接班人"，更是整个华语乐坛的领军人物。',
    funFacts: [
      '《淘汰》由周杰伦作曲，是两大天王的一次经典合作',
      '《爱情转移》是电影《爱情呼叫转移》的主题曲，改编自《富士山下》',
      '专辑名称"认了吧"表达了对人生的释然态度',
    ],
    relatedAlbumIds: ['whats-going-on', 'wen-ma'],
    eraNote: '2007年，《爱情转移》响彻华语世界，陈奕迅稳坐天王宝座。',
  },
  {
    id: 'bu-xiang-fang-shou',
    title: '不想放手',
    artist: '陈奕迅',
    year: 2008,
    month: 6,
    coverEmoji: '🛤️',
    coverColors: ['#1e3a8a', '#60a5fa'],
    primaryMood: 'growth',
    recordLabel: '新艺宝唱片',
    language: '国语',
    totalTracks: 10,
    totalDuration: '41:30',
    tracks: [
      { id: 'b-1', title: '路一直都在', duration: '4:45' },
      { id: 'b-2', title: '不要说话', duration: '4:22' },
      { id: 'b-3', title: '七', duration: '3:58' },
      { id: 'b-4', title: '土星环', duration: '4:35' },
      { id: 'b-5', title: '漂亮小姐', duration: '3:42' },
      { id: 'b-6', title: '我不好爱', duration: '4:08' },
      { id: 'b-7', title: '2001太空漫游', duration: '4:15' },
      { id: 'b-8', title: 'Aren\'t You Glad', duration: '4:12' },
      { id: 'b-9', title: '独居动物', duration: '3:55' },
      { id: 'b-10', title: '倒带人生', duration: '3:38' },
    ],
    productionTeam: [
      { role: '制作人', name: '吴向飞、Adrian Fu' },
      { role: '作曲', name: 'Adrian Fu、黄韵玲等' },
      { role: '作词', name: '吴向飞、葛大为等' },
      { role: '编曲', name: '刘志远、Mac Chew等' },
    ],
    backgroundStory:
      '《不想放手》是陈奕迅的第六张国语专辑，专辑名称表达了对生活的坚持和不放弃的态度。这张专辑在音乐风格上更加多元，融入了摇滚、民谣、电子等多种元素，展现了陈奕迅不断突破自我的音乐探索。其中《路一直都在》是一首励志歌曲，由吴向飞作词、Adrian Fu作曲，以温暖的旋律和积极的歌词，鼓励人们在面对困难时要勇往直前，成为很多人在低谷时的精神支柱。《不要说话》则是一首深情的慢歌，以细腻的情感和动人的旋律，打动了无数听众。',
    criticalReception:
      '这张专辑获得了第20届台湾金曲奖最佳国语男歌手奖提名，虽然最终未获奖，但获得了广泛的好评。《路一直都在》获得了多个音乐奖项，成为陈奕迅国语歌曲中的励志经典。评论家认为，这张专辑在音乐性上有很多新的尝试和突破，展现了陈奕迅作为全能歌手的实力。专辑中的英文歌曲《Aren\'t You Glad》也展现了陈奕迅的国际化音乐视野。',
    funFacts: [
      '《路一直都在》是很多人在低谷时的励志神曲',
      '专辑中有一首英文歌《Aren\'t You Glad》，展现了陈奕迅的国际化视野',
      '《土星环》是一首创意独特的科幻题材歌曲',
    ],
    relatedAlbumIds: ['ren-le-ba', 'shang-wu-lou'],
    eraNote: '2008年，路一直都在，陈奕迅用歌声给我们力量。',
  },
  {
    id: 'h3m',
    title: 'H3M',
    artist: '陈奕迅',
    year: 2009,
    month: 3,
    coverEmoji: '🚀',
    coverColors: ['#0f172a', '#334155'],
    primaryMood: 'regret',
    recordLabel: '新艺宝唱片',
    language: '粤语',
    totalTracks: 10,
    totalDuration: '40:25',
    tracks: [
      { id: 'hm-1', title: '今天只做一件事', duration: '3:56' },
      { id: 'hm-2', title: '还有什么可以送给你', duration: '4:22' },
      { id: 'hm-3', title: '七百年后', duration: '4:38' },
      { id: 'hm-4', title: 'Allegro Opus 3.3am', duration: '3:45' },
      { id: 'hm-5', title: '于心有愧', duration: '4:12' },
      { id: 'hm-6', title: '太阳照常升起', duration: '4:05' },
      { id: 'hm-7', title: '不来也不去', duration: '4:18' },
      { id: 'hm-8', title: '时代巨轮', duration: '3:58' },
      { id: 'hm-9', title: '沙龙', duration: '4:15' },
      { id: 'hm-10', title: 'Life Goes On', duration: '2:56' },
    ],
    productionTeam: [
      { role: '制作人', name: '梁荣骏、叶广权' },
      { role: '作曲', name: '柳重言、邓建明等' },
      { role: '作词', name: '林夕、林若宁等' },
      { role: '编曲', name: '刘志远、唐奕聪等' },
    ],
    backgroundStory:
      '《H3M》是陈奕迅2009年发行的粤语专辑，专辑名称"H3M"是粤语"好好好卖"的拼音首字母缩写，也是他的乐队名称。这张专辑是陈奕迅与他的巡回演唱会乐队共同创作的，因此音乐风格更加多元化，充满了乐队的即兴感和现场感。专辑中的《七百年后》由林若宁作词、柳重言作曲，灵感来自电影《机器人瓦力》，以跨越时空的爱情为主题，意境深远动人。《沙龙》则由黄伟文作词，以摄影为主题，讲述了人生中那些值得珍藏的瞬间。',
    criticalReception:
      '这张专辑获得了第32届十大中文金曲的全年最高销量男歌手奖，以及叱咤乐坛流行榜颁奖典礼的叱咤乐坛男歌手金奖等多个奖项。《七百年后》获得了2009年度叱咤乐坛流行榜颁奖典礼的专业推介叱咤十大歌曲奖。评论家认为，这张专辑展现了陈奕迅在音乐上的成熟和自信，与乐队的合作也让音乐更加有生命力和现场感。',
    funFacts: [
      '专辑名称"H3M"是粤语"好好好卖"的拼音首字母缩写',
      '《七百年后》的创作灵感来自电影《机器人瓦力》',
      '这张专辑是陈奕迅与他的演唱会乐队共同创作的',
    ],
    relatedAlbumIds: ['u87', 'the-key'],
    eraNote: '2009年，H3M乐队横空出世，陈奕迅的音乐更加多元。',
  },
  {
    id: 'shang-wu-lou',
    title: '上五楼的快活',
    artist: '陈奕迅',
    year: 2009,
    month: 9,
    coverEmoji: '📜',
    coverColors: ['#581c87', '#a78bfa'],
    primaryMood: 'growth',
    recordLabel: '新艺宝唱片',
    language: '国语',
    totalTracks: 11,
    totalDuration: '45:20',
    tracks: [
      { id: 'sw-1', title: '今天怎么了', duration: '4:02' },
      { id: 'sw-2', title: '心的距离', duration: '4:35' },
      { id: 'sw-3', title: '你为什么哭了呢', duration: '4:12' },
      { id: 'sw-4', title: '打回原形', duration: '4:08' },
      { id: 'sw-5', title: '伤信', duration: '3:58' },
      { id: 'sw-6', title: '伤心证明书', duration: '4:16' },
      { id: 'sw-7', title: '给你', duration: '4:25' },
      { id: 'sw-8', title: 'Nothing Ever Happened', duration: '3:45' },
      { id: 'sw-9', title: '从何说起', duration: '4:18' },
      { id: 'sw-10', title: '多少', duration: '3:52' },
      { id: 'sw-11', title: '上五楼的快活', duration: '3:49' },
    ],
    productionTeam: [
      { role: '制作人', name: '陈奂仁、林暐哲' },
      { role: '作曲', name: '陈奂仁、范晓萱等' },
      { role: '作词', name: '林夕、陈奂仁等' },
      { role: '编曲', name: '陈奂仁、林暐哲等' },
    ],
    backgroundStory:
      '《上五楼的快活》是陈奕迅的第七张国语专辑，也是他与台湾独立音乐人深度合作的一张作品。专辑名称"上五楼的快活"来源于录音室所在的楼层，表达了音乐创作带来的简单快乐。这张专辑在音乐风格上更加多元化，融入了独立音乐、民谣、摇滚等多种元素，展现了陈奕迅音乐的另一面。专辑邀请了陈奂仁、林暐哲、范晓萱等多位台湾音乐人合作，碰撞出了不一样的音乐火花。《心的距离》等歌曲展现了陈奕迅对不同音乐风格的驾驭能力。',
    criticalReception:
      '这张专辑获得了第21届台湾金曲奖最佳国语男歌手奖提名，是陈奕迅在国语音乐领域的又一次重要尝试。评论家认为，这张专辑在音乐性上有很多创新和突破，与独立音乐人的合作也让音乐更加多元和有个性。虽然商业成绩不如之前的几张国语专辑，但在音乐品质上获得了业内人士的高度评价。',
    funFacts: [
      '专辑名称"上五楼的快活"来源于录音室所在的五楼',
      '这张专辑与多位台湾独立音乐人合作，风格更加多元',
      '《Nothing Ever Happened》是一首英文歌曲，展现了国际化风格',
    ],
    relatedAlbumIds: ['bu-xiang-fang-shou', 'wen-ma'],
    eraNote: '2009年，陈奕迅登上五楼，用音乐带来最简单的快乐。',
  },
  {
    id: 'wen-ma',
    title: '?',
    artist: '陈奕迅',
    year: 2011,
    month: 11,
    coverEmoji: '🎭',
    coverColors: ['#2a1a2a', '#6b3a5a'],
    primaryMood: 'lonely',
    recordLabel: '新艺宝唱片',
    language: '国语',
    totalTracks: 13,
    totalDuration: '49:45',
    tracks: [
      { id: 'wm-1', title: '孤独患者', duration: '4:32' },
      { id: 'wm-2', title: '哎呀咿呀', duration: '4:12' },
      { id: 'wm-3', title: '看穿', duration: '3:55' },
      { id: 'wm-4', title: '吟游诗人', duration: '4:18' },
      { id: 'wm-5', title: '等你爱我', duration: '4:25' },
      { id: 'wm-6', title: '不如这样', duration: '4:38' },
      { id: 'wm-7', title: '内疚', duration: '3:52' },
      { id: 'wm-8', title: 'Muffin Man', duration: '4:05' },
      { id: 'wm-9', title: '那些让你死去活来的女孩', duration: '3:58' },
      { id: 'wm-10', title: '跳蚤市场', duration: '3:42' },
      { id: 'wm-11', title: '神奇化妆师', duration: '4:15' },
      { id: 'wm-12', title: '听一千遍后', duration: '4:22' },
      { id: 'wm-13', title: '还要更快乐', duration: '3:31' },
    ],
    productionTeam: [
      { role: '制作人', name: '方大同、陈小霞' },
      { role: '作曲', name: '方大同、陈小霞等' },
      { role: '作词', name: '林夕、施人诚等' },
      { role: '编曲', name: '刘志远、陈辉阳等' },
    ],
    backgroundStory:
      '《?》是陈奕迅的第八张国语专辑，专辑名称用一个问号，表达了对人生、对爱情、对世界的思考与追问。这张专辑集结了方大同、陈小霞等顶级创作人，音乐风格多元，情感细腻深刻。《孤独患者》由小霞作曲、小寒作词，以独特的视角描绘了外向孤独症患者的内心世界，唱出了很多人的心声，成为现象级歌曲。这首歌让很多人意识到，那些看起来最开朗的人，内心可能是最孤独的。整张专辑就像一次对内心深处的探索，引导听众思考生命中的各种问号。',
    criticalReception:
      '这张专辑获得了第23届台湾金曲奖最佳国语男歌手奖，陈奕迅再次获得金曲歌王的殊荣。《孤独患者》获得了多个音乐奖项，成为2011年度最受欢迎的国语歌曲之一。专辑在全亚洲销量突破150万张，商业成绩斐然。评论家认为，这张专辑在音乐性和概念性上都达到了很高的水准，是陈奕迅国语作品中的又一巅峰之作。',
    funFacts: [
      '专辑名称"?"代表对人生的思考和追问',
      '《孤独患者》唱出了"外向孤独症"患者的心声，引发广泛共鸣',
      '方大同为陈奕迅量身打造了多首歌曲，两人合作默契',
    ],
    relatedAlbumIds: ['shang-wu-lou', 'stranger-under-skin'],
    eraNote: '2011年，《孤独患者》唱哭了无数在人群中孤独的人。',
  },
  {
    id: 'stranger-under-skin',
    title: 'Stranger Under My Skin',
    artist: '陈奕迅',
    year: 2011,
    month: 2,
    coverEmoji: '🌷',
    coverColors: ['#9a3412', '#fb923c'],
    primaryMood: 'reunion',
    recordLabel: '新艺宝唱片',
    language: '粤语/国语',
    totalTracks: 9,
    totalDuration: '38:15',
    tracks: [
      { id: 'st-1', title: '乐园', duration: '4:12' },
      { id: 'st-2', title: '等你爱我', duration: '4:25' },
      { id: 'st-3', title: '因为爱情', duration: '3:38' },
      { id: 'st-4', title: '春天里', duration: '4:43' },
      { id: 'st-5', title: '我的摇篮', duration: '4:05' },
      { id: 'st-6', title: 'Stranger Under My Skin', duration: '4:32' },
      { id: 'st-7', title: '苦瓜', duration: '4:18' },
      { id: 'st-8', title: '最后派对', duration: '4:22' },
      { id: 'st-9', title: '沼气', duration: '3:42' },
    ],
    productionTeam: [
      { role: '制作人', name: '梁荣骏、舒文' },
      { role: '作曲', name: '黄韵玲、泽日生等' },
      { role: '作词', name: '林夕、黄伟文等' },
      { role: '编曲', name: '刘志远、唐奕聪等' },
    ],
    backgroundStory:
      '《Stranger Under My Skin》是陈奕迅2011年发行的一张EP，专辑名称意为"皮肤下的陌生人"，表达了对自我身份的探索和思考。这张EP收录了多首不同风格的歌曲，既有粤语也有国语，展现了陈奕迅音乐的多元面貌。其中《因为爱情》是电影《将爱情进行到底》的主题曲，由陈奕迅与王菲合唱，成为现象级歌曲，传遍了大街小巷。《苦瓜》则是一首粤语哲理歌曲，以苦瓜为意象，讲述了人生的苦与甜，寓意深刻。',
    criticalReception:
      '这张EP获得了广泛好评，《因为爱情》获得了第11届华语音乐传媒大奖年度国语歌曲奖等多个重要奖项。这首歌不仅在商业上取得了巨大成功，更成为了一代人的情感记忆。《苦瓜》也获得了多个粤语歌曲奖项，被认为是陈奕迅后期的经典作品之一。评论家认为，这张EP虽然篇幅不长，但品质极高，展现了陈奕迅对不同风格歌曲的驾驭能力。',
    funFacts: [
      '《因为爱情》是陈奕迅与王菲的经典合唱，传遍了大街小巷',
      '《苦瓜》是一首哲理歌曲，以苦瓜比喻人生百味',
      '专辑名称"Stranger Under My Skin"表达了对自我的探索',
    ],
    relatedAlbumIds: ['wen-ma', '3mm'],
    eraNote: '2011年，因为爱情，陈奕迅和王菲的声音永远刻在我们心里。',
  },
  {
    id: '3mm',
    title: '...3mm',
    artist: '陈奕迅',
    year: 2012,
    month: 8,
    coverEmoji: '☁️',
    coverColors: ['#0369a1', '#7dd3fc'],
    primaryMood: 'growth',
    recordLabel: '新艺宝唱片',
    language: '粤语',
    totalTracks: 10,
    totalDuration: '38:20',
    tracks: [
      { id: '3-1', title: '重口味', duration: '3:45' },
      { id: '3-2', title: '非走不可', duration: '3:52' },
      { id: '3-3', title: 'Class', duration: '3:48' },
      { id: '3-4', title: '碌卡', duration: '4:12' },
      { id: '3-5', title: '笑死朕', duration: '3:35' },
      { id: '3-6', title: '蚊', duration: '3:58' },
      { id: '3-7', title: 'Let It Out', duration: '4:05' },
      { id: '3-8', title: '习惯说', duration: '3:42' },
      { id: '3-9', title: '梦想天空分外蓝', duration: '3:44' },
      { id: '3-10', title: '信任', duration: '3:59' },
    ],
    productionTeam: [
      { role: '制作人', name: 'Eric Kwok、林夕' },
      { role: '作曲', name: 'Eric Kwok、郭伟亮等' },
      { role: '作词', name: '林夕、黄伟文等' },
      { role: '编曲', name: 'Eric Kwok、唐奕聪等' },
    ],
    backgroundStory:
      '《...3mm》是陈奕迅2012年发行的粤语专辑，专辑名称"3mm"代表"3 married men"——三个已婚男人，指的是陈奕迅、Eric Kwok和Jerald这三位已为人父的音乐人。这张专辑是他们以"SWING"组合的名义合作创作的，音乐风格轻快活泼，充满了都市感和幽默感。《重口味》是一首复古风格的快歌，向80年代的香港乐坛致敬，节奏感十足，让人忍不住跟着摇摆。《碌卡》则以信用卡为主题，讽刺了现代都市人的消费主义生活方式，歌词幽默而有深度。',
    criticalReception:
      '这张专辑获得了叱咤乐坛流行榜颁奖典礼的叱咤乐坛男歌手金奖等多个奖项。《重口味》获得了2012年度叱咤乐坛流行榜颁奖典礼的专业推介叱咤十大歌曲奖，以及十大劲歌金曲奖。评论家认为，这张专辑在音乐上有很多新的尝试和突破，展现了陈奕迅作为全能歌手的实力。专辑的概念性和完整性也获得了高度评价。',
    funFacts: [
      '专辑名称"3mm"代表三个已婚男人的音乐合作',
      '《重口味》致敬了80年代香港乐坛的复古风格',
      '《碌卡》讽刺了现代都市人的消费主义',
    ],
    relatedAlbumIds: ['h3m', 'the-key'],
    eraNote: '2012年，三个已婚男人的音乐狂欢，陈奕迅的3mm时代。',
  },
  {
    id: 'the-key',
    title: 'The Key',
    artist: '陈奕迅',
    year: 2013,
    month: 7,
    coverEmoji: '⛰️',
    coverColors: ['#134e4a', '#2dd4bf'],
    primaryMood: 'growth',
    recordLabel: '新艺宝唱片',
    language: '粤语',
    totalTracks: 9,
    totalDuration: '37:40',
    tracks: [
      { id: 'tk-1', title: '主旋律', duration: '4:12' },
      { id: 'tk-2', title: '告别娑婆', duration: '4:25' },
      { id: 'tk-3', title: '任我行', duration: '4:04' },
      { id: 'tk-4', title: '失忆蝴蝶', duration: '3:58' },
      { id: 'tk-5', title: '床头床尾', duration: '3:52' },
      { id: 'tk-6', title: '远在咫尺', duration: '4:18' },
      { id: 'tk-7', title: '阿猫阿狗', duration: '3:45' },
      { id: 'tk-8', title: '告别娑婆 (Live)', duration: '4:35' },
      { id: 'tk-9', title: '主旋律 (Reprise)', duration: '3:31' },
    ],
    productionTeam: [
      { role: '制作人', name: '梁荣骏、C.Y. Kong' },
      { role: '作曲', name: '泽日生、C.Y. Kong等' },
      { role: '作词', name: '林夕、林若宁等' },
      { role: '编曲', name: 'C.Y. Kong、刘志远等' },
    ],
    backgroundStory:
      '《The Key》是陈奕迅2013年发行的粤语专辑，专辑名称"The Key"意为"钥匙"，象征着打开心门、理解人生的钥匙。这张专辑延续了陈奕迅一贯的高品质水准，收录了多首经典之作。《任我行》由泽日生作曲、林夕作词，以仙本那的旅行经历为灵感，讲述了自由与归属感的主题，旋律优美，歌词意境深远，成为陈奕迅后期的代表作之一。整张专辑就像一次心灵之旅，引导听众寻找属于自己的那把钥匙。',
    criticalReception:
      '这张专辑获得了第36届十大中文金曲的全年最高销量男歌手奖等多个奖项。《任我行》获得了2013年度叱咤乐坛流行榜颁奖典礼的专业推介叱咤十大歌曲奖，以及十大劲歌金曲奖。评论家认为，这张专辑在音乐性和歌词深度上都达到了很高的水准，展现了陈奕迅作为"歌神接班人"的实力和地位。',
    funFacts: [
      '《任我行》的创作灵感来自林夕去仙本那旅行的经历',
      '专辑名称"The Key"象征打开心门的钥匙',
      '这是陈奕迅与林夕、泽日生黄金组合的又一次经典合作',
    ],
    relatedAlbumIds: ['3mm', 'cmon-in'],
    eraNote: '2013年，任我行，陈奕迅告诉我们：人生的路要自己走。',
  },
  {
    id: 'cmon-in',
    title: "C'mon In~",
    artist: '陈奕迅',
    year: 2017,
    month: 10,
    coverEmoji: '🌃',
    coverColors: ['#1a1423', '#4a3f6b'],
    primaryMood: 'lonely',
    recordLabel: '环球唱片',
    language: '国语',
    totalTracks: 10,
    totalDuration: '38:55',
    tracks: [
      { id: 'c-1', title: '放', duration: '3:45' },
      { id: 'c-2', title: '收心操', duration: '4:02' },
      { id: 'c-3', title: '海胆', duration: '3:52' },
      { id: 'c-4', title: '谁来剪月光', duration: '3:58' },
      { id: 'c-5', title: '披风', duration: '3:58' },
      { id: 'c-6', title: '零下几分钟', duration: '4:15' },
      { id: 'c-7', title: '人工智能', duration: '4:08' },
      { id: 'c-8', title: '不想放手', duration: '3:42' },
      { id: 'c-9', title: '之外', duration: '4:12' },
      { id: 'c-10', title: '一个灵魂的独白', duration: '3:58' },
    ],
    productionTeam: [
      { role: '制作人', name: '陈哲庐、Jerald' },
      { role: '作曲', name: '陈哲庐、易家扬等' },
      { role: '作词', name: '易家扬、陈咏谦等' },
      { role: '编曲', name: 'Jerald、陈哲庐等' },
    ],
    backgroundStory:
      '《C\'mon In~》是陈奕迅加盟环球唱片后的首张国语专辑，专辑名称意为"进来吧"，以轻松的姿态邀请听众进入他的音乐世界。这张专辑由香港音乐人陈哲庐和Jerald担任制作人，音乐风格更加多元和国际化，融合了灵魂乐、电子、爵士等多种元素。专辑中的《披风》由易家扬作词，以温暖的旋律和深刻的歌词，讲述了每个人心中都有一件"披风"，在困难的时候给我们力量。《人工智能》则探讨了科技与人性的关系，创意十足。',
    criticalReception:
      '这张专辑获得了第29届台湾金曲奖最佳国语男歌手奖，陈奕迅第三次获得金曲歌王的殊荣。专辑在音乐风格上的创新和突破获得了广泛好评。评论家认为，这张专辑展现了陈奕迅在音乐上不断探索和突破的精神，他不满足于现有的成就，而是持续挑战自我，尝试新的音乐风格和表达方式。',
    funFacts: [
      '这是陈奕迅加盟环球唱片后的首张国语专辑',
      '《披风》是送给每一个在困难中坚持的人的歌曲',
      '《人工智能》探讨了科技与人性的关系，很有前瞻性',
    ],
    relatedAlbumIds: ['the-key', 'wen-ma'],
    eraNote: '2017年，C\'mon In~，陈奕迅带着新音乐回来了。',
  },
];

export const getAlbumById = (id: string): Album | undefined => {
  return albums.find((a) => a.id === id);
};

export const getAlbumsByYear = (year: number): Album[] => {
  return albums.filter((a) => a.year === year);
};

export const getAllYears = (): number[] => {
  const years = [...new Set(albums.map((a) => a.year))];
  return years.sort((a, b) => b - a);
};

export const getAlbumsGroupedByYear = (): Record<number, Album[]> => {
  const grouped: Record<number, Album[]> = {};
  albums.forEach((album) => {
    if (!grouped[album.year]) {
      grouped[album.year] = [];
    }
    grouped[album.year].push(album);
  });
  return grouped;
};

export const getRelatedAlbums = (albumId: string, limit = 3): Album[] => {
  const current = getAlbumById(albumId);
  if (!current) return [];

  const related = current.relatedAlbumIds
    .map((id) => getAlbumById(id))
    .filter((album) => album !== undefined)
    .slice(0, limit) as Album[];

  if (related.length >= limit) return related;

  const sameMood = albums
    .filter((a) => a.primaryMood === current.primaryMood && a.id !== albumId)
    .filter((a) => !related.some((r) => r.id === a.id))
    .slice(0, limit - related.length);

  return [...related, ...sameMood];
};