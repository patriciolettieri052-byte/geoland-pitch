import { useState, useEffect, useCallback, useRef } from 'react';
import Chapter from './components/Chapter';
import Logo from './components/Logo';
import { slides } from './data/slides';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [currentIdx, setCurrentIdx] = useState(-1); // -1 for Intro
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStart = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    if (currentIdx < slides.length) {
      setIsAnimating(true);
      setCurrentIdx(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 1200); // Matching animation duration
    }
  }, [currentIdx, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    if (currentIdx > -1) {
      setIsAnimating(true);
      setCurrentIdx(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 1200);
    }
  }, [currentIdx, isAnimating]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 15) return;
      if (e.deltaY > 0) nextSlide();
      else prevSlide();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStart.current === null) return;
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart.current - touchEnd;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      touchStart.current = null;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  return (
    <main className="fixed inset-0 bg-black overflow-hidden select-none w-screen h-screen">
      <AnimatePresence mode="wait">
        {currentIdx === -1 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-10 bg-black"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video 
                src="/assets/portada2.mp4" 
                autoPlay 
                muted
                loop 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 z-10"></div>
            </div>
            <div className="relative z-20 w-full h-full flex items-center justify-center">
              <Logo intro />
            </div>
          </motion.div>
        )}

        {slides.map((slide, index) => (
          index === currentIdx && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-black"
            >
              <Chapter 
                {...slide} 
                overlayOpacity={slide.overlayOpacity}
              />
            </motion.div>
          )
        ))}

        {currentIdx === slides.length && (
          <motion.div
            key="outro"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-10 bg-black"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video 
                src="/assets/portada2.mp4" 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 z-10"></div>
            </div>
            <div className="relative z-20 w-full h-full flex items-center justify-center">
              <Logo intro subtitle="JOIN US" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
