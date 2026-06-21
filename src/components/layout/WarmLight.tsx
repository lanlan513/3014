const WarmLightOverlay = () => {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-30">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] animate-warm-glow"
          style={{
            background:
              'radial-gradient(ellipse at center top, rgba(244, 197, 66, 0.18) 0%, rgba(244, 197, 66, 0.06) 30%, transparent 60%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-[40vh]"
          style={{
            background:
              'radial-gradient(ellipse at 20% 100%, rgba(255, 107, 157, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(78, 205, 196, 0.06) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute top-1/4 right-[15%] w-[300px] h-[300px] rounded-full animate-warm-glow"
          style={{
            background:
              'radial-gradient(circle, rgba(244, 197, 66, 0.12) 0%, transparent 70%)',
            animationDelay: '1s',
          }}
        />
        <div
          className="absolute top-1/3 left-[10%] w-[200px] h-[200px] rounded-full animate-warm-glow"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 107, 157, 0.08) 0%, transparent 70%)',
            animationDelay: '2s',
          }}
        />
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-20"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(13, 10, 8, 0.7) 100%)',
        }}
      />
    </>
  );
};

export default WarmLightOverlay;
