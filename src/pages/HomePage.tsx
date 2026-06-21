import StoreFront from '@/components/home/StoreFront';
import ShowcaseWindow from '@/components/home/ShowcaseWindow';
import MoodDoors from '@/components/home/MoodDoors';
import CityBackground from '@/components/layout/CityBackground';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <CityBackground />
      </div>

      <div className="fixed inset-0 -z-5 warm-gradient-bg" />

      <div className="relative z-10">
        <StoreFront />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="relative"
        >
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-warm-500/30 to-transparent" />
        </motion.div>

        <ShowcaseWindow />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
          className="relative"
        >
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-warm-500/30 to-transparent" />
        </motion.div>

        <MoodDoors />

        <footer className="relative py-12 md:py-16 mt-8">
          <div className="container max-w-6xl">
            <div className="text-center">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-warm-500/20 to-transparent mb-8" />
              <div className="font-display text-warm-300 text-lg md:text-xl text-neon-warm mb-2">
                深夜唱片行
              </div>
              <div className="font-hand text-warm-200/50 text-sm mb-4">
                Midnight Record Store · Since 1995
              </div>
              <p className="font-serif text-warm-100/60 text-xs md:text-sm max-w-md mx-auto leading-relaxed italic">
                "愿你在这里，找到属于自己的那段旋律。
                <br />
                如果今晚有点难过，没关系，我们都一样。"
              </p>
              <div className="mt-6 font-hand text-warm-200/30 text-[11px]">
                ♪ 愿长夜无梦，愿所有相逢都温柔 ♪
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
