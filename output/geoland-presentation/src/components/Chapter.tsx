import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface ChapterProps {
  id: number;
  title?: string;
  text: string;
  backgroundMedia?: string;
  isTitleBlue?: boolean;
  overlayOpacity?: number;
  isBold?: boolean;
  isItalic?: boolean;
  overline?: string;
  titleSize?: string;
  variant?: "subtitulo" | "titulo" | "portada" | "portada81" | "portadafinal" | "texto" | "barras" | "apertura" | "apertura2";
  align?: "left" | "center" | "right";
}

const Chapter: React.FC<ChapterProps> = ({ title, overline, text, backgroundMedia, isTitleBlue, overlayOpacity, isBold, isItalic, titleSize, variant, align = "center" }) => {
  const isVideo = backgroundMedia?.toLowerCase().endsWith('.mp4');
  
  const parseBarras = (text: string) => {
    const markRegex = /((?:—\s*[✓✗]\s*)+)/g;
    const parts = text.split(markRegex);
    const items: { label: string; percentage: number }[] = [];
    
    for (let i = 0; i < parts.length; i += 2) {
      const label = parts[i]?.trim().replace(/^—\s*/, '').replace(/\s*—$/, '');
      const marksPart = parts[i+1] || "";
      
      if (label) {
        const checks = (marksPart.match(/✓/g) || []).length;
        const crosses = (marksPart.match(/✗/g) || []).length;
        const total = checks + crosses;
        const percentage = total > 0 ? (checks / total) * 100 : 0;
        items.push({ label, percentage });
      }
    }
    return items;
  };
  
  // Custom cubic-bezier for a "premium" heavy feel
  const transition = { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const };

  // Variants for the focal shift (blur + scale)
  const bgVariants = {
    initial: { opacity: 0, scale: 1.1, filter: "blur(20px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 1.05, filter: "blur(10px)" }
  };

  // Variants for content parallax/slide-up
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <div className={`w-full h-full flex items-center ${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'} relative overflow-hidden bg-black`}>
      {/* Background Media Container */}
      <motion.div 
        variants={bgVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        className="absolute inset-0 z-0"
      >
        {backgroundMedia && (
          isVideo ? (
            <video 
              src={`/assets/${backgroundMedia}`}
              autoPlay 
              muted
              loop 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={`/assets/${backgroundMedia}`} 
              className="w-full h-full object-cover"
              alt="background"
            />
          )
        )}
        {/* Dark Overlay - ensures text readability */}
        <div 
          className="absolute inset-0 bg-black z-10" 
          style={{ opacity: (overlayOpacity ?? 60) / 100 }}
        />
      </motion.div>

      {/* Content Overlay with Staggering */}
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className={`relative z-20 w-full max-w-[1045px] px-8 md:px-[10%] flex flex-col ${align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : 'items-center text-center'}`}
      >
        {variant === 'barras' ? (
          <div className="w-full max-w-[700px] mx-auto space-y-12 py-8">
            {parseBarras(text).map((item, idx) => (
              <div key={idx} className="group flex flex-col space-y-3">
                <div className="flex justify-between items-end opacity-0 animate-fade-in" style={{ animationDelay: `${idx * 0.1 + 0.4}s`, animationFillMode: 'forwards' }}>
                  <span className="text-white/90 uppercase tracking-[0.2em] text-xs md:text-sm font-light">{item.label}</span>
                </div>
                <div className="h-[2px] w-full bg-gray-500/30 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ ...transition, delay: idx * 0.1 + 0.5 }}
                    className="absolute inset-y-0 left-0 bg-white"
                  />
                  {/* Subtle glow for filled bars */}
                  {item.percentage > 0 && (
                    <motion.div 
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: `${item.percentage}%`, opacity: 0.3 }}
                      transition={{ ...transition, delay: idx * 0.1 + 0.5 }}
                      className="absolute inset-y-0 left-0 bg-white blur-sm"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'portada' ? (
          <Logo intro />
        ) : variant === 'portada81' ? (
          <Logo intro subtitle={text} />
        ) : variant === 'portadafinal' ? (
          <Logo intro subtitle="JOIN US" />
        ) : variant === 'apertura' ? (
          <>
            {overline && (
              <motion.span
                variants={itemVariants}
                className="font-monsieur text-6xl md:text-7xl text-white normal-case leading-none block mb-[-10px]"
              >
                {overline}
              </motion.span>
            )}
            {title && (
              <motion.h2
                variants={itemVariants}
                className="font-cormorant text-6xl md:text-8xl font-normal uppercase tracking-[0.2em] text-white leading-[0.8] block mb-[-10px]"
              >
                {title}
              </motion.h2>
            )}
            {text && (
              <motion.div
                variants={itemVariants}
                className="font-jost text-base md:text-lg text-white not-italic uppercase block z-10"
              >
                <div className="!font-bold !uppercase" dangerouslySetInnerHTML={{ __html: text }} />
              </motion.div>
            )}
          </>
        ) : variant === 'apertura2' ? (
          <>
            {overline && (
              <motion.span
                variants={itemVariants}
                className="font-monsieur text-6xl md:text-7xl text-white normal-case leading-none block mb-[-10px]"
              >
                {overline}
              </motion.span>
            )}
            {title && (
              <motion.h2
                variants={itemVariants}
                className="font-cormorant text-[2.6rem] md:text-[4.2rem] font-normal uppercase tracking-[0.2em] text-white leading-[0.8] block mb-[-10px]"
              >
                {title}
              </motion.h2>
            )}
            {text && (
              <motion.div
                variants={itemVariants}
                className="font-jost text-base md:text-lg text-white not-italic uppercase block z-10"
              >
                <div className="!font-bold !uppercase" dangerouslySetInnerHTML={{ __html: text }} />
              </motion.div>
            )}
          </>
        ) : (
          <>
            {title && (
              <motion.h2 
                variants={itemVariants}
                className={`${variant === 'subtitulo' ? 'text-xl md:text-3xl italic' : (titleSize || 'text-4xl md:text-6xl')} mb-8 tracking-[0.2em] uppercase ${isBold || variant === 'titulo' ? 'font-bold' : 'font-extralight'} ${isItalic && variant !== 'subtitulo' ? 'italic' : ''} ${isTitleBlue ? 'text-blue-400' : 'text-white'}`}
              >
                {title}
              </motion.h2>
            )}
            {text && (
              <motion.div 
                variants={itemVariants}
                className={`text-lg md:text-2xl leading-relaxed text-white/80 max-w-[870px] mx-auto ${isBold ? 'font-bold' : ''} ${isItalic ? 'italic' : ''}`}
              >
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Chapter;
