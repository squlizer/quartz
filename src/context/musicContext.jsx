import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { tracks } from '../data/musicData';
import { playSound } from '../hooks/useSoundEffects';

const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
    const audioRef = useRef(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const currentTrack = tracks[currentTrackIndex];

    // Handle audio playback
    useEffect(() => {
        if (audioRef.current && currentTrack.audioUrl) {
            audioRef.current.src = currentTrack.audioUrl;
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch(() => { });
            }
        }
    }, [currentTrackIndex]);

    // Update progress
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };

        audio.addEventListener('timeupdate', updateProgress);
        return () => audio.removeEventListener('timeupdate', updateProgress);
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(() => { });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const nextTrack = () => {
        playSound('tick');
        setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
        setProgress(0);
    };

    const prevTrack = () => {
        playSound('tick');
        setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
        setProgress(0);
    };

    const setTrack = (index) => {
        playSound('tick');
        setCurrentTrackIndex(index);
        setProgress(0);
        setIsPlaying(false);
    };

    return (
        <MusicContext.Provider value={{
            currentTrack,
            currentTrackIndex,
            isPlaying,
            progress,
            togglePlay,
            nextTrack,
            prevTrack,
            setTrack,
            tracks
        }}>
            <audio ref={audioRef} />
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error('useMusic must be used within MusicProvider');
    }
    return context;
};

export default MusicContext;
