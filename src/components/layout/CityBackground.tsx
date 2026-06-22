import { useMemo } from 'react';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

const CityBackground = () => {
  const { isLowPerf, animationEnabled, opacityMultiplier } = usePerformanceMode();

  const buildings = useMemo(() => [
    { left: '2%', height: '35%', width: '8%', color: '#1a1410', windows: isLowPerf ? 3 : 5, delay: 0 },
    { left: '12%', height: '55%', width: '10%', color: '#1f1713', windows: isLowPerf ? 5 : 8, delay: 0.1 },
    { left: '24%', height: '42%', width: '7%', color: '#231b17', windows: isLowPerf ? 4 : 6, delay: 0.2 },
    { left: '34%', height: '70%', width: '12%', color: '#1a1410', windows: isLowPerf ? 7 : 11, delay: 0.05 },
    { left: '49%', height: '48%', width: '8%', color: '#1f1713', windows: isLowPerf ? 4 : 7, delay: 0.15 },
    { left: '60%', height: '62%', width: '10%', color: '#231b17', windows: isLowPerf ? 6 : 9, delay: 0.25 },
    { left: '73%', height: '38%', width: '7%', color: '#1a1410', windows: isLowPerf ? 3 : 5, delay: 0.3 },
    { left: '83%', height: '58%', width: '9%', color: '#1f1713', windows: isLowPerf ? 5 : 8, delay: 0.08 },
    { left: '94%', height: '45%', width: '6%', color: '#231b17', windows: isLowPerf ? 4 : 6, delay: 0.2 },
  ], [isLowPerf]);

  const neonSigns = [
    { left: '15%', top: '20%', text: '酒店', color: '#ff6b9d' },
    { left: '38%', top: '15%', text: 'KTV', color: '#4ecdc4' },
    { left: '66%', top: '25%', text: '酒', color: '#f4c542' },
    { left: '87%', top: '30%', text: '宵夜', color: '#a855f7' },
  ];

  const windowAnimations = useMemo(() => {
    return buildings.map((b) => {
      const windows = [];
      const totalWindows = b.windows * 2;
      for (let j = 0; j < totalWindows; j++) {
        const baseOpacity = 0.2 + Math.random() * 0.4;
        const duration = isLowPerf ? 4 + Math.random() * 4 : 2 + Math.random() * 3;
        const delay = b.delay + j * (isLowPerf ? 0.1 : 0.02) + Math.random() * 0.5;
        const repeatDelay = isLowPerf ? 5 + Math.random() * 8 : 2 + Math.random() * 5;
        windows.push({
          id: j,
          baseOpacity,
          duration,
          delay,
          repeatDelay,
          boxShadowOpacity: 0.1 + Math.random() * 0.3,
        });
      }
      return { buildingDelay: b.delay, windows };
    });
  }, [buildings, isLowPerf]);

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
          opacity: opacityMultiplier,
        }}
      />

      <div className="absolute inset-0">
        {buildings.map((b, i) => (
          <div
            key={i}
            className="absolute bottom-0 rounded-t-sm building-enter"
            style={{
              left: b.left,
              width: b.width,
              height: b.height,
              background: `linear-gradient(180deg, ${b.color} 0%, #0d0a08 100%)`,
              borderTop: `1px solid rgba(244, 197, 66, 0.1)`,
              animationDelay: `${b.delay}s`,
            }}
          >
            <div className="w-full h-full grid grid-cols-2 gap-1 p-2 content-start">
              {windowAnimations[i]?.windows.map((w) => (
                <div
                  key={w.id}
                  className="w-full aspect-[3/4] rounded-sm city-window"
                  style={{
                    background: `rgba(244, 197, 66, ${w.baseOpacity})`,
                    boxShadow: `0 0 4px rgba(244, 197, 66, ${w.boxShadowOpacity})`,
                    animationDuration: `${w.duration + w.repeatDelay}s`,
                    animationDelay: `${w.delay}s`,
                    animationPlayState: animationEnabled ? 'running' : 'paused',
                    opacity: isLowPerf ? 0.6 : 1,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!isLowPerf && neonSigns.map((s, i) => (
        <div
          key={i}
          className="absolute text-[10px] md:text-xs font-display neon-sign"
          style={{
            left: s.left,
            top: s.top,
            color: s.color,
            textShadow: `0 0 6px ${s.color}, 0 0 12px ${s.color}, 0 0 24px ${s.color}`,
            animationDelay: `${1 + i * 0.3}s`,
            animationPlayState: animationEnabled ? 'running' : 'paused',
            opacity: opacityMultiplier,
          }}
        >
          {s.text}
        </div>
      ))}

      <div
        className="absolute bottom-0 left-0 right-0 h-[45%]"
        style={{
          background:
            'linear-gradient(0deg, rgba(244, 197, 66, 0.08) 0%, transparent 100%)',
          opacity: opacityMultiplier,
        }}
      />

      {animationEnabled && !isLowPerf && (
        <div
          className="absolute bottom-[38%] w-full h-[2px] city-scan-line"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(244, 197, 66, 0.3), transparent)',
          }}
        />
      )}

      <style>{`
        .building-enter {
          animation: building-rise 1s ease-out forwards;
          opacity: 0;
          transform: translateY(100px);
        }

        @keyframes building-rise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .city-window {
          animation: window-flicker ease-in-out infinite;
        }

        @keyframes window-flicker {
          0%, 100% {
            opacity: 0;
          }
          10%, 30% {
            opacity: 1;
          }
          20%, 40% {
            opacity: 0.7;
          }
          50% {
            opacity: 0;
          }
        }

        .neon-sign {
          animation: neon-flicker 2s ease-in-out infinite;
          opacity: 0.6;
        }

        @keyframes neon-flicker {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          25%, 75% {
            opacity: 0.4;
          }
        }

        .city-scan-line {
          animation: scan-move 8s linear infinite;
        }

        @keyframes scan-move {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .city-window,
          .neon-sign,
          .city-scan-line,
          .building-enter {
            animation: none !important;
          }
          .building-enter {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CityBackground;
