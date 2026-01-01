import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useMusic } from '../context/musicContext.jsx';

const DynamicIsland = ({ onExpandChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentTrack, currentTrackIndex, isPlaying, progress, togglePlay, nextTrack, prevTrack } = useMusic();

  const getColorForGenre = (genre) => {
    switch (genre) {
      case 'Ambient': return 'from-purple-600 to-black';
      case 'Phonk': return 'from-red-600 to-black';
      case 'Pop': return 'from-yellow-400 to-orange-500';
      default: return 'from-blue-600 to-black';
    }
  };

  const color = getColorForGenre(currentTrack.genre);

  useEffect(() => {
    onExpandChange?.(isExpanded);
  }, [isExpanded, onExpandChange]);

  return (
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 z-[400] pt-[11px] px-[20px] pb-[20px] pointer-events-auto"
      onMouseLeave={() => setIsExpanded(false)}
    >
      <motion.div
        layout
        className="bg-black/95 backdrop-blur-xl rounded-[24px] flex items-center justify-center overflow-hidden cursor-pointer border border-white/10 shadow-2xl relative"
        initial={false}
        animate={{
          width: isExpanded ? 340 : 126,
          height: isExpanded ? 210 : 36,
          borderRadius: isExpanded ? 44 : 20,
        }}
        transition={{
          type: "spring",
          stiffness: 550,
          damping: 28,
          mass: 0.5
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        onHoverStart={() => !isExpanded && setIsExpanded(true)}
      >
        <div className="w-full h-full relative">
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: isExpanded
                ? `linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)`
                : `linear-gradient(to bottom, transparent, transparent)`,
              opacity: isExpanded ? 1 : 0
            }}
          />

          <motion.div
            className={`absolute inset-0 bg-gradient-to-b ${color} pointer-events-none`}
            animate={{ opacity: isExpanded ? 0.15 : 0.05 }}
            transition={{ duration: 0.5 }}
          />

          <div className="w-full h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                <motion.div
                  key="compact"
                  className="flex items-center justify-around w-full h-full px-3"
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(10px)' }}
                >
                  <div className="flex items-center gap-1.5">
                    <motion.div className="flex items-end gap-[2px] h-3">
                      {[0.3, 0.7, 0.5].map((h, i) => (
                        <motion.div
                          key={i}
                          className="w-[2px] bg-green-500 rounded-full"
                          animate={{ height: isPlaying ? [`${h * 100}%`, `${(1 - h) * 100}%`, `${h * 100}%`] : '2px' }}
                          transition={{ duration: 0.5 + i * 0.1, repeat: Infinity }}
                        />
                      ))}
                    </motion.div>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-orange-500" />
                  <div className="text-[10px] font-bold text-gray-400 tracking-tight">
                    {currentTrack.title.substring(0, 6)}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="expanded"
                  className="w-full h-full flex flex-col p-6 pt-7"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <div className="flex items-center gap-5 mb-4">
                    <motion.div
                      layoutId="island-art"
                      className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-4xl shadow-xl shrink-0 overflow-hidden`}
                    >
                      {currentTrack.coverUrl ? (
                        <img src={currentTrack.coverUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        '🎵'
                      )}
                    </motion.div>
                    <div className="flex flex-col flex-1 overflow-hidden">
                      <motion.span layout className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-bold mb-1">Now Playing</motion.span>
                      <motion.span layout className="text-lg font-bold text-white leading-tight truncate">{currentTrack.title}</motion.span>
                      <motion.span layout className="text-sm text-white/60 truncate">{currentTrack.artist}</motion.span>
                    </div>
                  </div>

                  {/* Progress Bar - synced with context */}
                  <div className="w-full h-1.5 bg-white/10 rounded-full mb-5 overflow-hidden">
                    <motion.div
                      className="h-full bg-white/50"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-auto pb-2">
                    <div className="flex items-end gap-1.5 h-6">
                      {[0.4, 0.8, 0.6, 0.9, 0.5].map((h, i) => (
                        <motion.div
                          key={i}
                          className="w-[3.5px] bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                          animate={{
                            height: isPlaying ? [`${h * 40}%`, `${(1 - h) * 100}%`, `${h * 40}%`] : '4px'
                          }}
                          transition={{ duration: 0.6 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                        />
                      ))}
                    </div>

                    <div className="flex gap-6 items-center">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={(e) => { e.stopPropagation(); prevTrack(); }}
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        <SkipBack fill="currentColor" size={28} />
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:bg-gray-200 transition-colors"
                      >
                        {isPlaying ? <Pause fill="black" size={30} /> : <Play fill="black" size={30} className="ml-1" />}
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={(e) => { e.stopPropagation(); nextTrack(); }}
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        <SkipForward fill="currentColor" size={28} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DynamicIsland;
