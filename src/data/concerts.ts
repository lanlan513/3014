import type { MoodId } from './moods';
import { concertDetails } from './concerts/index';

export interface SetlistItem {
  id: string;
  title: string;
  duration?: string;
  isSpecial?: boolean;
  specialNote?: string;
  albumId?: string;
}

export interface StageDesign {
  id: string;
  name: string;
  description: string;
  features: string[];
  designer?: string;
  technicalSpecs?: string[];
}

export interface LiveClip {
  id: string;
  title: string;
  songTitle: string;
  concertId: string;
  concertTourId: string;
  year: number;
  city: string;
  description: string;
  highlightReason: string;
  mood: MoodId;
  duration: string;
  thumbnail: string;
}

export interface ConcertCity {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  mapX: number;
  mapY: number;
  venue?: string;
}

export interface Concert {
  id: string;
  tourId: string;
  title: string;
  date: string;
  year: number;
  cityId: string;
  venue: string;
  totalSongs: number;
  duration: string;
  attendance?: number;
  setlist: SetlistItem[];
  stageDesignId: string;
  specialGuests?: string[];
  notes?: string;
  coverEmoji: string;
  coverColors: [string, string];
  mood: MoodId;
}

export type ConcertSummary = Omit<Concert, 'setlist'>;

export interface ConcertTour {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  totalShows: number;
  totalCities: number;
  totalCountries: number;
  description: string;
  backgroundStory: string;
  tagline: string;
  coverEmoji: string;
  coverColors: [string, string];
  primaryMood: MoodId;
  stageDesign: StageDesign;
  highlights: string[];
  relatedAlbumIds: string[];
}

export const concertCities: ConcertCity[] = [
  { id: 'hong-kong', name: '香港', country: '中国', latitude: 22.3193, longitude: 114.1694, mapX: 780, mapY: 420, venue: '香港红磡体育馆' },
  { id: 'beijing', name: '北京', country: '中国', latitude: 39.9042, longitude: 116.4074, mapX: 760, mapY: 200, venue: '国家体育场（鸟巢）' },
  { id: 'shanghai', name: '上海', country: '中国', latitude: 31.2304, longitude: 121.4737, mapX: 820, mapY: 310, venue: '梅赛德斯奔驰文化中心' },
  { id: 'guangzhou', name: '广州', country: '中国', latitude: 23.1291, longitude: 113.2644, mapX: 740, mapY: 400, venue: '天河体育中心' },
  { id: 'taipei', name: '台北', country: '中国', latitude: 25.0330, longitude: 121.5654, mapX: 860, mapY: 380, venue: '台北小巨蛋' },
  { id: 'macau', name: '澳门', country: '中国', latitude: 22.1987, longitude: 113.5439, mapX: 760, mapY: 430, venue: '威尼斯人金光综艺馆' },
  { id: 'shenzhen', name: '深圳', country: '中国', latitude: 22.5431, longitude: 114.0579, mapX: 770, mapY: 410, venue: '深圳湾体育中心' },
  { id: 'chengdu', name: '成都', country: '中国', latitude: 30.5728, longitude: 104.0668, mapX: 620, mapY: 320, venue: '五粮液成都金融城演艺中心' },
  { id: 'nanjing', name: '南京', country: '中国', latitude: 32.0603, longitude: 118.7969, mapX: 800, mapY: 300, venue: '南京青奥体育中心' },
  { id: 'hangzhou', name: '杭州', country: '中国', latitude: 30.2741, longitude: 120.1551, mapX: 810, mapY: 320, venue: '黄龙体育中心' },
  { id: 'wuhan', name: '武汉', country: '中国', latitude: 30.5928, longitude: 114.3055, mapX: 750, mapY: 320, venue: '武汉体育中心' },
  { id: 'xian', name: '西安', country: '中国', latitude: 34.3416, longitude: 108.9398, mapX: 680, mapY: 280, venue: '陕西上实城开体育场' },
  { id: 'chongqing', name: '重庆', country: '中国', latitude: 29.4316, longitude: 106.9123, mapX: 640, mapY: 340, venue: '重庆奥体中心' },
  { id: 'tianjin', name: '天津', country: '中国', latitude: 39.3434, longitude: 117.3616, mapX: 770, mapY: 210, venue: '天津奥体中心' },
  { id: 'singapore', name: '新加坡', country: '新加坡', latitude: 1.3521, longitude: 103.8198, mapX: 720, mapY: 480, venue: '新加坡室内体育馆' },
  { id: 'kuala-lumpur', name: '吉隆坡', country: '马来西亚', latitude: 3.1390, longitude: 101.6869, mapX: 700, mapY: 470, venue: '武吉加里尔亚通体育馆' },
  { id: 'bangkok', name: '曼谷', country: '泰国', latitude: 13.7563, longitude: 100.5018, mapX: 680, mapY: 450, venue: 'Impact Arena' },
  { id: 'tokyo', name: '东京', country: '日本', latitude: 35.6762, longitude: 139.6503, mapX: 880, mapY: 250, venue: '东京国际论坛' },
  { id: 'osaka', name: '大阪', country: '日本', latitude: 34.6937, longitude: 135.5023, mapX: 870, mapY: 260, venue: '大阪城音乐厅' },
  { id: 'seoul', name: '首尔', country: '韩国', latitude: 37.5665, longitude: 126.9780, mapX: 850, mapY: 230, venue: 'Olympic Hall' },
  { id: 'london', name: '伦敦', country: '英国', latitude: 51.5074, longitude: -0.1278, mapX: 380, mapY: 150, venue: 'O2 Academy Brixton' },
  { id: 'manchester', name: '曼彻斯特', country: '英国', latitude: 53.4808, longitude: -2.2426, mapX: 370, mapY: 140, venue: 'Manchester Academy' },
  { id: 'new-york', name: '纽约', country: '美国', latitude: 40.7128, longitude: -74.0060, mapX: 220, mapY: 200, venue: 'Radio City Music Hall' },
  { id: 'los-angeles', name: '洛杉矶', country: '美国', latitude: 34.0522, longitude: -118.2437, mapX: 120, mapY: 260, venue: 'The Wiltern' },
  { id: 'san-francisco', name: '旧金山', country: '美国', latitude: 37.7749, longitude: -122.4194, mapX: 100, mapY: 240, venue: 'The Masonic' },
  { id: 'toronto', name: '多伦多', country: '加拿大', latitude: 43.6532, longitude: -79.3832, mapX: 230, mapY: 180, venue: 'Sony Centre' },
  { id: 'vancouver', name: '温哥华', country: '加拿大', latitude: 49.2827, longitude: -123.1207, mapX: 90, mapY: 200, venue: 'Queen Elizabeth Theatre' },
  { id: 'sydney', name: '悉尼', country: '澳大利亚', latitude: -33.8688, longitude: 151.2093, mapX: 880, mapY: 480, venue: 'Sydney Entertainment Centre' },
  { id: 'melbourne', name: '墨尔本', country: '澳大利亚', latitude: -37.8136, longitude: 144.9631, mapX: 860, mapY: 490, venue: 'Margaret Court Arena' },
];

