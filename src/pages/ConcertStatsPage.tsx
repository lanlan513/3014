import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Music,
  Globe,
  Users,
  Calendar,
  Mic2,
} from 'lucide-react';
import {
  getConcertStatistics,
  concertTours,
  liveClips,
  concertCities,
} from '@/data/concerts';
import { moods, getMoodById } from '@/data/moods';
import type { MoodId } from '@/data/moods';

const ConcertStatsPage = () => {
  const stats = getConcertStatistics();

  const moodDistribution: Record<MoodId, number> = {
    lonely: 0,
    regret: 0,
    reunion: 0,
    growth: 0,
  };
  liveClips.forEach((clip) => {
    moodDistribution[clip.mood] = (moodDistribution[clip.mood] || 0) + 1;
  });
  const totalClips = liveClips.length;

  const cityConcertCounts = Object.entries(stats.concertsByCity)
    .map(([cityId, count]) => {
      const city = concertCities.find((c) => c.id === cityId);
      return { cityId, name: city?.name || cityId, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const maxCityCount = Math.max(...cityConcertCounts.map((c) => c.count));
  const maxSongCount = Math.max(...stats.topSongs.map((s) => s.count));

  const toursByYearEntries = Object.entries(stats.toursByYear).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  );
  const maxToursPerYear = Math.max(...toursByYearEntries.map(([, v]) => v));

  const sortedTours = [...concertTours].sort(
    (a, b) => a.startYear - b.startYear
  );
  const minYear = Math.min(...sortedTours.map((t) => t.startYear));
  const maxYear = Math.max(...sortedTours.map((t) => t.endYear));
  const totalYears = maxYear - minYear + 1;

  const statCards = [
    {
      label: '总巡演数',
      value: stats.totalTours,
      icon: Mic2,
      color: '#f4c542',
      suffix: '场',
    },
    {
      label: '总演唱会数',
      value: stats.totalConcerts,
      icon: Music,
      color: '#a855f7',
      suffix: '场',
    },
    {
      label: '总城市数',
      value: stats.totalCities,
      icon: MapPin,
      color: '#4ecdc4',
      suffix: '座',
    },
    {
      label: '总国家数',
      value: stats.totalCountries,
      icon: Globe,
      color: '#f97316',
      suffix: '个',
    },
    {
      label: '总观众人数',
      value: stats.totalAttendance.toLocaleString(),
      icon: Users,
      color: '#ff6b9d',
      suffix: '人',
    },
    {
      label: '总演唱歌曲数',
      value: stats.totalSongs.toLocaleString(),
      icon: BarChart3,
      color: '#22c55e',
      suffix: '首',
    },
  ];

  let cumulativePercent = 0;
  const donutSegments = moods.map((mood) => {
    const count = moodDistribution[mood.id] || 0;
    const percent = (count / totalClips) * 100;
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

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div
        className="fixed inset-0 -z-10 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 80%, rgba(78, 205, 196, 0.08) 0%, transparent 40%),
                      radial-gradient(ellipse at 20% 60%, rgba(244, 197, 66, 0.06) 0%, transparent 40%),
                      linear-gradient(180deg, #14100c 0%, #0d0a08 100%)`,
        }}
      />

      <div className="container max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="text-5xl md:text-6xl animate-warm-glow">📊</div>
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-100 mb-4">
            演唱会数据统计
          </h1>
          <p className="font-hand text-warm-200/60 text-base md:text-lg max-w-2xl mx-auto">
            用数据回顾Eason的演唱会历程，从1999到2024，每一场都是经典
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 mb-10 md:mb-14"
        >
          {statCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="wooden-frame rounded-xl p-3 md:p-4"
            >
              <div className="glass-panel rounded-lg p-4 text-center">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-xl flex items-center justify-center mb-3"
                  style={{
                    backgroundColor: `${card.color}22`,
                    boxShadow: `0 0 15px ${card.color}33`,
                  }}
                >
                  <card.icon size={20} color={card.color} />
                </div>
                <div
                  className="font-display text-2xl md:text-3xl mb-1"
                  style={{ color: card.color }}
                >
                  {card.value}
                  <span className="text-sm ml-1 opacity-70">{card.suffix}</span>
                </div>
                <div className="font-hand text-warm-200/60 text-xs md:text-sm">
                  {card.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="wooden-frame rounded-2xl p-4 md:p-6"
          >
            <div className="glass-panel rounded-xl p-5 md:p-6 h-full">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                  <BarChart3 size={16} className="text-neon-purple" />
                </div>
                <h2 className="font-display text-xl md:text-2xl text-warm-100">
                  按年份巡演分布
                </h2>
              </div>
              <div className="h-64 md:h-72 flex items-end justify-between gap-1 md:gap-2 px-2">
                {toursByYearEntries.map(([year, count], index) => {
                  const heightPercent = (count / maxToursPerYear) * 100;
                  return (
                    <motion.div
                      key={year}
                      initial={{ opacity: 0, scaleY: 0 }}
                      whileInView={{ opacity: 1, scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.05,
                        type: 'spring',
                        stiffness: 100,
                      }}
                      className="flex-1 flex flex-col items-center justify-end h-full group"
                    >
                      <div className="text-xs font-display text-neon-purple mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {count}
                      </div>
                      <motion.div
                        className="w-full rounded-t-md relative overflow-hidden"
                        style={{
                          height: `${heightPercent}%`,
                          background: `linear-gradient(180deg, #a855f7 0%, #7c3aed 100%)`,
                          boxShadow: '0 0 10px rgba(168, 85, 247, 0.4)',
                          transformOrigin: 'bottom',
                        }}
                        whileHover={{
                          filter: 'brightness(1.2)',
                          boxShadow: '0 0 20px rgba(168, 85, 247, 0.7)',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                      </motion.div>
                      <div className="text-xs font-hand text-warm-200/50 mt-2">
                        {year}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-warm-500/10 flex items-center gap-2">
                <TrendingUp size={14} className="text-neon-purple" />
                <span className="font-hand text-warm-200/50 text-xs">
                  横轴：年份 · 纵轴：巡演数量 · 峰值：{maxToursPerYear}场
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="wooden-frame rounded-2xl p-4 md:p-6"
          >
            <div className="glass-panel rounded-xl p-5 md:p-6 h-full">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
                  <MapPin size={16} className="text-neon-cyan" />
                </div>
                <h2 className="font-display text-xl md:text-2xl text-warm-100">
                  举办场次最多城市 TOP10
                </h2>
              </div>
              <div className="space-y-3">
                {cityConcertCounts.map((city, index) => {
                  const widthPercent = (city.count / maxCityCount) * 100;
                  const colors = [
                    '#4ecdc4',
                    '#22d3ee',
                    '#06b6d4',
                    '#0891b2',
                    '#0e7490',
                    '#f4c542',
                    '#f97316',
                    '#ef4444',
                    '#a855f7',
                    '#ec4899',
                  ];
                  const barColor = colors[index % colors.length];
                  return (
                    <motion.div
                      key={city.cityId}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.06 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center font-display text-xs flex-shrink-0"
                        style={{
                          backgroundColor: `${barColor}33`,
                          color: barColor,
                        }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-hand text-warm-100 text-sm truncate">
                            {city.name}
                          </span>
                          <span
                            className="font-display text-xs flex-shrink-0 ml-2"
                            style={{ color: barColor }}
                          >
                            {city.count}场
                          </span>
                        </div>
                        <div className="h-2 bg-night-500/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${widthPercent}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.8,
                              delay: index * 0.06 + 0.2,
                              ease: 'easeOut',
                            }}
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`,
                              boxShadow: `0 0 8px ${barColor}66`,
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="wooden-frame rounded-2xl p-4 md:p-6"
          >
            <div className="glass-panel rounded-xl p-5 md:p-6 h-full">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-neon-pink/20 flex items-center justify-center">
                  <Music size={16} className="text-neon-pink" />
                </div>
                <h2 className="font-display text-xl md:text-2xl text-warm-100">
                  演唱频率最高歌曲 TOP10
                </h2>
              </div>
              <div className="space-y-3">
                {stats.topSongs.map((song, index) => {
                  const widthPercent = (song.count / maxSongCount) * 100;
                  const colors = [
                    '#ff6b9d',
                    '#f472b6',
                    '#ec4899',
                    '#db2777',
                    '#be185d',
                    '#f4c542',
                    '#fb923c',
                    '#f87171',
                    '#c084fc',
                    '#67e8f9',
                  ];
                  const barColor = colors[index % colors.length];
                  return (
                    <motion.div
                      key={song.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.06 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center font-display text-xs flex-shrink-0"
                        style={{
                          backgroundColor: `${barColor}33`,
                          color: barColor,
                        }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-hand text-warm-100 text-sm truncate">
                            《{song.title}》
                          </span>
                          <span
                            className="font-display text-xs flex-shrink-0 ml-2"
                            style={{ color: barColor }}
                          >
                            {song.count}次
                          </span>
                        </div>
                        <div className="h-2 bg-night-500/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${widthPercent}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.8,
                              delay: index * 0.06 + 0.2,
                              ease: 'easeOut',
                            }}
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`,
                              boxShadow: `0 0 8px ${barColor}66`,
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="wooden-frame rounded-2xl p-4 md:p-6"
          >
            <div className="glass-panel rounded-xl p-5 md:p-6 h-full">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-neon-warm/20 flex items-center justify-center">
                  <span className="text-sm">🎭</span>
                </div>
                <h2 className="font-display text-xl md:text-2xl text-warm-100">
                  情绪类型现场片段分布
                </h2>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                <div className="relative flex-shrink-0">
                  <svg width="180" height="180" viewBox="0 0 180 180">
                    {donutSegments.map((segment, index) => {
                      if (segment.percent === 0) return null;
                      const startAngle = (segment.startPercent / 100) * 360;
                      const endAngle =
                        ((segment.startPercent + segment.percent) / 100) * 360;
                      return (
                        <motion.path
                          key={segment.mood.id}
                          d={describeArc(90, 90, 70, startAngle, endAngle)}
                          fill="none"
                          stroke={segment.mood.neonColor}
                          strokeWidth="24"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: index * 0.2,
                            ease: 'easeOut',
                          }}
                          style={{
                            filter: `drop-shadow(0 0 6px ${segment.mood.neonColor}66)`,
                          }}
                        />
                      );
                    })}
                    <circle
                      cx="90"
                      cy="90"
                      r="40"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-2xl text-warm-100">
                      {totalClips}
                    </span>
                    <span className="font-hand text-warm-200/50 text-xs">
                      个片段
                    </span>
                  </div>
                </div>
                <div className="flex-1 space-y-3 w-full md:w-auto">
                  {donutSegments.map((segment, index) => (
                    <motion.div
                      key={segment.mood.id}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1 + 0.3,
                      }}
                      className="flex items-center justify-between gap-4 p-2 rounded-lg bg-night-500/30"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: segment.mood.neonColor,
                            boxShadow: `0 0 6px ${segment.mood.neonColor}`,
                          }}
                        />
                        <span className="font-hand text-warm-100 text-sm">
                          {segment.mood.emoji} {segment.mood.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="font-display text-sm"
                          style={{ color: segment.mood.neonColor }}
                        >
                          {segment.count}
                        </span>
                        <span className="font-hand text-warm-200/40 text-xs">
                          ({segment.percent.toFixed(1)}%)
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="wooden-frame rounded-2xl p-4 md:p-6"
        >
          <div className="glass-panel rounded-xl p-5 md:p-6">
            <div className="flex items-center gap-2 mb-6 md:mb-8">
              <div className="w-8 h-8 rounded-lg bg-neon-warm/20 flex items-center justify-center">
                <Calendar size={16} className="text-neon-warm" />
              </div>
              <h2 className="font-display text-xl md:text-2xl text-warm-100">
                巡演时间轴
              </h2>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-4 px-1">
                {Array.from({ length: totalYears }, (_, i) => minYear + i).map(
                  (year) => (
                    <div
                      key={year}
                      className="font-hand text-warm-200/40 text-xs"
                    >
                      {year}
                    </div>
                  )
                )}
              </div>

              <div className="space-y-3 md:space-y-4">
                {sortedTours.map((tour, index) => {
                  const startOffset =
                    ((tour.startYear - minYear) / (totalYears - 1)) * 100;
                  const endOffset =
                    ((tour.endYear - minYear) / (totalYears - 1)) * 100;
                  const widthPercent = Math.max(
                    endOffset - startOffset,
                    4
                  );
                  const mood = getMoodById(tour.primaryMood);
                  return (
                    <motion.div
                      key={tour.id}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                      }}
                      className="relative"
                    >
                      <div className="relative h-12 md:h-14 bg-night-500/30 rounded-xl overflow-hidden">
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          whileInView={{
                            width: `${widthPercent}%`,
                            opacity: 1,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.08 + 0.2,
                            ease: 'easeOut',
                          }}
                          className="absolute top-1/2 -translate-y-1/2 h-8 md:h-10 rounded-xl cursor-pointer group"
                          style={{
                            left: `${startOffset}%`,
                            background: `linear-gradient(90deg, ${tour.coverColors[0]}, ${tour.coverColors[1]})`,
                            boxShadow: `0 0 12px ${tour.coverColors[1]}66`,
                          }}
                          whileHover={{
                            scaleY: 1.1,
                            boxShadow: `0 0 20px ${tour.coverColors[1]}aa`,
                          }}
                        >
                          <div className="h-full w-full px-3 md:px-4 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-lg md:text-xl flex-shrink-0">
                                {tour.coverEmoji}
                              </span>
                              <span className="font-display text-white text-xs md:text-sm truncate drop-shadow">
                                {tour.name}
                              </span>
                            </div>
                            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                              {mood && (
                                <span className="text-xs opacity-90">
                                  {mood.emoji}
                                </span>
                              )}
                              <span className="font-hand text-white/80 text-xs whitespace-nowrap">
                                {tour.totalShows}场
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      <div className="flex items-center justify-between mt-1 px-1">
                        <span
                          className="font-hand text-xs"
                          style={{ color: mood?.neonColor || '#f4c542' }}
                        >
                          {tour.startYear}
                          {tour.startYear !== tour.endYear &&
                            ` - ${tour.endYear}`}
                        </span>
                        <span className="font-hand text-warm-200/40 text-xs hidden sm:inline">
                          {tour.totalCities}城 · {tour.totalCountries}国
                        </span>
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div
            className="inline-block font-hand text-warm-200/40 text-sm px-6 py-3 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, rgba(168, 85, 247, 0.1), transparent, rgba(78, 205, 196, 0.1))',
              border: '1px solid rgba(168, 85, 247, 0.15)',
            }}
          >
            ♪ 数据记录着每一次感动，演唱会还在继续 ♪
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConcertStatsPage;
