import React from 'react';

const GrainEffect: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes grain {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-5%, -10%); }
            20% { transform: translate(-15%, 5%); }
            30% { transform: translate(7%, -25%); }
            40% { transform: translate(-5%, 25%); }
            50% { transform: translate(-15%, 10%); }
            60% { transform: translate(15%, 0%); }
            70% { transform: translate(0%, 15%); }
            80% { transform: translate(3%, 35%); }
            90% { transform: translate(-10%, 10%); }
          }
        `}
      </style>
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[2147483647]"
        style={{
          isolation: 'isolate', 
          mixBlendMode: 'normal', // Changed from overlay to normal for guaranteed visibility
          opacity: 0.25, // Adjusted for normal blend
        }}
      >
        <div 
          className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%]"
          style={{
            backgroundColor: '#0c1016fb',
            maskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='luminanceToAlpha'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
            WebkitMaskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='luminanceToAlpha'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
            maskSize: '100px 100px',
            WebkitMaskSize: '100px 100px',
            animation: 'grain 8s steps(10) infinite',
          }}
        />
      </div>
    </>
  );
};

export default GrainEffect;
