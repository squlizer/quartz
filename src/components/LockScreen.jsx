import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Lock, Camera, Flashlight, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useMusic } from '../context/musicContext';

const LockScreen = ({ onUnlock }) => {
  const [time, setTime] = useState(new Date());
  const controls = useAnimation();
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } = useMusic();

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
      className="w-full h-full flex flex-col items-center pt-8 relative z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', transition: { duration: 0.5 } }}
    >
      <div className="flex flex-col items-center w-full px-4 space-y-1">
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Lock className="text-white mb-2 w-5 h-5 opacity-60" />
        </motion.div>

        {/* Date */}
        <h2 className="text-white/80 text-xl font-medium tracking-wide uppercase font-sans drop-shadow-md pb-2">
          {format(time, 'EEEE, MMMM d', { locale: enUS })}
        </h2>

        {/* Time - TRUE Liquid Glass Effect */}
        {/* Centered, No Clipping, Glassy Transparency */}
        <div className="relative flex justify-center w-full py-2">
          <h1 className="text-[8rem] font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/10 select-none w-full text-center -translate-x-1"
            style={{
              fontVariantNumeric: 'tabular-nums',
              // Glassy Glow & Depth
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1)) drop-shadow(0 0 10px rgba(255,255,255,0.1))',
              WebkitTextStroke: '1px rgba(255,255,255,0.4)',
            }}
          >
            {format(time, 'HH:mm')}
          </h1>
        </div>
      </div>

      <div className="flex-1" />

      {/* Bottom Actions */}
      <div className="w-full px-12 flex justify-between items-end mb-12">
        <motion.div
          whileTap={{ scale: 0.85 }}
          className="w-14 h-14 rounded-full bg-black/35 backdrop-blur-2xl flex items-center justify-center text-white cursor-pointer border border-white/10 shadow-lg group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/0 group-active:bg-white/10 transition-colors" />
          <Flashlight className="w-6 h-6 transition-transform group-active:scale-95 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.85 }}
          className="w-14 h-14 rounded-full bg-black/35 backdrop-blur-2xl flex items-center justify-center text-white cursor-pointer border border-white/10 shadow-lg group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/0 group-active:bg-white/10 transition-colors" />
          <Camera className="w-6 h-6 transition-transform group-active:scale-95 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
        </motion.div>
      </div>

      {/* Swipe Indicator */}
      <motion.div
        className="w-full h-16 flex items-end justify-center pb-2 absolute bottom-0 left-0 z-50 cursor-grab active:cursor-grabbing"
        animate={controls}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.1 }}
      >
        <motion.div
          className="w-32 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)]"
          animate={{ opacity: [0.5, 1, 0.5] }} // Breathing effect
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LockScreen;
