import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Disc,
  Mic2,
  Calendar,
  Palette,
  Sparkles,
  ChevronRight,
  Quote,
  Layers,
  UserPen,
  UserCog2,
  Award,
  Radio,
} from 'lucide-react';
import {
  songDetails,
  styleEvolution,
  getAllStyles,
  getAllLyricists,
  getAllComposers,
  getEraByYear,
  type SongDetail,
  type EraStyle,
  type MusicStyle,
} from '@/data/songRelations';
import { moods, getMoodById } from '@/data/moods';

export default function StyleEvolutionPage() {
  const [activeEra, setActiveEra] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'timeline' | 'chart' | 'breakdown'>('timeline');

  const styles = getAllStyles();
  const lyricists = getAllLyricists();
  const composers = getAllComposers();

  const maxStyleCount = Math.max(...styles.map((s) => s.count));

  const era: EraStyle = styleEvolution[activeEra];

  const eraSongs = useMemo(() => {
    return songDetails.filter(
      (s) => s.year >= era.startYear && s.year <= era.endYear
    );
  }, [era]);

  const eraMoodCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    eraSongs.forEach((s) => {
      counts[s.mood] = (counts[s.mood] || 0) + 1;
    });
    return counts;
  }, [eraSongs]);

  const eraStyleCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    eraSongs.forEach((s) => {
      s.style.forEach((st) => {
        counts[st] = (counts[st] || 0) + 1;
      });
    });
    return counts;
  }, [eraSongs]);

  const eraThemeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    eraSongs.forEach((s) => {
      s.themes.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [eraSongs]);

  const yearDistribution = useMemo(() => {
    const map: Record<number, SongDetail[]> = {};
    songDetails.forEach((s) => {
      const yr = s.year;
      if (!map[yr]) map[yr] = [];
      map[yr].push(s);
    });
    return Object.entries(map)
      .map(([year, songs]) => ({
        year: Number(year),
        songs,
        era: getEraByYear(Number(year)),
      }))
      .sort((a, b) => a.year - b.year);
  }, []);

  const minYear = Math.min(...yearDistribution.map((y) => y.year));
  const maxYear = Math.max(...yearDistribution.map((y) => y.year));
  const maxSongsInYear = Math.max(...yearDistribution.map((y) => y.songs.length));

  const statCards = [
    {
      label: '音乐风格数',
      value: styles.length,
      icon: Palette,
    },
    {
      label: '作词人',
      value: lyricists.length,
      icon: UserPen,
    },
    {
      label: '作曲人',
      value: composers.length,
      icon: UserCog2,
    },
    {
      label: '时代阶段',
      value: styleEvolution.length,
      icon: Layers,
    },
  ];

  const eraStatCards = [
    {
      label: '年代跨度',
    value: `${era.startYear} - ${era.endYear}`,
      icon: Calendar,
      color: era.color,
    },
    {
      label: '收录歌曲',
      value: eraSongs.length,
      icon: Disc,
      color: era.color,
    },
    {
      label: '主导风格',
      value: era.dominantStyles.length,
      icon: Sparkles,
      color: era.color,
    },
    {
      label: '代表专辑',
      value: era.keyAlbums.length,
      icon: Layers,
      color: era.color,
    },
  ];

  const maxLyricistCount = Math.max(...lyricists.map((l) => l.count));
  const maxComposerCount = Math.max(...composers.map((c) => c.count));

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div
        className="fixed inset-0 -z-10 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(244, 197, 66, 0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 40%),
                      radial-gradient(ellipse at 20% 60%, rgba(78, 205, 196, 0.06) 0%, transparent 40%),
                      linear-gradient(180deg, #14100c 0%, #0d0a08 100%)`,
        }}
      />

      <div className="container max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="text-5xl md:text-6xl animate-warm-glow">🎨</div>
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-100 mb-4">
            音乐风格演变
          </h1>
          <p className="font-hand text-warm-200/60 text-base md:text-lg max-w-2xl mx-auto">
            从青涩新人到歌神接班人，看陈奕迅二十余年音乐之路的风格变迁与成长轨迹
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="inline-flex rounded-xl bg-night-500/50 p-1 glass-panel">
            {[
              { id: 'timeline', label: '时代时间轴', icon: Calendar },
              { id: 'chart', label: '风格统计', icon: TrendingUp },
              { id: 'breakdown', label: '创作分析', icon: Mic2 },
            ].map((m) => {
              const Icon = m.icon;
              const active = viewMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setViewMode(m.id as typeof viewMode)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all ${
                    active
                      ? 'bg-gradient-to-r from-neon-warm/30 to-neon-pink/30 text-warm-100 shadow-lg'
                      : 'text-warm-200/60 hover:text-warm-100'
                  }`}
                >
                  <Icon size={16} />
                  <span className="font-display hidden sm:inline">{m.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {viewMode === 'timeline' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="wooden-frame rounded-2xl p-4 md:p-6 mb-8"
            >
              <div className="glass-panel rounded-xl p-5 md:p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-neon-warm/20 flex items-center justify-center">
                    <Layers size={16} className="text-neon-warm" />
                  </div>
                  <h2 className="font-display text-xl md:text-2xl text-warm-100">
                    时代阶段总览
                  </h2>
                </div>

                <div className="relative">
                  <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink -translate-x-1/2" />

                  <div className="space-y-6 md:space-y-8">
                    {styleEvolution.map((era, idx) => {
                      const isActive = idx === activeEra;
                      const isLeft = idx % 2 === 0;
                      return (
                        <motion.div
                          key={era.name}
                          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-80px' }}
                          transition={{ duration: 0.6, delay: idx * 0.08 }}
                          className={`relative flex items-start gap-4 md:gap-8 ${
                            isLeft
                              ? 'md:flex-row'
                              : 'md:flex-row-reverse'
                          }`}
                        >
                          <div
                            className="md:w-1/2"
                          />

                          <button
                            onClick={() => setActiveEra(idx)}
                            className="absolute left-0 md:left-1/2 -translate-x-1/2 z-10"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                isActive
                                  ? 'scale-125'
                                  : ''
                              }`}
                              style={{
                                backgroundColor: era.color,
                                boxShadow: isActive
                                  ? `0 0 20px ${era.color}88, inset 0 0 0 4px rgba(20, 16, 12)`
                                  : `inset 0 0 0 4px rgba(20, 16, 12), 0 0 8px ${era.color}44`,
                              }}
                            >
                              <span className="text-white text-xs font-bold">
                                {idx + 1}
                              </span>
                            </motion.div>
                          </button>

                          <div
                            className={`ml-10 md:ml-0 md:w-1/2 ${
                              isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'
                            }`}
                          >
                            <div
                              onClick={() => setActiveEra(idx)}
                              className={`p-4 md:p-5 rounded-xl cursor-pointer transition-all ${
                                isActive
                                  ? 'scale-[1.02] shadow-xl'
                                  : 'hover:scale-[1.01]'
                              }`}
                              style={{
                                background: isActive
                                  ? `linear-gradient(135deg, ${era.color}33, ${era.color}11)`
                                  : 'rgba(255,255,255,0.03)',
                                border: isActive
                                  ? `2px solid ${era.color}66`
                                  : '1px solid rgba(244, 197, 66, 0.1)',
                                boxShadow: isActive
                                  ? `0 0 24px ${era.color}22`
                                  : 'none',
                              }}
                            >
                              <div
                                className="font-hand text-xs md:text-sm mb-1"
                                style={{ color: era.color }}
                              >
                                {era.startYear} - {era.endYear}
                              </div>
                              <h3 className="font-display text-lg md:text-xl text-warm-100 mb-2">
                                {era.name}
                              </h3>
                              <p className="font-hand text-warm-200/60 text-sm md:text-base line-clamp-2">
                                {era.description.slice(0, 60)}...
                              </p>
                              <div className="flex flex-wrap gap-1.5 mt-3 md:justify-end" style={{ justifyContent: isLeft ? 'flex-start' : undefined }}>
                                {era.dominantStyles.slice(0, 3).map((st) => (
                                  <span
                                    key={st}
                                    className="px-2 py-0.5 rounded text-[10px] md:text-xs font-hand"
                                    style={{
                                      backgroundColor: `${era.color}22`,
                                      color: era.color,
                                    }}
                                  >
                                    {st}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="wooden-frame rounded-2xl p-4 md:p-6 mb-8"
            >
              <div
                className="glass-panel rounded-xl p-5 md:p-6">
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                  <div className="lg:w-1/3">
                    <div
                      className="p-5 md:p-6 rounded-2xl mb-5"
                      style={{
                        background: `linear-gradient(135deg, ${era.color}44, ${era.color}15)`,
                        border: `2px solid ${era.color}55`,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: era.color,
                            boxShadow: `0 0 16px ${era.color}66`,
                          }}
                        >
                          <span className="text-2xl">🎵</span>
                        </div>
                        <div>
                          <div className="font-hand text-xs opacity-80 text-white">
                            {era.startYear} - {era.endYear}
                          </div>
                          <h2 className="font-display text-2xl md:text-3xl text-white">
                            {era.name}
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {eraStatCards.map((card) => {
                        const Icon = card.icon;
                        return (
                          <div
                            key={card.label}
                            className="p-3 rounded-xl bg-night-500/50 border border-warm-500/10"
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center mb-2"
                              style={{ backgroundColor: `${card.color}22` }}
                            >
                              <Icon size={14} style={{ color: card.color }} />
                            </div>
                            <div
                              className="font-display text-lg"
                              style={{ color: card.color }}
                            >
                              {card.value}
                            </div>
                            <div className="font-hand text-warm-200/50 text-xs">
                              {card.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-4 rounded-xl bg-night-500/50 border border-warm-500/10">
                      <Quote size={18} className="text-warm-300/30 mb-2" />
                      <p className="font-hand text-warm-200/70 text-sm leading-relaxed">
                        {era.description}
                      </p>
                    </div>
                  </div>

                  <div className="lg:w-2/3 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Disc size={16} className="text-neon-warm" />
                        <h3 className="font-display text-lg text-warm-100">
                          关键专辑
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {era.keyAlbums.map((albumName, i) => {
                          const matching = songDetails.find(
                            (s) => s.album === albumName
                          );
                          const colors = matching?.coverColors || [
                            era.color,
                            era.color,
                          ];
                          const emoji = matching?.coverEmoji || '💿';
                          return (
                            <motion.div
                              key={albumName}
                              whileHover={{ y: -3 }}
                              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                              style={{
                                background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
                                boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3)`,
                              }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-3xl md:text-4xl drop-shadow-lg">
                                  {emoji}
                                </div>
                              </div>
                              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                                <div className="font-display text-white text-xs md:text-sm truncate text-center drop-shadow">
                                  {albumName}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp size={16} className="text-neon-cyan" />
                        <h3 className="font-display text-lg text-warm-100">
                          主导风格分布
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {Object.entries(eraStyleCounts)
                          .sort((a, b) => b[1] - a[1])
                          .map(([styleName, count], i) => {
                            const styleInfo = styles.find(
                              (s) => s.name === styleName
                            );
                            const color = styleInfo?.color || '#888';
                            const total = Object.values(eraStyleCounts).reduce(
                              (a, b) => a + b,
                              0
                            );
                            const pct = (count / total) * 100;
                            return (
                              <motion.div
                                key={styleName}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                className="flex items-center gap-3"
                              >
                                <span
                                  className="font-hand text-xs md:text-sm w-24 md:w-28 text-warm-200/70"
                                >
                                  {styleName}
                                </span>
                                <div className="flex-1 h-5 rounded-full bg-night-500/60 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${pct}%` }}
                                    viewport={{ once: true }}
                                    transition={{
                                      duration: 0.8,
                                      delay: 0.2 + i * 0.06,
                                    }}
                                    className="h-full rounded-full flex items-center justify-end pr-2"
                                    style={{
                                      background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                                      boxShadow: `0 0 8px ${color}44`,
                                    }}
                                  >
                                    <span className="font-display text-[10px text-white/90">
                                      {count}
                                    </span>
                                  </motion.div>
                                </div>
                              </motion.div>
                            );
                          })}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Palette size={16} className="text-neon-pink" />
                        <h3 className="font-display text-lg text-warm-100">
                          热门主题
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {eraThemeCounts.map(([theme, count], i) => {
                          const themeColors = [
                            '#ff6b9d',
                            '#f4c542',
                            '#4ecdc4',
                            '#a855f7',
                            '#22c55e',
                            '#f97316',
                          ];
                          const color = themeColors[i % themeColors.length];
                          return (
                            <motion.div
                              key={theme}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.08 }}
                              className="px-3 py-1.5 rounded-full"
                              style={{
                                backgroundColor: `${color}22`,
                                border: `1px solid ${color}55`,
                              }}
                            >
                              <span
                                className="font-display text-sm"
                                style={{ color }}
                              >
                                {theme}
                              </span>
                              <span className="font-hand text-xs ml-1 opacity-70 text-warm-200/70">
                                ×{count}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {eraSongs.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Award size={16} className="text-neon-warm" />
                            <h3 className="font-display text-lg text-warm-100">
                              代表作品
                            </h3>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {eraSongs.map((song) => (
                            <Link
                              key={song.id}
                              to={`/record/${song.id}`}
                              className="flex items-center gap-3 p-2.5 rounded-xl bg-night-500/40 hover:bg-night-500/60 transition-all group"
                            >
                              <div
                                className="text-xl">{song.coverEmoji}</div>
                              <div className="flex-1 min-w-0">
                                <div className="font-display text-warm-100 text-sm truncate group-hover:text-neon-warm transition-colors">
                                  《{song.title}》
                                </div>
                                <div className="font-hand text-warm-200/40 text-xs">
                                  {song.year} · {song.album}
                                </div>
                              </div>
                              <ChevronRight
                                size={14}
                                className="text-warm-200/30 group-hover:text-neon-warm opacity-0 group-hover:opacity-100 transition-all"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {viewMode === 'chart' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {statCards.map((card, idx) => {
                const Icon = card.icon;
                const colors = [
                  '#f4c542',
                  '#ff6b9d',
                  '#4ecdc4',
                  '#a855f7',
                ];
                const color = colors[idx % colors.length];
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.08 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="wooden-frame rounded-xl p-3 md:p-4"
                  >
                    <div className="glass-panel rounded-lg p-4 text-center">
                      <div
                        className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-3"
                        style={{
                          backgroundColor: `${color}22`,
                          boxShadow: `0 0 12px ${color}33`,
                        }}
                      >
                        <Icon size={20} color={color} />
                      </div>
                      <div
                        className="font-display text-3xl mb-1"
                        style={{ color }}
                      >
                        {card.value}
                        <span className="text-sm opacity-70 text-warm-200/50 ml-1">
                          {card.label === '时代阶段' ? '个' : ''}
                        </span>
                      </div>
                      <div className="font-hand text-warm-200/60 text-xs md:text-sm">
                        {card.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
              <div className="wooden-frame rounded-2xl p-4 md:p-6">
                <div className="glass-panel rounded-xl p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
                    <Palette size={16} className="text-neon-cyan" />
                  </div>
                    <h2 className="font-display text-xl md:text-2xl text-warm-100">
                    音乐风格分布
                  </h2>
                  </div>
                  <div className="space-y-3">
                    {styles.map((st) => {
                      const pct = (st.count / maxStyleCount) * 100;
                      return (
                        <motion.div
                          key={st.name}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-hand text-warm-100 text-sm">
                              {st.name}
                            </span>
                            <span
                              className="font-display text-xs"
                              style={{ color: st.color }}
                            >
                              {st.count}首
                            </span>
                          </div>
                          <div className="h-6 bg-night-500/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${st.color}, ${st.color}aa)`,
                                boxShadow: `0 0 10px ${st.color}66`,
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="wooden-frame rounded-2xl p-4 md:p-6">
                <div className="glass-panel rounded-xl p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-neon-warm/20 flex items-center justify-center">
                      <Radio size={16} className="text-neon-warm" />
                    </div>
                    <h2 className="font-display text-xl md:text-2xl text-warm-100">
                      年度作品数量分布
                    </h2>
                  </div>

                  <div className="h-56 md:h-64 flex items-end justify-between gap-1 px-2">
                    {yearDistribution.map((yd, i) => {
                      const heightPct =
                        (yd.songs.length / maxSongsInYear) * 100;
                      return (
                        <motion.div
                          key={yd.year}
                          initial={{ opacity: 0, scaleY: 0 }}
                          whileInView={{ opacity: 1, scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: i * 0.05,
                            type: 'spring',
                            stiffness: 120,
                          }}
                          className="flex-1 flex flex-col items-center justify-end h-full group relative"
                        >
                          <div className="text-[10px] font-display mb-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5"
                            style={{ color: yd.era?.color || '#f4c542' }}
                          >
                            {yd.songs.length}
                          </div>
                          <motion.div
                            className="w-full rounded-t-md relative overflow-hidden"
                            style={{
                              height: `${heightPct}%`,
                              background: `linear-gradient(180deg, ${yd.era?.color || '#f4c542'} 0%, ${yd.era?.color || '#f4c542'}99 100%)`,
                              boxShadow: `0 0 8px ${yd.era?.color || '#f4c542'}55`,
                              transformOrigin: 'bottom',
                            }}
                            whileHover={{
                              filter: 'brightness(1.2)',
                              scaleY: 1.05,
                            }}
                            onClick={() => {
                              if (yd.era) {
                                const idx = styleEvolution.indexOf(yd.era);
                                if (idx >= 0) setActiveEra(idx);
                                setViewMode('timeline');
                              }
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent cursor-pointer" />
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-warm-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-wrap">
                      {styleEvolution.slice(0, 3).map((e) => (
                        <div key={e.name} className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: e.color,
                              boxShadow: `0 0 4px ${e.color}88`,
                            }}
                          />
                          <span className="font-hand text-warm-200/50 text-xs">
                            {e.name.slice(0, 4)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <span className="font-hand text-warm-200/40 text-xs">
                      {minYear} - {maxYear}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="wooden-frame rounded-2xl p-4 md:p-6"
            >
              <div className="glass-panel rounded-xl p-5 md:p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                    <Layers size={16} className="text-neon-purple" />
                  </div>
                  <h2 className="font-display text-xl md:text-2xl text-warm-100">
                    各年代情绪分布
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {styleEvolution.map((eraItem, idx) => {
                    const songsOfEra = songDetails.filter(
                      (s) =>
                        s.year >= eraItem.startYear && s.year <= eraItem.endYear
                    );
                    return (
                      <div
                        key={eraItem.name}
                        className="p-4 rounded-xl"
                        style={{
                          background: `linear-gradient(135deg, ${eraItem.color}15, transparent`,
                          border: `1px solid ${eraItem.color}33`,
                        }}
                      >
                        <div
                          className="font-hand text-xs mb-3"
                          style={{ color: eraItem.color }}
                        >
                          {eraItem.startYear}-{eraItem.endYear}
                        </div>
                        <div className="font-display text-warm-100 text-sm mb-3">
                          {eraItem.name}
                        </div>
                        <div className="space-y-2">
                          {moods.map((mood) => {
                            const count = songsOfEra.filter(
                              (s) => s.mood === mood.id
                            ).length;
                            const total = songsOfEra.length || 1;
                            const pct = (count / total) * 100;
                            return (
                              <div key={mood.id}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-hand text-warm-200/60 text-xs">
                                    {mood.emoji} {mood.name}
                                  </span>
                                  <span
                                    className="font-display text-[10px]"
                                    style={{ color: mood.neonColor }}
                                  >
                                    {count}
                                  </span>
                                </div>
                                <div className="h-1.5 bg-night-500/50 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                      width: `${pct}%`,
                                      background: `linear-gradient(90deg, ${mood.neonColor}, ${mood.neonColor}99)`,
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {viewMode === 'breakdown' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
          >
            <div className="wooden-frame rounded-2xl p-4 md:p-6">
              <div className="glass-panel rounded-xl p-5 md:p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-neon-pink/20 flex items-center justify-center">
                    <UserPen size={16} className="text-neon-pink" />
                  </div>
                  <h2 className="font-display text-xl md:text-2xl text-warm-100">
                    作词人合作统计
                  </h2>
                </div>
                <div className="space-y-3">
                  {lyricists.map((ly, i) => {
                    const pct = (ly.count / maxLyricistCount) * 100;
                    const songsOfLy = songDetails.filter(
                      (s) => s.lyricist === ly.name
                    );
                    return (
                      <motion.div
                        key={ly.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        className="p-3 rounded-xl bg-night-500/40 hover:bg-night-500/60 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-md flex items-center justify-center font-display text-xs"
                              style={{
                                backgroundColor: `${ly.color}33`,
                                color: ly.color,
                              }}
                            >
                              {i + 1}
                            </div>
                            <span className="font-display text-warm-100 text-sm">
                              {ly.name}
                            </span>
                          </div>
                          <span
                            className="font-display text-sm"
                            style={{ color: ly.color }}
                          >
                            {ly.count}首
                          </span>
                        </div>
                        <div className="h-2 bg-night-500/60 rounded-full overflow-hidden mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${ly.color}, ${ly.color}cc)`,
                              boxShadow: `0 0 8px ${ly.color}66`,
                            }}
                          />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {songsOfLy.slice(0, 4).map((s) => (
                            <Link
                              key={s.id}
                              to={`/record/${s.id}`}
                              className="px-1.5 py-0.5 rounded text-[10px] font-hand text-warm-200/60 hover:text-neon-warm bg-white/5 hover:bg-white/10 transition-all"
                            >
                              {s.title}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="wooden-frame rounded-2xl p-4 md:p-6">
              <div className="glass-panel rounded-xl p-5 md:p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
                    <UserCog2 size={16} className="text-neon-cyan" />
                  </div>
                  <h2 className="font-display text-xl md:text-2xl text-warm-100">
                    作曲人合作统计
                  </h2>
                </div>
                <div className="space-y-3">
                  {composers.map((cp, i) => {
                    const pct = (cp.count / maxComposerCount) * 100;
                    const songsOfCp = songDetails.filter(
                      (s) => s.composer === cp.name
                    );
                    return (
                      <motion.div
                        key={cp.name}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        className="p-3 rounded-xl bg-night-500/40 hover:bg-night-500/60 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-md flex items-center justify-center font-display text-xs"
                              style={{
                                backgroundColor: `${cp.color}33`,
                                color: cp.color,
                              }}
                            >
                              {i + 1}
                            </div>
                            <span className="font-display text-warm-100 text-sm">
                              {cp.name}
                            </span>
                          </div>
                          <span
                            className="font-display text-sm"
                            style={{ color: cp.color }}
                          >
                            {cp.count}首
                          </span>
                        </div>
                        <div className="h-2 bg-night-500/60 rounded-full overflow-hidden mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${cp.color}, ${cp.color}cc)`,
                              boxShadow: `0 0 8px ${cp.color}66`,
                            }}
                          />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {songsOfCp.slice(0, 4).map((s) => (
                            <Link
                              key={s.id}
                              to={`/record/${s.id}`}
                              className="px-1.5 py-0.5 rounded text-[10px] font-hand text-warm-200/60 hover:text-neon-cyan bg-white/5 hover:bg-white/10 transition-all"
                            >
                              {s.title}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 wooden-frame rounded-2xl p-4 md:p-6"
            >
              <div className="glass-panel rounded-xl p-5 md:p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-neon-warm/20 flex items-center justify-center">
                    <Sparkles size={16} className="text-neon-warm" />
                  </div>
                  <h2 className="font-display text-xl md:text-2xl text-warm-100">
                    黄金搭档：林夕 × 陈小霞 × 陈奕迅
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="md:col-span-2">
                    <p className="font-hand text-warm-200/70 leading-relaxed mb-4">
                      林夕与陈小霞是陈奕迅音乐生涯中最重要的两位合作伙伴。林夕以其深刻的歌词与诗意的表达，为陈奕迅写下了无数深入人心的词作；而陈小霞悠扬婉转的旋律，则赋予了歌曲灵魂。
                      三人联手打造了《十年》《明年今日》《富士山下》《爱情转移》等众多传世之作，共同谱写了华语乐坛最动人的篇章。
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { name: '林夕', role: '作词', songs: '富士山下、十年、明年今日', color: '#ff6b9d' },
                        { name: '陈小霞', role: '作曲', songs: '十年、明年今日、好久不见', color: '#4ecdc4' },
                        { name: '陈奕迅', role: '演唱', songs: '所有经典作品', color: '#f4c542' },
                      ].map((person) => (
                        <div
                          key={person.name}
                          className="p-4 rounded-xl"
                          style={{
                            background: `linear-gradient(135deg, ${person.color}22, ${person.color}08`,
                            border: `1px solid ${person.color}44`,
                          }}
                        >
                          <div
                            className="font-display text-lg mb-1"
                            style={{ color: person.color }}
                          >
                            {person.name}
                          </div>
                          <div className="font-hand text-warm-200/50 text-xs mb-2">
                            {person.role}
                          </div>
                          <div className="font-hand text-warm-100/80 text-xs">
                            代表作：{person.songs}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {songDetails
                      .filter(
                        (s) => s.lyricist === '林夕' && s.composer === '陈小霞'
                      )
                      .map((s) => (
                        <Link
                          key={s.id}
                          to={`/record/${s.id}`}
                          className="block p-3 rounded-xl bg-night-500/50 hover:bg-night-500/70 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{s.coverEmoji}</span>
                            <div className="flex-1 min-w-0">
                              <div className="font-display text-warm-100 truncate group-hover:text-neon-warm transition-colors">
                                《{s.title}》
                              </div>
                              <div className="font-hand text-warm-200/50 text-xs">
                                {s.year}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    {songDetails.filter(
                      (s) => s.lyricist === '林夕' && s.composer === '陈小霞'
                    ).length === 0 && (
                      <div className="p-4 text-center font-hand text-warm-200/50 text-sm">
                      暂无林夕+陈小霞 联手作品

                    </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
