import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Disc, Music } from 'lucide-react';
import type { Record } from '@/data/records';
import { getMoodById } from '@/data/moods';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

interface RecordCoverProps {
  record: Record;
  index?: number;
  size?: 'sm' | 'md' | 'lg';
}

const RecordCover = ({ record, index = 0, size = 'md' }: RecordCoverProps) => {
  const mood = getMoodById(record.mood);
  const { isFavorite } = useFavoritesStore();
  const { animationEnabled } = usePerformanceMode();
  const fav = isFavorite(record.id);

  const sizeClasses = {
    sm: 'aspect-[3/4]',
    md: 'aspect-[3/4]',
    lg: 'aspect-[3/4]',
  };

  const emojiSizes = {
    sm: 'text-3xl md:text-4xl',
    md: 'text-4xl md:text-6xl',
    lg: 'text-6xl md:text-7xl',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-sm md:text-base',
    lg: 'text-lg md:text-xl',
  };

  return (
    <Link to={`/record/${record.id}`} className="block group">
      <motion.div
        className={`relative ${sizeClasses[size]} rounded-lg overflow-hidden shadow-2xl`}
        initial={{ opacity: 0, y: 40, rotateY: -10 }}
        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.6,
          delay: index * 0.06,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{
          y: -8,
          scale: 1.03,
          rotateY: 3,
          rotateX: -2,
          transition: { duration: 0.3 },
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${record.coverColors[0]} 0%, ${record.coverColors[1]} 100%)`,
          }}
        />

        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(0,0,0,0.4) 0%, transparent 50%)`,
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 md:p-6">
          <div
            className={`${emojiSizes[size]} mb-2 md:mb-4 drop-shadow-2xl ${animationEnabled ? 'record-emoji-float' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <style>
              {`
                @keyframes record-emoji-float {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-4px); }
                }
                .record-emoji-float {
                  animation: record-emoji-float 3s ease-in-out infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                  .record-emoji-float { animation: none; }
                }
              `}
            </style>
            {record.coverEmoji}
          </div>

          <div
            className={`font-display ${titleSizes[size]} text-white text-center leading-tight drop-shadow-lg`}
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            {record.title}
          </div>
          <div className="text-white/60 text-xs md:text-sm mt-1 font-hand">
            {record.year}
          </div>
        </div>

        {mood && (
          <div
            className="absolute top-2 md:top-3 left-2 md:left-3 sticker-tag px-2 py-1 rounded text-[10px] md:text-xs font-hand"
            style={{ color: '#5c3d2e' }}
          >
            {mood.emoji} {mood.name}
          </div>
        )}

        {fav && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 md:top-3 right-2 md:right-3 text-neon-pink"
            style={{ filter: 'drop-shadow(0 0 6px #ff6b9d)' }}
          >
            <Disc size={size === 'sm' ? 14 : 18} fill="#ff6b9d" />
          </motion.div>
        )}

        {record.recommended && (
          <div className="absolute top-2 md:top-3 right-2 md:right-3 sticker-tag !rotate-2 px-2 py-1 rounded text-[10px] md:text-xs font-bold" style={{ color: '#8b6914' }}>
            ★ 推荐
          </div>
        )}

        <motion.div
          className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 md:p-4 flex flex-col justify-end"
        >
          <div className="flex items-center gap-1.5 text-warm-100 text-xs mb-1">
            <Music size={12} className="text-warm-300" />
            <span className="font-hand">{record.album}</span>
          </div>
          <div className="text-white/90 text-[11px] md:text-xs line-clamp-2 font-serif italic leading-relaxed">
            "{record.lyricQuote}"
          </div>
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-full w-[60%] aspect-square rounded-full vinyl-record opacity-0 group-hover:opacity-100 group-hover:translate-x-[30%] transition-all duration-500 shadow-2xl z-10"
          style={{
            boxShadow: '0 0 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(244, 197, 66, 0.1)',
          }}
        >
          <div className="absolute inset-[35%] rounded-full vinyl-label flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-night-500" />
          </div>
          <motion.div
            className="absolute inset-0 rounded-full group-hover:animate-vinyl-spin-slow"
          />
        </motion.div>

        <div
          className="absolute inset-0 rounded-lg border-2 pointer-events-none"
          style={{
            borderColor: 'rgba(244, 197, 66, 0.2)',
          }}
        />
      </motion.div>

      <motion.div
        className="mt-3 md:mt-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06 + 0.2 }}
      >
        <div className={`font-display ${titleSizes[size]} text-warm-100 group-hover:text-warm-300 transition-colors`}>
          {record.title}
        </div>
        <div className="text-warm-200/50 text-xs md:text-sm mt-0.5 font-hand">
          {record.duration} · {record.tags[0]}
        </div>
      </motion.div>
    </Link>
  );
};

export default RecordCover;
