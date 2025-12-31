import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Bluetooth, Plane, Moon, Music, Sun, Volume2, Signal, Battery, Radio, FastForward, Rewind, Play } from 'lucide-react';

const ControlCenter = ({ onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50"
      initial="closed"
      animate="open"
      exit="closed"
    >
      {/* Background Fade */}
      <motion.div 
        className="fixed inset-0 bg-black/40 backdrop-blur-3xl z-40"
        variants={{
          closed: { opacity: 0 },
          open: { opacity: 1 }
        }}
        transition={{ duration: 0.3 }}
        onClick={onClose} 
      />
      
      {/* Content Slide */}
      <motion.div
        className="w-full h-full p-6 pt-12 flex flex-col gap-5 relative z-50"
        variants={{
          closed: { y: '-100%', opacity: 0 },
          open: { y: 0, opacity: 1 }
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        {/* Top Status Area */}
        <div className="absolute top-2 right-8 flex items-center gap-2 text-white/60">
           <Signal size={14} strokeWidth={2.5} />
           <Wifi size={14} strokeWidth={2.5} />
           <Battery size={18} strokeWidth={2} />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2 h-40 bg-white/10 backdrop-blur-md rounded-[28px] p-4 grid grid-cols-2 gap-3 border border-white/5 shadow-2xl">
            <div className="flex items-center justify-center bg-white/10 text-white rounded-full h-12 w-12 text-xl active:bg-orange-500 transition-colors"><Plane size={24} className="-rotate-45" /></div>
            <div className="flex items-center justify-center bg-blue-500 text-white rounded-full h-12 w-12 text-xl shadow-[0_0_20px_rgba(59,130,246,0.4)]"><Wifi size={24} strokeWidth={2.5} /></div>
            <div className="flex items-center justify-center bg-blue-500 text-white rounded-full h-12 w-12 text-xl shadow-[0_0_20px_rgba(59,130,246,0.4)]"><Bluetooth size={24} strokeWidth={2.5} /></div>
            <div className="flex items-center justify-center bg-green-500 text-white rounded-full h-12 w-12 text-xl shadow-[0_0_20px_rgba(34,197,94,0.4)]"><Radio size={24} strokeWidth={2.5} /></div>
          </div>
          <div className="w-1/2 h-40 bg-white/10 backdrop-blur-md rounded-[28px] p-5 flex flex-col justify-between border border-white/5 shadow-2xl">
            <div className="flex items-center gap-2">
              <Music size={16} className="text-white/40" />
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Not Playing</span>
            </div>
            <div className="flex justify-between text-white items-center px-1">
              <Rewind size={28} fill="currentColor" className="active:opacity-40 transition-opacity" />
              <Play size={32} fill="currentColor" className="active:opacity-40 transition-opacity" />
              <FastForward size={28} fill="currentColor" className="active:opacity-40 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="flex gap-4 h-36">
           {/* Brightness */}
           <div className="flex-1 bg-white/10 backdrop-blur-md rounded-[28px] relative overflow-hidden flex flex-col justify-end p-5 group cursor-pointer border border-white/5 shadow-2xl">
               <div className="absolute inset-0 bg-white/20 h-[50%] bottom-0 w-full group-active:h-[55%] transition-all duration-300" />
               <Sun size={28} className="text-white relative z-10 drop-shadow-lg" />
           </div>
           {/* Volume */}
           <div className="flex-1 bg-white/10 backdrop-blur-md rounded-[28px] relative overflow-hidden flex flex-col justify-end p-5 group cursor-pointer border border-white/5 shadow-2xl">
               <div className="absolute inset-0 bg-white/20 h-[70%] bottom-0 w-full group-active:h-[75%] transition-all duration-300" />
               <Volume2 size={28} className="text-white relative z-10 drop-shadow-lg" />
           </div>
        </div>
        
        {/* Toggles */}
        <div className="flex gap-4">
          <div className="flex-1 h-16 bg-white/10 backdrop-blur-md rounded-[22px] flex items-center gap-3 pl-4 active:scale-95 transition-all border border-white/5 shadow-xl">
               <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center"><Moon size={22} fill="currentColor" /></div>
               <span className="text-white font-semibold text-sm">Focus</span>
          </div>
          <div className="flex-1 h-16 bg-white/10 backdrop-blur-md rounded-[22px] flex items-center gap-3 pl-4 active:scale-95 transition-all border border-white/5 shadow-xl">
               <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">...</div>
               <span className="text-white font-semibold text-sm">More</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ControlCenter;
