import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Grid3X3, Layers, Clock, Disc } from 'lucide-react';
import { albums, getAllYears, getAlbumsGroupedByYear } from '@/data/albums';
import { getMoodById } from '@/data/moods';
import AlbumCover from '@/components/album/AlbumCover';

type ViewMode = 'timeline' | 'wall';
type LayoutMode = 'grid' | 'masonry';

const AlbumTimelinePage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('grid');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const years = getAllYears();
  const albumsByYear = getAlbumsGroupedByYear();

  const scrollToYear = (year: number) => {
    setSelectedYear(year);
    const element = document.getElementById(`year-${year}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div
        className="fixed inset-0 -z-10 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(244, 197, 66, 0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at 20% 80%, rgba(78, 205, 196, 0.08) 0%, transparent 40%),
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
            <div className="text-5xl md:text-6xl animate-warm-glow">
              📀
            </div>
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-100 mb-4">
            专辑时间轴
          </h1>
          <p className="font-hand text-warm-200/60 text-base md:text-lg max-w-2xl mx-auto">
            从1996到2024，跟随陈奕迅的音乐旅程，感受每一张专辑带来的感动与回忆
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-panel rounded-2xl p-4 md:p-6 mb-10 md:mb-14"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-warm-200/60 font-hand text-sm">浏览模式：</span>
              <div className="flex bg-night-500/50 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-sm transition-all ${
                    viewMode === 'timeline'
                      ? 'bg-warm-300/20 text-warm-300 border border-warm-300/30'
                      : 'text-warm-200/60 hover:text-warm-200'
                  }`}
                >
                  <Clock size={16} />
                  <span className="hidden sm:inline">时间轴</span>
                </button>
                <button
                  onClick={() => setViewMode('wall')}
                  className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-sm transition-all ${
                    viewMode === 'wall'
                      ? 'bg-warm-300/20 text-warm-300 border border-warm-300/30'
                      : 'text-warm-200/60 hover:text-warm-200'
                  }`}
                >
                  <Layers size={16} />
                  <span className="hidden sm:inline">封面墙</span>
                </button>
              </div>
            </div>

            {viewMode === 'wall' && (
              <div className="flex items-center gap-2">
                <span className="text-warm-200/60 font-hand text-sm">布局：</span>
                <div className="flex bg-night-500/50 rounded-xl p-1">
                  <button
                    onClick={() => setLayoutMode('grid')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                      layoutMode === 'grid'
                        ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                        : 'text-warm-200/60 hover:text-warm-200'
                    }`}
                  >
                    <Grid3X3 size={16} />
                    <span className="hidden sm:inline">网格</span>
                  </button>
                  <button
                    onClick={() => setLayoutMode('masonry')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                      layoutMode === 'masonry'
                        ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                        : 'text-warm-200/60 hover:text-warm-200'
                    }`}
                  >
                    <Disc size={16} />
                    <span className="hidden sm:inline">瀑布流</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 pt-5 border-t border-warm-500/10">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={14} className="text-warm-300" />
              <span className="font-hand text-warm-200/70 text-sm">快速跳转</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => scrollToYear(year)}
                  className={`px-3 py-1.5 rounded-full font-hand text-sm transition-all ${
                    selectedYear === year
                      ? 'bg-warm-300/20 text-warm-300 border border-warm-300/40'
                      : 'bg-white/5 text-warm-200/60 hover:bg-white/10 hover:text-warm-200 border border-transparent'
                  }`}
                >
                  {year}
                  <span className="ml-1.5 text-xs opacity-60">
                    ({albumsByYear[year]?.length || 0}张)
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === 'timeline' ? (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-warm-300/40 via-warm-300/20 to-transparent -translate-x-1/2" />

              {years.map((year, yearIndex) => (
                <motion.div
                  key={year}
                  id={`year-${year}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, delay: yearIndex * 0.1 }}
                  className="relative mb-16 md:mb-20"
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 -top-2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, delay: yearIndex * 0.1 + 0.2 }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #f4c542, #d4af37)',
                        boxShadow: '0 0 20px rgba(244, 197, 66, 0.5)',
                      }}
                    >
                      <span className="text-lg md:text-xl">📀</span>
                    </motion.div>
                  </div>

                  <div className="ml-14 md:ml-0 md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
                    <div className={`${yearIndex % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: yearIndex * 0.1 + 0.3, duration: 0.5 }}
                        className="font-display text-3xl md:text-4xl text-warm-100 mb-2"
                        style={{ textShadow: '0 0 20px rgba(244, 197, 66, 0.3)' }}
                      >
                        {year}年
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: yearIndex * 0.1 + 0.4, duration: 0.5 }}
                        className="font-hand text-warm-200/50 text-sm mb-6"
                      >
                        {albumsByYear[year]?.length || 0} 张专辑发行
                      </motion.p>
                    </div>

                    <div className={`${yearIndex % 2 === 0 ? 'md:col-start-2' : 'md:row-start-1 md:pr-12'}`}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                        {albumsByYear[year]?.map((album, albumIndex) => {
                          const mood = getMoodById(album.primaryMood);
                          return (
                            <motion.div
                              key={album.id}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.6,
                                delay: yearIndex * 0.1 + albumIndex * 0.1 + 0.4,
                              }}
                              className="wooden-frame rounded-xl p-3 md:p-4"
                            >
                              <div className="glass-panel rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                  <div
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{
                                      background: `linear-gradient(135deg, ${album.coverColors[0]}, ${album.coverColors[1]})`,
                                    }}
                                  >
                                    <span className="text-2xl md:text-3xl">{album.coverEmoji}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-display text-warm-100 text-base md:text-lg mb-1 truncate">
                                      {album.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-warm-200/50 text-xs font-hand mb-2">
                                      <span>{album.month ? `${album.month}月` : ''}</span>
                                      <span>·</span>
                                      <span>{album.language}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                      {mood && (
                                        <span
                                          className="px-2 py-0.5 rounded-full font-hand"
                                          style={{
                                            backgroundColor: `${mood.neonColor}22`,
                                            color: mood.neonColor,
                                            border: `1px solid ${mood.neonColor}44`,
                                          }}
                                        >
                                          {mood.emoji} {mood.name}
                                        </span>
                                      )}
                                      <span className="text-warm-200/40 font-hand">
                                        {album.totalTracks}首
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <p className="font-serif italic text-warm-200/60 text-xs mt-3 line-clamp-2 leading-relaxed">
                                  "{album.eraNote}"
                                </p>
                                <a
                                  href={`/album/${album.id}`}
                                  className="mt-3 inline-flex items-center gap-1 text-warm-300 hover:text-warm-200 text-xs font-hand transition-colors"
                                >
                                  查看详情 →
                                </a>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="wall"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
            >
              {layoutMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6 lg:gap-7">
                  {albums.map((album, index) => (
                    <AlbumCover key={album.id} album={album} index={index} size="md" />
                  ))}
                </div>
              ) : (
                <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-5 md:gap-6">
                  {albums.map((album, index) => (
                    <motion.div
                      key={album.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.03 }}
                      className="break-inside-avoid mb-5 md:mb-6"
                      style={{
                        marginTop: index % 3 === 1 ? '20px' : index % 3 === 2 ? '40px' : '0',
                      }}
                    >
                      <AlbumCover album={album} index={index} size="md" />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 md:mt-28 text-center"
        >
          <div
            className="inline-block font-hand text-warm-200/40 text-sm px-6 py-3 rounded-full"
            style={{
              background: 'linear-gradient(90deg, rgba(244, 197, 66, 0.1), transparent, rgba(78, 205, 196, 0.1))',
              border: '1px solid rgba(244, 197, 66, 0.15)',
            }}
          >
            ♪ 二十八年音乐旅程，感谢Eason的陪伴 ♪
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AlbumTimelinePage;
