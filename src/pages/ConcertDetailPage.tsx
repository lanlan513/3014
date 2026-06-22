import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Calendar,
  MapPin,
  Music,
  Users,
  Star,
  Sparkles,
  Clock,
  ArrowRight,
  Mic2,
  Palette,
  Wrench,
  Info,
} from 'lucide-react';
import {
  getConcertById,
  getTourById,
  getStageDesignById,
  getCityById,
  getConcertsByTourId,
  getConcertsByCityId,
} from '@/data/concerts';
import { getMoodById } from '@/data/moods';

const ConcertDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const concert = getConcertById(id || '');
  const tour = concert ? getTourById(concert.tourId) : undefined;
  const city = concert ? getCityById(concert.cityId) : undefined;
  const stageDesign = concert ? getStageDesignById(concert.stageDesignId) : undefined;
  const mood = concert ? getMoodById(concert.mood) : undefined;
  const tourConcerts = concert ? getConcertsByTourId(concert.tourId).filter((c) => c.id !== concert.id).slice(0, 4) : [];
  const cityConcerts = concert ? getConcertsByCityId(concert.cityId).filter((c) => c.id !== concert.id).slice(0, 4) : [];

  if (!concert || !tour || !mood) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-6">🎤</div>
          <h2 className="font-display text-warm-100 text-2xl mb-4">这场演唱会好像不见了</h2>
          <Link to="/concerts" className="text-warm-300 hover:text-warm-200 font-hand">
            ← 回到演唱会巡演
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const getSpecialNoteType = (note?: string) => {
    if (!note) return null;
    if (note.includes('翻唱')) return { type: 'cover', icon: '🎙️', label: '翻唱', color: '#4ecdc4' };
    if (note.includes('合唱') || note.includes('Feat') || note.includes('feat')) return { type: 'duet', icon: '🎵', label: '合唱', color: '#ff6b9d' };
    if (note.includes('首唱') || note.includes('新歌')) return { type: 'new', icon: '✨', label: '新歌', color: '#f4c542' };
    return { type: 'special', icon: '⭐', label: note, color: '#a855f7' };
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${mood.neonColor}18 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 80%, ${concert.coverColors[0]}33 0%, transparent 60%),
                      linear-gradient(180deg, #14100c 0%, #0d0a08 100%)`,
        }}
      />

      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <Link
            to={`/concerts?tour=${tour.id}`}
            className="inline-flex items-center gap-1 text-warm-200/70 hover:text-warm-300 transition-colors text-sm font-hand"
          >
            <ChevronLeft size={16} />
            返回「{tour.name}」
          </Link>
          <Link
            to={`/concerts?tour=${tour.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-warm-500/20 text-warm-200/70 hover:text-warm-300 transition-all text-xs font-hand"
          >
            <Music size={13} />
            全部演唱会
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="wooden-frame rounded-3xl p-4 md:p-6 mb-10"
        >
          <div className="glass-panel rounded-2xl p-6 md:p-8 overflow-hidden relative">
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: concert.coverColors[1], transform: 'translate(30%, -30%)' }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="relative mx-auto max-w-xs">
                  <motion.div
                    className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative"
                    style={{
                      background: `linear-gradient(135deg, ${concert.coverColors[0]} 0%, ${concert.coverColors[1]} 100%)`,
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
                        {concert.coverEmoji}
                      </div>
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: 'rgba(0,0,0,0.35)',
                          border: `1px solid rgba(255,255,255,0.2)`,
                        }}
                      >
                        <span>{mood.emoji}</span>
                        <span className="font-hand text-white">{mood.name}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-3"
              >
                <Link
                  to={`/concerts?tour=${tour.id}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm mb-4 transition-all hover:scale-105"
                  style={{
                    backgroundColor: `${tour.coverColors[1]}22`,
                    color: tour.coverColors[1],
                    border: `1px solid ${tour.coverColors[1]}44`,
                  }}
                >
                  <Star size={14} />
                  <span className="font-hand">{tour.name}</span>
                  <ArrowRight size={12} />
                </Link>

                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-warm-100 mb-4 leading-tight">
                  <span className="inline-block">
                    {concert.title.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.04, duration: 0.5 }}
                        className="inline-block"
                        style={{
                          textShadow: i % 2 === 0 ? undefined : `0 0 15px ${concert.coverColors[1]}55`,
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-warm-200/80 font-hand text-sm">
                    <Calendar size={16} className="text-neon-cyan" />
                    <span>{formatDate(concert.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-warm-200/80 font-hand text-sm">
                    <MapPin size={16} className="text-neon-pink" />
                    <span>{city?.name || '未知城市'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-warm-200/80 font-hand text-sm">
                    <Mic2 size={16} className="text-neon-warm" />
                    <span className="truncate">{concert.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-warm-200/80 font-hand text-sm">
                    <Music size={16} className="text-neon-purple" />
                    <span>{concert.totalSongs} 首歌曲</span>
                  </div>
                  <div className="flex items-center gap-2 text-warm-200/80 font-hand text-sm">
                    <Clock size={16} className="text-neon-cyan" />
                    <span>{concert.duration}</span>
                  </div>
                  {concert.attendance && (
                    <div className="flex items-center gap-2 text-warm-200/80 font-hand text-sm">
                      <Users size={16} className="text-neon-pink" />
                      <span>{concert.attendance.toLocaleString()} 人</span>
                    </div>
                  )}
                </div>

                {concert.notes && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="relative p-4 md:p-5 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${mood.neonColor}15, rgba(255,255,255,0.03))`,
                      borderLeft: `3px solid ${mood.neonColor}`,
                    }}
                  >
                    <Info size={18} className="absolute top-3 left-3 opacity-20" style={{ color: mood.neonColor }} />
                    <p className="font-serif italic text-warm-200/80 text-sm md:text-base leading-relaxed pl-6">
                      "{concert.notes}"
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-5">
              <Music size={20} className="text-warm-300 flex-shrink-0" />
              <h2 className="font-display text-xl md:text-2xl text-warm-100">
                曲目单 Setlist
              </h2>
              <span className="font-hand text-warm-200/50 text-sm">
                共 {concert.setlist.length} 首
              </span>
            </div>

            <div className="glass-panel rounded-2xl p-4 md:p-5">
              <div className="space-y-1">
                {concert.setlist.map((song, index) => {
                  const special = getSpecialNoteType(song.specialNote);
                  return (
                    <motion.div
                      key={song.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03, duration: 0.4 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        song.isSpecial
                          ? 'bg-gradient-to-r from-white/5 to-transparent border border-warm-300/10'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-lg bg-white/5">
                        <span className="font-hand text-warm-200/50 text-sm">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-display text-sm md:text-base truncate ${
                            song.isSpecial ? 'text-warm-300' : 'text-warm-100'
                          }`}
                        >
                          {song.title}
                        </div>
                      </div>

                      {special && (
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.03 + 0.2 }}
                          className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-hand"
                          style={{
                            backgroundColor: `${special.color}22`,
                            color: special.color,
                            border: `1px solid ${special.color}44`,
                          }}
                        >
                          <span>{special.icon}</span>
                          <span>{special.label}</span>
                          {special.type === 'special' && song.specialNote && special.label === song.specialNote ? null : song.specialNote && (
                            <span className="ml-1 opacity-80">· {song.specialNote}</span>
                          )}
                        </motion.span>
                      )}

                      {!special && song.specialNote && (
                        <span className="flex-shrink-0 font-hand text-warm-200/40 text-xs">
                          {song.specialNote}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            {concert.specialGuests && concert.specialGuests.length > 0 && !concert.specialGuests.includes('无') && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <Users size={20} className="text-neon-pink flex-shrink-0" />
                  <h2 className="font-display text-xl md:text-2xl text-warm-100">
                    特别嘉宾
                  </h2>
                </div>

                <div className="glass-panel rounded-2xl p-5">
                  <div className="grid grid-cols-2 gap-3">
                    {concert.specialGuests.map((guest, index) => (
                      <motion.div
                        key={guest}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: 'linear-gradient(135deg, #ff6b9d55, #ff6b9d33)',
                            border: '1px solid #ff6b9d44',
                          }}
                        >
                          <Mic2 size={18} className="text-neon-pink" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-display text-warm-100 text-sm truncate">
                            {guest}
                          </div>
                          <div className="font-hand text-warm-200/50 text-xs">
                            特邀嘉宾
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {stageDesign && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <Palette size={20} className="text-neon-purple flex-shrink-0" />
                  <h2 className="font-display text-xl md:text-2xl text-warm-100">
                    舞台设计
                  </h2>
                </div>

                <div className="wooden-frame rounded-2xl p-3">
                  <div className="glass-panel rounded-xl p-5">
                    <h3 className="font-display text-warm-100 text-lg mb-2">
                      {stageDesign.name}
                    </h3>
                    <p className="font-serif text-warm-200/60 text-sm leading-relaxed mb-4">
                      {stageDesign.description}
                    </p>

                    {stageDesign.designer && (
                      <div className="flex items-center gap-2 mb-4 text-sm">
                        <Sparkles size={14} className="text-neon-warm" />
                        <span className="font-hand text-warm-200/60">设计师：</span>
                        <span className="font-display text-warm-200">{stageDesign.designer}</span>
                      </div>
                    )}

                    {stageDesign.features && stageDesign.features.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2 text-sm">
                          <Star size={14} className="text-neon-cyan" />
                          <span className="font-hand text-warm-200/60">舞台特色</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {stageDesign.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg text-xs font-hand"
                              style={{
                                backgroundColor: 'rgba(78, 205, 196, 0.1)',
                                color: '#4ecdc4',
                                border: '1px solid rgba(78, 205, 196, 0.2)',
                              }}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {stageDesign.technicalSpecs && stageDesign.technicalSpecs.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-sm">
                          <Wrench size={14} className="text-neon-warm" />
                          <span className="font-hand text-warm-200/60">技术规格</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {stageDesign.technicalSpecs.map((spec, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg text-xs font-hand bg-white/5 text-warm-200/70 border border-warm-500/10"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {tourConcerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <Star size={20} className="text-neon-warm" />
                <h2 className="font-display text-xl md:text-2xl text-warm-100">
                  同巡演其他场次
                </h2>
              </div>
              <Link
                to={`/concerts?tour=${tour.id}`}
                className="inline-flex items-center gap-1 text-warm-300 hover:text-warm-200 text-sm font-hand transition-colors"
              >
                查看全部
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {tourConcerts.map((c, index) => {
                const cCity = getCityById(c.cityId);
                return (
                  <Link
                    key={c.id}
                    to={`/concert/${c.id}`}
                    className="block"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="wooden-frame rounded-xl p-2.5 h-full"
                    >
                      <div className="glass-panel rounded-lg p-4 h-full">
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${c.coverColors[0]}, ${c.coverColors[1]})`,
                            }}
                          >
                            <span className="text-xl">{c.coverEmoji}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display text-warm-100 text-sm mb-1 line-clamp-2 leading-tight">
                              {c.title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-warm-200/50 text-xs font-hand">
                              <Calendar size={10} />
                              <span>{c.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-warm-200/50 text-xs font-hand mb-2">
                          <MapPin size={10} />
                          <span className="truncate">{cCity?.name} · {c.venue}</span>
                        </div>

                        <div className="flex items-center gap-3 text-warm-200/50 text-xs font-hand">
                          <span className="flex items-center gap-1">
                            <Music size={10} />
                            {c.totalSongs}首
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {c.duration}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        {cityConcerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <MapPin size={20} className="text-neon-cyan" />
              <h2 className="font-display text-xl md:text-2xl text-warm-100">
                {city?.name}其他演唱会
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {cityConcerts.map((c, index) => {
                const cTour = getTourById(c.tourId);
                return (
                  <Link
                    key={c.id}
                    to={`/concert/${c.id}`}
                    className="block"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="wooden-frame rounded-xl p-2.5 h-full"
                    >
                      <div className="glass-panel rounded-lg p-4 h-full">
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${c.coverColors[0]}, ${c.coverColors[1]})`,
                            }}
                          >
                            <span className="text-xl">{c.coverEmoji}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display text-warm-100 text-sm mb-1 line-clamp-2 leading-tight">
                              {c.title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-warm-200/50 text-xs font-hand">
                              <Calendar size={10} />
                              <span>{c.date}</span>
                            </div>
                          </div>
                        </div>

                        {cTour && (
                          <div className="flex items-center gap-1.5 text-warm-200/50 text-xs font-hand mb-2 truncate">
                            <Star size={10} className="text-neon-warm" />
                            <span className="truncate">{cTour.name}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-3 text-warm-200/50 text-xs font-hand">
                          <span className="flex items-center gap-1">
                            <Music size={10} />
                            {c.totalSongs}首
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {c.duration}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ConcertDetailPage;
