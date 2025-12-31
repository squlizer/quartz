import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import DynamicIsland from './DynamicIsland';

const StatusBar = ({ isDark = false, onNotificationTap, onControlCenterTap, onIslandChange }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div 
      className={`w-full h-14 flex justify-between items-center px-4 absolute top-0 left-0 z-[500] transition-colors duration-500 ${isDark ? 'text-black' : 'text-white'}`}
    >
      <div 
        className="text-[17px] font-bold tracking-tight cursor-pointer active:opacity-60 transition-opacity ml-4 pt-1"
        onClick={onNotificationTap}
      >
        {formatTime(time)}
      </div>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <DynamicIsland onExpandChange={onIslandChange} />
      </div>

      <div 
        className="flex items-center space-x-1.5 cursor-pointer active:opacity-60 transition-opacity mr-4 pt-1"
        onClick={onControlCenterTap}
      >
        <Signal size={18} strokeWidth={2.5} className="shrink-0" />
        <Wifi size={18} strokeWidth={2.5} className="shrink-0" />
        <div className="flex items-center gap-1.5 ml-0.5 shrink-0">
           <span className="text-[13px] font-bold">100%</span>
           <Battery size={22} strokeWidth={2.5} className="shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