export const stageDesigns: StageDesign[] = [
  {
    id: 'stage-easons-life',
    name: "Eason's LIFE 舞台设计",
    description: '以"生命"为主题的环形舞台设计，采用360度全景视角，中央设置巨大LED屏幕墙，配合升降机械装置打造沉浸式体验。',
    features: ['360度环形舞台', '中央巨型LED圆柱屏幕', '多层升降平台', '环绕式音响系统', '激光投影与烟雾特效'],
    designer: '周炳坤',
    technicalSpecs: ['LED分辨率: 8K', '升降台数量: 6组', '扬声器: 200+', '灯光: 500+组'],
  },
  {
    id: 'stage-duo',
    name: 'DUO 舞台设计',
    description: '以"双面人"概念为核心的不对称舞台，左右两侧风格截然不同，象征光明与黑暗、欢乐与忧伤的对立统一。',
    features: ['不对称双区舞台', '旋转式主舞台', '镜面反射装置', '垂直升降灯柱', '水幕投影系统'],
    designer: '梁志天',
    technicalSpecs: ['舞台旋转角度: 0-180度', '镜面数量: 50+块', '水幕高度: 8米'],
  },
  {
    id: 'stage-get-a-life',
    name: 'Get A Life 舞台设计',
    description: '以"病态美学"为概念的暗黑风格舞台，运用大量哥特式建筑元素和红色灯光，营造戏剧化氛围。',
    features: ['哥特式拱门背景', '红色天鹅绒幕布', '复古管风琴装置', '干冰地烟系统', '彩色玻璃投影'],
    designer: '陈辉阳',
  },
  {
    id: 'stage-moving-on-stage',
    name: 'Moving On Stage 舞台设计',
    description: '极简主义舞台风格，以白色为主色调，通过光影变化创造无限空间感，让观众专注于音乐本身。',
    features: ['纯白色极简舞台', '数控灯光矩阵', '半透明投影纱幕', '悬浮式乐器台', '地下升降通道'],
    designer: '王大仁',
    technicalSpecs: ['灯光矩阵: 400颗数控灯', '投影幕: 200寸透明幕'],
  },
  {
    id: 'stage-eason-says',
    name: "Eason Says C'mon In 舞台设计",
    description: '小型Livehouse风格舞台，拉近与观众的距离，打造亲密互动的演出氛围。',
    features: ['伸展式T台', '近距离观众区', '环绕式LED屏', '复古麦克风装置', '即兴表演区'],
  },
  {
    id: 'stage-fear-dreams',
    name: 'Fear and Dreams 舞台设计',
    description: '以"恐惧与梦想"为主题的超现实主义舞台，运用全息投影和AR技术，创造梦幻与现实交错的视觉体验。',
    features: ['全息投影系统', 'AR实时互动', '巨型艺术装置', '可变形舞台结构', '沉浸式环绕音响'],
    designer: '林俊煜',
    technicalSpecs: ['全息投影区域: 200㎡', 'AR追踪点: 50个', '舞台变形模块: 12组'],
  },
  {
    id: 'stage-classic',
    name: '早期经典演唱会舞台',
    description: '90年代至2000年代初的经典舞台设计，以乐队现场演奏为核心，配合基础灯光效果打造纯粹音乐体验。',
    features: ['传统三面台', '现场乐队专区', '基础灯光系统', 'LED背景屏幕', '简单升降台'],
  },
];

