import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2, BookOpen } from 'lucide-react';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { getRecordById } from '@/data/records';
import { getMoodById } from '@/data/moods';
import RecordCover from '@/components/shelf/RecordCover';

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavoritesStore();

  const favRecords = favorites
    .map((f) => ({
      ...f,
      record: getRecordById(f.recordId),
    }))
    .filter((f) => f.record !== undefined)
    .sort((a, b) => b.savedAt - a.savedAt);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}月${date.getDate()}日 ${String(
      date.getHours()
    ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 70% 20%, rgba(255, 107, 157, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 30% 80%, rgba(244, 197, 66, 0.1) 0%, transparent 50%), linear-gradient(180deg, #14100c 0%, #0d0a08 100%)',
        }}
      />

      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mb-12"
        >
          <div className="wooden-frame rounded-3xl p-6 md:p-10 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 20% 50%, rgba(255, 107, 157, 0.12) 0%, transparent 60%)',
              }}
            />

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="flex-shrink-0"
              >
                <div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255, 107, 157, 0.3) 0%, rgba(255, 107, 157, 0.1) 100%)',
                    border: '2px solid rgba(255, 107, 157, 0.5)',
                    boxShadow:
                      '0 0 50px rgba(255, 107, 157, 0.25), inset 0 0 30px rgba(255, 107, 157, 0.15)',
                  }}
                >
                  <Heart
                    size={40}
                    fill="#ff6b9d"
                    className="text-neon-pink md:size-12"
                    style={{ filter: 'drop-shadow(0 0 12px #ff6b9d)' }}
                  />
                </div>
              </motion.div>

              <div className="flex-1">
                <h1 className="font-display text-3xl md:text-5xl mb-3 text-neon-pink">
                  我的心情档案
                </h1>
                <p className="font-hand text-warm-100/70 text-base md:text-lg mb-4 leading-relaxed">
                  这里收藏着所有触动过你的旋律，每一首都是你人生的一段证据。
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="px-4 py-1.5 rounded-full bg-neon-pink/20 text-neon-pink border border-neon-pink/40 font-hand">
                    {favRecords.length} 段被珍藏的情绪
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {favRecords.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-3xl p-10 md:p-16 text-center"
          >
            <div className="relative inline-block mb-8">
              <div className="text-7xl md:text-8xl animate-warm-glow">💝</div>
              <motion.div
                className="absolute -top-2 -right-4 text-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                ✨
              </motion.div>
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-warm-100 mb-4">
              心情档案还是空白的
            </h2>
            <p className="font-hand text-warm-200/60 text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed">
              没关系，慢慢来。
              <br />
              总会有一首歌，在某个深夜忽然击中你。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="px-8 py-4 rounded-full font-display text-night-300 transition-all hover:scale-105"
                style={{
                  background:
                    'linear-gradient(135deg, #f4c542 0%, #d4af37 100%)',
                  boxShadow: '0 0 30px rgba(244, 197, 66, 0.4)',
                }}
              >
                回街角逛逛 →
              </Link>
              <Link
                to="/shelves/lonely"
                className="px-8 py-4 rounded-full font-display text-warm-300 border border-warm-300/40 hover:bg-warm-300/10 transition-all"
              >
                <BookOpen size={16} className="inline-block mr-2 -mt-0.5" />
                从「孤独」架开始
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8"
            >
              <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-pink/20 to-transparent mb-8" />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-display text-warm-100 text-lg md:text-xl flex items-center gap-2">
                  <span>📚</span>
                  收藏列表
                  <span className="text-warm-200/50 font-hand text-sm ml-2">
                    最新收藏在上
                  </span>
                </h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-16">
              {favRecords.map((fav, i) => {
                const record = fav.record!;
                const mood = getMoodById(record.mood);
                return (
                  <motion.div
                    key={fav.recordId}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    layout
                  >
                    <div className="glass-panel rounded-2xl overflow-hidden group hover:border-warm-500/30 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row">
                        <Link
                          to={`/record/${record.id}`}
                          className="sm:w-1/3 flex-shrink-0"
                        >
                          <div className="aspect-[3/4] sm:aspect-auto sm:h-full relative overflow-hidden">
                            <div
                              className="absolute inset-0"
                              style={{
                                background: `linear-gradient(135deg, ${record.coverColors[0]} 0%, ${record.coverColors[1]} 100%)`,
                              }}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <div className="text-5xl mb-2 drop-shadow-2xl">
                                {record.coverEmoji}
                              </div>
                              <div className="font-display text-white text-base px-3 text-center drop-shadow-lg">
                                {record.title}
                              </div>
                            </div>
                          </div>
                        </Link>

                        <div className="flex-1 p-5 md:p-6 flex flex-col">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <Link
                                to={`/record/${record.id}`}
                                className="font-display text-xl text-warm-100 hover:text-warm-300 transition-colors block mb-1"
                              >
                                {record.title}
                              </Link>
                              <div className="flex items-center gap-2 text-xs font-hand text-warm-200/60">
                                {mood && (
                                  <span
                                    className="px-2 py-0.5 rounded-full"
                                    style={{
                                      backgroundColor: `${mood.neonColor}22`,
                                      color: mood.neonColor,
                                    }}
                                  >
                                    {mood.emoji} {mood.name}
                                  </span>
                                )}
                                <span>{record.year}年</span>
                                <span>·</span>
                                <span>{record.album}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFavorite(record.id)}
                              className="p-2 rounded-full text-warm-200/40 hover:text-neon-pink hover:bg-neon-pink/10 transition-all opacity-60 group-hover:opacity-100"
                              title="从收藏中移除"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <p className="font-serif italic text-warm-200/70 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                            "{record.lyricQuote}"
                          </p>

                          <div className="flex items-center justify-between pt-3 border-t border-warm-500/10">
                            <span className="text-[11px] font-hand text-warm-200/40">
                              🗓️ 收藏于 {formatDate(fav.savedAt)}
                            </span>
                            <Link
                              to={`/record/${record.id}`}
                              className="text-xs font-hand text-warm-300 hover:text-warm-200 transition-colors"
                            >
                              阅读故事 →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {favRecords.length > 6 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-pink/15 to-transparent mb-10" />
                <h3 className="font-display text-warm-100 text-xl mb-6 text-center">
                  以唱片墙的方式，再看一遍吧 📀
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
                  {favRecords.map((fav, i) => (
                    <RecordCover
                      key={`grid-${fav.recordId}`}
                      record={fav.record!}
                      index={i}
                      size="md"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 md:mt-28 text-center"
        >
          <div className="inline-block font-hand text-neon-pink/60 text-sm px-6 py-3 rounded-full"
            style={{
              background: 'linear-gradient(90deg, rgba(255, 107, 157, 0.1), transparent, rgba(255, 107, 157, 0.1))',
              border: '1px solid rgba(255, 107, 157, 0.2)',
            }}
          >
            ♡ 谢谢你愿意把这些情绪留在这里 ♡
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FavoritesPage;
