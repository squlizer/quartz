import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const PhoneFrame = ({ children, onLock, onActionButton, onVolumeUp, onVolumeDown }) => {
  return (
    <div className="relative flex items-center justify-center p-4 h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Phone Body - Premium Titanium Design */}
      <div className="relative w-[380px] h-[800px] rounded-[55px]"
        style={{
          background: 'linear-gradient(145deg, #4a4a4d 0%, #2d2d30 25%, #1a1a1c 50%, #2d2d30 75%, #4a4a4d 100%)',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.1),
            0 0 0 3px #1a1a1c,
            0 0 0 4px rgba(255,255,255,0.05),
            0 0 0 8px #0d0d0e,
            0 0 0 9px rgba(255,255,255,0.03),
            0 25px 60px -10px rgba(0,0,0,0.7),
            0 50px 100px -20px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.1)
          `
        }}
      >
        {/* Titanium texture overlay */}
        <div
          className="absolute inset-0 rounded-[55px] pointer-events-none opacity-30"
          style={{
            background: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px)'
          }}
        />

        {/* Top speaker grille */}
        <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-16 h-[6px] bg-black/80 rounded-full"
          style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)' }}
        />

        {/* Side Buttons - Premium Style */}
        {/* Power Button */}
        <div
          className="absolute top-40 -right-[4px] w-[4px] h-24 rounded-r-sm cursor-pointer z-50 transition-all duration-150 hover:brightness-125 active:brightness-75"
          style={{
            background: 'linear-gradient(90deg, #2a2a2c 0%, #4a4a4d 50%, #3a3a3c 100%)',
            boxShadow: '1px 0 2px rgba(0,0,0,0.5), inset -1px 0 1px rgba(255,255,255,0.1)'
          }}
          onClick={onLock}
        />

        {/* Camera Control (Intelligence) Button - Bottom Right */}
        <div
          className="absolute top-[350px] -right-[4px] w-[4px] h-20 rounded-r-sm cursor-pointer z-50 transition-all duration-150 hover:brightness-125 active:brightness-75"
          style={{
            background: 'linear-gradient(90deg, #2a2a2c 0%, #4a4a4d 50%, #3a3a3c 100%)',
            boxShadow: '1px 0 2px rgba(0,0,0,0.5), inset -1px 0 1px rgba(255,255,255,0.1)'
          }}
          onClick={() => onActionButton && onActionButton('intelligence')}
          title="Apple Intelligence"
        />



        {/* Volume Up */}
        <div
          className="absolute top-36 -left-[4px] w-[4px] h-14 rounded-l-sm cursor-pointer z-50 transition-all duration-150 hover:brightness-125 active:brightness-75"
          style={{
            background: 'linear-gradient(270deg, #2a2a2c 0%, #4a4a4d 50%, #3a3a3c 100%)',
            boxShadow: '-1px 0 2px rgba(0,0,0,0.5), inset 1px 0 1px rgba(255,255,255,0.1)'
          }}
          onClick={onVolumeUp}
        />

        {/* Volume Down */}
        <div
          className="absolute top-52 -left-[4px] w-[4px] h-14 rounded-l-sm cursor-pointer z-50 transition-all duration-150 hover:brightness-125 active:brightness-75"
          style={{
            background: 'linear-gradient(270deg, #2a2a2c 0%, #4a4a4d 50%, #3a3a3c 100%)',
            boxShadow: '-1px 0 2px rgba(0,0,0,0.5), inset 1px 0 1px rgba(255,255,255,0.1)'
          }}
          onClick={onVolumeDown}
        />

        {/* Action Button (Left side) */}
        <div
          className="absolute top-24 -left-[4px] w-[4px] h-6 rounded-l-sm cursor-pointer z-50 transition-all duration-150 hover:bg-orange-500/50 active:bg-orange-500"
          style={{
            background: 'linear-gradient(270deg, #1a1a1c 0%, #2a2a2c 50%, #1a1a1c 100%)',
            boxShadow: '-1px 0 2px rgba(0,0,0,0.5)'
          }}
          onClick={onActionButton}
          title="Action Button"
        />

        {/* Screen bezel - thin black border around screen */}
        <div
          className="absolute inset-[8px] rounded-[48px] bg-black"
          style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)' }}
        >
          {/* Screen Content */}
          <div className="w-full h-full relative rounded-[48px] overflow-hidden">
            {children}
          </div>
        </div>

        {/* Bottom chin reflection */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 rounded-b-[55px] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,0.03) 0%, transparent 100%)'
          }}
        />
      </div>

      {/* Ambient glow behind phone - Simplified, less animation */}
      <div
        className="absolute w-[420px] h-[840px] rounded-[70px] -z-10 blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(120,120,255,0.4) 0%, transparent 70%)'
        }}
      />
    </div>
  );
};

export default PhoneFrame;
