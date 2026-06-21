import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { moods, getMoodById, type MoodId } from '@/data/moods';
import { getRecordsByMood } from '@/data/records';
import RecordCover from '@/components/shelf/RecordCover';

const ShelfPage = () => {
  const { mood } = useParams<{ mood: MoodId }>();
  const navigate = useNavigate();
  const currentMood = getMoodById(mood as MoodId);
  const records = getRecordsByMood(mood as MoodId);

  if (!currentMood) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="font-display text-warm-100 text-2xl mb-4">找不到这个情绪架</h2>
          <Link to="/" className="text-warm-300 hover:text-warm-200 font-hand">
            ← 回街角逛逛
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div
        className="fixed inset-0 -z-10 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${currentMood.neonColor}18 0%, transparent 50%),
                      linear-gradient(180deg, #14100c 0%, #0d0a08 100%)`,
        }}
      />

      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-warm-200/70 hover:text-warm-300 transition-colors text-sm font-hand"
          >
            <ChevronLeft size={16} />
            返回
          </button>
        </motion.div>

        <div className="flex flex-wrap gap-2 md:gap-3 mb-10">
          {moods.map((m) => (
            <Link
              key={m.id}
              to={`/shelves/${m.id}`}
              className={`px-4 py-2 rounded-xl font-display text-sm md:text-base transition-all ${
                m.id === currentMood.id
                  ? 'bg-white/10 scale-105'
                  : 'bg-white/5 hover:bg-white/8'
              }`}
              style={
                m.id === currentMood.id
                  ? {
                      color: m.neonColor,
                      border: `1.5px solid ${m.neonColor}66`,
                      boxShadow: `0 0 20px ${m.neonColor}22, inset 0 0 20px ${m.neonColor}11`,
                      textShadow: `0 0 12px ${m.neonColor}99`,
                    }
                  : {
                      color: 'rgba(245, 230, 200, 0.6)',
                      border: '1px solid rgba(245, 230, 200, 0.1)',
                    }
              }
            >
              {m.emoji} {m.name}
            </Link>
          ))}
        </div>

        <motion.div
          key={currentMood.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mb-12 md:mb-16"
        >
          <div
            className="wooden-frame rounded-3xl p-6 md:p-10 overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at 30% 50%, ${currentMood.neonColor}22 0%, transparent 60%)`,
              }}
            />

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
              <motion.div
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex-shrink-0"
              >
                <div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${currentMood.neonColor}33 0%, ${currentMood.neonColor}11 100%)`,
                    border: `2px solid ${currentMood.neonColor}66`,
                    boxShadow: `0 0 40px ${currentMood.neonColor}33, inset 0 0 30px ${currentMood.neonColor}22`,
                  }}
                >
                  <span className="text-5xl md:text-7xl animate-warm-glow">
                    {currentMood.emoji}
                  </span>
                </div>
              </motion.div>

              <div className="flex-1">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="font-display text-3xl md:text-5xl mb-3"
                  style={{
                    color: currentMood.neonColor,
                    textShadow: `0 0 16px ${currentMood.neonColor}aa, 0 0 32px ${currentMood.neonColor}66`,
                  }}
                >
                  {currentMood.name}唱片架
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="font-hand text-warm-100/70 text-base md:text-lg mb-4 leading-relaxed"
                >
                  {currentMood.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="flex flex-wrap items-center gap-4 text-sm"
                >
                  <span
                    className="px-3 py-1 rounded-full font-hand"
                    style={{
                      backgroundColor: `${currentMood.neonColor}22`,
                      color: currentMood.neonColor,
                      border: `1px solid ${currentMood.neonColor}44`,
                    }}
                  >
                    {records.length} 张唱片上架
                  </span>
                  <span className="font-serif italic text-warm-100/60 text-xs md:text-sm">
                    「{currentMood.quote}」
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {records.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6 opacity-50">📭</div>
            <p className="font-hand text-warm-200/60 text-lg">
              这个情绪架还是空的...
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-warm-100 text-lg md:text-xl">
                📀 全部唱片
              </h2>
              <span className="font-hand text-warm-200/50 text-xs md:text-sm">
                点击封面进入故事
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 lg:gap-8">
              {records.map((record, i) => (
                <RecordCover key={record.id} record={record} index={i} size="md" />
              ))}
            </div>
          </motion.div>
        )}

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
              background: `linear-gradient(90deg, ${currentMood.neonColor}11, transparent, ${currentMood.neonColor}11)`,
              border: `1px solid ${currentMood.neonColor}22`,
            }}
          >
            ♪ 你不必一个人承担所有情绪 ♪
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShelfPage;
