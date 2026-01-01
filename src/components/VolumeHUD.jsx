import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Volume } from 'lucide-react';

const VolumeHUD = ({ volume }) => {
    const [isVisible, setIsVisible] = useState(false);
    const prevVolumeRef = useRef(volume);
    const timerRef = useRef(null);

    useEffect(() => {
        // Only show if volume has actually changed and it's not the initial change from undefined/null to default
        if (prevVolumeRef.current !== volume) {
            setIsVisible(true);

            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 1200);
        }

        prevVolumeRef.current = volume;

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [volume]);

    const getIcon = () => {
        if (volume === 0) return <VolumeX size={18} fill="white" />;
        if (volume < 0.5) return <Volume size={18} fill="white" />;
        return <Volume2 size={18} fill="white" />;
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -40, scaleX: 0.5 }}
                    animate={{ opacity: 1, x: 0, scaleX: 1 }}
                    exit={{ opacity: 0, x: -40, scaleX: 0.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute left-0 top-[200px] z-[2000] flex items-center gap-4 bg-black/40 backdrop-blur-3xl p-3 rounded-r-[32px] shadow-[0_0_40px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)] h-56 w-14 flex-col py-6"
                >
                    <div className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] mb-2">
                        {getIcon()}
                    </div>
                    <div className="flex-1 w-2.5 bg-white/10 rounded-full overflow-hidden relative shadow-inner">
                        <motion.div
                            className="absolute bottom-0 w-full bg-white rounded-full"
                            style={{
                                boxShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.4)'
                            }}
                            initial={{ height: 0 }}
                            animate={{ height: `${volume * 100}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 35 }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VolumeHUD;
