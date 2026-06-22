import { motion } from 'framer-motion';
import NeonSign from '@/components/layout/NeonSign';
import { Clock, Coffee, Music2 } from 'lucide-react';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

const StoreFront = () => {
  const { animationEnabled, isLowPerf } = usePerformanceMode();
  return (
    <>
      <style>{`
        @keyframes vinyl-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .vinyl-spin {
          animation: vinyl-spin 12s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .vinyl-spin {
            animation: none;
          }
        }
      `}</style>
      <section className="relative min-h-[100vh] pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[15%] left-[5%] text-[8px] md:text-xs font-hand"
          style={{ color: 'rgba(244, 197, 66, 0.5)', transform: 'rotate(-90deg)' }}
        >
          ♪ 街角の店 ♪
        </div>
        <div
          className="absolute top-[8%] right-[8%] text-[8px] md:text-xs font-hand"
          style={{ color: 'rgba(255, 107, 157, 0.5)', transform: 'rotate(15deg)' }}
        >
          OPEN 24H
        </div>
      </div>

      <div className="relative z-10 container max-w-6xl">
        <div className="text-center mb-10 md:mb-16 pt-8 md:pt-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel"
          >
            <Clock size={14} className="text-warm-300" />
            <span className="text-warm-200 text-sm font-hand">深夜 23:47 · 营业中</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
          </motion.div>

          <div className="mb-6">
            <NeonSign
              text="深夜唱片行"
              subText="— 收藏情绪的小店 —"
              color="warm"
              className="text-4xl md:text-6xl lg:text-7xl"
              flicker={true}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-warm-100/80 max-w-xl mx-auto font-hand text-base md:text-lg leading-relaxed"
          >
            推开门，暖黄的灯光裹着旧唱片的沙沙声向你涌来。
            <br className="hidden md:block" />
            这里不卖唱片，只收藏那些说不出口的情绪。
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="store-sign rounded-t-3xl px-4 md:px-8 py-4 md:py-6 text-center">
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-2">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-warm-300 animate-neon-flicker"
                    style={{
                      animationDelay: `${i * 0.3}s`,
                      boxShadow: '0 0 8px #f4c542',
                    }}
                  />
                ))}
              </div>
              <Music2 size={18} className="text-warm-300 md:w-6 md:h-6 md:size-6 animate-neon-flicker" />
              <span className="font-display text-neon-warm text-lg md:text-2xl tracking-widest">
                MIDNIGHT RECORDS
              </span>
              <Music2 size={18} className="text-warm-300 md:w-6 md:h-6 md:size-6 animate-neon-flicker" style={{ animationDelay: '0.5s', transform: 'scaleX(-1)' }} />
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-warm-300 animate-neon-flicker"
                    style={{
                      animationDelay: `${0.15 + i * 0.3}s`,
                      boxShadow: '0 0 8px #f4c542',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="font-hand text-warm-200/60 text-xs md:text-sm">
              Est. 1995 · 香港·旺角
            </div>
          </div>

          <div className="wooden-frame rounded-b-3xl p-4 md:p-8 lg:p-10">
            <div className="relative bg-gradient-to-b from-night-200 to-night-300 rounded-2xl overflow-hidden p-6 md:p-10 min-h-[320px] md:min-h-[400px]">
              <div
                className="absolute inset-0 spotlight-effect"
                style={{ boxShadow: 'inset 0 0 120px rgba(244, 197, 66, 0.15)' }}
              />

              <div className="absolute top-0 left-1/4 w-[2px] h-12 bg-gradient-to-b from-warm-500/60 to-transparent" />
              <div className="absolute top-0 right-1/3 w-[2px] h-16 bg-gradient-to-b from-neon-pink/40 to-transparent" />
              <div className="absolute top-0 right-[15%] w-[1px] h-20 bg-gradient-to-b from-neon-cyan/30 to-transparent" />

              <div className="absolute bottom-6 left-6 text-[10px] md:text-xs font-hand text-warm-200/40">
                第 3,721 位访客
              </div>
              <div className="absolute bottom-6 right-6 text-[10px] md:text-xs font-hand text-warm-200/40">
                收藏了 12,847 段情绪
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[260px] md:min-h-[320px] text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="mb-8"
                >
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full vinyl-record mx-auto flex items-center justify-center shadow-2xl"
                    style={{ boxShadow: '0 0 60px rgba(244, 197, 66, 0.3)' }}
                  >
                    <motion.div
                      className={`w-full h-full rounded-full relative ${animationEnabled && !isLowPerf ? 'vinyl-spin' : ''}`}
                    >
                      <div className="absolute inset-[35%] rounded-full vinyl-label flex items-center justify-center">
                        <Coffee size={20} className="text-night-500 md:w-8 md:h-8 md:size-8" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2, duration: 1 }}
                  className="space-y-3 md:space-y-4"
                >
                  <p className="font-display text-warm-100 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl">
                    「每一首歌，都是一段人生切片」
                  </p>
                  <p className="font-hand text-warm-200/70 text-sm md:text-base">
                    — 店主 Eason
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.6, duration: 0.8 }}
                  className="mt-10 md:mt-12 flex flex-wrap justify-center gap-3"
                >
                  <a
                    href="#shelves"
                    className="group relative inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-warm-400 via-warm-300 to-warm-400" />
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background:
                          'linear-gradient(90deg, #f4c542, #f7d98c, #f4c542)',
                        boxShadow: '0 0 30px rgba(244, 197, 66, 0.6)',
                      }}
                    />
                    <span className="relative font-display text-night-300 text-sm md:text-base tracking-wide">
                      推开门逛逛 →
                    </span>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default StoreFront;
