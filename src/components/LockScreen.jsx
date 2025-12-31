import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaLock, FaCamera, FaLightbulb } from 'react-icons/fa';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const LockScreen = ({ onUnlock }) => {
  const [time, setTime] = useState(new Date());
  const controls = useAnimation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDragEnd = (event, info) => {
    if (info.offset.y < -150) {
      onUnlock();
    } else {
      controls.start({ y: 0 });
    }
  };

  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center pt-24 pb-8 relative z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)', transition: { duration: 0.625 } }}
    >
      <div className="flex flex-col items-center space-y-4 w-full px-8">
        <FaLock className="text-white mb-2 text-sm opacity-60" />
        
        {/* Date */}
        <h2 className="text-white/80 text-xl font-medium tracking-wide uppercase font-sans">
          {format(time, 'EEEE, MMMM d', { locale: enUS })}
        </h2>

        {/* Time - Massive & Modern */}
        <h1 className="text-white text-[6.5rem] font-bold tracking-tighter drop-shadow-2xl leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 relative -top-5">
          {format(time, 'HH:mm')}
        </h1>

        {/* Widgets Area - iOS 26 Concept - REMOVED as requested */}
        {/* <div className="flex gap-4 mt-6">...</div> */}
      </div>

      <div className="flex-1" />

      {/* Bottom Actions - Liquid Glass Style */}
      <div className="w-full px-12 flex justify-between items-end mb-12 relative top-6">
        <div className="w-14 h-14 rounded-full liquid-glass flex items-center justify-center text-white active:bg-white active:text-black transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          <FaLightbulb className="text-xl" />
        </div>
        <div className="w-14 h-14 rounded-full liquid-glass flex items-center justify-center text-white active:bg-white active:text-black transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          <FaCamera className="text-xl" />
        </div>
      </div>

      {/* Swipe Indicator - Large Hit Area */}
      <motion.div 
        className="w-full h-24 flex items-end justify-center pb-4 absolute bottom-0 left-0 z-50 cursor-grab active:cursor-grabbing"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        <div className="w-32 h-1.5 bg-white/50 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

export default LockScreen;
