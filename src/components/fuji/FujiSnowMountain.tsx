import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Snowflake, Heart, Eye, EyeOff, Mountain, Wind } from 'lucide-react';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

export interface RegretCard {
  id: string;
  content: string;
  author: string;
  createdAt: number;
  position: { x: number; y: number };
  side: 'left' | 'right';
  isOwner: boolean;
  snowLevel: number;
}

const STORAGE_KEY = 'fuji_snow_mountain_cards';
const SNOW_INCREMENT_INTERVAL = 30000;
const MAX_SNOW_LEVEL = 100;

const generateMockCards = (): RegretCard[] => {
  const mockContents = [
    { content: '那个没说出口的再见', author: '匿名旅人' },
    { content: '对不起，我没能遵守约定', author: '雪中脚印' },
    { content: '如果当初勇敢一点...', author: '远山的人' },
    { content: '奶奶，我好想你', author: '云上的日子' },
    { content: '那封没有寄出的信', author: '北风吹过' },
    { content: '我们还会再见面吗', author: '等待春天' },
    { content: '我学会了好好告别', author: '雪融之后' },
  ];

  return mockContents.map((item, index) => ({
    id: `mock-${index}`,
    content: item.content,
    author: item.author,
    createdAt: Date.now() - (index + 1) * 86400000 * (index + 2),
    position: {
      x: 50 + (index % 3) * 150,
      y: 380 - index * 55,
    },
    side: index % 2 === 0 ? 'left' : 'right',
    isOwner: false,
    snowLevel: Math.min(100, (index + 1) * 12),
  }));
};

const MountainPath = ({ isNight }: { isNight: boolean }) => {
  const snowColor = isNight ? '#e8eef5' : '#ffffff';
  const shadowColor = isNight ? '#6b8ba8' : '#a0b8d0';
  const rockColor = isNight ? '#3a4a5c' : '#5a6a7c';

  return (
    <g>
      <defs>
        <linearGradient id="mountainSnow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={snowColor} />
          <stop offset="70%" stopColor={snowColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={shadowColor} />
        </linearGradient>
        <linearGradient id="mountainRock" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={shadowColor} />
          <stop offset="100%" stopColor={rockColor} />
        </linearGradient>
        <filter id="snowGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M0 500 L150 280 L250 320 L350 180 L450 250 L550 120 L650 200 L750 100 L900 220 L900 500 Z"
        fill="url(#mountainRock)"
        opacity="0.4"
      />

      <path
        d="M0 500 L180 300 L280 340 L380 200 L480 270 L580 140 L680 220 L780 120 L900 240 L900 500 Z"
        fill="url(#mountainRock)"
        opacity="0.6"
      />

      <path
        d="M0 500 L200 320 L300 360 L400 220 L500 290 L600 160 L700 240 L800 140 L900 260 L900 500 Z"
        fill="url(#mountainSnow)"
        filter="url(#snowGlow)"
      />

      <path
        d="M200 320 L250 270 L300 360"
        fill="none"
        stroke={isNight ? '#ffffff' : '#f0f0f0'}
        strokeWidth="2"
        opacity="0.6"
      />
      <path
        d="M400 220 L450 170 L500 290"
        fill="none"
        stroke={isNight ? '#ffffff' : '#f0f0f0'}
        strokeWidth="2"
        opacity="0.5"
      />
      <path
        d="M600 160 L650 110 L700 240"
        fill="none"
        stroke={isNight ? '#ffffff' : '#f0f0f0'}
        strokeWidth="2"
        opacity="0.4"
      />

      <path
        d="M430 500 Q450 450 440 400 Q430 350 460 300 Q480 250 460 200 Q440 150 470 100"
        fill="none"
        stroke={isNight ? '#8b9cb0' : '#6b7c90'}
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M430 500 Q450 450 440 400 Q430 350 460 300 Q480 250 460 200 Q440 150 470 100"
        fill="none"
        stroke={isNight ? '#aabbcc' : '#8b9cb0'}
        strokeWidth="3"
        strokeDasharray="12 8"
        opacity="0.5"
      />
    </g>
  );
};

const FallingSnow = ({ isNight, count }: { isNight: boolean; count: number }) => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 900,
      startY: -20 - Math.random() * 500,
      size: Math.random() * 3 + 1,
      duration: 8 + Math.random() * 7,
      delay: Math.random() * 10,
      swayAmount: 15 + Math.random() * 25,
    }));
  }, [count]);

  const flakeColor = isNight ? '#ffffff' : '#e8eef5';

  return (
    <g>
      <style>
        {`
          @keyframes snow-fall {
            0% { transform: translate(0, 0); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.6; }
            100% { transform: translate(var(--sway), 520px); opacity: 0; }
          }
          .snow-flake {
            animation: snow-fall var(--duration) linear var(--delay) infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .snow-flake { animation: none; }
          }
        `}
      </style>
      {snowflakes.map((flake) => (
        <circle
          key={flake.id}
          cx={flake.x}
          cy={flake.startY}
          r={flake.size}
          fill={flakeColor}
          className="snow-flake"
          style={{
            '--duration': `${flake.duration}s`,
            '--delay': `${flake.delay}s`,
            '--sway': `${flake.swayAmount}px`,
          } as React.CSSProperties}
        />
      ))}
    </g>
  );
};

