// Custom hook for UI sound effects from OriginOS - Less annoying version
const SOUND_BASE_URL = 'https://cdn.jsdelivr.net/gh/quandz24-ui/OriginOS_web@main/publicBeta/originos_data/ui';

const SOUNDS = {
    appOpen: `${SOUND_BASE_URL}/SuperX_a.ogg`,
    appClose: `${SOUND_BASE_URL}/Twins_merge.ogg`,
    lock: `${SOUND_BASE_URL}/Lock.ogg`,
    unlock: `${SOUND_BASE_URL}/Unlock.ogg`,
    tick: `${SOUND_BASE_URL}/Effect_Tick.ogg`,
    success: `${SOUND_BASE_URL}/success.ogg`,
    scroll: `${SOUND_BASE_URL}/scroll.ogg`,
};

// Audio cache to prevent re-loading
const audioCache = {};

const preloadSounds = () => {
    Object.entries(SOUNDS).forEach(([key, url]) => {
        if (!audioCache[key]) {
            audioCache[key] = new Audio(url);
            audioCache[key].preload = 'auto';
            audioCache[key].volume = 0.3; // Lower volume - less annoying
        }
    });
};

// Preload on module load
preloadSounds();

export const playSound = (soundType) => {
    const url = SOUNDS[soundType];
    if (!url) return;

    try {
        // Use cached audio or create new
        if (audioCache[soundType]) {
            const audio = audioCache[soundType];
            audio.currentTime = 0;
            audio.volume = 0.3; // Keep volume low
            audio.play().catch(() => { });
        } else {
            const audio = new Audio(url);
            audio.volume = 0.3;
            audio.play().catch(() => { });
        }
    } catch (e) {
        console.warn('Sound playback failed:', e);
    }
};

export const useSoundEffects = () => {
    return { playSound };
};

export default useSoundEffects;
