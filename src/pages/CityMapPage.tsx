import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Sunset, Moon, Sunrise, MapPin, Info } from 'lucide-react';
import LocationModal from '@/components/map/LocationModal';
import { cityThemes, mapLocations, getThemeByTime, streets } from '@/data/cityMap';
import type { CityTheme, MapLocation } from '@/data/cityMap';
import { getMoodById, moods } from '@/data/moods';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

const MapPinComponent = ({
  location,
  onClick,
  theme,
  animationEnabled,
}: {
  location: MapLocation;
  onClick: () => void;
  theme: CityTheme;
  animationEnabled: boolean;
}) => {
  const mood = getMoodById(location.mood);
  const [hovered, setHovered] = useState(false);

  const isNight = theme.name === 'night' || theme.name === 'dusk';
  const glowIntensity = isNight ? 1 : 0.4;

  return (
    <g style={{ cursor: 'pointer' }}>
      <motion.g
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      >
        {isNight && (
          <circle
            cx={location.x}
            cy={location.y - 10}
            r={hovered ? 35 : 25}
            fill={mood?.neonColor}
            className="map-pin-glow"
            style={
              animationEnabled
                ? ({
                    ['--glow-opacity' as any]: glowIntensity * 0.4,
                    animationPlayState: 'running',
                  } as React.CSSProperties)
                : { opacity: glowIntensity * 0.4 }
            }
          />
        )}
        <motion.circle
          cx={location.x}
          cy={location.y - 10}
          r={hovered ? 22 : 18}
          fill={mood?.neonColor}
          opacity={0.2}
        />
        <motion.circle
          cx={location.x}
          cy={location.y - 10}
          r={hovered ? 16 : 13}
          fill="#1a1410"
          stroke={mood?.neonColor}
          strokeWidth={2}
          animate={{ scale: hovered ? 1.1 : 1 }}
          style={{
            filter: isNight ? `drop-shadow(0 0 8px ${mood?.neonColor})` : 'none',
          }}
        />
        <text
          x={location.x}
          y={location.y - 6}
          textAnchor="middle"
          fontSize={hovered ? 18 : 16}
          style={{ pointerEvents: 'none' }}
        >
          {location.icon}
        </text>
        <motion.g
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          style={{ pointerEvents: 'none' }}
        >
          <rect
            x={location.x - 65}
            y={location.y - 80}
            width={130}
            height={50}
            rx={8}
            fill="#1a1410"
            stroke={mood?.neonColor}
            strokeWidth={1.5}
            opacity={0.95}
          />
          <text
            x={location.x}
            y={location.y - 58}
            textAnchor="middle"
            fill="#f5e6c8"
            fontSize={13}
            fontFamily="Noto Serif SC"
            fontWeight="600"
          >
            {location.name}
          </text>
          <text
            x={location.x}
            y={location.y - 40}
            textAnchor="middle"
            fill={mood?.neonColor}
            fontSize={10}
            fontFamily="ZCOOL XiaoWei"
          >
            {location.subtitle}
          </text>
        </motion.g>
      </motion.g>
    </g>
  );
};

const StreetLight = ({ x, y, theme }: { x: number; y: number; theme: CityTheme }) => {
  const isOn = theme.streetLightOpacity > 0;
  return (
    <g opacity={theme.streetLightOpacity}>
      <line x1={x} y1={y} x2={x} y2={y - 35} stroke="#5c4510" strokeWidth={3} />
      {isOn && (
        <>
          <circle cx={x} cy={y - 37} r={4} fill="#f4c542" opacity={0.9} />
          <circle cx={x} cy={y - 37} r={20} fill="#f4c542" opacity={0.3} />
          <circle cx={x} cy={y - 20} r={40} fill="url(#streetLightGradient)" opacity={0.4} />
        </>
      )}
    </g>
  );
};

const Building = ({
  x,
  y,
  width,
  height,
  color,
  theme,
  windowRows = 3,
  windowCols = 2,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  theme: CityTheme;
  windowRows?: number;
  windowCols?: number;
}) => {
  const windows = [];
  const windowW = (width - 12) / windowCols;
  const windowH = (height - 20) / windowRows;
  for (let r = 0; r < windowRows; r++) {
    for (let c = 0; c < windowCols; c++) {
      const isLit = ((r * windowCols + c) * 7) % 10 > 4;
      windows.push(
        <rect
          key={`${r}-${c}`}
          x={x + 6 + c * windowW}
          y={y + 10 + r * windowH}
          width={windowW - 4}
          height={windowH - 6}
          fill={isLit && theme.windowLightOpacity > 0 ? '#f4c542' : '#1a1410'}
          opacity={isLit ? theme.windowLightOpacity * 0.9 : 0.6}
          rx={1}
        />
      );
    }
  }

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={color} rx={2} />
      <rect x={x} y={y} width={width} height={6} fill="#0d0a08" opacity={0.3} rx={2} />
      {windows}
      <rect x={x + width / 2 - 8} y={y + height - 18} width={16} height={18} fill="#3d2817" rx={1} />
    </g>
  );
};

