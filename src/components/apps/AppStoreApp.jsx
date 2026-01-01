import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, Download, Star } from 'lucide-react';

const AppStoreApp = ({ onClose }) => {
    const storeApps = [
        {
            id: 'brawlstars',
            name: 'Brawl Stars',
            category: 'Action & Fast-paced',
            rating: 4.8,
            icon: 'https://images.seeklogo.com/logo-png/33/1/brawl-stars-logo-png_seeklogo-336712.png',
            color: 'bg-yellow-500'
        },
        {
            id: 'netflix',
            name: 'Netflix',
            category: 'Entertainment',
            rating: 4.5,
            icon: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png',
            color: 'bg-red-600'
        },
        {
            id: 'messenger',
            name: 'Messenger',
            category: 'Social Networking',
            rating: 4.3,
            icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/2048px-Facebook_Messenger_logo_2020.svg.png',
            color: 'bg-[#00B2FF]'
        }
    ];

    return (
        <div className="w-full h-full bg-white flex flex-col font-sans text-black">
            {/* Header */}
            <div className="pt-14 px-6 pb-4 flex flex-col gap-2 border-b border-gray-100 bg-white/80 backdrop-blur-xl sticky top-0 z-10">
                <div className="flex justify-between items-center w-full">
                    <button onClick={onClose} className="text-blue-500 flex items-center gap-1 font-medium">
                        <ChevronLeft size={24} /> Back
                    </button>
                    <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=100&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Today</h1>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar pb-24">
                {/* Search Bar Placeholder */}
                <div className="w-full h-10 bg-gray-100 rounded-xl mb-8 flex items-center px-3 gap-2 text-gray-400">
                    <Search size={18} />
                    <span className="text-sm">Games, Apps, Stories and More</span>
                </div>

                <h2 className="text-xl font-bold mb-4">Must-Haves</h2>

                <div className="space-y-6">
                    {storeApps.map((app, idx) => (
                        <motion.div
                            key={app.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-4 group"
                        >
                            <div className={`w-16 h-16 ${app.color} rounded-[14px] flex items-center justify-center shadow-lg overflow-hidden border border-gray-100`}>
                                <img src={app.icon} alt={app.name} className="w-12 h-12 object-contain brightness-110" />
                            </div>

                            <div className="flex-1 min-w-0 border-b border-gray-100 pb-4">
                                <h3 className="font-bold text-[17px] truncate">{app.name}</h3>
                                <p className="text-gray-500 text-xs mb-1 truncate">{app.category}</p>
                                <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
                                    <Star size={10} fill="currentColor" /> {app.rating}
                                </div>
                            </div>

                            <button className="bg-gray-100 hover:bg-gray-200 text-blue-500 px-5 py-1.5 rounded-full text-sm font-black transition-colors">
                                GET
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[28px] text-white shadow-xl shadow-blue-500/20">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-70">New Release</span>
                    <h2 className="text-2xl font-bold mt-1 mb-2">Brawl Stars: Season Update</h2>
                    <p className="text-sm text-white/80 mb-4 line-clamp-2">New brawlers, new skins, and the legendary trophy road expansion.</p>
                    <img src="https://images.seeklogo.com/logo-png/33/1/brawl-stars-logo-png_seeklogo-336712.png" alt="BS" className="w-20 h-20 object-contain mx-auto my-4" />
                </div>
            </div>
        </div>
    );
};

export default AppStoreApp;