export const concertTours: ConcertTour[] = [
  {
    id: 'tour-fear-dreams',
    name: 'Fear and Dreams 世界巡回演唱会',
    startYear: 2022,
    endYear: 2024,
    totalShows: 80,
    totalCities: 30,
    totalCountries: 8,
    description: '陈奕迅时隔六年再度开启大型世界巡演，以"恐惧与梦想"为主题，探讨现代人内心深处的挣扎与希望。',
    backgroundStory: '受疫情影响，陈奕迅多年未能举办大型演唱会。这次巡演不仅是他回归舞台的宣告，更是一次对生命意义的深度思考。演出中他不仅演唱经典歌曲，更融入了大量对社会、对人生的感悟。',
    tagline: '直面恐惧，拥抱梦想',
    coverEmoji: '🌙',
    coverColors: ['#1e1b4b', '#6366f1'],
    primaryMood: 'growth',
    stageDesign: stageDesigns[5],
    highlights: ['香港红磡连开18场破纪录', '北京鸟巢两场动员10万人', '首次使用全息投影技术', '《人啊人》世界首唱'],
    relatedAlbumIds: ['u87', 'h3m'],
  },
  {
    id: 'tour-easons-life',
    name: "Eason's LIFE 世界巡回演唱会",
    startYear: 2013,
    endYear: 2016,
    totalShows: 120,
    totalCities: 50,
    totalCountries: 12,
    description: '以"生命"为主题的超大型巡演，跨越五大洲，是陈奕迅职业生涯中规模最大的巡演之一。',
    backgroundStory: '这次巡演的主题" LIFE "代表了陈奕迅对人生的感悟——每一场演出都是一次生命的体验。他希望通过音乐传递对生命的热爱与尊重。',
    tagline: 'LIVE is LIFE',
    coverEmoji: '🌟',
    coverColors: ['#7c2d12', '#f97316'],
    primaryMood: 'reunion',
    stageDesign: stageDesigns[0],
    highlights: ['累计观众超过200万人次', '巡演历时3年完成', '首次登陆英国、法国等欧洲国家', '《浮夸》大合唱成为经典场面'],
    relatedAlbumIds: ['u87', 'h3m', 'the-key'],
  },
  {
    id: 'tour-duo',
    name: 'DUO 陈奕迅2010演唱会',
    startYear: 2010,
    endYear: 2012,
    totalShows: 60,
    totalCities: 25,
    totalCountries: 6,
    description: '以"双面"为概念的经典演唱会，展现陈奕迅音乐风格的多样性与人格的多面性。',
    backgroundStory: 'DUO代表着"双重"的概念——快歌与慢歌、热闹与安静、嬉笑与深情，陈奕迅在这场演唱会中完美展现了自己的两面性。',
    tagline: '一面惊世，一面深情',
    coverEmoji: '🎭',
    coverColors: ['#0f172a', '#f43f5e'],
    primaryMood: 'lonely',
    stageDesign: stageDesigns[1],
    highlights: ['香港红磡连开18场', '《浮夸》现场版成为B站神曲', '与谭咏麟、张学友等嘉宾同台', '《陀飞轮》现场演绎感动万人'],
    relatedAlbumIds: ['u87', 'h3m', 'time-flies'],
  },
  {
    id: 'tour-get-a-life',
    name: 'Get A Life 演唱会',
    startYear: 2006,
    endYear: 2007,
    totalShows: 30,
    totalCities: 15,
    totalCountries: 4,
    description: '以"病态美学"著称的经典演唱会，暗黑风格的舞台与华丽的歌单编排，被粉丝称为"神级演唱会"。',
    backgroundStory: 'Get A Life取自"重生"之意，陈奕迅希望通过这场演唱会表达对音乐的重新理解。演唱会的哥特式美学和独特的曲目编排使其成为华语乐坛的经典之作。',
    tagline: '在黑暗中寻找光明',
    coverEmoji: '🥀',
    coverColors: ['#450a0a', '#dc2626'],
    primaryMood: 'regret',
    stageDesign: stageDesigns[2],
    highlights: ['《浮夸》首次演唱会演绎', '经典的《黑暗中漫舞》现场', '《最佳损友》引发万人大合唱', '被评为2006年度最佳演唱会'],
    relatedAlbumIds: ['u87', 'life-continues', 'whats-going-on'],
  },
  {
    id: 'tour-moving-on-stage',
    name: 'Moving On Stage 1 演唱会',
    startYear: 2007,
    endYear: 2009,
    totalShows: 45,
    totalCities: 20,
    totalCountries: 5,
    description: '极简主义风格的演唱会，以音乐本身为核心，白色舞台创造无限想象空间。',
    backgroundStory: 'Moving On Stage代表着"继续前行"，陈奕迅用最简单的舞台和最纯粹的音乐，证明好的歌声不需要过多装饰。',
    tagline: 'Let the music speak',
    coverEmoji: '🎤',
    coverColors: ['#1c1917', '#fafaf9'],
    primaryMood: 'growth',
    stageDesign: stageDesigns[3],
    highlights: ['白色极简舞台设计', '《富士山下》经典现场', '长达3小时的诚意演出', '首次尝试不换衫概念'],
    relatedAlbumIds: ['whats-going-on', 'listen-to-eason'],
  },
  {
    id: 'tour-eason-says',
    name: "Eason Says C'mon In 巡回音乐会",
    startYear: 2017,
    endYear: 2018,
    totalShows: 25,
    totalCities: 18,
    totalCountries: 6,
    description: '小型Livehouse风格的巡回音乐会，拉近与观众的距离，打造最亲密的音乐体验。',
    backgroundStory: '厌倦了大型场馆的距离感，陈奕迅选择回归小型场地，与歌迷进行近距离的音乐交流。每一场都是独一无二的即兴演出。',
    tagline: 'Come on in, the music is fine',
    coverEmoji: '☕',
    coverColors: ['#292524', '#a78bfa'],
    primaryMood: 'reunion',
    stageDesign: stageDesigns[4],
    highlights: ['每场合唱不同', '近距离互动', '翻唱经典歌曲', '收录于《L.O.V.E.》专辑'],
    relatedAlbumIds: ['cmon-in', 'l-o-v-e'],
  },
  {
    id: 'tour-classic-2003',
    name: 'Third Encounter 陈奕迅2003演唱会',
    startYear: 2003,
    endYear: 2004,
    totalShows: 12,
    totalCities: 6,
    totalCountries: 2,
    description: '陈奕迅早期经典演唱会，见证他从新人歌手迈向天王的关键时刻。',
    backgroundStory: '这场演唱会是陈奕迅转投新艺宝后的首次大型个唱，《十年》《K歌之王》等经典歌曲首次在演唱会中唱响。',
    tagline: '十年之前，我不认识你',
    coverEmoji: '💽',
    coverColors: ['#171717', '#fbbf24'],
    primaryMood: 'regret',
    stageDesign: stageDesigns[6],
    highlights: ['《十年》首次演唱会演唱', '华星时期与英皇时期歌曲联唱', '与杨千嬅同台合唱', '年轻Eason的青涩魅力'],
    relatedAlbumIds: ['hei-bai-hui', 'the-line-up', 'live-for-today'],
  },
  {
    id: 'tour-classic-1999',
    name: 'Big Live 陈奕迅1999演唱会',
    startYear: 1999,
    endYear: 1999,
    totalShows: 4,
    totalCities: 2,
    totalCountries: 1,
    description: '陈奕迅首次红馆个唱，开启了属于他的演唱会时代。',
    backgroundStory: '1999年，出道仅三年的陈奕迅首次登上香港红磡体育馆舞台，连开四场，证明了自己的实力与魅力。',
    tagline: '从这里开始，属于Eason的时代',
    coverEmoji: '🎬',
    coverColors: ['#1e1b4b', '#fb923c'],
    primaryMood: 'growth',
    stageDesign: stageDesigns[6],
    highlights: ['首次红馆个唱', '与梅艳芳同台合唱', '《天下无双》引发全场大合唱', '华星时期经典曲目一网打尽'],
    relatedAlbumIds: ['de-kuai-shi-dai', 'tian-you-ai-ren'],
  },
];