const Tree = ({ x, y, theme }: { x: number; y: number; theme: CityTheme }) => {
  const isNight = theme.name === 'night' || theme.name === 'dusk';
  return (
    <g>
      <rect x={x - 3} y={y - 15} width={6} height={15} fill="#5c3d2e" />
      <circle cx={x} cy={y - 25} r={18} fill={isNight ? '#1a3a2a' : '#2d5a3d'} opacity={0.9} />
      <circle cx={x - 8} cy={y - 30} r={14} fill={isNight ? '#1a3a2a' : '#2d5a3d'} opacity={0.9} />
      <circle cx={x + 8} cy={y - 28} r={15} fill={isNight ? '#1a3a2a' : '#3d6a4d'} opacity={0.9} />
    </g>
  );
};

export default function CityMapPage() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [themeIndex, setThemeIndex] = useState<number>(3);
  const [autoTheme, setAutoTheme] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const { isLowPerf, animationEnabled } = usePerformanceMode();

  const currentTheme: CityTheme = useMemo(() => cityThemes[themeIndex], [themeIndex]);

  useEffect(() => {
    if (!autoTheme) return;
    const updateTheme = () => {
      const hour = new Date().getHours();
      const theme = getThemeByTime(hour);
      const idx = cityThemes.findIndex((t) => t.name === theme.name);
      if (idx !== -1) setThemeIndex(idx);
    };
    updateTheme();
    const interval = setInterval(updateTheme, 60000);
    return () => clearInterval(interval);
  }, [autoTheme]);

  const cycleTheme = () => {
    setAutoTheme(false);
    setThemeIndex((prev) => (prev + 1) % cityThemes.length);
  };

  const isNight = currentTheme.name === 'night' || currentTheme.name === 'dusk';

  const skyColors: Record<string, string[]> = {
    dawn: ['#ff9a8b', '#ff6b9d', '#c44569'],
    day: ['#87ceeb', '#b0d4e8', '#e8dcc4'],
    dusk: ['#ff7e5f', '#feb47b', '#6a3093'],
    night: ['#0f0c29', '#302b63', '#24243e'],
  };

  const buildingsData = [
    { x: 80, y: 90, w: 70, h: 120, color: '#2e241e', wr: 4, wc: 2 },
    { x: 350, y: 60, w: 80, h: 150, color: '#231c17', wr: 5, wc: 3 },
    { x: 600, y: 100, w: 65, h: 110, color: '#2e241e', wr: 4, wc: 2 },
    { x: 20, y: 350, w: 80, h: 60, color: '#1a1410', wr: 2, wc: 3 },
    { x: 550, y: 400, w: 90, h: 50, color: '#231c17', wr: 2, wc: 3 },
    { x: 800, y: 380, w: 70, h: 70, color: '#1a1410', wr: 2, wc: 2 },
  ];

  const treesData = [
    { x: 350, y: 450 },
    { x: 600, y: 460 },
    { x: 200, y: 450 },
    { x: 820, y: 180 },
    { x: 100, y: 200 },
  ];

  const streetLights = [
    { x: 180, y: 410 },
    { x: 380, y: 390 },
    { x: 580, y: 370 },
    { x: 750, y: 330 },
    { x: 150, y: 250 },
    { x: 470, y: 250 },
    { x: 680, y: 240 },
  ];

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <style>{`
        @keyframes twinkle-star {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes map-pin-glow {
          0%, 100% { opacity: calc(var(--glow-opacity, 0.4) * 0.75); }
          50% { opacity: calc(var(--glow-opacity, 0.4) * 1.25); }
        }
        .twinkle-star {
          animation-name: twinkle-star;
          animation-duration: var(--duration, 2s);
          animation-delay: var(--delay, 0s);
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        .map-pin-glow {
          animation-name: map-pin-glow;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          animation-direction: alternate;
        }
        @media (prefers-reduced-motion: reduce) {
          .twinkle-star,
          .map-pin-glow {
            animation: none !important;
          }
          .twinkle-star { opacity: 0.6 !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-warm-100 mb-3">
            <span className="text-neon-warm">情</span>绪<span className="text-neon-pink">之</span>
            <span className="text-neon-cyan">城</span>
          </h1>
          <p className="font-hand text-warm-300 text-xl">
            一座由陈奕迅的歌组成的城市 · 点击地图上的光点，走进属于你的故事
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="glass-panel rounded-2xl px-4 py-2 flex items-center gap-3">
            <span className="font-hand text-warm-200/70 text-sm">{autoTheme ? '实时时间' : '手动切换'}</span>
            <div className="flex items-center gap-1">
              {cityThemes.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => {
                    setAutoTheme(false);
                    setThemeIndex(i);
                  }}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                    themeIndex === i
                      ? 'bg-warm-300/30 border border-warm-300/50'
                      : 'hover:bg-white/5'
                  }`}
                  title={`${t.label} ${t.timeRange}`}
                >
                  {t.name === 'dawn' && <Sunrise size={16} className="text-orange-300" />}
                  {t.name === 'day' && <Sun size={16} className="text-yellow-300" />}
                  {t.name === 'dusk' && <Sunset size={16} className="text-rose-400" />}
                  {t.name === 'night' && <Moon size={16} className="text-indigo-300" />}
                </button>
              ))}
            </div>
            <div className="w-px h-6 bg-warm-300/20" />
            <button
              onClick={() => setAutoTheme(!autoTheme)}
              className={`text-sm font-hand px-3 py-1 rounded-lg transition-all ${
                autoTheme
                  ? 'text-neon-warm bg-warm-300/20 border border-warm-300/30'
                  : 'text-warm-200/60 hover:text-warm-100'
              }`}
            >
              {autoTheme ? '自动' : '跟随时间'}
            </button>
          </div>
          <button
            onClick={cycleTheme}
            className="glass-panel rounded-2xl px-4 py-2 font-hand text-warm-200/70 hover:text-warm-100 transition-colors text-sm"
          >
            切换氛围 ↻
          </button>
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="glass-panel rounded-2xl px-4 py-2 font-hand text-warm-200/70 hover:text-warm-100 transition-colors text-sm flex items-center gap-1.5"
          >
            <Info size={14} />
            {showLegend ? '隐藏' : '显示'}图例
          </button>
        </div>

        <AnimatePresence>
          {showLegend && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="glass-panel rounded-2xl p-5">
                <div className="flex flex-wrap gap-4 justify-center">
                  {moods.map((mood) => {
                    const locs = mapLocations.filter((l) => l.mood === mood.id);
                    return (
                      <div
                        key={mood.id}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-night-300/50 border"
                        style={{ borderColor: `${mood.neonColor}40` }}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ background: mood.neonColor, boxShadow: `0 0 8px ${mood.neonColor}` }}
                        />
                        <span className="font-display text-warm-100 text-sm">
                          {mood.emoji} {mood.name}
                        </span>
                        <span className="text-warm-200/50 text-xs">({locs.length}处)</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-center text-warm-200/50 text-sm mt-3 font-hand">
                点击发光的标记点进入对应的地点，解锁歌曲故事与人们的回忆
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden border border-warm-300/20 shadow-2xl"
          style={{
            boxShadow: isNight
              ? '0 0 60px rgba(78, 100, 180, 0.2), inset 0 0 120px rgba(30, 40, 80, 0.4)'
              : '0 20px 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          <svg viewBox="0 0 900 500" className="w-full h-auto" style={{ display: 'block' }}>
            <defs>
              <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={skyColors[currentTheme.name][0]} />
                <stop offset="50%" stopColor={skyColors[currentTheme.name][1]} />
                <stop offset="100%" stopColor={skyColors[currentTheme.name][2]} />
              </linearGradient>

              <radialGradient id="streetLightGradient">
                <stop offset="0%" stopColor="#f4c542" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f4c542" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="waterGradient">
                <stop offset="0%" stopColor="#1a3a5c" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0d1a2c" stopOpacity="0.4" />
              </radialGradient>

              <pattern id="grassPattern" patternUnits="userSpaceOnUse" width="10" height="10">
                <rect width="10" height="10" fill={isNight ? '#1a2a1a' : '#3a5a3a'} />
                <path d="M0 10 Q2.5 7.5 5 10 T10 10" fill={isNight ? '#0d1a0d' : '#2a4a2a'} opacity="0.5" />
              </pattern>

              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="0" y="0" width="900" height="500" fill="url(#skyGradient)" />

            {currentTheme.name !== 'day' && (
              <g opacity={currentTheme.name === 'night' ? 0.8 : 0.4}>
                {Array.from({ length: isLowPerf ? 18 : 50 }).map((_, i) => {
                  const sx = (i * 137) % 900;
                  const sy = (i * 73) % 250;
                  const size = ((i * 17) % 3) + 1;
                  const duration = 2 + (i % 3);
                  const delay = i * 0.1;
                  return (
                    <circle
                      key={i}
                      cx={sx}
                      cy={sy}
                      r={size}
                      fill="#f5e6c8"
                      className="twinkle-star"
                      style={
                        animationEnabled
                          ? ({
                              ['--duration' as any]: `${duration}s`,
                              ['--delay' as any]: `${delay}s`,
                              animationPlayState: 'running',
                            } as React.CSSProperties)
                          : { opacity: 0.6 }
                      }
                    />
                  );
                })}
              </g>
            )}

            {currentTheme.name !== 'day' && (
              <g>
                <circle
                  cx={780}
                  cy={70}
                  r={30}
                  fill={currentTheme.name === 'night' ? '#f5e6c8' : '#ffccaa'}
                  opacity="0.9"
                />
                <circle cx={770} cy={65} r={25} fill={skyColors[currentTheme.name][0]} opacity="0.3" />
              </g>
            )}
            {currentTheme.name === 'day' && (
              <circle cx={780} cy={70} r={35} fill="#fbbf24" opacity="0.9" filter="url(#glow)" />
            )}

            <rect x="0" y="60" width="900" height="440" fill={isNight ? '#0d0a08' : '#1a1410'} opacity="0.3" />

            <rect x="0" y="460" width="900" height="40" fill="url(#waterGradient)" />
            <path
              d="M0 465 Q45 462 90 465 T180 465 T270 465 T360 465 T450 465 T540 465 T630 465 T720 465 T810 465 T900 465"
              stroke={isNight ? '#4a6a8a' : '#6a8aaa'}
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
            />

            {buildingsData.map((b, i) => (
              <Building
                key={i}
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                color={isNight ? b.color : '#8b7355'}
                theme={currentTheme}
                windowRows={b.wr}
                windowCols={b.wc}
              />
            ))}

            {streets.map((street) => {
              const mood = getMoodById(street.mood);
              const pathD = street.path.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
              return (
                <g key={street.id}>
                  <path
                    d={pathD}
                    stroke={isNight ? mood?.neonColor : '#5a4a3a'}
                    strokeWidth={28}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isNight ? 0.3 : 0.6}
                  />
                  <path
                    d={pathD}
                    stroke={isNight ? '#6b5a4a' : '#a09080'}
                    strokeWidth={24}
                    strokeLinecap="round"
                    fill="none"
                    opacity={0.5}
                  />
                  {isNight && (
                    <path
                      d={pathD}
                      stroke={mood?.neonColor}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeDasharray="8 16"
                      fill="none"
                      opacity={0.6}
                    />
                  )}
                </g>
              );
            })}

            <rect x="0" y="60" width="120" height="60" fill="url(#grassPattern)" opacity="0.6" rx="8" />
            <rect x="520" y="120" width="150" height="100" fill="url(#grassPattern)" opacity="0.6" rx="15" />
            <circle cx="595" cy="170" r="45" fill={isNight ? '#1a3a2a' : '#3a6a4a'} opacity="0.5" />

            {treesData.map((t, i) => (
              <Tree key={i} x={t.x} y={t.y} theme={currentTheme} />
            ))}

            {streetLights.map((light, i) => (
              <StreetLight key={i} x={light.x} y={light.y} theme={currentTheme} />
            ))}

            {mapLocations.map((location) => (
              <MapPinComponent
                key={location.id}
                location={location}
                theme={currentTheme}
                animationEnabled={animationEnabled}
                onClick={() => setSelectedLocation(location)}
              />
            ))}

            <g>
              <rect x="20" y="470" width="80" height="25" rx="4" fill="#5c3d2e" opacity="0.8" />
              <text x="60" y="487" textAnchor="middle" fill="#f5e6c8" fontSize="10" fontFamily="Noto Serif SC">
                海岸
              </text>
            </g>
          </svg>

          <div className="absolute bottom-4 left-4 glass-panel rounded-xl px-3 py-2 flex items-center gap-2">
            <MapPin size={14} className="text-warm-300" />
            <span className="font-hand text-warm-200/80 text-sm">
              {currentTheme.label} · {currentTheme.timeRange}
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 font-hand text-warm-200/50 text-sm"
        >
          长街留给失恋的人 · 旧码头留给怀旧的人 · 凌晨便利店收留所有迷路的灵魂
        </motion.p>
      </div>

      <LocationModal location={selectedLocation} onClose={() => setSelectedLocation(null)} />
    </div>
  );
}
