import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Play, Clock, Music, Star, Heart } from 'lucide-react';
import { liveClips, type LiveClip } from '@/data/concerts';
import { moods, getMoodById, type MoodId } from '@/data/moods';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

const LiveClipsPage = () => {
  const [selectedMood, setSelectedMood] = useState<MoodId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { animationEnabled } = usePerformanceMode();

  const filteredClips = useMemo(() => {
    return liveClips.filter((clip) => {
      const moodMatch = selectedMood === 'all' || clip.mood === selectedMood;
      const searchMatch =
        searchQuery.trim() === '' ||
        clip.songTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clip.title.toLowerCase().includes(searchQuery.toLowerCase());
      return moodMatch && searchMatch;
    });
  }, [selectedMood, searchQuery]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <style>
        {`
          @keyframes clip-breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .clip-breathe {
            animation-play-state: ${animationEnabled ? 'running' : 'paused'};
            animation: clip-breathe 3s ease-in-out infinite;
            animation-delay: var(--delay, 0s);
          }
          @media (prefers-reduced-motion: reduce) {
            .clip-breathe { animation: none !important; }
          }
        `}
      </style>
      <div
        className="fixed inset-0 -z-10 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at 20% 80%, rgba(78, 205, 196, 0.08) 0%, transparent 40%),
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
            <div className="text-5xl md:text-6xl animate-warm-glow">🎬</div>
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-100 mb-4">
            经典现场片段
          </h1>
          <p className="font-hand text-warm-200/60 text-base md:text-lg max-w-2xl mx-auto">
            那些让我们热泪盈眶的瞬间，每一段都是永恒的经典
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-panel rounded-2xl p-4 md:p-6 mb-10 md:mb-14"
        >
          <div className="flex flex-col gap-5">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-200/40"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索歌曲名称或片段标题..."
                className="w-full bg-night-500/50 border border-warm-500/20 rounded-xl pl-11 pr-4 py-3 text-warm-100 placeholder-warm-200/30 font-hand focus:outline-none focus:border-neon-purple/50 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Heart size={14} className="text-neon-pink" />
                <span className="font-hand text-warm-200/70 text-sm">按情绪筛选</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedMood('all')}
                  className={`px-4 py-2 rounded-full font-hand text-sm transition-all ${
                    selectedMood === 'all'
                      ? 'bg-warm-300/20 text-warm-300 border border-warm-300/40'
                      : 'bg-white/5 text-warm-200/60 hover:bg-white/10 hover:text-warm-200 border border-transparent'
                  }`}
                >
                  全部
                  <span className="ml-1.5 text-xs opacity-60">({liveClips.length})</span>
                </button>
                {moods.map((mood) => {
                  const count = liveClips.filter((c) => c.mood === mood.id).length;
                  return (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className={`px-4 py-2 rounded-full font-hand text-sm transition-all ${
                        selectedMood === mood.id
                          ? 'border'
                          : 'bg-white/5 text-warm-200/60 hover:bg-white/10 hover:text-warm-200 border border-transparent'
                      }`}
                      style={
                        selectedMood === mood.id
                          ? {
                              backgroundColor: `${mood.neonColor}22`,
                              color: mood.neonColor,
                              borderColor: `${mood.neonColor}55`,
                              boxShadow: `0 0 15px ${mood.neonColor}33`,
                            }
                          : undefined
                      }
                    >
                      {mood.emoji} {mood.name}
                      <span className="ml-1.5 text-xs opacity-60">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {filteredClips.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
          >
            {filteredClips.map((clip, index) => (
              <LiveClipCard key={clip.id} clip={clip} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🎵</div>
            <p className="font-hand text-warm-200/50 text-lg">没有找到匹配的现场片段</p>
            <p className="font-hand text-warm-200/30 text-sm mt-2">试试其他关键词或情绪筛选吧</p>
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
              background:
                'linear-gradient(90deg, rgba(168, 85, 247, 0.1), transparent, rgba(78, 205, 196, 0.1))',
              border: '1px solid rgba(168, 85, 247, 0.15)',
            }}
          >
            ♪ 每一个现场，都是独一无二的记忆 ♪
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const LiveClipCard = ({ clip, index }: { clip: LiveClip; index: number }) => {
  const mood = getMoodById(clip.mood);

  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
      <motion.a
        href={`/concert/${clip.concertId}`}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="block wooden-frame rounded-xl h-full"
        style={{
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <motion.div
          className="glass-panel rounded-xl h-full overflow-hidden relative group"
          whileHover={{
            boxShadow: mood
              ? `0 0 30px ${mood.neonColor}44, 0 0 60px ${mood.neonColor}22`
              : '0 0 30px rgba(244, 197, 66, 0.2)',
          }}
        >
          <div
            className="aspect-video relative flex items-center justify-center overflow-hidden"
            style={{
              background: mood
                ? `linear-gradient(135deg, ${mood.neonColor}22, #1a1a2e 60%)`
                : 'linear-gradient(135deg, #f4c54222, #1a1a2e 60%)',
            }}
          >
            <motion.div
              className="text-6xl md:text-7xl clip-breathe"
              style={{ ['--delay' as any]: `${index * 0.1}s` }}
            >
              {clip.thumbnail}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-night-400/80 via-transparent to-transparent" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: mood
                    ? `linear-gradient(135deg, ${mood.neonColor}, ${mood.neonColor}aa)`
                    : 'linear-gradient(135deg, #f4c542, #d4af37)',
                  boxShadow: mood
                    ? `0 0 25px ${mood.neonColor}88`
                    : '0 0 25px rgba(244, 197, 66, 0.5)',
                }}
              >
                <Play size={28} className="text-white fill-white ml-1" />
              </div>
            </motion.div>
            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
              <Clock size={12} className="text-warm-200/70" />
              <span className="font-hand text-warm-200/80 text-xs">{clip.duration}</span>
            </div>
          </div>

          <div className="p-4 md:p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-display text-warm-100 text-base md:text-lg leading-snug line-clamp-2">
                {clip.title}
              </h3>
              {mood && (
                <span
                  className="flex-shrink-0 px-2 py-0.5 rounded-full font-hand text-xs"
                  style={{
                    backgroundColor: `${mood.neonColor}22`,
                    color: mood.neonColor,
                    border: `1px solid ${mood.neonColor}44`,
                  }}
                >
                  {mood.emoji}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Music size={14} className="text-neon-cyan flex-shrink-0" />
              <span className="font-hand text-neon-cyan text-sm truncate">{clip.songTitle}</span>
            </div>

            <div className="flex items-center gap-2 text-warm-200/50 text-xs font-hand mb-4">
              <Star size={12} className="text-warm-300/60" />
              <span>
                {clip.year} · {clip.city}
              </span>
            </div>

            {mood && (
              <div className="mb-4">
                <span
                  className="inline-block px-2.5 py-1 rounded-full font-hand text-xs"
                  style={{
                    backgroundColor: `${mood.neonColor}15`,
                    color: mood.neonColor,
                    border: `1px solid ${mood.neonColor}33`,
                  }}
                >
                  {mood.emoji} {mood.name}
                </span>
              </div>
            )}

            <p className="font-serif italic text-warm-200/60 text-xs leading-relaxed mb-3 line-clamp-2">
              "{clip.description}"
            </p>

            <div className="pt-3 border-t border-warm-500/10">
              <p className="font-hand text-warm-300/80 text-xs leading-relaxed">
                ✨ {clip.highlightReason}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.a>
    </motion.div>
  );
};

export default LiveClipsPage;
