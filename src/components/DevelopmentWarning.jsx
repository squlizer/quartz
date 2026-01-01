import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const DevelopmentWarning = () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="w-full max-w-[320px] bg-white/90 backdrop-blur-2xl rounded-[32px] overflow-hidden shadow-2xl p-8 border border-white/20 flex flex-col items-center text-center"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20">
                            <AlertCircle size={32} />
                        </div>

                        <h2 className="text-2xl font-bold text-black mb-3 tracking-tight">Development Note</h2>

                        <p className="text-gray-600 mb-8 leading-relaxed text-[15px]">
                            This project is still in <span className="text-black font-semibold">development</span>. Created for <span className="text-black font-semibold">educational purposes</span> only.
                        </p>

                        <motion.button
                            onClick={() => setIsVisible(false)}
                            className="w-full py-4 bg-black text-white rounded-2xl font-bold active:scale-95 transition-transform"
                            whileTap={{ scale: 0.98 }}
                        >
                            Continue
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DevelopmentWarning;
