import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Search, Plane, Wifi, Bluetooth, Zap, Bell, Volume2, Moon, Timer, Settings, LayoutGrid, Sun, Accessibility, Image, Sparkles, ChevronLeft, Shield, Key, Heart } from 'lucide-react';
import { playSound } from '../hooks/useSoundEffects';

const SettingsApp = ({ onClose, currentWallpaper, onWallpaperChange }) => {
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [showWallpaperPicker, setShowWallpaperPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (showWallpaperPicker && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [showWallpaperPicker]);

  const wallpapers = [
    { url: 'https://thinkapple.pl/wp-content/uploads/2025/06/iOS_26_tapeta-iphone-wallpaper-light-full-768x1665.jpg', type: 'default', label: 'iOS 26 Default' },
    { url: 'https://thinkapple.pl/wp-content/uploads/2023/09/iPhone-15-wallpaper-5_sml.jpg', type: 'other', label: 'Blue Silk' },
    { url: 'https://thinkapple.pl/wp-content/uploads/2023/09/iPhone-15-wallpaper-6_sml.jpg', type: 'other', label: 'Titanium Bloom' },
    { url: 'https://cdn.jsdelivr.net/gh/quandz24-ui/OriginOS_web@main/publicBeta/originos_data/wallpaper_3.png', type: 'custom', label: 'Abstract custom' }
  ];

  const handleToggle = (setter, current) => {
    playSound('tick');
    setter(!current);
  };

  if (showWallpaperPicker) {
    const defaultWp = wallpapers.find(w => w.type === 'default');
    const otherWps = wallpapers.filter(w => w.type === 'other');
    const customWp = wallpapers.find(w => w.type === 'custom');

    const WallpaperItem = ({ wp, idx }) => (
      <motion.div
        key={wp.url}
        initial={{ opacity: 0, y: 40, scale: 0.8, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{
          delay: idx * 0.08,
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1] // Bouncy entrance
        }}
        className="flex flex-col gap-3 group"
      >
        <motion.div
          className={`relative aspect-[9/19.5] rounded-3xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 ${currentWallpaper === wp.url ? 'ring-[6px] ring-blue-500 ring-offset-4 ring-offset-[#F2F2F7] scale-[1.05] z-10 shadow-2xl' : 'hover:scale-[1.02] opacity-90 hover:opacity-100'
            }`}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            onWallpaperChange(wp.url);
            playSound('tick');
          }}
        >
          <img src={wp.url} alt={wp.label} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />

          {currentWallpaper === wp.url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-blue-500/10 flex items-center justify-center pointer-events-none"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg transform">
                <motion.svg
                  width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </motion.svg>
              </div>
            </motion.div>
          )}
        </motion.div>
        <div className="text-center">
          <span className={`text-[13px] font-bold tracking-wide uppercase transition-colors duration-300 ${currentWallpaper === wp.url ? 'text-blue-500' : 'text-gray-400'}`}>
            {wp.label}
          </span>
        </div>
      </motion.div>
    );

    return (
      <div className="w-full h-full bg-[#F2F2F7] flex flex-col">
        <div className="relative pt-14 px-6 pb-4 bg-white/80 backdrop-blur-2xl z-20 border-b border-gray-200">
          <button
            onClick={() => {
              playSound('tick');
              setShowWallpaperPicker(false);
            }}
            className="flex items-center text-blue-500 mb-2 font-medium active:opacity-50 transition-opacity"
          >
            <ChevronLeft size={24} /> Settings
          </button>
          <h1 className="text-3xl font-bold text-black tracking-tight">Wallpapers</h1>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar pb-24">
          <section className="mb-10">
            <h2 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Default</h2>
            <div className="grid grid-cols-2 gap-x-6">
              <WallpaperItem wp={defaultWp} idx={0} />
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Other</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {otherWps.map((wp, i) => <WallpaperItem wp={wp} idx={i + 1} />)}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Custom</h2>
            <div className="grid grid-cols-2 gap-x-6">
              <WallpaperItem wp={customWp} idx={3} />
            </div>
          </section>

          <div className="mt-4 p-6 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500">
              <Sparkles size={24} />
            </div>
            <div className="text-center">
              <h3 className="text-black font-bold text-lg">Dynamic Wallpapers</h3>
              <p className="text-gray-500 text-sm">Experience your lock screen in a whole new way with vibrant colors and motion.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      title: 'Intelligence',
      items: [
        { id: 'intelligence', label: 'Apple Intelligence & Siri', icon: <Sparkles size={18} />, color: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500' }
      ]
    },
    {
      id: 'connectivity',
      title: 'Connectivity',
      items: [
        { id: 'airplane', label: 'Airplane Mode', icon: <Plane size={18} fill={airplaneMode ? "white" : "none"} className="-rotate-45" />, color: 'bg-orange-500', type: 'toggle', state: airplaneMode, setState: setAirplaneMode },
        { id: 'wifi', label: 'Wi-Fi', icon: <Wifi size={18} />, color: 'bg-blue-500', value: 'Squlizer_5G' },
        { id: 'bluetooth', label: 'Bluetooth', icon: <Bluetooth size={18} />, color: 'bg-indigo-600', value: 'On' },
        { id: 'mobile', label: 'Mobile Service', icon: <Zap size={18} strokeWidth={2.5} />, color: 'bg-green-500' },
      ]
    },
    {
      id: 'personalization',
      title: 'Personalization',
      items: [
        { id: 'notif', label: 'Notifications', icon: <Bell size={18} />, color: 'bg-red-500' },
        { id: 'sounds', label: 'Sounds & Haptics', icon: <Volume2 size={18} />, color: 'bg-pink-500' },
        { id: 'focus', label: 'Focus', icon: <Moon size={18} />, color: 'bg-indigo-700' },
        { id: 'screentime', label: 'Screen Time', icon: <Timer size={18} />, color: 'bg-indigo-800' }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      items: [
        { id: 'privacy', label: 'Privacy & Security', icon: <Shield size={18} />, color: 'bg-blue-600' },
        { id: 'passcodes', label: 'Face ID & Passcode', icon: <Key size={18} />, color: 'bg-gray-700' },
        { id: 'health', label: 'Health', icon: <Heart size={18} />, color: 'bg-red-500' },
      ]
    },
    {
      id: 'system',
      title: 'System',
      items: [
        { id: 'general', label: 'General', icon: <Settings size={18} />, color: 'bg-gray-500' },
        { id: 'display', label: 'Display & Brightness', icon: <Sun size={18} />, color: 'bg-blue-400' },
        { id: 'accessibility', label: 'Accessibility', icon: <Accessibility size={18} />, color: 'bg-blue-600' },
        { id: 'wallpaper', label: 'Wallpaper', icon: <Image size={18} />, color: 'bg-cyan-500', onClick: () => setShowWallpaperPicker(true) }
      ]
    }
  ];

  return (
    <div className="w-full h-full bg-[#F2F2F7] flex flex-col overflow-hidden">
      {/* Persistent Glass HUD Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-2xl border-b border-gray-200">
        <div className="pt-14 px-6 pb-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-extrabold text-black tracking-tight">Settings</h1>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <Search size={18} />
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gray-200/50 rounded-2xl group-focus-within:bg-gray-200 transition-colors" />
            <div className="relative flex items-center px-4 py-2.5">
              <Search className="text-gray-400 mr-2" size={18} />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-black placeholder-gray-500 text-[17px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 no-scrollbar px-5">
        {sections.map((section, idx) => (
          <div key={section.id} className="mt-8 first:mt-6">
            {section.title && (
              <h2 className="px-1 mb-2 text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1">{section.title}</h2>
            )}

            <motion.div
              className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-black/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
            >
              <div className="flex flex-col">
                {section.items.map((item, i) => (
                  <div key={item.id} className="relative">
                    {item.type === 'profile' ? (
                      <motion.div
                        className="flex items-center gap-4 p-5 active:bg-gray-50 transition-colors cursor-pointer"
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="relative">
                          <img src={item.img} alt="Profile" className="w-[60px] h-[60px] rounded-full object-cover shadow-md border-2 border-white" />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white">
                            <Sparkles size={10} fill="white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-black tracking-tight leading-tight">{item.name}</h2>
                          <p className="text-[13px] text-gray-500 leading-snug">{item.desc}</p>
                        </div>
                        <ChevronRight className="text-gray-300" size={20} />
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex items-center p-4 active:bg-gray-50 transition-colors cursor-pointer"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (item.onClick) item.onClick();
                        }}
                      >
                        <div className={`w-9 h-9 ${item.color} rounded-xl flex items-center justify-center text-white mr-4 shrink-0 shadow-sm`}>
                          {item.icon}
                        </div>
                        <div className={`flex-1 flex justify-between items-center ${i !== section.items.length - 1 ? 'border-b border-gray-50 pb-4 -mb-4' : ''}`}>
                          <span className="text-[17px] text-black font-semibold tracking-tight">{item.label}</span>
                          <div className="flex items-center gap-2">
                            {item.value && <span className="text-gray-400 text-[17px]">{item.value}</span>}
                            {item.type === 'toggle' ? (
                              <div
                                onClick={(e) => { e.stopPropagation(); handleToggle(item.setState, item.state); }}
                                className={`w-[52px] h-[32px] rounded-full relative transition-colors duration-300 shadow-inner ${item.state ? 'bg-green-500' : 'bg-gray-200'}`}
                              >
                                <motion.div
                                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
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
                    {i !== section.items.length - 1 && (
                      <div className="absolute left-16 right-0 bottom-0 h-[1px] bg-gray-50" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ))}

        <div className="mt-12 text-center pb-12">
          <p className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.2em]">Squlizer OS • v26.04</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
