import React from 'react';
import { motion } from 'framer-motion';

const NotificationCenter = ({ onClose }) => {
  const notifications = [
    { id: 1, app: 'Messages', title: 'Mom', message: 'Can you call me?', time: '2m ago' },
    { id: 2, app: 'Calendar', title: 'Meeting', message: 'Team sync in 15 mins', time: '15m ago' },
    { id: 3, app: 'News', title: 'Breaking', message: 'New iOS 26 features revealed', time: '1h ago' },
  ];

  return (
    <motion.div 
      className="fixed inset-0 z-40"
      initial="closed"
      animate="open"
      exit="closed"
    >
       {/* Background Overlay to close - Fade only */}
      <motion.div 
        className="fixed inset-0 bg-black/40 backdrop-blur-md z-30" 
        variants={{
          closed: { opacity: 0 },
          open: { opacity: 1 }
        }}
        transition={{ duration: 0.3 }}
        onClick={onClose} 
      />

      {/* Content - Slide only */}
      <motion.div
        className="w-full h-full pt-14 px-4 flex flex-col"
        variants={{
          closed: { y: '-100%' },
          open: { y: 0 }
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        <h1 className="text-4xl text-white font-thin mb-8 mt-4 ml-4">Notification Center</h1>

        <div className="space-y-2">
        {notifications.map(n => (
          <div key={n.id} className="w-full min-h-[70px] liquid-glass rounded-[20px] p-3 flex flex-col justify-center">
             <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-500 rounded-md" />
                    <span className="text-white text-xs font-semibold uppercase">{n.app}</span>
                </div>
                <span className="text-gray-300 text-xs">{n.time}</span>
             </div>
             <div className="text-white font-semibold text-sm">{n.title}</div>
             <div className="text-white text-sm opacity-90">{n.message}</div>
          </div>
        ))}
      </div>
      </motion.div>
    </motion.div>
  );
};

export default NotificationCenter;
