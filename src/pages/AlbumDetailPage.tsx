import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Play,
  Calendar,
  Disc,
  Music,
  Users,
  BookOpen,
  Sparkles,
  Clock,
  Award,
  Lightbulb,
  Link2,
} from 'lucide-react';
import { getAlbumById, getRelatedAlbums } from '@/data/albums';
import { getMoodById } from '@/data/moods';
import AlbumCover from '@/components/album/AlbumCover';

const AlbumDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const album = getAlbumById(id || '');
  const mood = album ? getMoodById(album.primaryMood) : undefined;
  const relatedAlbums = album ? getRelatedAlbums(album.id, 4) : [];

  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  if (!album || !mood) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-6">💿</div>
          <h2 className="font-display text-warm-100 text-2xl mb-4">这张专辑好像不见了</h2>
          <Link to="/albums" className="text-warm-300 hover:text-warm-200 font-hand">
            ← 回到专辑时间轴
          </Link>
        </div>
      </div>
    );
  }

  const togglePlay = (trackId: string) => {
    setPlayingTrackId(playingTrackId === trackId ? null : trackId);
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${mood.neonColor}18 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 80%, ${album.coverColors[0]}33 0%, transparent 60%),
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
            返回专辑时间轴
          </button>
          <Link
            to="/albums"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-warm-500/20 text-warm-200/70 hover:text-warm-300 transition-all text-xs font-hand"
          >
            <Disc size={13} />
            全部专辑
          </Link>
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
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${album.coverColors[0]} 0%, ${album.coverColors[1]} 100%)`,
                    }}
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25) 0%, transparent 50%),
                                    radial-gradient(circle at 70% 80%, rgba(0,0,0,0.4) 0%, transparent 50%)`,
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-7xl md:text-8xl mb-4 drop-shadow-2xl">
                        {album.coverEmoji}
                      </div>
                      <div className="font-display text-2xl text-white text-center drop-shadow-lg">
                        {album.title}
                      </div>
                      <div className="text-white/70 text-sm mt-2 font-hand">
                        {album.year}年
                      </div>
                    </div>

                    <div
                      className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                      style={{ borderColor: 'rgba(244, 197, 66, 0.25)' }}
                    />
                  </motion.div>

                  <motion.div
                    className="absolute -right-4 top-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full vinyl-record opacity-60"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{ zIndex: -1, boxShadow: '0 0 40px rgba(0,0,0,0.7)' }}
                  >
                    <div className="absolute inset-[35%] rounded-full vinyl-label flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-night-500" />
                    </div>
                  </motion.div>
                </div>

                <div className="mt-10 wooden-frame rounded-2xl p-5 md:p-6">
                  <div className="glass-panel rounded-xl p-4 md:p-5">
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div className="text-center p-3 rounded-xl bg-white/5">
                        <div className="text-2xl mb-1">🎵</div>
                        <div className="font-display text-warm-100 text-lg">{album.totalTracks}</div>
                        <div className="font-hand text-warm-200/50 text-xs">首歌曲</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white/5">
                        <div className="text-2xl mb-1">⏱️</div>
                        <div className="font-display text-warm-100 text-lg">{album.totalDuration}</div>
                        <div className="font-hand text-warm-200/50 text-xs">总时长</div>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-warm-200/60 font-hand">
                          <Calendar size={14} />
                          发行时间
                        </span>
                        <span className="text-warm-100">
                          {album.year}年{album.month ? `${album.month}月` : ''}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-warm-200/60 font-hand">
                          <Disc size={14} />
                          唱片公司
                        </span>
                        <span className="text-warm-100">{album.recordLabel}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-warm-200/60 font-hand">
                          <Music size={14} />
                          语言
                        </span>
                        <span className="text-warm-100">{album.language}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-warm-200/60 font-hand">
                          <Sparkles size={14} />
                          情绪
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{
                            backgroundColor: `${mood.neonColor}22`,
                            color: mood.neonColor,
                            border: `1px solid ${mood.neonColor}44`,
                          }}
                        >
                          {mood.emoji} {mood.name}
                        </span>
                      </div>
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
                <span className="font-hand">{mood.name} · 专辑</span>
              </div>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-100 mb-3 leading-tight">
              <span className="inline-block">
                {album.title.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.04, duration: 0.5 }}
                    className="inline-block"
                    style={{
                      textShadow: i % 2 === 0 ? undefined : '0 0 15px rgba(244, 197, 66, 0.25)',
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
                {album.year}年发行
              </span>
              <span className="flex items-center gap-1.5">
                <Disc size={14} />
                {album.artist}
              </span>
              <span className="flex items-center gap-1.5">
                <Music size={14} />
                {album.totalTracks}首歌曲 · {album.totalDuration}
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="relative mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Music size={20} className="text-warm-300 flex-shrink-0" />
                <h2 className="font-display text-xl md:text-2xl text-warm-100">
                  曲目列表
                </h2>
              </div>

              <div className="glass-panel rounded-2xl p-4 md:p-5">
                <div className="space-y-1">
                  {album.tracks.map((track, index) => (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                        playingTrackId === track.id
                          ? 'bg-warm-300/15 border border-warm-300/30'
                          : 'hover:bg-white/5'
                      }`}
                      onClick={() => togglePlay(track.id)}
                    >
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                        {playingTrackId === track.id ? (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="text-warm-300"
                          >
                            <Play size={16} fill="currentColor" />
                          </motion.div>
                        ) : (
                          <span className="font-hand text-warm-200/40 text-sm">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-display text-sm md:text-base truncate ${
                            playingTrackId === track.id ? 'text-warm-300' : 'text-warm-100'
                          }`}
                        >
                          {track.title}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="font-hand text-warm-200/40 text-xs">
                          {track.duration}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative mb-8"
            >
              <div
                className="absolute -inset-4 rounded-3xl opacity-30"
                style={{
                  background: `radial-gradient(circle at 0% 0%, ${mood.neonColor}33 0%, transparent 50%)`,
                }}
              />

              <div className="relative paper-yellow rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-dashed border-warm-500/30">
                    <BookOpen size={20} className="text-warm-500 flex-shrink-0" />
                    <h2 className="font-display text-xl md:text-2xl text-night-500">
                      创作背景
                    </h2>
                  </div>

                  <p className="font-serif text-base md:text-lg leading-loose md:leading-[2.2] text-night-500 whitespace-pre-line indent-8">
                    {album.backgroundStory}
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="relative mt-7 p-5 md:p-6 rounded-2xl"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(244, 197, 66, 0.15), rgba(255, 255, 255, 0.05))',
                    borderLeft: `4px solid ${mood.neonColor}`,
                  }}
                >
                  <Award
                    size={24}
                    className="absolute top-3 left-3 opacity-20"
                    style={{ color: mood.neonColor }}
                  />
                  <p className="font-display text-base md:text-lg text-night-500 italic leading-relaxed pl-8">
                    {album.criticalReception}
                  </p>
                </motion.div>

                <div className="mt-7 pt-5 border-t border-dashed border-warm-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-night-500/60" />
                    <span className="font-hand text-night-500/60 text-sm">
                      时代注解
                    </span>
                  </div>
                  <p className="font-serif italic text-sm md:text-base text-night-500/70">
                    {album.eraNote}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <Users size={20} className="text-warm-300" />
                <h2 className="font-display text-xl md:text-2xl text-warm-100">
                  制作团队
                </h2>
              </div>

              <div className="glass-panel rounded-2xl p-5 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {album.productionTeam.map((member, index) => (
                    <motion.div
                      key={member.role}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${album.coverColors[0]}55, ${album.coverColors[1]}55)`,
                          border: `1px solid ${album.coverColors[1]}44`,
                        }}
                      >
                        <span className="text-xl">🎼</span>
                      </div>
                      <div>
                        <div className="font-display text-warm-100 text-sm">
                          {member.name}
                        </div>
                        <div className="font-hand text-warm-200/50 text-xs">
                          {member.role}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <Lightbulb size={20} className="text-warm-300" />
                <h2 className="font-display text-xl md:text-2xl text-warm-100">
                  你不知道的事
                </h2>
              </div>

              <div className="space-y-3">
                {album.funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3 p-4 rounded-xl glass-panel"
                  >
                    <div className="w-6 h-6 rounded-full bg-warm-300/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="font-hand text-warm-300 text-xs">
                        {index + 1}
                      </span>
                    </div>
                    <p className="font-serif text-warm-200/80 text-sm md:text-base leading-relaxed">
                      {fact}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {relatedAlbums.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <Link2 size={20} className="text-warm-300" />
                  <h2 className="font-display text-xl md:text-2xl text-warm-100">
                    相关专辑推荐
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
                  {relatedAlbums.map((relatedAlbum, index) => (
                    <AlbumCover
                      key={relatedAlbum.id}
                      album={relatedAlbum}
                      index={index}
                      size="sm"
                    />
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

export default AlbumDetailPage;