export const concerts: ConcertSummary[] = [
  {
    id: 'concert-fd-hk-2022-1',
    tourId: 'tour-fear-dreams',
    title: 'Fear and Dreams 香港站首场',
    date: '2022-12-09',
    year: 2022,
    cityId: 'hong-kong',
    venue: '香港红磡体育馆',
    totalSongs: 28,
    duration: '2小时45分',
    attendance: 12500,
    stageDesignId: 'stage-fear-dreams',
    coverEmoji: '🌃',
    coverColors: ['#1e1b4b', '#6366f1'],
    mood: 'growth',
    specialGuests: ['无'],
    notes: '时隔9年再踏红馆，Eason几度哽咽。开场以《时代曲》掀开序幕，全新编曲赋予经典新生命。',
  },
  {
    id: 'concert-fd-hk-2022-last',
    tourId: 'tour-fear-dreams',
    title: 'Fear and Dreams 香港站最终场',
    date: '2023-01-14',
    year: 2023,
    cityId: 'hong-kong',
    venue: '香港红磡体育馆',
    totalSongs: 35,
    duration: '3小时30分',
    attendance: 12500,
    stageDesignId: 'stage-fear-dreams',
    coverEmoji: '🌠',
    coverColors: ['#312e81', '#818cf8'],
    mood: 'reunion',
    specialGuests: ['谢霆锋', '杨千嬅'],
    notes: '香港站第18场最终场，Eason不舍落泪。与谢霆锋合唱《坏习惯》，与杨千嬅合唱《因为爱情》。',
  },
  {
    id: 'concert-fd-bj-2023',
    tourId: 'tour-fear-dreams',
    title: 'Fear and Dreams 北京站',
    date: '2023-11-10',
    year: 2023,
    cityId: 'beijing',
    venue: '国家体育场（鸟巢）',
    totalSongs: 30,
    duration: '2小时50分',
    attendance: 50000,
    stageDesignId: 'stage-fear-dreams',
    coverEmoji: '🏟️',
    coverColors: ['#1e3a8a', '#60a5fa'],
    mood: 'reunion',
    specialGuests: ['老狼'],
    notes: '首次登上鸟巢连开两场，十万观众见证。与老狼合唱《同桌的你》引发全场合唱。',
  },
  {
    id: 'concert-life-hk-2013',
    tourId: 'tour-easons-life',
    title: "Eason's LIFE 香港首场",
    date: '2013-07-06',
    year: 2013,
    cityId: 'hong-kong',
    venue: '香港红磡体育馆',
    totalSongs: 26,
    duration: '2小时30分',
    attendance: 12500,
    stageDesignId: 'stage-easons-life',
    coverEmoji: '🎪',
    coverColors: ['#7c2d12', '#f97316'],
    mood: 'reunion',
    notes: 'LIFE巡演首站，360度环形舞台首次亮相，《主旋律》世界首唱。',
  },
  {
    id: 'concert-life-sh-2014',
    tourId: 'tour-easons-life',
    title: "Eason's LIFE 上海站",
    date: '2014-04-26',
    year: 2014,
    cityId: 'shanghai',
    venue: '上海体育场',
    totalSongs: 28,
    duration: '2小时40分',
    attendance: 40000,
    stageDesignId: 'stage-easons-life',
    coverEmoji: '🎡',
    coverColors: ['#9a3412', '#fb923c'],
    mood: 'reunion',
    notes: '上海体育场四万人大合唱《十年》，场面震撼。',
  },
  {
    id: 'concert-duo-hk-2010',
    tourId: 'tour-duo',
    title: 'DUO 陈奕迅2010演唱会',
    date: '2010-03-20',
    year: 2010,
    cityId: 'hong-kong',
    venue: '香港红磡体育馆',
    totalSongs: 30,
    duration: '2小时50分',
    attendance: 12500,
    stageDesignId: 'stage-duo',
    coverEmoji: '🎭',
    coverColors: ['#4c0519', '#f43f5e'],
    mood: 'lonely',
    notes: 'DUO演唱会首场，双面概念首次呈现。《浮夸》现场版本后来成为经典。',
  },
  {
    id: 'concert-duo-hk-2010-last',
    tourId: 'tour-duo',
    title: 'DUO 陈奕迅2010演唱会最终场',
    date: '2010-04-06',
    year: 2010,
    cityId: 'hong-kong',
    venue: '香港红磡体育馆',
    totalSongs: 38,
    duration: '3小时30分',
    attendance: 12500,
    stageDesignId: 'stage-duo',
    coverEmoji: '🎪',
    coverColors: ['#881337', '#fb7185'],
    mood: 'reunion',
    specialGuests: ['谭咏麟', '张学友'],
    notes: 'DUO第18场最终场，Eason泪洒舞台。与谭咏麟合唱《爱情陷阱》，与张学友合唱《每天爱你多一些》。',
  },
  {
    id: 'concert-gal-hk-2006',
    tourId: 'tour-get-a-life',
    title: 'Get A Life 演唱会首场',
    date: '2006-02-11',
    year: 2006,
    cityId: 'hong-kong',
    venue: '香港红磡体育馆',
    totalSongs: 28,
    duration: '2小时30分',
    attendance: 12500,
    stageDesignId: 'stage-get-a-life',
    coverEmoji: '🥀',
    coverColors: ['#450a0a', '#dc2626'],
    mood: 'regret',
    notes: 'Get A Life首场，哥特式暗黑舞台震撼全场。《浮夸》首次现场演绎。',
  },
  {
    id: 'concert-gal-gz-2006',
    tourId: 'tour-get-a-life',
    title: 'Get A Life 广州站',
    date: '2006-07-29',
    year: 2006,
    cityId: 'guangzhou',
    venue: '天河体育中心',
    totalSongs: 26,
    duration: '2小时30分',
    attendance: 30000,
    stageDesignId: 'stage-get-a-life',
    coverEmoji: '🌆',
    coverColors: ['#7f1d1d', '#ef4444'],
    mood: 'regret',
    notes: '首次内地Get A Life巡演，三万广州歌迷共同见证。',
  },
  {
    id: 'concert-mos-hk-2007',
    tourId: 'tour-moving-on-stage',
    title: 'Moving On Stage 1 香港首场',
    date: '2007-10-24',
    year: 2007,
    cityId: 'hong-kong',
    venue: '香港红磡体育馆',
    totalSongs: 28,
    duration: '2小时40分',
    attendance: 12500,
    stageDesignId: 'stage-moving-on-stage',
    coverEmoji: '⚪',
    coverColors: ['#1c1917', '#fafaf9'],
    mood: 'growth',
    notes: '白色极简舞台，陈奕迅不换衫的纯净音乐之旅。',
  },
  {
    id: 'concert-say-sh-2017',
    tourId: 'tour-eason-says',
    title: "Eason Says C'mon In 上海站",
    date: '2017-11-11',
    year: 2017,
    cityId: 'shanghai',
    venue: '上海梅赛德斯奔驰文化中心',
    totalSongs: 22,
    duration: '2小时',
    attendance: 8000,
    stageDesignId: 'stage-eason-says',
    coverEmoji: '🎸',
    coverColors: ['#292524', '#a78bfa'],
    mood: 'reunion',
    notes: '小型Livehouse风格，与歌迷近距离互动。每首歌间穿插趣味脱口秀。',
  },
  {
    id: 'concert-te-hk-2003',
    tourId: 'tour-classic-2003',
    title: 'Third Encounter 2003演唱会',
    date: '2003-02-16',
    year: 2003,
    cityId: 'hong-kong',
    venue: '香港红磡体育馆',
    totalSongs: 25,
    duration: '2小时20分',
    attendance: 10000,
    stageDesignId: 'stage-classic',
    coverEmoji: '🎤',
    coverColors: ['#171717', '#fbbf24'],
    mood: 'regret',
    notes: '转投新艺宝后首次红馆个唱，见证陈奕迅的蜕变。',
  },
  {
    id: 'concert-bl-hk-1999',
    tourId: 'tour-classic-1999',
    title: 'Big Live 1999陈奕迅演唱会',
    date: '1999-10-07',
    year: 1999,
    cityId: 'hong-kong',
    venue: '香港红磡体育馆',
    totalSongs: 22,
    duration: '2小时',
    attendance: 8000,
    stageDesignId: 'stage-classic',
    coverEmoji: '📀',
    coverColors: ['#1e1b4b', '#fb923c'],
    mood: 'growth',
    notes: '首次红馆演唱会，年轻Eason青涩但充满力量。',
  },
  {
    id: 'concert-fd-sh-2023',
    tourId: 'tour-fear-dreams',
    title: 'Fear and Dreams 上海站',
    date: '2023-11-18',
    year: 2023,
    cityId: 'shanghai',
    venue: '上海体育场',
    totalSongs: 30,
    duration: '2小时50分',
    attendance: 45000,
    stageDesignId: 'stage-fear-dreams',
    coverEmoji: '🌃',
    coverColors: ['#1e3a8a', '#38bdf8'],
    mood: 'reunion',
    notes: '上海体育场连开两场，四万五千歌迷见证。',
  },
  {
    id: 'concert-fd-gz-2023',
    tourId: 'tour-fear-dreams',
    title: 'Fear and Dreams 广州站',
    date: '2023-12-29',
    year: 2023,
    cityId: 'guangzhou',
    venue: '宝能广州国际体育演艺中心',
    totalSongs: 30,
    duration: '2小时50分',
    attendance: 12000,
    stageDesignId: 'stage-fear-dreams',
    coverEmoji: '🌉',
    coverColors: ['#14532d', '#22c55e'],
    mood: 'reunion',
    specialGuests: ['容祖儿'],
    notes: '与容祖儿合唱《K歌之王》，粤语歌的故乡情怀满满。',
  },
  {
    id: 'concert-fd-cd-2024',
    tourId: 'tour-fear-dreams',
    title: 'Fear and Dreams 成都站',
    date: '2024-03-08',
    year: 2024,
    cityId: 'chengdu',
    venue: '成都东安湖体育公园',
    totalSongs: 29,
    duration: '2小时45分',
    attendance: 35000,
    stageDesignId: 'stage-fear-dreams',
    coverEmoji: '🐼',
    coverColors: ['#422006', '#a3e635'],
    mood: 'reunion',
    notes: '成都歌迷的热情如火，Eason临时加唱《成都》翻唱版。',
  },
  {
    id: 'concert-fd-tp-2024',
    tourId: 'tour-fear-dreams',
    title: 'Fear and Dreams 台北站',
    date: '2024-05-18',
    year: 2024,
    cityId: 'taipei',
    venue: '台北小巨蛋',
    totalSongs: 30,
    duration: '2小时50分',
    attendance: 11000,
    stageDesignId: 'stage-fear-dreams',
    coverEmoji: '🏔️',
    coverColors: ['#0c4a6e', '#0ea5e9'],
    mood: 'reunion',
    specialGuests: ['周杰伦'],
    notes: '与周杰伦合唱《淘汰》，两大天王同台引爆全场。',
  },
];