const CardComponent = ({
  card,
  isNight,
  showAllContent,
  onReveal,
}: {
  card: RegretCard;
  isNight: boolean;
  showAllContent: boolean;
  onReveal: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const snowOpacity = card.snowLevel / 100;
  const canSeeContent = card.isOwner || showAllContent;

  const cardColor = card.isOwner
    ? isNight
      ? 'rgba(78, 205, 196, 0.9)'
      : 'rgba(78, 205, 196, 0.85)'
    : isNight
    ? 'rgba(255, 255, 255, 0.9)'
    : 'rgba(255, 255, 255, 0.85)';

  return (
    <motion.g
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onReveal}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
    >
      <g transform={`translate(${card.position.x}, ${card.position.y}) rotate(${card.side === 'left' ? -8 : 8})`}>
        <motion.rect
          x="-60"
          y="-40"
          width="120"
          height="80"
          rx="4"
          fill={cardColor}
          stroke={card.isOwner ? '#4ecdc4' : isNight ? '#8b9cb0' : '#6b7c90'}
          strokeWidth="1.5"
          initial={false}
          animate={{
            scale: isHovered ? 1.1 : 1,
            y: isHovered ? -5 : 0,
            filter: isHovered
              ? `drop-shadow(0 10px 20px rgba(0,0,0,0.3))`
              : `drop-shadow(0 4px 8px rgba(0,0,0,0.2))`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />

        <line
          x1="0"
          y1="-40"
          x2="0"
          y2="-60"
          stroke={isNight ? '#6b8ba8' : '#8b9cb0'}
          strokeWidth="2"
        />
        <circle
          cx="0"
          cy="-62"
          r="4"
          fill={isNight ? '#8b9cb0' : '#6b7c90'}
        />

        {canSeeContent ? (
          <>
            <text
              x="0"
              y="-5"
              textAnchor="middle"
              fill={isNight ? '#1a1a2e' : '#2d2d2d'}
              fontSize="10"
              fontFamily="ZCOOL XiaoWei"
              style={{ pointerEvents: 'none' }}
            >
              {card.content.length > 12 ? card.content.slice(0, 12) + '...' : card.content}
            </text>
            <text
              x="0"
              y="15"
              textAnchor="middle"
              fill={isNight ? '#4a4a5a' : '#5a5a6a'}
              fontSize="8"
              fontFamily="Noto Serif SC"
              style={{ pointerEvents: 'none' }}
            >
              — {card.author}
            </text>
          </>
        ) : (
          <>
            {[...Array(3)].map((_, i) => (
              <rect
                key={i}
                x="-45"
                y={-25 + i * 15}
                width="90"
                height="6"
                rx="3"
                fill={isNight ? '#a0b0c0' : '#c0c8d0'}
                opacity="0.5"
                style={{ filter: 'blur(3px)' }}
              />
            ))}
          </>
        )}

        <rect
          x="-60"
          y="-40"
          width="120"
          height="80"
          rx="4"
          fill="url(#snowGradient)"
          opacity={snowOpacity * 0.85}
          style={{ pointerEvents: 'none' }}
        />

        <defs>
          <linearGradient id="snowGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset={`${100 - card.snowLevel}%`} stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>

        {isHovered && card.snowLevel > 30 && (
          <g style={{ pointerEvents: 'none' }}>
            <rect
              x="-30"
              y="-55"
              width="60"
              height="18"
              rx="9"
              fill={isNight ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.9)'}
              stroke={isNight ? '#6b8ba8' : '#8b9cb0'}
              strokeWidth="1"
            />
            <text
              x="0"
              y="-43"
              textAnchor="middle"
              fill={isNight ? '#4a5a6a' : '#3a4a5a'}
              fontSize="9"
              fontFamily="Noto Serif SC"
            >
              ❄️ 积雪覆盖 {card.snowLevel}%
            </text>
          </g>
        )}

        {card.isOwner && (
          <g style={{ pointerEvents: 'none' }}>
            <circle
              cx="50"
              cy="-30"
              r="10"
              fill="#4ecdc4"
              opacity="0.9"
            />
            <Heart
              x="44"
              y="-36"
              size={12}
              fill="#ffffff"
              stroke="#ffffff"
            />
          </g>
        )}
      </g>
    </motion.g>
  );
};

const CardModal = ({
  card,
  onClose,
  isNight,
}: {
  card: RegretCard | null;
  onClose: () => void;
  isNight: boolean;
}) => {
  if (!card) return null;

  const daysPassed = Math.floor((Date.now() - card.createdAt) / 86400000);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${isNight ? '#1e3a5f' : '#e8f0f8'} 0%, ${isNight ? '#0d1a2c' : '#d0e0f0'} 100%)`,
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='white'/%3E%3Ccircle cx='80' cy='40' r='1.5' fill='white'/%3E%3Ccircle cx='50' cy='70' r='1' fill='white'/%3E%3Ccircle cx='30' cy='90' r='2' fill='white'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Snowflake size={24} className="text-white/80" />
                  <h3 className="font-display text-xl md:text-2xl text-white">
                    {card.isOwner ? '你的心事' : '山中的故事'}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div
                className="relative paper-white rounded-2xl p-6 md:p-8 mb-6"
                style={{
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                }}
              >
                <div
                  className="absolute -top-3 left-6 w-12 h-6 rounded-b-lg opacity-70"
                  style={{ background: card.isOwner ? '#4ecdc4' : '#8b9cb0' }}
                />

                <p className="font-serif text-lg md:text-xl leading-relaxed text-night-500 mb-6 text-center">
                  「{card.content}」
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-warm-300/20">
                  <span className="font-hand text-night-500/60 text-sm">
                    — {card.author}
                  </span>
                  <span className="font-hand text-night-500/40 text-xs">
                    {daysPassed === 0 ? '今天' : `${daysPassed}天前`}挂上的
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-white/70 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Snowflake size={16} />
                  <span>积雪覆盖: {card.snowLevel}%</span>
                </div>
                <div className="w-32 h-2 rounded-full bg-white/20 overflow-hidden">
                  <motion.div
                    className="h-full bg-white/60 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${card.snowLevel}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              <p className="font-hand text-center text-white/60 text-sm leading-relaxed">
                {card.snowLevel >= 100
                  ? '这份心事已经被大雪完全覆盖，但它永远留在了这座山上。带着它，继续前行吧。'
                  : card.snowLevel >= 60
                  ? '大雪正在慢慢覆盖这份记忆。不用急着忘记，让它静静地留在山里就好。'
                  : card.snowLevel >= 30
                  ? '雪还在下。有一天你会发现，那些曾经放不下的，都变成了前行的力量。'
                  : '刚挂上的心事还清晰可见。没关系，让时间和大雪慢慢处理它。'}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const AddCardModal = ({
  isOpen,
  onClose,
  onSubmit,
  isNight,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, author: string) => void;
  isNight: boolean;
}) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content.trim(), author.trim() || '匿名的登山者');
    setContent('');
    setAuthor('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${isNight ? '#1e3a5f' : '#e8f0f8'} 0%, ${isNight ? '#0d1a2c' : '#d0e0f0'} 100%)`,
              }}
            >
              <div className="relative p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Mountain size={24} className="text-white/80" />
                    <h3 className="font-display text-xl md:text-2xl text-white">
                      挂上你的心事
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <p className="font-hand text-white/70 text-sm mb-6 leading-relaxed">
                  把那些放不下的人、事、遗憾写在这里，挂在富士山的山路上。
                  雪会慢慢覆盖这些文字，但不会真正删除它们。
                  这不是遗忘，而是学会带着遗憾继续前行。
                </p>

                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="你的名字（可以匿名）"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                  />
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="写下你放不下的遗憾..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl font-hand text-white/60 hover:text-white/80 transition-colors"
                  >
                    再想想
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                    className="flex-1 py-3 rounded-xl font-display text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: content.trim()
                        ? 'linear-gradient(135deg, #4ecdc4, #44a08d)'
                        : 'rgba(255,255,255,0.2)',
                      color: '#ffffff',
                      boxShadow: content.trim()
                        ? '0 4px 20px rgba(78, 205, 196, 0.4)'
                        : 'none',
                    }}
                  >
                    挂上山路 ❄️
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function FujiSnowMountain({ isNight = true }: { isNight?: boolean }) {
  const [cards, setCards] = useState<RegretCard[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<RegretCard | null>(null);
  const [showAllContent, setShowAllContent] = useState(false);
  const [climberPosition, setClimberPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLowPerf, animationEnabled } = usePerformanceMode();

  const snowCount = isLowPerf ? 20 : 60;
  const starCount = isLowPerf ? 12 : 40;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCards([...parsed, ...generateMockCards()]);
      } catch {
        setCards(generateMockCards());
      }
    } else {
      setCards(generateMockCards());
    }
  }, []);

  useEffect(() => {
    const ownedCards = cards.filter((c) => c.isOwner);
    if (ownedCards.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ownedCards));
    }
  }, [cards]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) =>
        prev.map((card) => ({
          ...card,
          snowLevel: Math.min(MAX_SNOW_LEVEL, card.snowLevel + 1),
        }))
      );
    }, SNOW_INCREMENT_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const climbInterval = setInterval(() => {
      setClimberPosition((prev) => (prev >= 100 ? 0 : prev + 0.3));
    }, 100);
    return () => clearInterval(climbInterval);
  }, []);

  const climberCoords = useMemo(() => {
    const t = climberPosition / 100;
    const points = [
      { x: 430, y: 490 },
      { x: 450, y: 440 },
      { x: 440, y: 390 },
      { x: 430, y: 340 },
      { x: 460, y: 290 },
      { x: 480, y: 240 },
      { x: 460, y: 190 },
      { x: 440, y: 140 },
      { x: 470, y: 90 },
    ];

    const segmentIndex = Math.min(Math.floor(t * (points.length - 1)), points.length - 2);
    const segmentT = (t * (points.length - 1)) % 1;
    const p1 = points[segmentIndex];
    const p2 = points[segmentIndex + 1];

    return {
      x: p1.x + (p2.x - p1.x) * segmentT,
      y: p1.y + (p2.y - p1.y) * segmentT,
    };
  }, [climberPosition]);

  const handleAddCard = (content: string, author: string) => {
    const existingOwned = cards.filter((c) => c.isOwner).length;
    const newCard: RegretCard = {
      id: `user-${Date.now()}`,
      content,
      author,
      createdAt: Date.now(),
      position: {
        x: 100 + Math.random() * 700,
        y: 150 + existingOwned * 50 + Math.random() * 200,
      },
      side: Math.random() > 0.5 ? 'left' : 'right',
      isOwner: true,
      snowLevel: 0,
    };
    setCards([newCard, ...cards]);
  };

  const skyGradient = isNight
    ? ['#0f0c29', '#302b63', '#24243e']
    : ['#87ceeb', '#b0d4e8', '#e8dcc4'];

  return (
    <div className="relative w-full" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-center"
      >
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-4">
          <Mountain size={18} className="text-cyan-300" />
          <span className="font-hand text-warm-100/80">富士山下 · 雪山心路</span>
        </div>
        <h2 className="font-display text-2xl md:text-3xl text-warm-100 mb-2">
          把遗憾留在山里，带着故事继续走
        </h2>
        <p className="font-hand text-warm-200/60 text-sm max-w-xl mx-auto">
          「谁能凭爱意要富士山私有」——有些东西拥有过就很好了。
          把放不下的写下来，挂在山路上。雪会慢慢覆盖，但永远留在那里。
        </p>
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-hand text-sm transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
            boxShadow: '0 4px 20px rgba(78, 205, 196, 0.3)',
            color: '#ffffff',
          }}
        >
          <Plus size={18} />
          挂上我的心事
        </button>
        <button
          onClick={() => setShowAllContent(!showAllContent)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-hand text-sm transition-all ${
            showAllContent
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              : 'bg-white/5 text-warm-200/70 border border-white/10 hover:bg-white/10'
          }`}
        >
          {showAllContent ? <Eye size={16} /> : <EyeOff size={16} />}
          {showAllContent ? '显示所有内容' : '模糊他人内容'}
        </button>
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
          <Snowflake size={16} className="text-cyan-300" />
          <span className="font-hand text-warm-200/70 text-sm">
            已挂 {cards.length} 份心事
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        style={{
          boxShadow: isNight
            ? '0 0 60px rgba(78, 205, 196, 0.15), inset 0 0 120px rgba(30, 60, 100, 0.3)'
            : '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        <svg viewBox="0 0 900 500" className="w-full h-auto" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="skyGradientFuji" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={skyGradient[0]} />
              <stop offset="50%" stopColor={skyGradient[1]} />
              <stop offset="100%" stopColor={skyGradient[2]} />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="900" height="500" fill="url(#skyGradientFuji)" />

          {isNight && (
            <g opacity="0.8">
              <style>
                {`
                  @keyframes star-twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.8; }
                  }
                  .star-twinkle {
                    animation: star-twinkle var(--duration) ease-in-out var(--delay) infinite;
                  }
                  @media (prefers-reduced-motion: reduce) {
                    .star-twinkle { animation: none; opacity: 0.6; }
                  }
                `}
              </style>
              {Array.from({ length: starCount }).map((_, i) => {
                const sx = (i * 137) % 900;
                const sy = (i * 73) % 200;
                const size = ((i * 17) % 3) + 1;
                return (
                  <circle
                    key={i}
                    cx={sx}
                    cy={sy}
                    r={size}
                    fill="#ffffff"
                    className="star-twinkle"
                    style={{
                      '--duration': `${2 + (i % 3)}s`,
                      '--delay': `${i * 0.1}s`,
                    } as React.CSSProperties}
                  />
                );
              })}
            </g>
          )}

          {isNight ? (
            <g>
              <circle cx={750} cy={60} r={28} fill="#f5e6c8" opacity="0.95" />
              <circle cx={742} cy={55} r={24} fill={skyGradient[0]} opacity="0.4" />
            </g>
          ) : (
            <g>
              <circle cx={750} cy={60} r={32} fill="#fbbf24" opacity="0.9" />
              <circle
                cx={750}
                cy={60}
                r={45}
                fill="#fbbf24"
                opacity="0.2"
                filter="url(#sunGlow)"
              />
              <defs>
                <filter id="sunGlow">
                  <feGaussianBlur stdDeviation="8" />
                </filter>
              </defs>
            </g>
          )}

          <MountainPath isNight={isNight} />

          <FallingSnow isNight={isNight} count={snowCount} />

          {cards.map((card) => (
            <CardComponent
              key={card.id}
              card={card}
              isNight={isNight}
              showAllContent={showAllContent}
              onReveal={() => setSelectedCard(card)}
            />
          ))}

          <g transform={`translate(${climberCoords.x}, ${climberCoords.y})`}>
            <circle cx="0" cy="-8" r="6" fill="#4ecdc4" />
            <rect x="-4" y="-2" width="8" height="12" rx="2" fill="#4ecdc4" />
            <rect x="-6" y="2" width="12" height="2" rx="1" fill="#f4c542" />
            <line
              x1="-2"
              y1="14"
              x2="-2"
              y2="20"
              stroke={isNight ? '#8b9cb0' : '#6b7c90'}
              strokeWidth="2"
            />
            <line
              x1="2"
              y1="14"
              x2="2"
              y2="20"
              stroke={isNight ? '#8b9cb0' : '#6b7c90'}
              strokeWidth="2"
            />
            <g className="climber-glow">
              <style>
                {`
                  @keyframes climber-pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                  }
                  .climber-glow {
                    animation: climber-pulse 2s ease-in-out infinite;
                  }
                  @media (prefers-reduced-motion: reduce) {
                    .climber-glow { animation: none; opacity: 0.8; }
                  }
                `}
              </style>
              <circle cx="0" cy="-8" r="12" fill="#4ecdc4" opacity="0.2" />
            </g>
          </g>

          <g transform="translate(450, 490)">
            <g className="wind-sway">
              <style>
                {`
                  @keyframes wind-sway {
                    0%, 100% { transform: translateX(-2px); }
                    50% { transform: translateX(2px); }
                  }
                  .wind-sway {
                    animation: wind-sway 3s ease-in-out infinite;
                  }
                  @media (prefers-reduced-motion: reduce) {
                    .wind-sway { animation: none; }
                  }
                `}
              </style>
              <Wind size={20} className="text-white/40" />
            </g>
          </g>
        </svg>

        <div className="absolute bottom-4 left-4 glass-panel rounded-xl px-3 py-2 flex items-center gap-2">
          <Snowflake size={14} className="text-cyan-300" />
          <span className="font-hand text-warm-200/80 text-xs">
            雪还在下 · 心事慢慢被覆盖
          </span>
        </div>

        <div className="absolute top-4 right-4 glass-panel rounded-xl px-3 py-2 flex items-center gap-2">
          <Mountain size={14} className="text-warm-300" />
          <span className="font-hand text-warm-200/80 text-xs">
            海拔 3776m
          </span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-6 font-hand text-warm-200/50 text-sm"
      >
        爬得越高，看得越远。那些曾经以为过不去的，都会变成身后的风景。
      </motion.p>

      <AddCardModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCard}
        isNight={isNight}
      />

      <CardModal
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
        isNight={isNight}
      />
    </div>
  );
}
