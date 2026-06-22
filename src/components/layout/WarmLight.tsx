import { usePerformanceMode } from '@/hooks/usePerformanceMode';

const WarmLightOverlay = () => {
  const { opacityMultiplier, animationEnabled, isLowPerf } = usePerformanceMode();

  const glowOpacity = isLowPerf ? 0.08 : 0.18;
  const finalGlowOpacity = glowOpacity * opacityMultiplier;
  const bottomGlowOpacity = (isLowPerf ? 0.03 : 0.06) * opacityMultiplier;
  const vignetteOpacity = isLowPerf ? 0.4 : 0.7;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-30">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh]"
          style={{
            opacity: finalGlowOpacity,
            animation: animationEnabled && !isLowPerf ? 'warm-glow 4s ease-in-out infinite' : 'none',
            background:
              `radial-gradient(ellipse at center top, rgba(244, 197, 66, ${glowOpacity}) 0%, rgba(244, 197, 66, ${glowOpacity * 0.33}) 30%, transparent 60%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-[40vh]"
          style={{
            opacity: bottomGlowOpacity * 2,
            background:
              `radial-gradient(ellipse at 20% 100%, rgba(255, 107, 157, ${isLowPerf ? 0.04 : 0.06}) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(78, 205, 196, ${isLowPerf ? 0.04 : 0.06}) 0%, transparent 50%)`,
          }}
        />
        {!isLowPerf && (
          <>
            <div
              className="absolute top-1/4 right-[15%] w-[300px] h-[300px] rounded-full"
              style={{
                opacity: finalGlowOpacity * 0.67,
                animation: animationEnabled ? 'warm-glow 4s ease-in-out 1s infinite' : 'none',
                background:
                  'radial-gradient(circle, rgba(244, 197, 66, 0.12) 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute top-1/3 left-[10%] w-[200px] h-[200px] rounded-full"
              style={{
                opacity: finalGlowOpacity * 0.44,
                animation: animationEnabled ? 'warm-glow 4s ease-in-out 2s infinite' : 'none',
                background:
                  'radial-gradient(circle, rgba(255, 107, 157, 0.08) 0%, transparent 70%)',
              }}
            />
          </>
        )}
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-20"
        style={{
          opacity: vignetteOpacity,
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(13, 10, 8, 0.7) 100%)',
        }}
      />
    </>
  );
};

export default WarmLightOverlay;
