import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import DynamicIsland from './DynamicIsland';

const BatteryIcon = ({ isDark }) => (
  <div className="relative flex items-center">
    <div className="w-[25px] h-[12px] rounded-[3.5px] border-[1.2px] border-current p-[1px] relative opacity-90 flex items-center">
      <div className="w-full h-full bg-current rounded-[1.8px]" />
    </div>
    <div className="w-[1.2px] h-[4px] bg-current rounded-r-full ml-[1px] opacity-90" />
  </div>
);

const StatusBar = ({ isDark = false, isIslandExpanded = false, onNotificationTap, onControlCenterTap, onIslandChange }) => {
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
      className={`w-full h-14 flex justify-between items-center px-4 absolute top-0 left-0 z-[400] pointer-events-none transition-colors duration-500 ${isDark ? 'text-black' : 'text-white'}`}
    >
      <div
        className={`text-[17px] font-bold tracking-tight cursor-pointer active:opacity-60 transition-all duration-300 ml-4 pt-1 pointer-events-auto ${isIslandExpanded ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}
        onClick={onNotificationTap}
      >
        {formatTime(time)}
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-auto">
        <DynamicIsland onExpandChange={onIslandChange} />
      </div>

      <div
        className={`flex items-center space-x-1 cursor-pointer active:opacity-60 transition-all duration-300 mr-4 pt-1 pointer-events-auto ${isIslandExpanded ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}
        onClick={onControlCenterTap}
      >
        <Signal size={18} strokeWidth={2.5} className="shrink-0 mr-0.5" />
        <Wifi size={18} strokeWidth={2.5} className="shrink-0" />
        <div className="ml-1.5 shrink-0">
          <BatteryIcon isDark={isDark} />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
