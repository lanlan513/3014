import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { moods } from '@/data/moods';
import { getRecordsByMood } from '@/data/records';

const MoodDoors = () => {
  return (
    <section id="shelves" className="relative py-16 md:py-24">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-warm-500/50" />
            <span className="font-hand text-warm-300 text-sm md:text-base tracking-[0.3em]">
              情绪架
            </span>
            <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-warm-500/50" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-warm-100 mb-4">
            推开哪扇门？
          </h2>
          <p className="font-hand text-warm-200/60 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            四种情绪，四段旅程。
            <br className="hidden md:block" />
            选一扇门走进去，看看有什么故事在等你。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {moods.map((mood, i) => {
            const count = getRecordsByMood(mood.id).length;
            return (
              <motion.div
                key={mood.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <Link to={`/shelves/${mood.id}`} className="block h-full group">
                  <div className="mood-wooden-plaque rounded-2xl overflow-hidden h-full">
                    <div
                      className="relative p-6 md:p-8 h-full min-h-[260px] md:min-h-[300px]"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(61, 40, 23, 0.95) 0%, rgba(92, 61, 46, 0.95) 100%)',
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at center, ${mood.neonColor}22 0%, transparent 70%)`,
                        }}
                      />

                      <div className="absolute top-3 left-3 right-3 flex justify-between">
                        <div
                          className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full"
                          style={{
                            backgroundColor: mood.neonColor,
                            boxShadow: `0 0 10px ${mood.neonColor}`,
                          }}
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(3)].map((_, j) => (
                            <div
                              key={j}
                              className="w-1 h-4 rounded-full opacity-40"
                              style={{ backgroundColor: '#3d2817' }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="relative pt-6 md:pt-8 flex flex-col items-center text-center h-full">
                        <motion.div
                          className="text-5xl md:text-7xl mb-4 md:mb-6"
                          animate={{
                            y: [0, -6, 0],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 4,
                            delay: i * 0.3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          {mood.emoji}
                        </motion.div>

                        <motion.div
                          className="font-display text-2xl md:text-3xl mb-2 md:mb-3 tracking-wider"
                          style={{
                            color: mood.neonColor,
                            textShadow: `0 0 10px ${mood.neonColor}99, 0 0 20px ${mood.neonColor}66`,
                          }}
                          animate={{
                            textShadow: [
                              `0 0 10px ${mood.neonColor}99, 0 0 20px ${mood.neonColor}66`,
                              `0 0 16px ${mood.neonColor}bb, 0 0 32px ${mood.neonColor}99`,
                              `0 0 10px ${mood.neonColor}99, 0 0 20px ${mood.neonColor}66`,
                            ],
                          }}
                          transition={{
                            duration: 2.5,
                            delay: i * 0.2,
                            repeat: Infinity,
                          }}
                        >
                          {mood.name}
                        </motion.div>

                        <div className="font-hand text-warm-100/70 text-xs md:text-sm mb-4 leading-relaxed px-2">
                          {mood.description}
                        </div>

                        <div className="mt-auto">
                          <div
                            className="px-3 py-1 rounded-full text-xs mb-3 inline-block group-hover:scale-110 transition-transform"
                            style={{
                              backgroundColor: `${mood.neonColor}22`,
                              color: mood.neonColor,
                              border: `1px solid ${mood.neonColor}55`,
                            }}
                          >
                            {count} 张唱片
                          </div>

                          <p className="font-serif italic text-warm-100/60 text-[11px] md:text-xs line-clamp-2 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity px-2">
                            「{mood.quote}」
                          </p>
                        </div>
                      </div>

                      <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-[70%] h-[3px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${mood.neonColor}, transparent)`,
                          boxShadow: `0 0 12px ${mood.neonColor}`,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="font-hand text-warm-200/40 text-xs md:text-sm">
            ♪ 别担心，每扇门背后，都有懂你的人 ♪
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MoodDoors;
