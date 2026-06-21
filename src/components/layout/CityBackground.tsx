import { motion } from 'framer-motion';

const CityBackground = () => {
  const buildings = [
    { left: '2%', height: '35%', width: '8%', color: '#1a1410', windows: 5, delay: 0 },
    { left: '12%', height: '55%', width: '10%', color: '#1f1713', windows: 8, delay: 0.1 },
    { left: '24%', height: '42%', width: '7%', color: '#231b17', windows: 6, delay: 0.2 },
    { left: '34%', height: '70%', width: '12%', color: '#1a1410', windows: 11, delay: 0.05 },
    { left: '49%', height: '48%', width: '8%', color: '#1f1713', windows: 7, delay: 0.15 },
    { left: '60%', height: '62%', width: '10%', color: '#231b17', windows: 9, delay: 0.25 },
    { left: '73%', height: '38%', width: '7%', color: '#1a1410', windows: 5, delay: 0.3 },
    { left: '83%', height: '58%', width: '9%', color: '#1f1713', windows: 8, delay: 0.08 },
    { left: '94%', height: '45%', width: '6%', color: '#231b17', windows: 6, delay: 0.2 },
  ];

  const neonSigns = [
    { left: '15%', top: '20%', text: '酒店', color: '#ff6b9d' },
    { left: '38%', top: '15%', text: 'KTV', color: '#4ecdc4' },
    { left: '66%', top: '25%', text: '酒', color: '#f4c542' },
    { left: '87%', top: '30%', text: '宵夜', color: '#a855f7' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #0d0805 0%, #14100c 30%, #1a1410 60%, #1f1915 100%)',
        }}
      />

      <div
        className="absolute bottom-[55%] left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(244, 197, 66, 0.15) 0%, rgba(244, 197, 66, 0.05) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      <div className="absolute inset-0">
        {buildings.map((b, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 rounded-t-sm"
            style={{
              left: b.left,
              width: b.width,
              height: b.height,
              background: `linear-gradient(180deg, ${b.color} 0%, #0d0a08 100%)`,
              borderTop: `1px solid rgba(244, 197, 66, 0.1)`,
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: b.delay, duration: 1, ease: 'easeOut' }}
          >
            <div className="w-full h-full grid grid-cols-2 gap-1 p-2 content-start">
              {Array.from({ length: b.windows * 2 }).map((_, j) => (
                <motion.div
                  key={j}
                  className="w-full aspect-[3/4] rounded-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, Math.random() * 0.6 + 0.2] }}
                  transition={{
                    delay: b.delay + j * 0.02 + Math.random() * 0.5,
                    duration: 0.5 + Math.random(),
                    repeatType: 'reverse',
                    repeat: Infinity,
                    repeatDelay: 2 + Math.random() * 5,
                  }}
                  style={{
                    background: `rgba(244, 197, 66, ${0.2 + Math.random() * 0.4})`,
                    boxShadow: `0 0 4px rgba(244, 197, 66, ${0.1 + Math.random() * 0.3})`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {neonSigns.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-[10px] md:text-xs font-display"
          style={{
            left: s.left,
            top: s.top,
            color: s.color,
            textShadow: `0 0 6px ${s.color}, 0 0 12px ${s.color}, 0 0 24px ${s.color}`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.6, 1, 0.4, 1],
          }}
          transition={{
            delay: 1 + i * 0.3,
            duration: 2 + Math.random(),
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: Math.random() * 3,
          }}
        >
          {s.text}
        </motion.div>
      ))}

      <div
        className="absolute bottom-0 left-0 right-0 h-[45%]"
        style={{
          background:
            'linear-gradient(0deg, rgba(244, 197, 66, 0.08) 0%, transparent 100%)',
        }}
      />

      <motion.div
        className="absolute bottom-[38%] w-full h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(244, 197, 66, 0.3), transparent)',
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default CityBackground;
