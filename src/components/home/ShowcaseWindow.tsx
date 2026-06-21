import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { getRecommendedRecords } from '@/data/records';
import RecordCover from '@/components/shelf/RecordCover';

const ShowcaseWindow = () => {
  const recommended = getRecommendedRecords();

  return (
    <section className="relative py-16 md:py-24">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-warm-300 animate-neon-pulse" />
            <span className="font-hand text-warm-300 text-sm tracking-wider">
              今夜推荐
            </span>
            <Sparkles size={18} className="text-warm-300 animate-neon-pulse" style={{ transform: 'scaleX(-1)', animationDelay: '0.5s' }} />
          </div>
          <h2 className="font-display text-2xl md:text-4xl text-warm-100 mb-3">
            橱窗里的故事
          </h2>
          <p className="font-hand text-warm-200/60 text-sm md:text-base max-w-md mx-auto">
            店主今夜精选，献给需要一点慰藉的你
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="wooden-frame rounded-3xl p-4 md:p-8 lg:p-10 shadow-showcase">
            <div
              className="relative rounded-2xl p-4 md:p-8 overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, rgba(20, 16, 12, 0.95) 0%, rgba(26, 20, 16, 0.98) 100%)',
                boxShadow:
                  'inset 0 0 80px rgba(244, 197, 66, 0.08), inset 0 2px 0 rgba(244, 197, 66, 0.1)',
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(244, 197, 66, 0.4), transparent)',
                }}
              />
              <div
                className="absolute top-4 left-4 w-4 h-4 rounded-full bg-warm-300 animate-neon-flicker"
                style={{ boxShadow: '0 0 20px #f4c542, 0 0 40px rgba(244, 197, 66, 0.5)' }}
              />
              <div
                className="absolute top-4 right-4 w-4 h-4 rounded-full bg-warm-300 animate-neon-flicker"
                style={{
                  animationDelay: '0.8s',
                  boxShadow: '0 0 20px #f4c542, 0 0 40px rgba(244, 197, 66, 0.5)',
                }}
              />

              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6">
                <div className="bg-gradient-to-r from-transparent via-warm-500 to-transparent h-1 w-32 md:w-48 rounded-full opacity-60" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto py-4">
                {recommended.slice(0, 3).map((record, i) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 50, rotate: i === 1 ? 0 : i === 0 ? -6 : 6 }}
                    whileInView={{ opacity: 1, y: 0, rotate: i === 1 ? 0 : i === 0 ? -3 : 3 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.15,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    whileHover={{
                      rotate: 0,
                      y: -10,
                      scale: 1.04,
                      transition: { duration: 0.3 },
                    }}
                    className="max-w-xs mx-auto w-full"
                  >
                    <RecordCover record={record} index={i} size="md" />
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-6 md:mt-8 pt-4 border-t border-warm-500/10">
                <p className="font-hand text-warm-200/50 text-xs md:text-sm">
                  ♪ 每一张唱片，都有它想找的人 ♪
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowcaseWindow;
