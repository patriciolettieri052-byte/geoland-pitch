import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import HubDiagram from './HubDiagram';

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
  variant?: "subtitulo" | "titulo" | "portada" | "portada81" | "portadafinal" | "texto" | "barras" | "apertura" | "apertura2" | "hub" | "backtest-stats" | "backtest-cities" | "numeric" | "business-units";
  align?: "left" | "center" | "right";
  maxWidth?: string;
  ctaUrl?: string;
  ctaText?: string;
}

const Chapter: React.FC<ChapterProps> = ({ id, title, overline, text, backgroundMedia, isTitleBlue, overlayOpacity, isBold, isItalic, titleSize, variant, align = "center", maxWidth, ctaUrl, ctaText }) => {
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

  const parseBacktestStats = (text: string) => {
    // Format: Label|Value|Subtext|ColorCode
    return text.split(';;').map(block => {
      const [label, value, subtext, color] = block.split('|').map(s => s.trim());
      return { label, value, subtext, color };
    });
  };

  const parseBacktestCities = (text: string) => {
    // Format: City|Ratio|Percentage|Description
    return text.split(';;').map(block => {
      const [city, ratio, percentage, description] = block.split('|').map(s => s.trim());
      return { city, ratio, percentage: parseFloat(percentage), description };
    });
  };

  const parseNumeric = (text: string) => {
    // Format: Value1|Label1|Subtext1 ;; Value2|Label2|Subtext2
    return text.split(';;').map(block => {
      const [value, label, subtext] = block.split('|').map(s => s.trim());
      return { value, label, subtext };
    });
  };

  const parseBusinessUnits = (text: string) => {
    // Format: Unit|Description
    return text.split(';;').map(block => {
      const [unit, description] = block.split('|').map(s => s.trim());
      return { unit, description };
    });
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
              src={backgroundMedia.startsWith('backtesting') || backgroundMedia.startsWith('escala') ? `/assets/${backgroundMedia}` : `/assets/${backgroundMedia}`}
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
        className={`relative z-20 w-full px-8 flex flex-col ${align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : 'items-center text-center'}`}
        style={{ 
          maxWidth: maxWidth || (variant?.startsWith('backtest') || variant === 'business-units' ? '1400px' : '1045px'),
          paddingLeft: align === 'left' ? '50px' : undefined,
          paddingRight: align === 'right' ? '50px' : undefined
        }}
      >
        {variant === 'barras' ? (
          <div className="w-full max-w-[1000px] mx-auto space-y-12 py-8">
            {title && (
              <motion.div 
                variants={itemVariants}
                className="title2 text-center mb-12 !text-white"
              >
                {title}
              </motion.div>
            )}
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
        ) : variant === 'backtest-stats' ? (
          <div className="w-full py-8">
            {title && (
              <motion.div variants={itemVariants} className="title2 text-center mb-16 !text-white opacity-60 tracking-[0.4em]">
                {title}
              </motion.div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {parseBacktestStats(text).map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 flex flex-col items-center text-center group hover:bg-white/10 transition-colors duration-500"
                >
                  <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-light text-white/40 mb-6 group-hover:text-white/60 transition-colors line-height-relaxed min-h-[32px] flex items-center">
                    {item.label}
                  </span>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className={`text-4xl md:text-5xl font-cormorant font-bold ${item.color === 'green' ? 'text-[#4a7c59]' : item.color === 'red' ? 'text-[#8b0000]' : 'text-white'}`}>
                      {item.value.split('/')[0]}
                    </span>
                    {item.value.includes('/') && (
                      <span className="text-lg font-light text-white/20">/{item.value.split('/')[1]}</span>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed tracking-wider text-white/50 font-light uppercase">
                    {item.subtext}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ) : variant === 'backtest-cities' ? (
          <div className="w-full py-8">
            {title && (
              <motion.div variants={itemVariants} className="title2 text-center mb-16 !text-white opacity-60 tracking-[0.4em]">
                {title}
              </motion.div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {parseBacktestCities(text).map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 flex flex-col items-center text-center group hover:bg-white/10 transition-colors duration-500"
                >
                  <div className="flex justify-between items-baseline w-full mb-6">
                    <span className="text-xl font-cormorant font-bold text-white tracking-widest uppercase">{item.city}</span>
                    <span className="text-[10px] font-light text-white/30 tracking-widest">{item.ratio}</span>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-cormorant font-light text-white">{item.percentage}%</span>
                  </div>

                  <div className="h-[2px] w-full bg-white/10 mb-8 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ ...transition, delay: 0.5 + idx * 0.1 }}
                      className="absolute inset-y-0 left-0 bg-[#4a7c59]"
                    />
                  </div>

                  <p className="text-[10px] leading-relaxed tracking-wider text-white/40 font-light italic">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            {ctaUrl && (
              <motion.div variants={itemVariants} className="flex justify-center">
                <a 
                  href={ctaUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-10 py-4 border border-white/20 text-[10px] tracking-[0.5em] uppercase font-light text-white/60 hover:text-white hover:border-white hover:bg-white/5 transition-all duration-500 group"
                >
                  <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-500">
                    {ctaText || 'Ver Backtest Consolidado'}
                  </span>
                </a>
              </motion.div>
            )}
          </div>
        ) : variant === 'numeric' ? (
          <div className="w-full max-w-[1200px] mx-auto py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
              {parseNumeric(text).map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center"
                >
                  <h2 className="text-8xl md:text-[10rem] font-cormorant font-bold text-white tracking-tighter leading-none mb-6">
                    {item.value}
                  </h2>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <span className="text-geoland-blue tracking-[0.5em] text-lg md:text-2xl uppercase font-bold">
                      {item.label}
                    </span>
                    <p className="text-lg md:text-xl font-light text-white/50 tracking-[0.1em] uppercase leading-relaxed max-w-md">
                      {item.subtext}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : variant === 'business-units' ? (
          <div className="w-full py-8">
            {title && (
              <motion.div variants={itemVariants} className="font-jost text-lg md:text-2xl text-center mb-12 text-white opacity-80 tracking-tight">
                {title}
              </motion.div>
            )}
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-20 max-w-[1400px] mx-auto">
              {parseBusinessUnits(text).map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="w-full md:w-[28%] flex flex-col items-center text-center group"
                >
                  <div className="flex flex-col items-center space-y-8">
                    {/* Logo SVG */}
                    <div className="h-[26px] opacity-100 transition-opacity duration-700">
                      <img 
                        src="/logo.svg" 
                        alt="Geoland" 
                        className="h-full w-auto invert brightness-200"
                        style={{ filter: 'invert(1) brightness(2)' }}
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                      <h3 className="font-jost font-bold text-2xl md:text-3xl text-white tracking-tight group-hover:text-geoland-blue transition-colors duration-500">
                        {item.unit}
                      </h3>
                      
                      <p className="font-jost text-[13px] md:text-sm leading-relaxed tracking-wide text-white/40 group-hover:text-white/70 transition-colors duration-500 max-w-[280px]">
                        <span className="first-letter:uppercase">{item.description}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : variant === 'portada' ? (
          <Logo intro />
        ) : variant === 'portada81' ? (
          <Logo intro subtitle={text} subtitleClassName="!mt-[17px]" />
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
        ) : variant === 'hub' ? (
          <HubDiagram />
        ) : (
          <>
            {title && (
              <motion.h2 
                variants={itemVariants}
                className={`${variant === 'subtitulo' ? 'text-xl md:text-3xl italic' : (titleSize || 'text-4xl md:text-6xl')} mb-8 tracking-[0.2em] uppercase ${isBold || variant === 'titulo' ? 'font-bold' : 'font-extralight'} ${isItalic && variant !== 'subtitulo' ? 'italic' : ''} ${isTitleBlue ? 'text-blue-400' : 'text-white'} ${align === 'right' ? 'text-right' : align === 'left' ? 'text-left' : 'text-center'}`}
              >
                <span dangerouslySetInnerHTML={{ __html: title }} />
              </motion.h2>
            )}
            {text && (
              <motion.div 
                variants={itemVariants}
                className={`text-lg md:text-2xl leading-relaxed text-white/80 w-full ${align === 'left' ? 'text-left mr-auto' : align === 'right' ? 'text-right ml-auto' : 'text-center mx-auto'} ${isBold ? 'font-bold' : ''} ${isItalic ? 'italic' : ''}`}
                style={{ maxWidth: maxWidth || '1000px' }}
              >
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      {/* Slide ID - Bottom Right */}
      <div className="absolute bottom-8 right-10 z-50 pointer-events-none select-none opacity-100">
        <span className="text-white font-jost text-[10px] md:text-xs tracking-[0.4em] font-extralight uppercase">
          {String(id).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default Chapter;
