import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Disc, Music } from 'lucide-react';
import type { Album } from '@/data/albums';
import { getMoodById } from '@/data/moods';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

interface AlbumCoverProps {
  album: Album;
  index?: number;
  size?: 'sm' | 'md' | 'lg';
}

const AlbumCover = ({ album, index = 0, size = 'md' }: AlbumCoverProps) => {
  const mood = getMoodById(album.primaryMood);
  const { animationEnabled } = usePerformanceMode();

  const sizeClasses = {
    sm: 'aspect-square',
    md: 'aspect-square',
    lg: 'aspect-square',
  };

  const emojiSizes = {
    sm: 'text-4xl md:text-5xl',
    md: 'text-5xl md:text-6xl',
    lg: 'text-6xl md:text-8xl',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg md:text-xl',
  };

  return (
    <Link to={`/album/${album.id}`} className="block group">
      <motion.div
        className={`relative ${sizeClasses[size]} rounded-xl overflow-hidden shadow-2xl`}
        initial={{ opacity: 0, y: 30, rotateY: -8 }}
        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.6,
          delay: index * 0.05,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{
          y: -6,
          scale: 1.02,
          rotateY: 2,
          rotateX: -1,
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
            background: `linear-gradient(135deg, ${album.coverColors[0]} 0%, ${album.coverColors[1]} 100%)`,
          }}
        />

        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(0,0,0,0.4) 0%, transparent 50%)`,
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div
            className={`${emojiSizes[size]} mb-3 drop-shadow-2xl ${animationEnabled ? 'album-emoji-float' : ''}`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <style>
              {`
                @keyframes album-emoji-float {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-5px); }
                }
                .album-emoji-float {
                  animation: album-emoji-float 3.5s ease-in-out infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                  .album-emoji-float { animation: none; }
                }
              `}
            </style>
            {album.coverEmoji}
          </div>

          <div
            className={`font-display ${titleSizes[size]} text-white text-center leading-tight drop-shadow-lg`}
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
          >
            {album.title}
          </div>
          <div className="text-white/70 text-xs mt-1.5 font-hand">
            {album.year}年
          </div>
        </div>

        {mood && (
          <div
            className="absolute top-2.5 left-2.5 sticker-tag px-2 py-1 rounded text-[10px] md:text-xs font-hand"
            style={{ color: '#5c3d2e' }}
          >
            {mood.emoji} {mood.name}
          </div>
        )}

        <div className="absolute top-2.5 right-2.5 sticker-tag !rotate-2 px-2 py-1 rounded text-[10px] md:text-xs font-bold" style={{ color: '#8b6914' }}>
          {album.totalTracks}首
        </div>

        <motion.div
          className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/85 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end"
        >
          <div className="flex items-center gap-1.5 text-warm-100 text-sm mb-2">
            <Music size={14} className="text-warm-300" />
            <span className="font-hand">{album.language} · {album.recordLabel}</span>
          </div>
          <div className="text-white/90 text-xs line-clamp-2 font-serif italic leading-relaxed">
            "{album.eraNote}"
          </div>
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-full w-[55%] aspect-square rounded-full vinyl-record opacity-0 group-hover:opacity-100 group-hover:translate-x-[25%] transition-all duration-500 shadow-2xl z-10"
          style={{
            boxShadow: '0 0 35px rgba(0,0,0,0.75), inset 0 0 18px rgba(244, 197, 66, 0.1)',
          }}
        >
          <div className="absolute inset-[35%] rounded-full vinyl-label flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-night-500" />
          </div>
        </motion.div>

        <div
          className="absolute inset-0 rounded-xl border-2 pointer-events-none"
          style={{
            borderColor: 'rgba(244, 197, 66, 0.15)',
          }}
        />
      </motion.div>

      <motion.div
        className="mt-3 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 + 0.15 }}
      >
        <div className={`font-display ${titleSizes[size]} text-warm-100 group-hover:text-warm-300 transition-colors`}>
          {album.title}
        </div>
        <div className="text-warm-200/50 text-xs mt-1 font-hand">
          {album.totalDuration} · {album.language}
        </div>
      </motion.div>
    </Link>
  );
};

export default AlbumCover;
