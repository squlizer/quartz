import React, { useState, useRef } from 'react';
import { AnimatePresence, motion, useMotionValue, animate } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, ChevronLeft } from 'lucide-react';
import StatusBar from './components/StatusBar';
import LockScreen from './components/LockScreen';
import HomeScreen from './components/HomeScreen';
import PhoneFrame from './components/PhoneFrame';
import SettingsApp from './components/SettingsApp';
import ControlCenter from './components/ControlCenter';
import NotificationCenter from './components/NotificationCenter';
import CalculatorApp from './components/apps/CalculatorApp';
import ClockApp from './components/apps/ClockApp';
import CalendarApp from './components/apps/CalendarApp';
import PhotosApp from './components/apps/PhotosApp';
import NotesApp from './components/apps/NotesApp';
import PhoneApp from './components/apps/PhoneApp';
import MessagesApp from './components/apps/MessagesApp';
import DevelopmentWarning from './components/DevelopmentWarning';
import VolumeHUD from './components/VolumeHUD';
import DiscordApp from './components/apps/DiscordApp';
import AppStoreApp from './components/apps/AppStoreApp';

import { playSound } from './hooks/useSoundEffects';
import { MusicProvider, useMusic } from './context/musicContext.jsx';

// Music App Component using shared context
const MusicApp = ({ onClose }) => {
  const { currentTrack, currentTrackIndex, isPlaying, progress, togglePlay, nextTrack, prevTrack, setTrack, tracks } = useMusic();

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black flex flex-col">
      <div className="pt-14 p-4">
        <button onClick={onClose} className="text-white/60 hover:text-white flex items-center gap-1 font-medium">
          <ChevronLeft size={24} /> Back
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start gap-4 p-6 pt-2">
        <motion.div
          className="w-56 h-56 rounded-3xl overflow-hidden shadow-2xl mt-4"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
        >
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentNode.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }}
          />
        </motion.div>
        <div className="text-center mt-2">
          <h1 className="text-2xl font-bold text-white">{currentTrack.title}</h1>
          <p className="text-gray-400 text-lg">{currentTrack.artist}</p>
        </div>

        <div className="w-full max-w-xs h-1 bg-white/20 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-white/80 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex gap-10 mt-6 items-center">
          <button
            onClick={prevTrack}
            className="text-white/40 hover:text-white transition active:scale-90"
          >
            <SkipBack fill="currentColor" size={32} />
          </button>
          <button
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:scale-95 transition"
          >
            {isPlaying ? (
              <Pause fill="black" size={36} />
            ) : (
              <Play fill="black" size={36} className="ml-1" />
            )}
          </button>
          <button
            onClick={nextTrack}
            className="text-white/40 hover:text-white transition active:scale-90"
          >
            <SkipForward fill="currentColor" size={32} />
          </button>
        </div>

        {/* Track list */}
        <div className="w-full mt-auto space-y-2 h-40 overflow-y-auto pr-1">
          {tracks.map((track, index) => (
            <button
              key={track.id}
              onClick={() => setTrack(index)}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition ${index === currentTrackIndex ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
                }`}
            >
              <img src={track.coverUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
              <div className="text-left flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{track.title}</p>
                <p className="text-gray-500 text-xs truncate">{track.artist}</p>
              </div>
              {index === currentTrackIndex && isPlaying && (
                <div className="flex gap-0.5">
                  <motion.div className="w-1 h-4 bg-green-500 rounded" animate={{ scaleY: [0.3, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.5 }} />
                  <motion.div className="w-1 h-4 bg-green-500 rounded" animate={{ scaleY: [1, 0.3, 0.8] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} />
                  <motion.div className="w-1 h-4 bg-green-500 rounded" animate={{ scaleY: [0.5, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

function AppContent() {
  const { increaseVolume, decreaseVolume, volume } = useMusic();
  const phoneScreenRef = useRef(null);
  const [isLocked, setIsLocked] = useState(true);
  const [openedApp, setOpenedApp] = useState(null);
  const [isIslandExpanded, setIsIslandExpanded] = useState(false);
  const [overlay, setOverlay] = useState(null);
  const [appIconPosition, setAppIconPosition] = useState({ x: 0, y: 0, width: 60, height: 60 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState('https://thinkapple.pl/wp-content/uploads/2025/06/iOS_26_tapeta-iphone-wallpaper-light-full-768x1665.jpg');

  const dragY = useMotionValue(0);

  const handleAppClick = (appId, iconPos) => {
    if (openedApp === appId) return;
    // NO sound on app open - removed per user request

    if (iconPos && phoneScreenRef.current) {
      const screenRect = phoneScreenRef.current.getBoundingClientRect();
      const relativeX = iconPos.x - screenRect.left;
      const relativeY = iconPos.y - screenRect.top;

      setAppIconPosition({
        x: relativeX,
        y: relativeY,
        width: iconPos.width,
        height: iconPos.height
      });
    }
    setIsAnimating(true);
    setOpenedApp(appId);
  };

  const closeApp = () => {
    if (!openedApp) return;
    // NO sound on app close - removed per user request
    setOpenedApp(null);
    setIsAnimating(false);
  };

  const renderAppContent = (appId) => {
    switch (appId) {
      case 'settings': return <SettingsApp
        onClose={closeApp}
        currentWallpaper={currentWallpaper}
        onWallpaperChange={setCurrentWallpaper}
      />;
      case 'calculator': return <CalculatorApp onClose={closeApp} />;
      case 'clock': return <ClockApp onClose={closeApp} />;
      case 'calendar': return <CalendarApp onClose={closeApp} />;
      case 'photos': return <PhotosApp onClose={closeApp} />;
      case 'notes': return <NotesApp onClose={closeApp} />;
      case 'phone': return <PhoneApp onClose={closeApp} />;
      case 'messages': return <MessagesApp onClose={closeApp} />;
      case 'music': return <MusicApp onClose={closeApp} />;
      case 'discord': return <DiscordApp onClose={closeApp} />;
      case 'appstore': return <AppStoreApp onClose={closeApp} />;
      default: return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white">
          <h1 className="text-2xl font-bold text-black mb-4 capitalize">{appId}</h1>
          <p className="text-gray-500 mb-8">This app is not implemented yet.</p>
          <button
            onClick={closeApp}
            className="px-6 py-2 bg-blue-500 text-white rounded-full"
          >
            Close App
          </button>
        </div>
      );
    }
  };

  const handleLock = () => {
    playSound('lock');
    setOpenedApp(null);
    setOverlay(null);
    setIsLocked(true);
  };

  const handleUnlock = () => {
    playSound('unlock');
    setIsLocked(false);
  };

  const toggleControlCenter = () => {
    setOverlay(prev => prev === 'control-center' ? null : 'control-center');
  };

  const toggleNotificationCenter = () => {
    setOverlay(prev => prev === 'notification-center' ? null : 'notification-center');
  };

  const handleActionButton = (action) => {
    playSound('tick');
    // AI action removed
  };

  const handleHomeClick = () => {
    if (openedApp) closeApp();
    else if (overlay) setOverlay(null);
  };

  return (
    <PhoneFrame
      onLock={handleLock}
      onActionButton={handleActionButton}
      onVolumeUp={increaseVolume}
      onVolumeDown={decreaseVolume}
    >
      <div
        ref={phoneScreenRef}
        id="phone-screen"
        className="w-full h-full relative font-sans select-none overflow-hidden rounded-[48px] bg-black"
      >
        {/* Wallpaper Layer - Simplified animation */}
        <VolumeHUD volume={volume} />
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${currentWallpaper}')`,
          }}
          animate={{
            scale: isLocked ? 1.15 : (openedApp ? 1.02 : 1.08),
            filter: openedApp ? 'blur(12px) brightness(0.5)' : 'blur(0px) brightness(1)',
          }}
          transition={{
            scale: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
            filter: { duration: 0.3 },
          }}
        />

        {/* Dynamic Island Depth Overlay */}
        <motion.div
          className="absolute inset-0 z-[350] bg-black/40 pointer-events-none backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isIslandExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Trigger Zones for Swipe Down */}
        {!isLocked && !overlay && !openedApp && (
          <>
            <div className="absolute top-0 left-0 w-1/2 h-8 z-[60] cursor-pointer" onClick={toggleNotificationCenter} />
            <div className="absolute top-0 right-0 w-1/2 h-8 z-[60] cursor-pointer" onClick={toggleControlCenter} />
          </>
        )}

        {/* Status Bar */}
        <StatusBar
          isDark={!!openedApp && !overlay && ['calculator', 'clock'].indexOf(openedApp) === -1}
          isIslandExpanded={isIslandExpanded}
          onIslandChange={setIsIslandExpanded}
          onNotificationTap={() => setOverlay('notifications')}
          onControlCenterTap={() => setOverlay('control-center')}
        />

        {/* Main Content Area */}
        <div className="w-full h-full relative z-10 pt-14 overflow-hidden">
          <AnimatePresence mode="wait">
            {isLocked && <LockScreen key="lock-screen" onUnlock={handleUnlock} />}
          </AnimatePresence>

          {/* HomeScreen - Always visible but blurred when app open */}
          {!isLocked && (
            <motion.div
              className="absolute inset-0 pt-14 z-20"
              animate={{
                scale: openedApp ? 0.9 : 1,
                filter: openedApp ? 'blur(10px)' : 'blur(0px)',
                opacity: openedApp ? 0.3 : 1
              }}
              transition={{ duration: 0.4 }}
              style={{ pointerEvents: openedApp ? 'none' : 'auto' }}
            >
              <HomeScreen key="home-screen" onAppClick={handleAppClick} />
            </motion.div>
          )}

          {/* Opened App Layer - Standard iOS Zoom Animation */}
          <AnimatePresence
            onExitComplete={() => setIsAnimating(false)}
          >
            {openedApp && phoneScreenRef.current && (
              <motion.div
                key={`app-${openedApp}`}
                className="absolute z-[300] overflow-hidden"
                style={{
                  left: 0,
                  top: 0,
                  backgroundColor: ['calculator', 'clock'].includes(openedApp) ? '#000' : '#fff',
                }}
                initial={{
                  borderRadius: 24,
                  width: appIconPosition.width,
                  height: appIconPosition.height,
                  x: appIconPosition.x,
                  y: appIconPosition.y,
                  opacity: 0,
                  scale: 0.3,
                }}
                animate={{
                  borderRadius: 48,
                  width: phoneScreenRef.current.offsetWidth,
                  height: phoneScreenRef.current.offsetHeight,
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  borderRadius: 24,
                  width: appIconPosition.width,
                  height: appIconPosition.height,
                  x: appIconPosition.x,
                  y: appIconPosition.y,
                  opacity: 0,
                  scale: 0.3,
                  transition: { duration: 0.3 }
                }}
                transition={{
                  type: 'spring',
                  damping: 30,
                  stiffness: 400,
                  mass: 0.8,
                  opacity: { duration: 0.2 }
                }}
                onAnimationComplete={() => setIsAnimating(false)}
              >
                <div className="w-full h-full overflow-hidden" style={{ borderRadius: 'inherit' }}>
                  {renderAppContent(openedApp)}
                </div>

                {/* Grabber for closing */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/20 rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home Indicator - Clean Standard Bar */}
        {!isLocked && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-14 z-[400] flex items-end justify-center pb-4 cursor-pointer"
            onClick={handleHomeClick}
            onPanEnd={(e, info) => {
              if (info.offset.y < -30) {
                handleHomeClick();
              }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-32 h-1.5 bg-white/50 backdrop-blur-md rounded-full shadow-lg" />
          </motion.div>
        )}
      </div>
    </PhoneFrame>
  );
}

function App() {
  return (
    <MusicProvider>
      <DevelopmentWarning />
      <AppContent />
    </MusicProvider>
  );
}

export default App;