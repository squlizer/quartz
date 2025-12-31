import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GestureBar = ({ onSwipeUp }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);

  return (
    <motion.div
      className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[100]"
      drag="y"
      dragConstraints={{ top: -150, bottom: 50 }}
      dragElastic={0.3}
      onDragStart={() => setIsDragging(true)}
      onDrag={(e, info) => setDragY(info.offset.y)}
      onDragEnd={(e, info) => {
        setIsDragging(false);
        setDragY(0);
        if (info.offset.y < -50 && onSwipeUp) {
          onSwipeUp();
        }
      }}
    >
      <motion.div
        className="w-32 h-1.5 bg-white/40 rounded-full cursor-grab active:cursor-grabbing transition-all"
        animate={{
          scaleX: isDragging ? 1.3 : 1,
          backgroundColor: isDragging ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
          height: isDragging ? 2 : 6,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </motion.div>
  );
};

export default GestureBar;
