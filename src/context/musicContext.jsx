import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { tracks } from '../data/musicData';
import { playSound } from '../hooks/useSoundEffects';

const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
    const audioRef = useRef(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.8);

    const currentTrack = tracks[currentTrackIndex];

    // Handle track switching
    useEffect(() => {
        if (audioRef.current && currentTrack.audioUrl) {
            audioRef.current.src = currentTrack.audioUrl;
            audioRef.current.load();

            if (isPlaying) {
                audioRef.current.play().catch(err => console.log("Init play blocked:", err));
            }
        }
    }, [currentTrackIndex]);

    // Handle play/pause state
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Playback failed:", error);
                    // Don't flip state here, let the user try again
                });
            }
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    // Handle initial user interaction to unlock audio on mobile
    useEffect(() => {
        const unlockAudio = () => {
            if (audioRef.current && isPlaying) {
                audioRef.current.play().catch(() => { });
            }
            window.removeEventListener('touchstart', unlockAudio);
            window.removeEventListener('click', unlockAudio);
        };
        window.addEventListener('touchstart', unlockAudio);
        window.addEventListener('click', unlockAudio);
        return () => {
            window.removeEventListener('touchstart', unlockAudio);
            window.removeEventListener('click', unlockAudio);
        };
    }, [isPlaying]);

    // Handle volume changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

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
        setIsPlaying(true);
    };

    const prevTrack = () => {
        playSound('tick');
        setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
        setProgress(0);
        setIsPlaying(true);
    };

    const setTrack = (index) => {
        playSound('tick');
        setCurrentTrackIndex(index);
        setProgress(0);
        setIsPlaying(true);
    };

    const increaseVolume = () => {
        setVolume((prev) => Math.min(1, prev + 0.1));
    };

    const decreaseVolume = () => {
        setVolume((prev) => Math.max(0, prev - 0.1));
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
            volume,
            increaseVolume,
            decreaseVolume,
            tracks
        }}>
            <audio
                ref={audioRef}
                onEnded={nextTrack}
                onError={(e) => console.error("Audio Error Event:", e)}
            />
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
