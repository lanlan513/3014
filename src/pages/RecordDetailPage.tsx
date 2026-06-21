import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Play,
  Pause,
  Heart,
  Calendar,
  Disc,
  Tag,
  Volume2,
  Quote,
  Sparkles,
  Share2,
} from 'lucide-react';
import { getRecordById, getRelatedRecords } from '@/data/records';
import { getMoodById } from '@/data/moods';
import { useFavoritesStore } from '@/stores/favoritesStore';
import RecordCover from '@/components/shelf/RecordCover';

const RecordDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const record = getRecordById(id || '');
  const mood = record ? getMoodById(record.mood) : undefined;
  const related = record ? getRelatedRecords(record.id, 3) : [];

  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const fav = isFavorite(id || '');

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.3));
    }, 100);
    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!record || !mood) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-6">💿</div>
          <h2 className="font-display text-warm-100 text-2xl mb-4">这张唱片好像不见了</h2>
          <Link to="/" className="text-warm-300 hover:text-warm-200 font-hand">
            ← 回街角找找
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${mood.neonColor}18 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 80%, ${record.coverColors[0]}33 0%, transparent 60%),
                      linear-gradient(180deg, #14100c 0%, #0d0a08 100%)`,
        }}
      />

      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-warm-200/70 hover:text-warm-300 transition-colors text-sm font-hand"
          >
            <ChevronLeft size={16} />
            返回情绪架
          </button>
          <button
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-warm-500/20 text-warm-200/70 hover:text-warm-300 transition-all text-xs font-hand"
          >
            <Share2 size={13} />
            分享故事
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-28">
              <div className="relative mx-auto max-w-sm">
                <div className="relative aspect-square max-w-[280px] md:max-w-none mx-auto">
                  <motion.div
                    className="absolute inset-0 rounded-full vinyl-record"
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{
                      duration: 6,
                      repeat: isPlaying ? Infinity : 0,
                      ease: 'linear',
                    }}
                    style={{
                      boxShadow:
                        '0 0 60px rgba(0,0,0,0.7), inset 0 0 40px rgba(0,0,0,0.5), inset 0 0 3px rgba(244, 197, 66, 0.15)',
                    }}
                  >
                    <div className="absolute inset-[35%] rounded-full vinyl-label flex items-center justify-center flex-col p-4 text-center">
                      <div className="text-2xl md:text-3xl mb-1">{record.coverEmoji}</div>
                      <div className="w-3 h-3 rounded-full bg-night-500 absolute" style={{ boxShadow: 'inset 0 0 4px rgba(0,0,0,0.8)' }} />
                    </div>
                  </motion.div>

                  <motion.div
                    className={`absolute inset-0 rounded-full vinyl-record`}
                    initial={{ x: '15%', scale: 0.85, opacity: 0.6 }}
                    animate={
                      isPlaying
                        ? { x: '25%', scale: 0.85, opacity: 0.5 }
                        : { x: '15%', scale: 0.85, opacity: 0.6 }
                    }
                    transition={{ duration: 0.5 }}
                    style={{ zIndex: -1 }}
                  >
                    <div className="absolute inset-[35%] rounded-full vinyl-label" />
                  </motion.div>

                  <div
                    className="absolute -top-3 right-[15%] origin-bottom-right z-20"
                    style={{
                      transform: isPlaying ? 'rotate(-8deg)' : 'rotate(15deg)',
                      transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    <div className="w-[100px] md:w-[130px] h-1.5 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full shadow-lg" />
                    <div className="absolute -right-1 -bottom-1 w-4 h-4 rounded-full bg-gray-400 shadow-lg" />
                  </div>
                </div>

                <div className="mt-10 wooden-frame rounded-2xl p-5 md:p-6">
                  <div className="glass-panel rounded-xl p-4 md:p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Volume2 size={16} className="text-warm-300" />
                        <span className="font-hand text-warm-100 text-sm">
                          {isPlaying ? '正在播放...' : '准备就绪'}
                        </span>
                      </div>
                      <span className="font-hand text-warm-200/60 text-xs">
                        {record.duration}
                      </span>
                    </div>

                    <div className="h-1.5 rounded-full bg-night-200 mb-4 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          width: `${progress}%`,
                          background: `linear-gradient(90deg, ${mood.neonColor}, #f4c542)`,
                          boxShadow: `0 0 10px ${mood.neonColor}`,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-center gap-5">
                      <button
                        onClick={() => toggleFavorite(record.id)}
                        className="relative p-2 rounded-full transition-all hover:scale-110"
                        style={{ color: fav ? '#ff6b9d' : 'rgba(245, 230, 200, 0.5)' }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={fav ? 'filled' : 'empty'}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ duration: 0.3, type: 'spring' }}
                          >
                            <Heart
                              size={24}
                              fill={fav ? 'currentColor' : 'none'}
                              style={fav ? { filter: 'drop-shadow(0 0 8px #ff6b9d)' } : {}}
                            />
                          </motion.div>
                        </AnimatePresence>
                        {fav && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-neon-pink animate-neon-pulse"
                          />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setIsPlaying(!isPlaying);
                          if (!isPlaying) setProgress(0);
                        }}
                        className="relative w-16 h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center transition-all hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${mood.neonColor}, ${mood.neonColor}cc)`,
                          boxShadow: `0 0 30px ${mood.neonColor}66, inset 0 0 20px rgba(255,255,255,0.2)`,
                        }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={isPlaying ? 'pause' : 'play'}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {isPlaying ? (
                              <Pause size={26} fill="white" className="text-white" />
                            ) : (
                              <Play size={26} fill="white" className="text-white ml-1" />
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </button>

                      <div className="p-2 text-warm-200/50">
                        <Disc size={22} />
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-warm-500/10">
                      <p className="text-center font-hand text-xs text-warm-200/50">
                        {fav ? '已收藏到你的心情档案' : '点红心收藏这段旋律'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="mb-4">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm mb-4"
                style={{
                  backgroundColor: `${mood.neonColor}22`,
                  color: mood.neonColor,
                  border: `1px solid ${mood.neonColor}44`,
                }}
              >
                <span>{mood.emoji}</span>
                <span className="font-hand">{mood.name}·{record.album}</span>
              </div>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-100 mb-3 leading-tight">
              <span className="inline-block">
                {record.title.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                    className="inline-block"
                    style={{
                      textShadow: i % 2 === 0 ? undefined : '0 0 20px rgba(244, 197, 66, 0.3)',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-warm-200/70 font-hand text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {record.year}年发行
              </span>
              <span className="flex items-center gap-1.5">
                <Disc size={14} />
                {record.artist}
              </span>
              <span className="flex items-center gap-1.5 flex-wrap">
                <Tag size={14} />
                {record.tags.join(' · ')}
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="relative mb-10"
            >
              <div
                className="absolute -inset-4 rounded-3xl opacity-30"
                style={{
                  background: `radial-gradient(circle at 0% 0%, ${mood.neonColor}33 0%, transparent 50%)`,
                }}
              />

              <div className="relative paper-yellow rounded-2xl p-6 md:p-10 shadow-2xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="absolute top-4 right-4 sticker-tag px-3 py-1 rounded text-xs font-hand rotate-3">
                  #{record.year}
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6 pb-5 border-b border-dashed border-warm-500/30">
                    <Sparkles size={20} className="text-warm-500 flex-shrink-0" />
                    <h2 className="font-display text-xl md:text-2xl text-night-500">
                      人生切片
                    </h2>
                  </div>

                  <p className="font-serif text-base md:text-lg leading-loose md:leading-[2.2] text-night-500 whitespace-pre-line indent-8">
                    {record.story}
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="relative mt-10 p-5 md:p-8 rounded-2xl"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(244, 197, 66, 0.15), rgba(255, 255, 255, 0.05))',
                    borderLeft: `4px solid ${mood.neonColor}`,
                  }}
                >
                  <Quote
                    size={30}
                    className="absolute top-4 left-4 opacity-20"
                    style={{ color: mood.neonColor }}
                  />
                  <Quote
                    size={30}
                    className="absolute bottom-4 right-4 opacity-20 rotate-180"
                    style={{ color: mood.neonColor }}
                  />
                  <p className="font-display text-lg md:text-xl lg:text-2xl text-night-500 italic leading-relaxed px-4">
                    {record.lyricQuote}
                  </p>
                </motion.div>

                <div className="mt-8 md:mt-10 pt-5 border-t border-dashed border-warm-500/30 flex flex-wrap justify-between items-center gap-4">
                  <div className="font-hand text-xs md:text-sm text-night-500/60">
                    🗓️ 时代注解
                  </div>
                  <div className="font-serif italic text-xs md:text-sm text-night-500/70 text-right max-w-[80%]">
                    {record.eraNote}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="glass-panel rounded-2xl p-5 md:p-6 mb-10"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="text-4xl">💌</div>
                <div className="flex-1">
                  <h3 className="font-display text-warm-100 text-lg mb-1.5">
                    这像你的故事吗？
                  </h3>
                  <p className="font-hand text-warm-200/60 text-sm">
                    每段旋律都在寻找懂它的人。如果它让你想起了什么，把它收藏起来，今晚，允许自己脆弱一会儿。
                  </p>
                </div>
                <button
                  onClick={() => toggleFavorite(record.id)}
                  className={`px-5 py-3 rounded-full font-display text-sm transition-all whitespace-nowrap ${
                    fav
                      ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/50'
                      : 'bg-warm-300/20 text-warm-300 hover:bg-warm-300/30 border border-warm-300/40'
                  }`}
                  style={fav ? { boxShadow: '0 0 20px rgba(255, 107, 157, 0.3)' } : {}}
                >
                  <Heart
                    size={16}
                    className="inline-block mr-1.5 -mt-0.5"
                    fill={fav ? 'currentColor' : 'none'}
                  />
                  {fav ? '已收藏到心情' : '收藏这段旋律'}
                </button>
              </div>
            </motion.div>

            {related.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🎶</span>
                  <h3 className="font-display text-warm-100 text-xl md:text-2xl">
                    同一种情绪的唱片
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
                  {related.map((r, i) => (
                    <RecordCover key={r.id} record={r} index={i} size="sm" />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RecordDetailPage;
