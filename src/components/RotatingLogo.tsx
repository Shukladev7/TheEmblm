import React, { useState, useEffect, useRef } from 'react';

const RotatingLogo = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center pb-16"
    >
      <div className="relative flex flex-col items-center space-y-8">
        {/* Rotating spiral image container */}
        <div className="relative w-60 h-60 overflow-hidden">
          <img
            src="https://res.cloudinary.com/ducp6qhg5/image/upload/v1757491800/logo1_ujxwev.png"
            alt="Rotating Spiral"
            className={`absolute inset-0 w-full h-full object-contain transition-transform duration-1000 ease-in-out ${
              isInView ? 'animate-spin' : ''
            }`}
            style={{
              animation: isInView ? 'spin 10s linear infinite' : 'none',
              willChange: 'transform',
            }}
          />
        </div>

        {/* Stationary "The Emblm" image */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <img
            src="https://res.cloudinary.com/ducp6qhg5/image/upload/v1757491800/logo2_ipxtke.png"
            alt="The Emblm"
            className="w-80 h-auto object-contain"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default RotatingLogo;
