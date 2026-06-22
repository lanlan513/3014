import { useMemo } from 'react';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

const FilmGrain = () => {
  const { opacityMultiplier, isLowPerf } = usePerformanceMode();

  const baseOpacity = isLowPerf ? 0.05 : 0.2;
  const finalOpacity = baseOpacity * opacityMultiplier;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay"
      style={{
        opacity: finalOpacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
      }}
    />
  );
};

export const FilmScratches = () => {
  const { opacityMultiplier, animationEnabled, isLowPerf } = usePerformanceMode();

  const scratches = useMemo(() => {
    const count = isLowPerf ? 2 : 6;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: Math.random() > 0.5 ? 1 : 2,
      baseOpacity: isLowPerf ? 0.02 : 0.03 + Math.random() * 0.05,
      animationDuration: isLowPerf ? 25 + Math.random() * 15 : 15 + Math.random() * 20,
      animationDelay: Math.random() * (isLowPerf ? 12 : 8),
    }));
  }, [isLowPerf]);

  if (isLowPerf && !animationEnabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {scratches.map((s) => (
        <div
          key={s.id}
          className="absolute top-0 h-full film-scratch-line"
          style={{
            left: s.left,
            width: s.width,
            opacity: s.baseOpacity * opacityMultiplier * 4,
            background: `linear-gradient(180deg, transparent, rgba(255, 248, 220, ${s.baseOpacity * 4}), transparent)`,
            animation: animationEnabled
              ? `scratch-flicker ${s.animationDuration}s linear ${s.animationDelay}s infinite`
              : 'none',
          }}
        />
      ))}

      <style>{`
        @keyframes scratch-flicker {
          0%, 100% {
            opacity: 0;
            transform: translateX(0);
          }
          20% {
            opacity: 1;
            transform: translateX(1%);
          }
          40% {
            opacity: 0.5;
            transform: translateX(-1%);
          }
          60% {
            opacity: 1;
            transform: translateX(0.5%);
          }
          80% {
            opacity: 0.3;
            transform: translateX(-0.5%);
          }
        }
      `}</style>
    </div>
  );
};

export default FilmGrain;
