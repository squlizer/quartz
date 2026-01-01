import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, MessageSquare, Users, ExternalLink } from 'lucide-react';

const DiscordApp = ({ onClose }) => {
    return (
        <div className="w-full h-full bg-[#313338] flex flex-col text-white font-sans">
            {/* Header */}
            <div className="pt-14 px-4 pb-4 flex items-center justify-between bg-[#1e1f22]">
                <button onClick={onClose} className="text-[#b5bac1] hover:text-white flex items-center gap-1 font-medium transition-colors">
                    <ChevronLeft size={24} /> Back
                </button>
                <span className="font-bold text-lg">Discord</span>
                <div className="w-10"></div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center text-center">
                {/* Animated Icon */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="w-24 h-24 bg-[#5865F2] rounded-[32px] flex items-center justify-center shadow-2xl mb-6 ring-4 ring-white/10"
                >
                    <img
                        src="https://img.utdstc.com/icon/c13/2b2/c132b2c5490358ecc70986050d521dfbcf13d983fd2b21ca12b77db70c719738:200"
                        alt="Discord"
                        className="w-16 h-16 object-contain brightness-110"
                    />
                </motion.div>

                <h2 className="text-3xl font-black tracking-tight mb-2 uppercase">Official Server</h2>
                <p className="text-[#b5bac1] text-lg mb-8 max-w-xs">Join our official community and hang out with others!</p>

                {/* Info Cards */}
                <div className="w-full space-y-3 mb-10">
                    <div className="bg-[#2b2d31] p-4 rounded-2xl flex items-center gap-4 border border-white/5 shadow-sm">
                        <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400">
                            <Users size={20} />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-sm">Active Members</div>
                            <div className="text-xs text-[#b5bac1]">67M Online</div>
                        </div>
                    </div>
                    <div className="bg-[#2b2d31] p-4 rounded-2xl flex items-center gap-4 border border-white/5 shadow-sm">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                            <MessageSquare size={20} />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-sm">Community Chat</div>
                            <div className="text-xs text-[#b5bac1]">Always active</div>
                        </div>
                    </div>
                </div>

                {/* Join Button */}
                <motion.a
                    href="https://discord.gg/Rj9t8JYf72"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white py-4 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-xl transition-colors ring-2 ring-white/10"
                >
                    Join Server <ExternalLink size={20} />
                </motion.a>

                <p className="mt-8 text-xs text-[#72767d] uppercase tracking-widest font-bold">discord.gg/Rj9t8JYf72</p>
            </div>
        </div>
    );
};

export default DiscordApp;