export const liveClips: LiveClip[] = [
  {
    id: 'clip-fuwa-duo',
    title: '《浮夸》DUO封神现场',
    songTitle: '浮夸',
    concertId: 'concert-duo-hk-2010-last',
    concertTourId: 'tour-duo',
    year: 2010,
    city: '香港',
    description: 'DUO最终场《浮夸》，Eason撕心裂肺的演绎，最后的嘶吼让全场观众起立鼓掌。',
    highlightReason: '被誉为《浮夸》最佳现场版本，情绪层层递进，最后的高音震撼人心。',
    mood: 'regret',
    duration: '05:30',
    thumbnail: '🎭',
  },
  {
    id: 'clip-tuolun-feihang',
    title: '《陀飞轮》DUO现场',
    songTitle: '陀飞轮',
    concertId: 'concert-duo-hk-2010',
    concertTourId: 'tour-duo',
    year: 2010,
    city: '香港',
    description: 'Eason演唱《陀飞轮》时眼泛泪光，将对时间流逝的感慨表达得淋漓尽致。',
    highlightReason: '歌词"用我尚有换我没有"让无数人在深夜落泪，现场演绎更添沧桑感。',
    mood: 'regret',
    duration: '04:30',
    thumbnail: '⌚',
  },
  {
    id: 'clip-shinian-changhe',
    title: '《十年》万人大合唱',
    songTitle: '十年',
    concertId: 'concert-life-sh-2014',
    concertTourId: 'tour-easons-life',
    year: 2014,
    city: '上海',
    description: '上海体育场四万人齐声高唱《十年》，Eason站在舞台中央，感动得说不出话。',
    highlightReason: '四万人的大合唱堪称华语乐坛经典场面，展现了Eason国民级的号召力。',
    mood: 'reunion',
    duration: '04:10',
    thumbnail: '🎶',
  },
  {
    id: 'clip-danche-wenrou',
    title: '《单车》的温柔',
    songTitle: '单车',
    concertId: 'concert-gal-hk-2006',
    concertTourId: 'tour-get-a-life',
    year: 2006,
    city: '香港',
    description: 'Eason演唱《单车》时，全场观众打开手机闪光灯，犹如繁星点点。',
    highlightReason: '黄伟文的词作配上Eason温暖的嗓音，唱尽了中国式父子深沉的爱。',
    mood: 'reunion',
    duration: '03:40',
    thumbnail: '🚲',
  },
  {
    id: 'clip-renwuxing',
    title: '《任我行》首唱',
    songTitle: '任我行',
    concertId: 'concert-life-hk-2013',
    concertTourId: 'tour-easons-life',
    year: 2013,
    city: '香港',
    description: '《任我行》在LIFE巡演上首次公开演唱，Eason用近乎清唱的方式开场。',
    highlightReason: '林夕的哲理歌词配上简单的钢琴伴奏，展现了Eason最纯粹的演唱功力。',
    mood: 'growth',
    duration: '04:25',
    thumbnail: '🚶',
  },
  {
    id: 'clip-fushi-shanxia',
    title: '《富士山下》现场版',
    songTitle: '富士山下',
    concertId: 'concert-mos-hk-2007',
    concertTourId: 'tour-moving-on-stage',
    year: 2007,
    city: '香港',
    description: '纯白色舞台上，Eason一身白西装演唱《富士山下》，美如画卷。',
    highlightReason: '"谁能凭爱意要富士山私有"成为一代人的爱情信条。',
    mood: 'lonely',
    duration: '04:15',
    thumbnail: '🗻',
  },
  {
    id: 'clip-zuijian-sunyou',
    title: '《最佳损友》唱哭全场',
    songTitle: '最佳损友',
    concertId: 'concert-gal-hk-2006',
    concertTourId: 'tour-get-a-life',
    year: 2006,
    city: '香港',
    description: 'Get A Life演唱会上，Eason演唱《最佳损友》时，台下歌迷哭成一片。',
    highlightReason: '"来年陌生的，是昨日最亲的某某"道尽了多少友情的无奈与遗憾。',
    mood: 'regret',
    duration: '03:55',
    thumbnail: '👥',
  },
  {
    id: 'clip-guzhe-shinian',
    title: '《孤独患者》台北现场',
    songTitle: '孤独患者',
    concertId: 'concert-fd-tp-2024',
    concertTourId: 'tour-fear-dreams',
    year: 2024,
    city: '台北',
    description: 'Eason在台北小巨蛋演唱《孤独患者》，全场万人大合唱。',
    highlightReason: '每个人都是孤独患者，这首歌唱出了现代人的内心独白。',
    mood: 'lonely',
    duration: '04:30',
    thumbnail: '🎵',
  },
  {
    id: 'clip-putao-chengshu',
    title: '《葡萄成熟时》经典演绎',
    songTitle: '葡萄成熟时',
    concertId: 'concert-duo-hk-2010-last',
    concertTourId: 'tour-duo',
    year: 2010,
    city: '香港',
    description: 'DUO最终场《葡萄成熟时》，Eason用最真挚的情感唱出了等待的意义。',
    highlightReason: '"日后尽量别教今天的泪白流"给了无数人前行的勇气。',
    mood: 'growth',
    duration: '04:45',
    thumbnail: '🍇',
  },
  {
    id: 'clip-xiyang-wuxianhao',
    title: '《夕阳无限好》动人现场',
    songTitle: '夕阳无限好',
    concertId: 'concert-life-hk-2013',
    concertTourId: 'tour-easons-life',
    year: 2013,
    city: '香港',
    description: 'LIFE巡演香港站，Eason演唱《夕阳无限好》时，全场观众一起打开手机闪光灯。',
    highlightReason: '"夕阳无限好，却是近黄昏"道出了对美好时光的珍惜。',
    mood: 'regret',
    duration: '04:20',
    thumbnail: '🌇',
  },
  {
    id: 'clip-karaoke-king',
    title: '《K歌之王》万人大合唱',
    songTitle: 'K歌之王',
    concertId: 'concert-fd-hk-2022-last',
    concertTourId: 'tour-fear-dreams',
    year: 2023,
    city: '香港',
    description: 'Fear and Dreams香港最终场，《K歌之王》引发全场万人大合唱，Eason一度哽咽。',
    highlightReason: '从2000年到2023年，《K歌之王》陪伴了几代人的青春。',
    mood: 'reunion',
    duration: '03:40',
    thumbnail: '👑',
  },
  {
    id: 'clip-yuwo-changzai',
    title: '《与我常在》温暖收尾',
    songTitle: '与我常在',
    concertId: 'concert-fd-gz-2023',
    concertTourId: 'tour-fear-dreams',
    year: 2023,
    city: '广州',
    description: '几乎每场演唱会的收尾曲，Eason总会指着观众席唱"与我常在"。',
    highlightReason: '"除非你是我，才可与我常在"是Eason与歌迷之间最美的约定。',
    mood: 'reunion',
    duration: '04:10',
    thumbnail: '🤝',
  },
];

