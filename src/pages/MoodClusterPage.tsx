import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart,
  Search,
  X,
  ChevronRight,
  Grid3X3,
  Network,
  PieChart,
  Shuffle,
  Sparkles,
  Filter,
  Quote,
  Music,
} from 'lucide-react';
import {
  songDetails,
  themeClusters,
  getAllThemes,
  getSongById,
  getRelatedSongs,
  type SongDetail,
  type SongTheme,
} from '@/data/songRelations';
import { moods, getMoodById, type MoodId } from '@/data/moods';

type ViewMode = 'grid' | 'cluster' | 'mood';
type FilterState = 'all' | MoodId;

export default function MoodClusterPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('cluster');
  const [moodFilter, setMoodFilter] = useState<FilterState>('all');
  const [selectedSong, setSelectedSong] = useState<SongDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThemes, setSelectedThemes] = useState<Set<SongTheme>>(new Set());
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

  const allThemes = getAllThemes();

  const filteredSongs = useMemo(() => {
    return songDetails.filter((s) => {
      const moodMatch = moodFilter === 'all' || s.mood === moodFilter;
      const searchMatch =
        !searchTerm ||
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.lyricist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.composer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.themes.some((t) => t.includes(searchTerm));
      const themeMatch =
        selectedThemes.size === 0 ||
        Array.from(selectedThemes).some((t) => s.themes.includes(t));
      return moodMatch && searchMatch && themeMatch;
    });
  }, [moodFilter, searchTerm, selectedThemes]);

  const moodDistributions = useMemo(() => {
    const map: Record<string, number> = {};
    filteredSongs.forEach((s) => {
      map[s.mood] = (map[s.mood] || 0) + 1;
    });
    return map;
  }, [filteredSongs]);

  const toggleTheme = (theme: SongTheme) => {
    setSelectedThemes((prev) => {
      const next = new Set(prev);
      if (next.has(theme)) next.delete(theme);
      else next.add(theme);
      return next;
    });
  };

  const totalSongs = filteredSongs.length;
  let cumulativePercent = 0;
  const donutSegments = moods.map((mood) => {
    const count = moodDistributions[mood.id] || 0;
    const percent = totalSongs > 0 ? (count / totalSongs) * 100 : 0;
    const startPercent = cumulativePercent;
    cumulativePercent += percent;
    return {
      mood,
      count,
      percent,
      startPercent,
    };
  });

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angleDeg: number
  ) => {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  };

  const describeArc = (
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const relatedForModal = selectedSong
    ? getRelatedSongs(selectedSong.id, 4)
    : [];

  const viewOptions: {
    id: ViewMode;
    label: string;
    icon: typeof Grid3X3;
  }[] = [
    { id: 'cluster', label: '主题聚类', icon: Network },
    { id: 'mood', label: '情绪分类', icon: PieChart },
    { id: 'grid', label: '卡片网格', icon: Grid3X3 },
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div
        className="fixed inset-0 -z-10 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 20% 0%, rgba(255, 107, 157, 0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 80%, rgba(78, 205, 196, 0.08) 0%, transparent 40%),
                      radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.06) 0%, transparent 40%),
                      linear-gradient(180deg, #14100c 0%, #0d0a08 100%)`,
        }}
      />

      <div className="container max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="text-5xl md:text-6xl animate-warm-glow">🎭</div>
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-100 mb-4">
            情绪与主题
          </h1>
          <p className="font-hand text-warm-200/60 text-base md:text-lg max-w-2xl mx-auto">
            从失恋的泪水中到成长的微笑里，用主题聚类探索每首歌背后的情感宇宙
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="wooden-frame rounded-2xl p-4 md:p-5 mb-6"
        >
          <div className="glass-panel rounded-xl p-4 md:p-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                <div className="flex-1 relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-300/50"
                  />
                  <input
                    type="text"
                    placeholder="搜索歌曲名、作词人、作曲人、专辑或主题..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-night-500/50 border border-warm-500/10 text-warm-100 placeholder-warm-200/30 focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/30 transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-warm-200/40 hover:text-warm-100 hover:bg-white/10 transition-all"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 flex-wrap">
                  <Filter size={16} className="text-warm-300/60 ml-2" />
                  <button
                    onClick={() => setMoodFilter('all')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                      moodFilter === 'all'
                        ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/40'
                        : 'text-warm-100/60 hover:text-warm-100 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Shuffle size={14} />
                    <span className="hidden sm:inline">全部</span>
                  </button>
                  {moods.map((mood) => {
                    const active = moodFilter === mood.id;
                    return (
                      <button
                        key={mood.id}
                        onClick={() => setMoodFilter(active ? 'all' : mood.id)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                          active
                            ? 'border'
                            : 'text-warm-100/60 hover:text-warm-100 hover:bg-white/5 border border-transparent'
                        }`}
                        style={
                          active
                            ? {
                                backgroundColor: `${mood.neonColor}22`,
                                borderColor: `${mood.neonColor}55`,
                                color: mood.neonColor,
                              }
                            : undefined
                        }
                      >
                        <span className="text-sm">{mood.emoji}</span>
                        <span className="hidden sm:inline">{mood.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedThemes.size > 0 && (
                <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-warm-500/10">
                  <span className="font-hand text-warm-200/50 text-xs">
                    已选主题：
                  </span>
                  {Array.from(selectedThemes).map((theme) => {
                    const themeInfo = allThemes.find((t) => t.name === theme);
                    return (
                      <button
                        key={theme}
                        onClick={() => toggleTheme(theme)}
                        className="flex items-center gap-1 px-2 py-1 rounded-md text-xs"
                        style={{
                          backgroundColor: `${themeInfo?.color || '#888'}22`,
                          border: `1px solid ${themeInfo?.color || '#888'}44`,
                          color: themeInfo?.color || '#888',
                        }}
                      >
                        {theme}
                        <X size={10} />
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setSelectedThemes(new Set())}
                    className="font-hand text-warm-200/40 text-xs hover:text-warm-200/70 transition-colors"
                  >
                    清除全部
                  </button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-warm-500/10">
                <div className="inline-flex rounded-xl bg-night-500/50 p-1">
                  {viewOptions.map((opt) => {
                    const Icon = opt.icon;
                    const active = viewMode === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setViewMode(opt.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                          active
                            ? 'bg-gradient-to-r from-neon-pink/30 to-neon-purple/30 text-warm-100 shadow-lg'
                            : 'text-warm-200/60 hover:text-warm-100'
                        }`}
                      >
                        <Icon size={16} />
                        <span className="font-display">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="font-hand text-warm-200/50 text-sm">
                  共 {filteredSongs.length} 首作品
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === 'cluster' && (
            <motion.div
              key="cluster"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themeClusters.map((cluster, idx) => {
                  const clusterSongs = cluster.songIds
                    .map((id) => getSongById(id))
                    .filter(
                      (s): s is SongDetail =>
                        s !== undefined &&
                        (moodFilter === 'all' || s.mood === moodFilter) &&
                        (!searchTerm ||
                          s.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()))
                    );
                  const isActive = activeCluster === cluster.id;

                  if (clusterSongs.length === 0) return null;

                  return (
                    <motion.div
                      key={cluster.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      layout
                      onClick={() =>
                        setActiveCluster(isActive ? null : cluster.id)
                      }
                      className={`wooden-frame rounded-2xl p-4 md:p-5 cursor-pointer transition-all ${
                        isActive ? 'lg:col-span-3' : ''
                      }`}
                    >
                      <div
                        className="glass-panel rounded-xl p-5 h-full"
                        style={{
                          background: `linear-gradient(135deg, ${cluster.color}15, rgba(26, 20, 16, 0.9))`,
                          borderColor: `${cluster.color}33`,
                        }}
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${cluster.color}44, ${cluster.color}22)`,
                              border: `2px solid ${cluster.color}66`,
                              boxShadow: `0 0 16px ${cluster.color}44`,
                            }}
                          >
                            <span className="text-2xl">{cluster.name.split(' ')[0]}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3
                              className="font-display text-xl md:text-2xl mb-1"
                              style={{ color: cluster.color }}
                            >
                              {cluster.name.split(' ').slice(1).join(' ')}
                            </h3>
                            <p className="font-hand text-warm-200/60 text-sm">
                              {cluster.description}
                            </p>
                          </div>
                          <div
                            className="text-right"
                            style={{ color: cluster.color }}
                          >
                            <div className="font-display text-3xl">
                              {clusterSongs.length}
                            </div>
                            <div className="font-hand text-xs opacity-70">
                              首作品
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {cluster.themes.map((t) => (
                            <button
                              key={t}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTheme(t);
                              }}
                              className={`px-2 py-1 rounded-md text-xs font-hand transition-all ${
                                selectedThemes.has(t)
                                  ? 'ring-2 ring-offset-2 ring-offset-night-300'
                                  : 'opacity-70 hover:opacity-100'
                              }`}
                              style={{
                                backgroundColor: `${cluster.color}22`,
                                color: cluster.color,
                                border: `1px solid ${cluster.color}44`,
                              }}
                            >
                              #{t}
                            </button>
                          ))}
                        </div>

                        <div
                          className={`grid gap-2 ${
                            isActive
                              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                              : 'grid-cols-1'
                          }`}
                        >
                          {(isActive ? clusterSongs : clusterSongs.slice(0, 3)).map(
                            (song) => (
                              <Link
                                key={song.id}
                                to={`/record/${song.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 p-2 rounded-lg bg-night-500/40 hover:bg-night-500/70 transition-all group"
                              >
                                <span className="text-lg flex-shrink-0">
                                  {song.coverEmoji}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="font-display text-warm-100 text-xs truncate group-hover:text-neon-warm transition-colors">
                                    《{song.title}》
                                  </div>
                                  <div className="font-hand text-warm-200/40 text-[10px] truncate">
                                    {song.year}
                                  </div>
                                </div>
                              </Link>
                            )
                          )}
                        </div>

                        {!isActive && clusterSongs.length > 3 && (
                          <div className="mt-3 pt-3 border-t border-warm-500/10 text-center">
                            <span
                              className="font-hand text-sm opacity-60 hover:opacity-100 transition-opacity"
                              style={{ color: cluster.color }}
                            >
                              点击展开全部 {clusterSongs.length} 首作品 →
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {viewMode === 'mood' && (
            <motion.div
              key="mood"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="wooden-frame rounded-2xl p-4 md:p-6"
                >
                  <div className="glass-panel rounded-xl p-5 md:p-6 h-full">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                        <PieChart size={16} className="text-neon-purple" />
                      </div>
                      <h2 className="font-display text-xl md:text-2xl text-warm-100">
                        情绪分布
                      </h2>
                    </div>

                    <div className="flex justify-center mb-8">
                      <div className="relative">
                        <svg width="220" height="220" viewBox="0 0 220 220">
                          {donutSegments.map((segment, index) => {
                            if (segment.percent === 0) return null;
                            const startAngle =
                              (segment.startPercent / 100) * 360;
                            const endAngle =
                              ((segment.startPercent + segment.percent) / 100) *
                              360;
                            return (
                              <motion.path
                                key={segment.mood.id}
                                d={describeArc(
                                  110,
                                  110,
                                  85,
                                  startAngle,
                                  endAngle
                                )}
                                fill="none"
                                stroke={segment.mood.neonColor}
                                strokeWidth="28"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{
                                  duration: 1,
                                  delay: index * 0.15,
                                  ease: 'easeOut',
                                }}
                                style={{
                                  filter: `drop-shadow(0 0 8px ${segment.mood.neonColor}66)`,
                                  cursor: 'pointer',
                                }}
                                onClick={() => setMoodFilter(segment.mood.id)}
                              />
                            );
                          })}
                          <circle
                            cx="110"
                            cy="110"
                            r="50"
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="1"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-display text-4xl text-warm-100">
                            {totalSongs}
                          </span>
                          <span className="font-hand text-warm-200/50 text-sm">
                            首作品
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {donutSegments.map((segment, index) => (
                        <motion.div
                          key={segment.mood.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1 + 0.6,
                          }}
                          onClick={() =>
                            setMoodFilter(
                              moodFilter === segment.mood.id
                                ? 'all'
                                : segment.mood.id
                            )
                          }
                          className={`flex items-center justify-between gap-4 p-3 rounded-xl cursor-pointer transition-all ${
                            moodFilter === segment.mood.id
                              ? 'bg-night-500/80 ring-1 ring-offset-1 ring-offset-night-300'
                              : 'bg-night-500/30 hover:bg-night-500/50'
                          }`}
                          style={
                            moodFilter === segment.mood.id
                              ? {
                                  ringColor: segment.mood.neonColor,
                                  boxShadow: `0 0 12px ${segment.mood.neonColor}22`,
                                }
                              : undefined
                          }
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{
                                backgroundColor: segment.mood.neonColor,
                                boxShadow: `0 0 8px ${segment.mood.neonColor}`,
                              }}
                            />
                            <span className="text-lg">{segment.mood.emoji}</span>
                            <span className="font-hand text-warm-100 text-sm">
                              {segment.mood.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <div
                              className="font-display text-lg"
                              style={{ color: segment.mood.neonColor }}
                            >
                              {segment.count}
                            </div>
                            <div className="font-hand text-xs opacity-50 text-warm-200/50">
                              {segment.percent.toFixed(0)}%
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <div className="lg:col-span-2 space-y-6">
                  {moods.map((mood, moodIdx) => {
                    const songsOfMood = filteredSongs.filter(
                      (s) => s.mood === mood.id
                    );
                    if (songsOfMood.length === 0) return null;

                    return (
                      <motion.div
                        key={mood.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5, delay: moodIdx * 0.1 }}
                        className="wooden-frame rounded-2xl p-4 md:p-5"
                      >
                        <div
                          className="glass-panel rounded-xl p-5"
                          style={{
                            background: `linear-gradient(135deg, ${mood.neonColor}12, rgba(26, 20, 16, 0.9))`,
                            borderColor: `${mood.neonColor}22`,
                          }}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className="w-12 h-12 rounded-2xl flex items-center justify-center"
                              style={{
                                backgroundColor: `${mood.neonColor}33`,
                                border: `2px solid ${mood.neonColor}55`,
                                boxShadow: `0 0 16px ${mood.neonColor}33`,
                              }}
                            >
                              <span className="text-2xl">{mood.emoji}</span>
                            </div>
                            <div className="flex-1">
                              <h3
                                className="font-display text-xl"
                                style={{ color: mood.neonColor }}
                              >
                                {mood.name}
                              </h3>
                              <p className="font-hand text-warm-200/50 text-sm">
                                {mood.description}
                              </p>
                            </div>
                            <Link
                              to={`/shelves/${mood.id}`}
                              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-hand hover:bg-white/10 transition-colors"
                              style={{ color: mood.neonColor }}
                            >
                              查看完整歌单
                              <ChevronRight size={12} />
                            </Link>
                          </div>

                          <div
                            className="p-4 rounded-xl mb-4"
                            style={{
                              background: `linear-gradient(135deg, ${mood.neonColor}22, transparent)`,
                              borderLeft: `3px solid ${mood.neonColor}`,
                            }}
                          >
                            <Quote
                              size={14}
                              style={{ color: mood.neonColor }}
                              className="opacity-50 mb-2"
                            />
                            <p
                              className="font-hand italic text-sm"
                              style={{ color: `${mood.neonColor}dd` }}
                            >
                              "{mood.quote}"
                            </p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {songsOfMood.slice(0, 6).map((song) => (
                              <motion.button
                                key={song.id}
                                whileHover={{ y: -2, scale: 1.02 }}
                                onClick={() => setSelectedSong(song)}
                                className="flex items-center gap-2 p-2.5 rounded-lg bg-night-500/50 hover:bg-night-500/80 text-left transition-all group border border-transparent hover:border-warm-500/20"
                              >
                                <span className="text-xl flex-shrink-0 drop-shadow">
                                  {song.coverEmoji}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="font-display text-warm-100 text-xs truncate group-hover:text-neon-warm transition-colors">
                                    《{song.title}》
                                  </div>
                                  <div className="font-hand text-warm-200/40 text-[10px] truncate">
                                    {song.year} · {song.album}
                                  </div>
                                </div>
                              </motion.button>
                            ))}
                          </div>

                          {songsOfMood.length > 6 && (
                            <div className="mt-4 pt-4 border-t border-warm-500/10 flex items-center justify-between">
                              <span className="font-hand text-warm-200/40 text-xs">
                                还有 {songsOfMood.length - 6} 首同情绪作品...
                              </span>
                              <Link
                                to={`/shelves/${mood.id}`}
                                className="font-hand text-xs hover:underline"
                                style={{ color: mood.neonColor }}
                              >
                                去歌单查看全部 →
                              </Link>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredSongs.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                  {filteredSongs.map((song, idx) => {
                    const mood = getMoodById(song.mood);
                    return (
                      <motion.div
                        key={song.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: idx * 0.03 }}
                        whileHover={{ y: -6, scale: 1.03 }}
                        onClick={() => setSelectedSong(song)}
                        className="wooden-frame rounded-xl p-2 md:p-3 cursor-pointer"
                      >
                        <div
                          className="glass-panel rounded-xl p-3 md:p-4 h-full relative overflow-hidden group"
                          style={{
                            background: `linear-gradient(135deg, ${song.coverColors[0]}33, ${song.coverColors[1]}11, rgba(26, 20, 16, 0.95))`,
                          }}
                        >
                          <div className="aspect-square rounded-xl flex items-center justify-center mb-3 relative overflow-hidden"
                            style={{
                              background: `linear-gradient(135deg, ${song.coverColors[0]}, ${song.coverColors[1]})`,
                              boxShadow: `0 4px 16px ${song.coverColors[0]}44`,
                            }}
                          >
                            <span className="text-4xl md:text-5xl drop-shadow-lg">
                              {song.coverEmoji}
                            </span>
                            {song.recommended && (
                              <div className="absolute top-2 right-2">
                                <Sparkles size={14} className="text-neon-warm drop-shadow" />
                              </div>
                            )}
                            {mood && (
                              <div
                                className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md text-[10px] font-hand backdrop-blur-sm"
                                style={{
                                  backgroundColor: 'rgba(0,0,0,0.4)',
                                  color: mood.neonColor,
                                }}
                              >
                                {mood.emoji} {mood.name}
                              </div>
                            )}
                          </div>

                          <h3 className="font-display text-warm-100 text-sm md:text-base truncate mb-1 group-hover:text-neon-warm transition-colors">
                            《{song.title}》
                          </h3>
                          <div className="font-hand text-warm-200/50 text-[10px] md:text-xs mb-2 line-clamp-1">
                            {song.year} · {song.album}
                          </div>

                          <div className="flex flex-wrap gap-1 mb-2">
                            {song.themes.slice(0, 2).map((t) => {
                              const themeInfo = allThemes.find(
                                (th) => th.name === t
                              );
                              return (
                                <span
                                  key={t}
                                  className="px-1.5 py-0.5 rounded text-[9px] md:text-[10px] font-hand"
                                  style={{
                                    backgroundColor: `${themeInfo?.color || '#888'}1f`,
                                    color: themeInfo?.color || '#aaa',
                                  }}
                                >
                                  {t}
                                </span>
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-warm-500/10">
                            <span className="font-hand text-warm-200/40 text-[10px]">
                              {song.duration}
                            </span>
                            <span className="font-hand text-warm-200/40 text-[10px]">
                              {song.language}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="wooden-frame rounded-2xl p-8 md:p-12">
                  <div className="glass-panel rounded-xl p-8 md:p-12 text-center">
                    <div className="text-5xl md:text-6xl mb-4 opacity-50">🎵</div>
                    <h3 className="font-display text-xl md:text-2xl text-warm-100 mb-2">
                      没有找到匹配的作品
                    </h3>
                    <p className="font-hand text-warm-200/50">
                      试试调整筛选条件或搜索关键词
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setMoodFilter('all');
                        setSelectedThemes(new Set());
                      }}
                      className="mt-4 px-4 py-2 rounded-xl bg-neon-warm/20 text-neon-warm border border-neon-warm/40 hover:bg-neon-warm/30 transition-all font-hand text-sm"
                    >
                      清除所有筛选
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedSong && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedSong(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="wooden-frame rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="glass-panel rounded-xl p-5 md:p-8"
                  style={{
                    background: `linear-gradient(180deg, ${selectedSong.coverColors[0]}22, rgba(26, 20, 16, 0.97))`,
                  }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <button
                      onClick={() => setSelectedSong(null)}
                      className="p-2 rounded-full bg-night-500/50 text-warm-200/60 hover:text-warm-100 hover:bg-white/10 transition-all"
                    >
                      <X size={18} />
                    </button>
                    <Link
                      to={`/record/${selectedSong.id}`}
                      onClick={() => setSelectedSong(null)}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-neon-warm/20 text-neon-warm border border-neon-warm/40 hover:bg-neon-warm/30 transition-all font-hand text-sm"
                    >
                      查看详情
                      <ChevronRight size={14} />
                    </Link>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div
                      className="w-32 h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto md:mx-0"
                      style={{
                        background: `linear-gradient(135deg, ${selectedSong.coverColors[0]}, ${selectedSong.coverColors[1]})`,
                        boxShadow: `0 8px 32px ${selectedSong.coverColors[0]}55`,
                      }}
                    >
                      <span className="text-5xl md:text-6xl drop-shadow-lg">
                        {selectedSong.coverEmoji}
                      </span>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h2 className="font-display text-2xl md:text-3xl text-warm-100 mb-2">
                        《{selectedSong.title}》
                      </h2>
                      <div className="font-hand text-warm-200/60 mb-4">
                        {selectedSong.year} · {selectedSong.album} ·{' '}
                        {selectedSong.language}
                      </div>

                      <div
                        className="p-4 rounded-xl mb-4"
                        style={{
                          background: 'rgba(0,0,0,0.2)',
                          borderLeft: `3px solid ${selectedSong.coverColors[0]}`,
                        }}
                      >
                        <Quote
                          size={14}
                          style={{ color: selectedSong.coverColors[0] }}
                          className="opacity-60 mb-1"
                        />
                        <p className="font-hand italic text-sm md:text-base text-warm-200/80">
                          "{selectedSong.lyricQuote}"
                        </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        <div className="p-2 rounded-lg bg-night-500/40">
                          <div className="font-hand text-warm-200/50">作词</div>
                          <div className="font-display text-neon-pink">
                            {selectedSong.lyricist}
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-night-500/40">
                          <div className="font-hand text-warm-200/50">作曲</div>
                          <div className="font-display text-neon-cyan">
                            {selectedSong.composer}
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-night-500/40">
                          <div className="font-hand text-warm-200/50">时长</div>
                          <div className="font-display text-neon-warm">
                            {selectedSong.duration}
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-night-500/40">
                          <div className="font-hand text-warm-200/50">情绪</div>
                          <div
                            className="font-display"
                            style={{
                              color: getMoodById(selectedSong.mood)
                                ?.neonColor,
                            }}
                          >
                            {getMoodById(selectedSong.mood)?.emoji}{' '}
                            {getMoodById(selectedSong.mood)?.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-warm-500/10">
                    <div>
                      <div className="font-hand text-warm-200/50 text-xs mb-2">
                        音乐风格
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSong.style.map((st) => {
                          const styleColors: Record<string, string> = {
                            Cantopop: '#f4c542',
                            Mandopop: '#ff6b9d',
                            Ballad: '#4ecdc4',
                            Rock: '#ef4444',
                            Electronic: '#22d3ee',
                            Jazz: '#f97316',
                            Orchestral: '#8b5cf6',
                            Acoustic: '#22c55e',
                            Folk: '#84cc16',
                          };
                          const color = styleColors[st] || '#888';
                          return (
                            <span
                              key={st}
                              className="px-2.5 py-1 rounded-full text-xs font-hand"
                              style={{
                                backgroundColor: `${color}22`,
                                border: `1px solid ${color}44`,
                                color,
                              }}
                            >
                              <Music size={10} className="inline mr-1" />
                              {st}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="font-hand text-warm-200/50 text-xs mb-2">
                        歌曲主题
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSong.themes.map((t) => {
                          const themeInfo = allThemes.find(
                            (th) => th.name === t
                          );
                          return (
                            <button
                              key={t}
                              onClick={() => toggleTheme(t)}
                              className={`px-2.5 py-1 rounded-full text-xs font-hand transition-all ${
                                selectedThemes.has(t) ? 'ring-2 ring-offset-1 ring-offset-night-300 scale-105' : 'hover:scale-105'
                              }`}
                              style={{
                                backgroundColor: `${themeInfo?.color || '#888'}22`,
                                border: `1px solid ${themeInfo?.color || '#888'}44`,
                                color: themeInfo?.color || '#888',
                              }}
                            >
                              <Heart size={10} className="inline mr-1" />
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {relatedForModal.length > 0 && (
                      <div>
                        <div className="font-hand text-warm-200/50 text-xs mb-2">
                          相关推荐
                        </div>
                        <div className="space-y-1.5">
                          {relatedForModal.map((item) => (
                            <Link
                              key={item.song.id}
                              to={`/record/${item.song.id}`}
                              onClick={() => setSelectedSong(null)}
                              className="flex items-center gap-3 p-2.5 rounded-xl bg-night-500/40 hover:bg-night-500/60 transition-all group"
                            >
                              <span className="text-xl">{item.song.coverEmoji}</span>
                              <div className="flex-1 min-w-0">
                                <div className="font-display text-warm-100 text-sm truncate group-hover:text-neon-warm transition-colors">
                                  《{item.song.title}》
                                </div>
                                <div className="font-hand text-warm-200/40 text-[10px] truncate">
                                  {item.reasons.slice(0, 2).join(' / ')}
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
