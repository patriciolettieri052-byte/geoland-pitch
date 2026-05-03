import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slides, SlideData } from '../data/slides';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface NavGridProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (index: number) => void;
  currentIndex: number;
}

interface NavSlide extends Partial<SlideData> {
  index: number;
}

const SLIDES_PER_PAGE = 15;

const NavItem: React.FC<{ slide: NavSlide; index: number; isActive: boolean; onSelect: (idx: number) => void }> = ({ slide, index, isActive, onSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isVideo = slide.backgroundMedia?.toLowerCase().endsWith('.mp4');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(index)}
      className={`relative aspect-video rounded-sm overflow-hidden cursor-pointer border transition-all duration-500 group ${
        isActive ? 'border-white ring-1 ring-white/30' : 'border-white/10 hover:border-white/30'
      }`}
    >
      {/* Skeleton / Placeholder */}
      <div className={`absolute inset-0 bg-zinc-900 transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent animate-pulse" />
      </div>

      {/* Background Media */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {slide.backgroundMedia ? (
          isVideo ? (
            <video 
              src={`${slide.backgroundMedia.includes('/') ? slide.backgroundMedia : `/assets/${slide.backgroundMedia}`}#t=0.1`} 
              className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" 
              preload="metadata"
              muted 
              onLoadedData={() => setIsLoaded(true)}
            />
          ) : (
            <img 
              src={`/assets/${slide.backgroundMedia}`} 
              className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" 
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
            />
          )
        ) : (
          <div className="w-full h-full bg-zinc-800" onMouseEnter={() => setIsLoaded(true)} />
        )}
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-3 flex flex-col justify-end z-10">
        <span className="text-white font-jost text-[9px] tracking-[0.3em] opacity-30 mb-1 font-light uppercase">
          {typeof slide.id === 'number' ? `SLIDE ${String(slide.id).padStart(2, '0')}` : slide.id}
        </span>
        <p className="text-white font-jost text-[10px] tracking-widest uppercase font-light truncate leading-tight">
          {slide.title || "CONTENIDO"}
        </p>
      </div>

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] z-20" />
      )}
    </motion.div>
  );
};

const NavGrid: React.FC<NavGridProps> = ({ isOpen, onClose, onSelect, currentIndex }) => {
  const allSlides = useMemo(() => [
    { id: 'intro', title: 'PORTADA', backgroundMedia: 'portada2.mp4', index: -1 },
    ...slides.map((s, i) => ({ ...s, index: i })),
    { id: 'outro', title: 'CIERRE', backgroundMedia: 'portada2.mp4', index: slides.length }
  ], []);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(allSlides.length / SLIDES_PER_PAGE);

  // When opening, find the page where the current slide is
  useEffect(() => {
    if (isOpen) {
      const pageOfCurrent = Math.floor((currentIndex + 1) / SLIDES_PER_PAGE);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(pageOfCurrent);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen, currentIndex]);

  const currentSlides = allSlides.slice(currentPage * SLIDES_PER_PAGE, (currentPage + 1) * SLIDES_PER_PAGE);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md overflow-hidden flex flex-col pt-24 pb-16 px-8 md:px-16"
        >
          <div className="max-w-[1400px] mx-auto w-full h-full flex flex-col">
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6 shrink-0">
              <div>
                <h2 className="text-white font-jost text-3xl md:text-4xl tracking-[0.4em] font-extralight uppercase">
                  Navegación
                </h2>
                <div className="flex items-center space-x-4 mt-2">
                  <p className="text-white/40 font-jost text-xs tracking-[0.2em] uppercase font-light">
                    Página {currentPage + 1} de {totalPages}
                  </p>
                  <div className="h-px w-8 bg-white/20" />
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] text-white/30 tracking-widest uppercase">
                      {allSlides.length} Slides Totales
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="group flex items-center space-x-3 text-white/50 hover:text-white transition-colors"
              >
                <span className="text-[10px] tracking-[0.3em] font-light uppercase">Cerrar</span>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                  <X size={14} />
                </div>
              </button>
            </div>

            <div className="flex-grow flex items-center relative group/nav">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className={`absolute -left-4 md:-left-12 z-20 p-4 transition-all duration-300 ${
                  currentPage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-20 hover:opacity-100 hover:scale-110'
                }`}
              >
                <ChevronLeft size={48} strokeWidth={1} className="text-white" />
              </button>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full col-span-full"
                  >
                    {currentSlides.map((slide) => (
                      <NavItem 
                        key={slide.id} 
                        slide={slide} 
                        index={slide.index} 
                        isActive={slide.index === currentIndex} 
                        onSelect={onSelect} 
                      />
                    ))}
                    
                    {/* Filling empty slots to maintain grid structure */}
                    {Array.from({ length: SLIDES_PER_PAGE - currentSlides.length }).map((_, i) => (
                      <div key={`empty-${i}`} className="aspect-video" />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage === totalPages - 1}
                className={`absolute -right-4 md:-right-12 z-20 p-4 transition-all duration-300 ${
                  currentPage === totalPages - 1 ? 'opacity-0 pointer-events-none' : 'opacity-20 hover:opacity-100 hover:scale-110'
                }`}
              >
                <ChevronRight size={48} strokeWidth={1} className="text-white" />
              </button>
            </div>

            <div className="mt-8 flex justify-center space-x-2 shrink-0">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentPage ? 'bg-white w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavGrid;
