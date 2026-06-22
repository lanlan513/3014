import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Music, Globe, Clock, Users, ChevronRight, Star } from 'lucide-react';
import {
  concertTours,
  concerts,
  concertCities,
  getConcertsByTourId,
  getCityById,
} from '@/data/concerts';
import { getMoodById } from '@/data/moods';

const ConcertTourPage = () => {
  const [selectedTourId, setSelectedTourId] = useState<string>(concertTours[0].id);
  const [selectedConcertId, setSelectedConcertId] = useState<string | null>(null);
  const [highlightedCityId, setHighlightedCityId] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const concertRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const selectedTour = useMemo(
    () => concertTours.find((t) => t.id === selectedTourId),
    [selectedTourId]
  );

  const tourConcerts = useMemo(
    () => getConcertsByTourId(selectedTourId),
    [selectedTourId]
  );

  const concertsByYear = useMemo(() => {
    const grouped: Record<number, typeof concerts> = {};
    tourConcerts.forEach((concert) => {
      if (!grouped[concert.year]) {
        grouped[concert.year] = [];
      }
      grouped[concert.year].push(concert);
    });
    return grouped;
  }, [tourConcerts]);

  const tourCities = useMemo(() => {
    const cityIds = new Set(tourConcerts.map((c) => c.cityId));
    return concertCities.filter((c) => cityIds.has(c.id));
  }, [tourConcerts]);

  const scrollToConcert = (concertId: string) => {
    setSelectedConcertId(concertId);
    const concert = concerts.find((c) => c.id === concertId);
    if (concert) {
      setHighlightedCityId(concert.cityId);
    }
    const element = concertRefs.current[concertId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleConcertClick = (concertId: string, cityId: string) => {
    setSelectedConcertId(concertId);
    setHighlightedCityId(cityId);
  };

  const handleCityClick = (cityId: string) => {
    setHighlightedCityId(cityId);
    const concert = tourConcerts.find((c) => c.cityId === cityId);
    if (concert) {
      scrollToConcert(concert.id);
    }
  };

  useEffect(() => {
    if (tourConcerts.length > 0 && !selectedConcertId) {
      setSelectedConcertId(tourConcerts[0].id);
      setHighlightedCityId(tourConcerts[0].cityId);
    }
  }, [tourConcerts, selectedConcertId]);

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div
        className="fixed inset-0 -z-10 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(244, 197, 66, 0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 20%, rgba(255, 107, 157, 0.08) 0%, transparent 40%),
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
            <div className="text-5xl md:text-6xl animate-warm-glow">🎸</div>
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-100 mb-4">
            演唱会巡演
          </h1>
          <p className="font-hand text-warm-200/60 text-base md:text-lg max-w-2xl mx-auto">
            跟随Eason的脚步，跨越五大洲，感受每一场演唱会的震撼与感动
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-10 md:mb-12"
        >
          <div className="flex items-center gap-2 mb-5">
            <Music size={18} className="text-warm-300" />
            <span className="font-display text-warm-100 text-lg">选择巡演</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {concertTours.map((tour, index) => {
              const isSelected = tour.id === selectedTourId;
              const mood = getMoodById(tour.primaryMood);
              return (
                <motion.a
                  key={tour.id}
                  href={`/concert/${tour.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedTourId(tour.id);
                    setSelectedConcertId(null);
                  }}
                  className={`wooden-frame rounded-xl p-3 block transition-all cursor-pointer ${
                    isSelected ? 'ring-2 ring-warm-300/60' : ''
                  }`}
                >
                  <div
                    className="glass-panel rounded-lg p-4 relative overflow-hidden"
                    style={{
                      borderColor: isSelected ? `${tour.coverColors[1]}55` : undefined,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${tour.coverColors[0]}, ${tour.coverColors[1]})`,
                          boxShadow: isSelected
                            ? `0 0 20px ${tour.coverColors[1]}40`
                            : 'none',
                        }}
                      >
                        <span className="text-2xl md:text-3xl">{tour.coverEmoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-display text-warm-100 text-sm md:text-base mb-1 truncate"
                          style={{
                            textShadow: isSelected
                              ? `0 0 10px ${tour.coverColors[1]}40`
                              : 'none',
                          }}
                        >
                          {tour.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-warm-200/50 text-xs font-hand mb-2">
                          <Calendar size={11} />
                          <span>
                            {tour.startYear}
                            {tour.endYear !== tour.startYear ? ` - ${tour.endYear}` : ''}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-hand flex items-center gap-1"
                            style={{
                              backgroundColor: `${tour.coverColors[1]}22`,
                              color: tour.coverColors[1],
                            }}
                          >
                            <Star size={10} />
                            {tour.totalShows}场
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-hand flex items-center gap-1 bg-warm-300/10 text-warm-300">
                            <MapPin size={10} />
                            {tour.totalCities}城
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="font-serif italic text-warm-200/50 text-xs mt-3 line-clamp-2 leading-relaxed">
                      "{tour.tagline}"
                    </p>
                    {isSelected && (
                      <motion.div
                        layoutId="tour-selected-indicator"
                        className="absolute top-2 right-2 w-2 h-2 rounded-full bg-warm-300"
                        style={{ boxShadow: '0 0 10px #f4c542' }}
                      />
                    )}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {selectedTour && (
          <motion.div
            key={selectedTour.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-2xl p-5 md:p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row items-start gap-5">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${selectedTour.coverColors[0]}, ${selectedTour.coverColors[1]})`,
                    boxShadow: `0 0 30px ${selectedTour.coverColors[1]}30`,
                  }}
                >
                  <span className="text-4xl md:text-5xl">{selectedTour.coverEmoji}</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl md:text-3xl text-warm-100 mb-2">
                    {selectedTour.name}
                  </h2>
                  <p className="font-hand text-warm-200/70 mb-3">{selectedTour.tagline}</p>
                  <p className="font-serif text-warm-200/60 text-sm leading-relaxed">
                    {selectedTour.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <div className="flex items-center gap-1.5 text-sm font-hand text-warm-200/60">
                      <Calendar size={14} className="text-neon-cyan" />
                      <span>
                        {selectedTour.startYear} - {selectedTour.endYear}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-hand text-warm-200/60">
                      <Music size={14} className="text-neon-pink" />
                      <span>{selectedTour.totalShows} 场演出</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-hand text-warm-200/60">
                      <MapPin size={14} className="text-neon-warm" />
                      <span>
                        {selectedTour.totalCities} 城 · {selectedTour.totalCountries} 国
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-5">
                  <Clock size={18} className="text-neon-cyan" />
                  <span className="font-display text-warm-100 text-lg">演出时间轴</span>
                </div>
                <motion.div
                  ref={timelineRef}
                  className="glass-panel rounded-2xl p-5 md:p-6 max-h-[700px] overflow-y-auto pr-2"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan/40 via-neon-pink/20 to-transparent" />

                    {Object.keys(concertsByYear)
                      .sort((a, b) => Number(a) - Number(b))
                      .map((yearStr, yearIndex) => {
                        const year = Number(yearStr);
                        const yearConcerts = concertsByYear[year];
                        return (
                          <div key={year} className="relative mb-10 last:mb-0">
                            <div className="absolute left-4 -translate-x-1/2 -top-1 z-10">
                              <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 200,
                                  delay: yearIndex * 0.1,
                                }}
                                className="w-9 h-9 rounded-full flex items-center justify-center"
                                style={{
                                  background:
                                    'linear-gradient(135deg, #4ecdc4, #44a8a0)',
                                  boxShadow: '0 0 15px rgba(78, 205, 196, 0.5)',
                                }}
                              >
                                <Calendar size={14} className="text-night-900" />
                              </motion.div>
                            </div>

                            <div className="ml-12">
                              <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: yearIndex * 0.1 + 0.1 }}
                                className="font-display text-xl md:text-2xl text-warm-100 mb-4"
                                style={{
                                  textShadow: '0 0 15px rgba(78, 205, 196, 0.3)',
                                }}
                              >
                                {year}年
                              </motion.h3>

                              <div className="space-y-4">
                                {yearConcerts.map((concert, concertIndex) => {
                                  const city = getCityById(concert.cityId);
                                  const mood = getMoodById(concert.mood);
                                  const isSelected =
                                    selectedConcertId === concert.id;
                                  return (
                                    <motion.div
                                      key={concert.id}
                                      ref={(el) => {
                                        concertRefs.current[concert.id] = el;
                                      }}
                                      initial={{ opacity: 0, x: -30 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      viewport={{ once: true }}
                                      transition={{
                                        delay:
                                          yearIndex * 0.1 +
                                          concertIndex * 0.05 +
                                          0.2,
                                      }}
                                      whileHover={{ x: 4 }}
                                      onClick={() =>
                                        handleConcertClick(
                                          concert.id,
                                          concert.cityId
                                        )
                                      }
                                      className={`wooden-frame rounded-xl p-2.5 cursor-pointer transition-all ${
                                        isSelected
                                          ? 'ring-2 ring-neon-pink/60'
                                          : ''
                                      }`}
                                    >
                                      <div
                                        className={`glass-panel rounded-lg p-4 transition-all ${
                                          isSelected
                                            ? 'border-neon-pink/40'
                                            : ''
                                        }`}
                                        style={{
                                          borderColor: isSelected
                                            ? '#ff6b9d55'
                                            : undefined,
                                          boxShadow: isSelected
                                            ? '0 0 20px rgba(255, 107, 157, 0.2)'
                                            : 'none',
                                        }}
                                      >
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                          <h4 className="font-display text-warm-100 text-sm md:text-base">
                                            {concert.title}
                                          </h4>
                                          <ChevronRight
                                            size={16}
                                            className={`flex-shrink-0 mt-0.5 transition-colors ${
                                              isSelected
                                                ? 'text-neon-pink'
                                                : 'text-warm-200/40'
                                            }`}
                                          />
                                        </div>

                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-hand text-warm-200/50 mb-2">
                                          <span className="flex items-center gap-1">
                                            <Calendar size={11} />
                                            {concert.date}
                                          </span>
                                          <span className="flex items-center gap-1">
                                            <MapPin size={11} />
                                            {city?.name || '未知'}
                                          </span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-hand text-warm-200/50 mb-3">
                                          <span className="flex items-center gap-1">
                                            <Music size={11} />
                                            {concert.totalSongs}首
                                          </span>
                                          <span className="flex items-center gap-1">
                                            <Clock size={11} />
                                            {concert.duration}
                                          </span>
                                          {concert.attendance && (
                                            <span className="flex items-center gap-1">
                                              <Users size={11} />
                                              {concert.attendance.toLocaleString()}人
                                            </span>
                                          )}
                                        </div>

                                        <div className="flex flex-wrap gap-1.5">
                                          <span
                                            className="px-2 py-0.5 rounded-full text-xs font-hand"
                                            style={{
                                              backgroundColor: `${concert.coverColors[1]}22`,
                                              color: concert.coverColors[1],
                                            }}
                                          >
                                            {concert.venue}
                                          </span>
                                          {mood && (
                                            <span
                                              className="px-2 py-0.5 rounded-full text-xs font-hand"
                                              style={{
                                                backgroundColor: `${mood.neonColor}22`,
                                                color: mood.neonColor,
                                                border: `1px solid ${mood.neonColor}33`,
                                              }}
                                            >
                                              {mood.emoji} {mood.name}
                                            </span>
                                          )}
                                        </div>

                                        {isSelected && concert.notes && (
                                          <motion.p
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                              opacity: 1,
                                              height: 'auto',
                                            }}
                                            className="font-serif italic text-warm-200/60 text-xs mt-3 pt-3 border-t border-warm-300/10 leading-relaxed"
                                          >
                                            "{concert.notes}"
                                          </motion.p>
                                        )}
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-neon-pink" />
                    <span className="font-display text-warm-100 text-lg">巡演地图</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-hand text-warm-200/50">
                    <MapPin size={12} className="text-neon-warm" />
                    <span>
                      {tourCities.length} 个城市 · 点击标记查看详情
                    </span>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="wooden-frame rounded-2xl p-3"
                >
                  <div
                    className="glass-panel rounded-xl overflow-hidden relative"
                    style={{
                      boxShadow:
                        '0 0 40px rgba(78, 205, 196, 0.1), inset 0 0 60px rgba(30, 40, 80, 0.2)',
                    }}
                  >
                    <svg viewBox="0 0 1000 550" className="w-full h-auto" style={{ display: 'block' }}>
                      <defs>
                        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#0c1a2e" />
                          <stop offset="50%" stopColor="#0d2137" />
                          <stop offset="100%" stopColor="#0a1628" />
                        </linearGradient>

                        <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#2a3a2a" />
                          <stop offset="100%" stopColor="#1a2a1a" />
                        </linearGradient>

                        <radialGradient id="cityGlowCyan">
                          <stop offset="0%" stopColor="#4ecdc4" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#4ecdc4" stopOpacity="0" />
                        </radialGradient>

                        <radialGradient id="cityGlowPink">
                          <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0" />
                        </radialGradient>

                        <radialGradient id="cityGlowWarm">
                          <stop offset="0%" stopColor="#f4c542" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#f4c542" stopOpacity="0" />
                        </radialGradient>

                        <filter id="glowFilter">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      <rect x="0" y="0" width="1000" height="550" fill="url(#oceanGradient)" />

                      <g opacity="0.4">
                        {Array.from({ length: 40 }).map((_, i) => {
                          const sx = (i * 157) % 1000;
                          const sy = (i * 89) % 300;
                          const size = ((i * 13) % 2) + 1;
                          return (
                            <motion.circle
                              key={i}
                              cx={sx}
                              cy={sy}
                              r={size}
                              fill="#f5e6c8"
                              opacity={0.5}
                              animate={{ opacity: [0.2, 0.6, 0.2] }}
                              transition={{
                                duration: 2 + (i % 4),
                                repeat: Infinity,
                                delay: i * 0.08,
                              }}
                            />
                          );
                        })}
                      </g>

                      <g fill="url(#landGradient)" opacity="0.85">
                        <path d="M150 120 Q200 80 280 90 Q350 70 420 100 Q500 90 550 130 Q600 110 650 140 Q720 130 780 160 Q820 150 860 180 Q880 160 900 180 L920 200 Q900 250 860 260 Q820 280 780 270 Q720 290 680 280 Q620 300 580 290 Q520 310 480 300 Q420 320 380 310 Q320 330 280 320 Q220 340 180 330 Q130 340 100 320 Q80 300 70 270 Q60 230 80 200 Q100 170 130 150 Q140 130 150 120 Z" />
                        <path d="M80 350 Q130 340 180 360 Q230 350 280 370 Q320 360 350 380 Q380 370 400 390 Q420 420 400 450 Q380 480 340 490 Q300 500 260 490 Q220 510 180 500 Q140 510 100 490 Q70 470 60 440 Q50 410 60 380 Q70 360 80 350 Z" />
                        <path d="M550 60 Q590 50 630 70 Q680 60 720 80 Q760 70 790 90 Q810 80 830 100 L850 120 Q840 160 810 170 Q780 180 740 170 Q700 190 660 180 Q620 190 590 180 Q560 170 550 150 Q540 120 540 90 Q545 70 550 60 Z" />
                        <path d="M770 200 Q800 190 830 210 Q870 200 900 220 Q920 210 940 230 Q960 220 980 240 L990 270 Q980 310 950 320 Q920 340 880 330 Q840 350 810 340 Q780 350 760 330 Q740 310 740 280 Q740 240 750 220 Q760 200 770 200 Z" />
                        <path d="M820 420 Q860 410 890 430 Q920 420 950 440 Q970 460 960 490 Q950 510 920 520 Q890 530 860 520 Q830 530 800 520 Q780 500 780 480 Q780 450 800 430 Q810 420 820 420 Z" />
                      </g>

                      <g opacity="0.3">
                        {Array.from({ length: 30 }).map((_, i) => {
                          const sx = (i * 173 + 50) % 1000;
                          const sy = 320 + ((i * 97) % 200);
                          return (
                            <motion.circle
                              key={`wave-${i}`}
                              cx={sx}
                              cy={sy}
                              r={30 + (i % 5) * 10}
                              fill="none"
                              stroke="#4ecdc4"
                              strokeWidth="0.5"
                              opacity={0.15}
                              animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.1, 0.25, 0.1],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          );
                        })}
                      </g>

                      {tourCities.map((city, index) => {
                        const isHighlighted = highlightedCityId === city.id;
                        const cityConcerts = tourConcerts.filter(
                          (c) => c.cityId === city.id
                        );
                        const firstConcert = cityConcerts[0];
                        const glowColor = isHighlighted
                          ? '#ff6b9d'
                          : firstConcert?.coverColors[1] || '#4ecdc4';
                        return (
                          <g
                            key={city.id}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleCityClick(city.id)}
                          >
                            <motion.g
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                type: 'spring',
                                damping: 15,
                                stiffness: 200,
                                delay: 0.5 + index * 0.08,
                              }}
                            >
                              {isHighlighted && (
                                <motion.circle
                                  cx={city.mapX}
                                  cy={city.mapY}
                                  r={50}
                                  fill={glowColor}
                                  opacity={0.3}
                                  animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.3, 0.1, 0.3],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                  }}
                                />
                              )}

                              <motion.circle
                                cx={city.mapX}
                                cy={city.mapY}
                                r={isHighlighted ? 28 : 18}
                                fill={glowColor}
                                opacity={isHighlighted ? 0.35 : 0.2}
                                animate={{
                                  scale: isHighlighted ? [1, 1.15, 1] : 1,
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                }}
                              />

                              <motion.circle
                                cx={city.mapX}
                                cy={city.mapY}
                                r={isHighlighted ? 14 : 10}
                                fill="#0d0a08"
                                stroke={glowColor}
                                strokeWidth={isHighlighted ? 3 : 2}
                                whileHover={{ r: 14 }}
                                animate={{
                                  scale: isHighlighted ? [1, 1.1, 1] : 1,
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                }}
                                style={{
                                  filter: isHighlighted
                                    ? `drop-shadow(0 0 12px ${glowColor})`
                                    : `drop-shadow(0 0 6px ${glowColor})`,
                                }}
                              />

                              <text
                                x={city.mapX}
                                y={city.mapY + 4}
                                textAnchor="middle"
                                fontSize={isHighlighted ? 13 : 11}
                                style={{ pointerEvents: 'none' }}
                              >
                                🎵
                              </text>

                              <motion.g
                                initial={false}
                                animate={{
                                  opacity: isHighlighted ? 1 : 0,
                                  y: isHighlighted ? 0 : 10,
                                }}
                                style={{ pointerEvents: 'none' }}
                              >
                                <rect
                                  x={city.mapX - 80}
                                  y={city.mapY - 70}
                                  width={160}
                                  height={52}
                                  rx={8}
                                  fill="#0d0a08"
                                  stroke={glowColor}
                                  strokeWidth={1.5}
                                  opacity={0.95}
                                />
                                <text
                                  x={city.mapX}
                                  y={city.mapY - 48}
                                  textAnchor="middle"
                                  fill="#f5e6c8"
                                  fontSize={14}
                                  fontFamily="Noto Serif SC"
                                  fontWeight="600"
                                >
                                  {city.name}
                                </text>
                                <text
                                  x={city.mapX}
                                  y={city.mapY - 30}
                                  textAnchor="middle"
                                  fill={glowColor}
                                  fontSize={11}
                                  fontFamily="ZCOOL XiaoWei"
                                >
                                  {cityConcerts.length}场 · {city.country}
                                </text>
                              </motion.g>

                              <motion.g
                                whileHover={{ opacity: 1, y: 0 }}
                                initial={false}
                                animate={{
                                  opacity: isHighlighted ? 0 : 0,
                                  y: isHighlighted ? 10 : 10,
                                }}
                                style={{ pointerEvents: 'none' }}
                              >
                                <rect
                                  x={city.mapX - 55}
                                  y={city.mapY - 42}
                                  width={110}
                                  height={26}
                                  rx={6}
                                  fill="#0d0a08"
                                  stroke={glowColor}
                                  strokeWidth={1}
                                  opacity={0.9}
                                />
                                <text
                                  x={city.mapX}
                                  y={city.mapY - 24}
                                  textAnchor="middle"
                                  fill="#f5e6c8"
                                  fontSize={12}
                                  fontFamily="ZCOOL XiaoWei"
                                >
                                  {city.name} · {cityConcerts.length}场
                                </text>
                              </motion.g>
                            </motion.g>
                          </g>
                        );
                      })}

                      <g>
                        <rect x="20" y="20" width="130" height="55" rx="8" fill="#0d0a08" opacity="0.8" stroke="#f4c54233" />
                        <text x="85" y="42" textAnchor="middle" fill="#f5e6c8" fontSize="12" fontFamily="Noto Serif SC" fontWeight="600">
                          {selectedTour.name.slice(0, 10)}...
                        </text>
                        <text x="85" y="60" textAnchor="middle" fill="#f4c542" fontSize="11" fontFamily="ZCOOL XiaoWei">
                          {tourCities.length} 城 · {tourConcerts.length} 场
                        </text>
                      </g>

                      <g>
                        <rect x="860" y="500" width="120" height="30" rx="6" fill="#0d0a08" opacity="0.7" stroke="#4ecdc433" />
                        <text x="920" y="520" textAnchor="middle" fill="#4ecdc4" fontSize="11" fontFamily="ZCOOL XiaoWei">
                          点击城市查看演出
                        </text>
                      </g>
                    </svg>
                  </div>
                </motion.div>

                {highlightedCityId && (
                  <AnimatePresence>
                    <motion.div
                      key={highlightedCityId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="mt-6"
                    >
                      {(() => {
                        const city = getCityById(highlightedCityId);
                        const cityConcerts = tourConcerts.filter(
                          (c) => c.cityId === highlightedCityId
                        );
                        if (!city) return null;
                        return (
                          <div className="wooden-frame rounded-xl p-3">
                            <div className="glass-panel rounded-lg p-5">
                              <div className="flex items-start gap-4">
                                <div
                                  className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{
                                    background:
                                      'linear-gradient(135deg, #4ecdc4, #44a8a0)',
                                    boxShadow: '0 0 20px rgba(78, 205, 196, 0.4)',
                                  }}
                                >
                                  <MapPin size={24} className="text-night-900" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-display text-xl text-warm-100 mb-1">
                                    {city.name}
                                  </h3>
                                  <p className="font-hand text-warm-200/60 text-sm mb-2">
                                    {city.country}
                                    {city.venue ? ` · ${city.venue}` : ''}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {cityConcerts.map((concert) => (
                                      <button
                                        key={concert.id}
                                        onClick={() => scrollToConcert(concert.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-hand transition-all flex items-center gap-1.5 ${
                                          selectedConcertId === concert.id
                                            ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/40'
                                            : 'bg-white/5 text-warm-200/70 hover:bg-white/10 border border-transparent'
                                        }`}
                                      >
                                        <Calendar size={11} />
                                        {concert.date}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 md:mt-24 text-center"
        >
          <div
            className="inline-block font-hand text-warm-200/40 text-sm px-6 py-3 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, rgba(255, 107, 157, 0.08), transparent, rgba(78, 205, 196, 0.08))',
              border: '1px solid rgba(255, 107, 157, 0.12)',
            }}
          >
            ♪ 音乐无国界，热爱跨山海 ♪
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConcertTourPage;
