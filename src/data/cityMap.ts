import type { MoodId } from './moods';
import type { Record } from './records';
import { records } from './records';

export interface UserMemory {
  id: string;
  author: string;
  date: string;
  content: string;
}

export interface MapLocation {
  id: string;
  name: string;
  subtitle: string;
  mood: MoodId;
  description: string;
  x: number;
  y: number;
  type: 'street' | 'landmark' | 'shop';
  icon: string;
  connectedStreets: string[];
  associatedRecords: string[];
  memories: UserMemory[];
}

export interface Street {
  id: string;
  name: string;
  mood: MoodId;
  path: { x: number; y: number }[];
  description: string;
}

export interface CityTheme {
  name: 'day' | 'dusk' | 'night' | 'dawn';
  skyGradient: string;
  ambientColor: string;
  streetLightOpacity: number;
  windowLightOpacity: number;
  label: string;
  timeRange: string;
}

export const cityThemes: CityTheme[] = [
  {
    name: 'dawn',
    skyGradient: 'from-orange-200 via-pink-200 to-indigo-300',
    ambientColor: 'rgba(255, 180, 150, 0.15)',
    streetLightOpacity: 0.3,
    windowLightOpacity: 0.4,
    label: '黎明',
    timeRange: '05:00 - 07:00',
  },
  {
    name: 'day',
    skyGradient: 'from-sky-300 via-blue-200 to-slate-100',
    ambientColor: 'rgba(200, 220, 255, 0.1)',
    streetLightOpacity: 0,
    windowLightOpacity: 0,
    label: '白昼',
    timeRange: '07:00 - 17:00',
  },
  {
    name: 'dusk',
    skyGradient: 'from-orange-400 via-rose-400 to-purple-600',
    ambientColor: 'rgba(255, 150, 100, 0.2)',
    streetLightOpacity: 0.6,
    windowLightOpacity: 0.7,
    label: '黄昏',
    timeRange: '17:00 - 19:00',
  },
  {
    name: 'night',
    skyGradient: 'from-slate-900 via-indigo-950 to-night-500',
    ambientColor: 'rgba(30, 40, 80, 0.4)',
    streetLightOpacity: 1,
    windowLightOpacity: 1,
    label: '深夜',
    timeRange: '19:00 - 05:00',
  },
];

export const streets: Street[] = [
  {
    id: 'long-street',
    name: '长街',
    mood: 'lonely',
    path: [
      { x: 50, y: 420 },
      { x: 150, y: 400 },
      { x: 280, y: 380 },
      { x: 420, y: 360 },
      { x: 560, y: 340 },
      { x: 700, y: 320 },
      { x: 850, y: 300 },
    ],
    description: '失恋的人会走进这条长街，路灯一盏盏亮起来，像一个个没有说出口的告别。',
  },
  {
    id: 'memory-lane',
    name: '回忆巷',
    mood: 'regret',
    path: [
      { x: 120, y: 80 },
      { x: 140, y: 160 },
      { x: 180, y: 240 },
      { x: 240, y: 320 },
      { x: 280, y: 380 },
    ],
    description: '每一块石板都印着过去的脚印，巷口的老槐树见证了太多错过。',
  },
  {
    id: 'reunion-boulevard',
    name: '重逢大道',
    mood: 'reunion',
    path: [
      { x: 450, y: 80 },
      { x: 460, y: 160 },
      { x: 470, y: 240 },
      { x: 480, y: 320 },
      { x: 490, y: 360 },
    ],
    description: '樱花在季节里盛开又凋谢，总有两个人在这里不期而遇。',
  },
  {
    id: 'growth-road',
    name: '成长路',
    mood: 'growth',
    path: [
      { x: 720, y: 80 },
      { x: 700, y: 160 },
      { x: 680, y: 240 },
      { x: 660, y: 320 },
      { x: 640, y: 340 },
    ],
    description: '上坡的路总是难走的，但每一步都让你站得更高。',
  },
];

