import { useState, useEffect } from 'react';

export interface PerformanceMode {
  isReducedMotion: boolean;
  isMobile: boolean;
  isLowPerf: boolean;
  opacityMultiplier: number;
  animationEnabled: boolean;
}

export const usePerformanceMode = (): PerformanceMode => {
  const [mode, setMode] = useState<PerformanceMode>({
    isReducedMotion: false,
    isMobile: false,
    isLowPerf: false,
    opacityMultiplier: 1,
    animationEnabled: true,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const updateMode = () => {
      const reducedMotion = mediaQuery.matches;
      const lowPerf = reducedMotion || isMobile;
      setMode({
        isReducedMotion: reducedMotion,
        isMobile,
        isLowPerf: lowPerf,
        opacityMultiplier: lowPerf ? 0.3 : 1,
        animationEnabled: !reducedMotion,
      });
    };

    updateMode();

    mediaQuery.addEventListener('change', updateMode);

    const handleResize = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const reducedMotion = mediaQuery.matches;
      const lowPerf = reducedMotion || mobile;
      setMode({
        isReducedMotion: reducedMotion,
        isMobile: mobile,
        isLowPerf: lowPerf,
        opacityMultiplier: lowPerf ? 0.3 : 1,
        animationEnabled: !reducedMotion,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', updateMode);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return mode;
};

export default usePerformanceMode;
