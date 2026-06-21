import { motion } from 'framer-motion';

interface NeonSignProps {
  text: string;
  subText?: string;
  color?: 'warm' | 'pink' | 'cyan';
  className?: string;
  flicker?: boolean;
}

const NeonSign = ({ text, subText, color = 'warm', className = '', flicker = true }: NeonSignProps) => {
  const colorMap = {
    warm: {
      text: '#f4c542',
      glow1: 'rgba(244, 197, 66, 0.8)',
      glow2: 'rgba(244, 197, 66, 0.5)',
      glow3: 'rgba(244, 197, 66, 0.3)',
      border: '#8b6914',
    },
    pink: {
      text: '#ff6b9d',
      glow1: 'rgba(255, 107, 157, 0.8)',
      glow2: 'rgba(255, 107, 157, 0.5)',
      glow3: 'rgba(255, 107, 157, 0.3)',
      border: '#9d174d',
    },
    cyan: {
      text: '#4ecdc4',
      glow1: 'rgba(78, 205, 196, 0.8)',
      glow2: 'rgba(78, 205, 196, 0.5)',
      glow3: 'rgba(78, 205, 196, 0.3)',
      border: '#0e7490',
    },
  };

  const c = colorMap[color];

  const letterVariants = {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: (i: number) => ({
      opacity: 1,
      filter: `blur(0px) drop-shadow(0 0 8px ${c.glow1}) drop-shadow(0 0 20px ${c.glow2}) drop-shadow(0 0 40px ${c.glow3})`,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative inline-block"
        initial="hidden"
        animate="visible"
      >
        <div className="font-display tracking-wider" style={{ color: c.text }}>
          {text.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              className={flicker ? 'inline-block animate-neon-flicker' : 'inline-block'}
              style={{ animationDelay: `${0.5 + i * 0.05}s`, animationDuration: `${3 + (i % 3)}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
        {subText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: text.length * 0.08 + 0.5, duration: 0.8 }}
            className="mt-2 text-sm font-hand tracking-wide"
            style={{ color: c.glow1, opacity: 0.8 }}
          >
            {subText}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="absolute -inset-4 rounded-xl -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{
          border: `2px solid ${c.border}`,
          boxShadow: `inset 0 0 30px ${c.glow3}, 0 0 20px ${c.glow3}`,
        }}
      />
    </div>
  );
};

export default NeonSign;
