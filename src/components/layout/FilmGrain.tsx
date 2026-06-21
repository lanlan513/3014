import { motion } from 'framer-motion';

const FilmGrain = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-20 mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
      }}
    />
  );
};

export const FilmScratches = () => {
  const scratches = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    width: Math.random() > 0.5 ? 1 : 2,
    opacity: 0.03 + Math.random() * 0.05,
    delay: Math.random() * 8,
    duration: 15 + Math.random() * 20,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {scratches.map((s) => (
        <motion.div
          key={s.id}
          className="absolute top-0 h-full"
          style={{
            left: s.left,
            width: s.width,
            background: `linear-gradient(180deg, transparent, rgba(255, 248, 220, ${s.opacity * 4}), transparent)`,
          }}
          animate={{
            x: ['0%', '2%', '-2%', '0%'],
            opacity: [0, s.opacity, s.opacity * 0.5, s.opacity, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default FilmGrain;
