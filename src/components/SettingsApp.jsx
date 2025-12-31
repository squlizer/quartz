import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Search, Plane, Wifi, Bluetooth, Zap, Bell, Volume2, Moon, Timer, Settings, LayoutGrid, Sun, Accessibility, Image, Sparkles } from 'lucide-react';
import { playSound } from '../hooks/useSoundEffects';

const SettingsApp = ({ onClose }) => {
  const [airplaneMode, setAirplaneMode] = useState(false);

  const handleToggle = (setter, current) => {
    playSound('tick');
    setter(!current);
  };

  const sections = [
    {
      id: 'profile',
      items: [
        {
          id: 'user',
          type: 'profile',
          name: 'Squlizer',
          desc: 'Apple ID, iCloud, Media & Purchases',
          img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=100&auto=format&fit=crop'
        }
      ]
    },
    {
      id: 'ai',
      items: [
        { id: 'intelligence', label: 'Apple Intelligence & Siri', icon: <Sparkles size={18} />, color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400' }
      ]
    },
    {
      id: 'connectivity',
      items: [
        { id: 'airplane', label: 'Airplane Mode', icon: <Plane size={18} fill={airplaneMode ? "white" : "none"} className="-rotate-45" />, color: 'bg-orange-500', type: 'toggle', state: airplaneMode, setState: setAirplaneMode },
        { id: 'wifi', label: 'Wi-Fi', icon: <Wifi size={18} />, color: 'bg-blue-500', value: 'Zencoder_5G' },
        { id: 'bluetooth', label: 'Bluetooth', icon: <Bluetooth size={18} />, color: 'bg-blue-500', value: 'On' },
        { id: 'mobile', label: 'Mobile Service', icon: <Zap size={18} fill="white" />, color: 'bg-green-500' },
        { id: 'hotspot', label: 'Personal Hotspot', icon: <LayoutGrid size={18} />, color: 'bg-green-500', value: 'Off' }
      ]
    },
    {
      id: 'notifications',
      items: [
        { id: 'notif', label: 'Notifications', icon: <Bell size={18} fill="white" />, color: 'bg-red-500' },
        { id: 'sounds', label: 'Sounds & Haptics', icon: <Volume2 size={18} fill="white" />, color: 'bg-pink-500' },
        { id: 'focus', label: 'Focus', icon: <Moon size={18} fill="white" />, color: 'bg-indigo-600' },
        { id: 'screentime', label: 'Screen Time', icon: <Timer size={18} fill="white" />, color: 'bg-indigo-600' }
      ]
    },
    {
      id: 'general',
      items: [
        { id: 'general', label: 'General', icon: <Settings size={18} />, color: 'bg-gray-500' },
        { id: 'control', label: 'Control Center', icon: <LayoutGrid size={18} />, color: 'bg-gray-500' },
        { id: 'display', label: 'Display & Brightness', icon: <Sun size={18} />, color: 'bg-blue-400' },
        { id: 'accessibility', label: 'Accessibility', icon: <Accessibility size={18} />, color: 'bg-blue-600' },
        { id: 'wallpaper', label: 'Wallpaper', icon: <Image size={18} />, color: 'bg-cyan-500' }
      ]
    }
  ];

  return (
    <div className="w-full h-full bg-[#F2F2F7] flex flex-col overflow-hidden">
      {/* iOS 26 Liquid Glass Header */}
      <div className="relative">
        {/* Glass background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-xl" />

        <div className="relative pt-14 px-6 pb-3">
          <h1 className="text-3xl font-bold text-black mb-4">Settings</h1>

          {/* Glass Search Bar */}
          <div className="relative mb-2">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-lg" />
            <div className="relative flex items-center px-4 py-2.5">
              <Search className="text-gray-400 mr-2" size={18} />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent outline-none text-black placeholder-gray-500 text-[17px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {sections.map((section, idx) => (
          <div key={section.id} className="mb-6 px-4">
            {/* Liquid Glass Card */}
            <motion.div
              className="relative overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {/* Glass background */}
              <div className="absolute inset-0 bg-white/90 backdrop-blur-xl" />

              <div className="relative">
                {section.items.map((item, i) => (
                  <div key={item.id}>
                    {item.type === 'profile' ? (
                      <motion.div
                        className="flex items-center gap-4 p-4 active:bg-gray-100/50 transition-colors cursor-pointer"
                        whileTap={{ scale: 0.98 }}
                      >
                        <img src={item.img} alt="Profile" className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-lg" />
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-black">{item.name}</h2>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <ChevronRight className="text-gray-300" size={20} />
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex items-center p-3.5 pl-4 active:bg-gray-100/50 transition-colors cursor-pointer"
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-8 h-8 ${item.color} rounded-xl flex items-center justify-center text-white mr-3.5 shrink-0 shadow-md`}>
                          {item.icon}
                        </div>
                        <div className={`flex-1 flex justify-between items-center py-1 ${i !== section.items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                          <span className="text-[17px] text-black font-medium">{item.label}</span>
                          <div className="flex items-center gap-2">
                            {item.value && <span className="text-gray-400 text-[17px]">{item.value}</span>}
                            {item.type === 'toggle' ? (
                              <div
                                onClick={(e) => { e.stopPropagation(); handleToggle(item.setState, item.state); }}
                                className={`w-[52px] h-8 rounded-full relative transition-colors duration-300 ${item.state ? 'bg-green-500' : 'bg-gray-200'}`}
                              >
                                <motion.div
                                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                                  animate={{ x: item.state ? 20 : 0 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              </div>
                            ) : (
                              <ChevronRight className="text-gray-300" size={20} />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsApp;