export const getTourById = (id: string): ConcertTour | undefined => {
  return concertTours.find((t) => t.id === id);
};

export const getConcertsByTourId = (tourId: string): ConcertSummary[] => {
  return concerts.filter((c) => c.tourId === tourId).sort((a, b) => a.date.localeCompare(b.date));
};

export const getConcertsByCityId = (cityId: string): ConcertSummary[] => {
  return concerts.filter((c) => c.cityId === cityId).sort((a, b) => a.date.localeCompare(b.date));
};

export const getCityById = (id: string): ConcertCity | undefined => {
  return concertCities.find((c) => c.id === id);
};

export const getStageDesignById = (id: string): StageDesign | undefined => {
  return stageDesigns.find((s) => s.id === id);
};

export const getLiveClipsByTourId = (tourId: string): LiveClip[] => {
  return liveClips.filter((c) => c.concertTourId === tourId);
};

export const getLiveClipsByMood = (mood: MoodId): LiveClip[] => {
  return liveClips.filter((c) => c.mood === mood);
};

export const getLiveClipById = (id: string): LiveClip | undefined => {
  return liveClips.find((c) => c.id === id);
};

export const getAllTourYears = (): number[] => {
  const years = new Set<number>();
  concertTours.forEach((t) => {
    years.add(t.startYear);
    years.add(t.endYear);
  });
  return Array.from(years).sort((a, b) => a - b);
};

