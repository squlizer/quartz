import React from 'react';
import { motion } from 'framer-motion';
import AppIcon from './AppIcon';
import { FaCloudSun } from 'react-icons/fa';
import { Sparkles } from 'lucide-react';

const BASE_URL = 'https://cdn.jsdelivr.net/gh/quandz24-ui/OriginOS_web@main/publicBeta/originos_data/iconPacks/i26Light1';

const apps = [
  { id: 'calendar', name: 'Calendar', iconUrl: `${BASE_URL}/calendar.png` },
  { id: 'photos', name: 'Photos', iconUrl: `${BASE_URL}/gallery.png` },
  { id: 'clock', name: 'Clock', iconUrl: `${BASE_URL}/clock.png` },
  { id: 'notes', name: 'Notes', iconUrl: `${BASE_URL}/files.png` },
  { id: 'settings', name: 'Settings', iconUrl: `${BASE_URL}/settings.png` },
  { id: 'calculator', name: 'Calculator', iconUrl: `${BASE_URL}/calculator.png` },
  { id: 'discord', name: 'Discord', iconUrl: 'https://img.utdstc.com/icon/c13/2b2/c132b2c5490358ecc70986050d521dfbcf13d983fd2b21ca12b77db70c719738:200' },
  { id: 'appstore', name: 'App Store', iconUrl: 'https://images.seeklogo.com/logo-png/40/3/app-store-icon-logo-png_seeklogo-401465.png' },
];

const dockApps = [
  { id: 'phone', name: 'Phone', iconUrl: `${BASE_URL}/phone.png` },
  { id: 'messages', name: 'Messages', iconUrl: `${BASE_URL}/messages.png` },
  { id: 'music', name: 'Music', iconUrl: `${BASE_URL}/music.png` },
];

const HomeScreen = ({ onAppClick, onOpenIntelligence }) => {
  return (
    <motion.div
      className="w-full h-full pt-14 px-6 pb-24 flex flex-col justify-between"
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0, filter: 'blur(20px)', transition: { duration: 0.375 } }}
      transition={{ duration: 0.375 }}
    >
      {/* Grid Area */}
      <div className="grid grid-cols-4 gap-x-2 gap-y-6 justify-items-center">
        {/* Widget */}
        <div className="col-span-4 mb-2 w-full">
          <div className="w-full h-40 bg-white/20 backdrop-blur-md rounded-[22px] p-6 text-white flex flex-col justify-between shadow-lg border border-white/10">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-100 drop-shadow-sm">Cupertino</span>
                <span className="text-5xl font-light drop-shadow-md">21°</span>
              </div>
              <FaCloudSun className="text-4xl text-yellow-300 drop-shadow-md" />
            </div>
            <div className="text-sm font-medium drop-shadow-sm">Mostly Clear</div>
          </div>
        </div>

        {apps.map((app) => (
          <AppIcon
            key={app.id}
            {...app}
            onClick={(iconPos) => onAppClick(app.id, iconPos, app.iconUrl)}
          />
        ))}
      </div>

      {/* AI Button - Floating */}


      {/* Dock */}
      <div className="absolute bottom-6 left-4 right-4 h-[90px] bg-white/30 backdrop-blur-[40px] rounded-[35px] flex items-center justify-evenly mb-2 border border-white/20 shadow-2xl ring-1 ring-white/10">
        {dockApps.map((app) => (
          <AppIcon
            key={app.id}
            {...app}
            showName={false}
            onClick={(iconPos) => onAppClick(app.id, iconPos, app.iconUrl)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HomeScreen;