const findRecordsByMood = (mood: MoodId, count = 2): Record[] => {
  return records.filter((r) => r.mood === mood).slice(0, count);
};

export const mapLocations: MapLocation[] = [
  {
    id: 'old-pier',
    name: '旧码头',
    subtitle: '怀旧的人会来这里',
    mood: 'regret',
    description: '生锈的铁链拴着旧日的船票，咸湿的海风吹来那年夏天的味道。有人在这里等了一辈子，也没有人来。但他们说，等待本身就是一种浪漫。',
    x: 60,
    y: 440,
    type: 'landmark',
    icon: '⚓',
    connectedStreets: ['long-street'],
    associatedRecords: findRecordsByMood('regret', 3).map((r) => r.id),
    memories: [
      {
        id: 'm1',
        author: '匿名的海边人',
        date: '2024.03.15',
        content: '二十年前在这里送别他，船开了以后我站到天黑。现在码头拆了一半，我还是习惯来这里坐坐。风还是那年的风，只是我老了。',
      },
      {
        id: 'm2',
        author: '小海',
        date: '2023.08.22',
        content: '和爸爸最后一张合照就是在这个码头拍的。他走了以后，我每年生日都来这里，带上他最喜欢的珠江啤酒。',
      },
    ],
  },
  {
    id: 'midnight-convenience',
    name: '凌晨便利店',
    subtitle: '迷茫的人停留在这里',
    mood: 'lonely',
    description: '24小时不打烊的灯光，是这座城市最后的温柔。冰柜里的关东煮冒着热气，微波炉里的盒饭在转动，每一个深夜进来的人，都有自己的故事。',
    x: 500,
    y: 360,
    type: 'shop',
    icon: '🏪',
    connectedStreets: ['long-street', 'reunion-boulevard'],
    associatedRecords: findRecordsByMood('lonely', 3).map((r) => r.id),
    memories: [
      {
        id: 'm3',
        author: '失业的程序员',
        date: '2024.01.10',
        content: '被裁员的那天晚上，在这家便利店坐了四个小时。买了一罐啤酒，却没有开。店员什么也没问，只是默默递了一杯热水。',
      },
      {
        id: 'm4',
        author: '失眠患者',
        date: '2024.05.03',
        content: '凌晨三点，店里只有我和一个在吃泡面的女生。我们对视了一眼，都笑了。原来凌晨的便利店，是孤独者的秘密聚会。',
      },
    ],
  },
  {
    id: 'record-store',
    name: '深夜唱片行',
    subtitle: '收集情绪的地方',
    mood: 'reunion',
    description: '推开门就是叮铃的风铃，木质地板发出熟悉的吱呀声。老板是个沉默的男人，他从不问你想买什么，只是递来一张你刚好需要的唱片。',
    x: 780,
    y: 300,
    type: 'shop',
    icon: '💿',
    connectedStreets: ['long-street', 'growth-road'],
    associatedRecords: records.filter((r) => r.recommended).map((r) => r.id),
    memories: [
      {
        id: 'm5',
        author: '老唱片迷',
        date: '2024.02.14',
        content: '在这里找到了绝版的《U87》黑胶，老板说等了十年才遇到懂它的人。那天我们聊到打烊，他请我喝了一杯陈年普洱。',
      },
    ],
  },
  {
    id: 'cherry-park',
    name: '樱之公园',
    subtitle: '重逢的地方',
    mood: 'reunion',
    description: '每年春天樱花盛开的时候，总有旧相识在这里偶遇。长椅上刻着许多名字，有些已经模糊，有些却像昨天刚刻上去的。',
    x: 470,
    y: 180,
    type: 'landmark',
    icon: '🌸',
    connectedStreets: ['reunion-boulevard'],
    associatedRecords: findRecordsByMood('reunion', 3).map((r) => r.id),
    memories: [
      {
        id: 'm6',
        author: '林小满',
        date: '2024.04.01',
        content: '分手五年，在樱花树下遇到了他。他说他每年都来，因为我们第一次约会就在这里。我说我也是。',
      },
    ],
  },
  {
    id: 'old-cinema',
    name: '旧时光戏院',
    subtitle: '放着老电影的地方',
    mood: 'regret',
    description: '霓虹招牌坏了一半，只剩下"时光"两个字还在闪烁。最后一场电影永远是《花样年华》，散场的时候总有人红着眼眶出来。',
    x: 160,
    y: 260,
    type: 'landmark',
    icon: '🎬',
    connectedStreets: ['memory-lane'],
    associatedRecords: findRecordsByMood('regret', 2).map((r) => r.id),
    memories: [
      {
        id: 'm7',
        author: '放映师阿强',
        date: '2023.12.25',
        content: '在这里工作了三十年，见过无数情侣牵手进来，一个人出去。我自己也是。',
      },
    ],
  },
  {
    id: 'morning-hill',
    name: '晨光山顶',
    subtitle: '成长的人会爬上来',
    mood: 'growth',
    description: '山路不好走，但是山顶的日出值得。很多人在最低谷的时候爬上来，然后带着一身汗水和重新出发的勇气下山。',
    x: 760,
    y: 100,
    type: 'landmark',
    icon: '⛰️',
    connectedStreets: ['growth-road'],
    associatedRecords: findRecordsByMood('growth', 3).map((r) => r.id),
    memories: [
      {
        id: 'm8',
        author: '重新开始的Amy',
        date: '2024.06.18',
        content: '离婚后第一次爬上来，在山顶哭了整整一个小时。然后太阳出来了，我擦干眼泪，决定为自己活一次。',
      },
      {
        id: 'm9',
        author: '高考考生',
        date: '2024.06.07',
        content: '高考前一天来这里，对着山下的城市大喊"我可以"。不管结果怎样，这声呐喊我会记一辈子。',
      },
    ],
  },
  {
    id: 'tea-house',
    name: '半浮生茶馆',
    subtitle: '慢下来的地方',
    mood: 'growth',
    description: '木门铜锁，茶香袅袅。老板说这里的时钟走得比外面慢一点。喝一壶茶的时间，足够想通很多事。',
    x: 660,
    y: 200,
    type: 'shop',
    icon: '🍵',
    connectedStreets: ['growth-road'],
    associatedRecords: findRecordsByMood('growth', 2).map((r) => r.id),
    memories: [
      {
        id: 'm10',
        author: '忙了十年的张先生',
        date: '2024.03.03',
        content: '十年了第一次在工作日坐下来喝茶，才发现自己错过了多少个春天。',
      },
    ],
  },
  {
    id: 'street-food',
    name: '深夜大排档',
    subtitle: '用食物治愈深夜',
    mood: 'lonely',
    description: '炭火上的生蚝滋滋作响，啤酒碰杯的声音清脆。一个人来吃也不会尴尬，因为老板会陪你聊两句。',
    x: 320,
    y: 370,
    type: 'shop',
    icon: '🍜',
    connectedStreets: ['long-street'],
    associatedRecords: findRecordsByMood('lonely', 2).map((r) => r.id),
    memories: [
      {
        id: 'm11',
        author: '加班狗',
        date: '2024.05.20',
        content: '520那天加班到11点，一个人来吃了一碗云吞面。老板多给了我两颗云吞，说"今天也要好好吃饭"。',
      },
    ],
  },
];

export const getLocationById = (id: string): MapLocation | undefined => {
  return mapLocations.find((l) => l.id === id);
};

export const getStreetById = (id: string): Street | undefined => {
  return streets.find((s) => s.id === id);
};

export const getLocationsByMood = (mood: MoodId): MapLocation[] => {
  return mapLocations.filter((l) => l.mood === mood);
};

export const getThemeByTime = (hour: number): CityTheme => {
  if (hour >= 5 && hour < 7) return cityThemes[0];
  if (hour >= 7 && hour < 17) return cityThemes[1];
  if (hour >= 17 && hour < 19) return cityThemes[2];
  return cityThemes[3];
};