export const getConcertsByYear = (year: number): ConcertSummary[] => {
  return concerts.filter((c) => c.year === year).sort((a, b) => a.date.localeCompare(b.date));
};

export const getConcertStatistics = () => {
  const totalTours = concertTours.length;
  const totalConcerts = concerts.length;
  const totalCities = new Set(concerts.map((c) => c.cityId)).size;
  const totalCountries = new Set(concertCities.filter((c) => concerts.some((co) => co.cityId === c.id)).map((c) => c.country)).size;
  const totalAttendance = concerts.reduce((sum, c) => sum + (c.attendance || 0), 0);
  const totalSongs = concerts.reduce((sum, c) => sum + c.totalSongs, 0);

  const toursByYear: Record<number, number> = {};
  concertTours.forEach((t) => {
    for (let y = t.startYear; y <= t.endYear; y++) {
      toursByYear[y] = (toursByYear[y] || 0) + 1;
    }
  });

  const concertsByCity: Record<string, number> = {};
  concerts.forEach((c) => {
    concertsByCity[c.cityId] = (concertsByCity[c.cityId] || 0) + 1;
  });

  const songsFrequency: Record<string, number> = {};
  concertDetails.forEach((c) => {
    c.setlist.forEach((s) => {
      songsFrequency[s.title] = (songsFrequency[s.title] || 0) + 1;
    });
  });

  const topSongs = Object.entries(songsFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([title, count]) => ({ title, count }));

  return {
    totalTours,
    totalConcerts,
    totalCities,
    totalCountries,
    totalAttendance,
    totalSongs,
    toursByYear,
    concertsByCity,
    topSongs,
  };
};
