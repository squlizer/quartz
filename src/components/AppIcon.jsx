import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const AppIcon = ({ id, name, iconUrl, onClick, showName = true }) => {
  const ref = useRef(null);

  const handleClick = () => {
    if (ref.current && onClick) {
      const rect = ref.current.getBoundingClientRect();
      
      const iconPos = {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      };
      onClick(iconPos);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-1 w-[70px]">
      <motion.button
        ref={ref}
        className="w-[60px] h-[60px] rounded-[14px] overflow-hidden shadow-sm relative group bg-transparent active:shadow-lg"
        whileTap={{ scale: 0.9, filter: "brightness(0.8)" }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        onClick={handleClick}
        layoutId={`icon-${id}`}
      >
        <img 
            src={iconUrl} 
            alt={name} 
            className="w-full h-full object-cover pointer-events-none"
            onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentNode.className += ' bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center';
                // Fallback text if image fails
                const span = document.createElement('span');
                span.innerText = name[0];
                span.className = 'text-white text-2xl font-bold';
                e.target.parentNode.appendChild(span);
            }}
        />
        {/* Shine effect */}
        <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-200" />
      </motion.button>
      {showName && (
        <span className="text-[11px] text-white font-normal tracking-tight truncate w-full text-center drop-shadow-md leading-tight">
          {name}
        </span>
      )}
    </div>
  );
};

export default AppIcon;
