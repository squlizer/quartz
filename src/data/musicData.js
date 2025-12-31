// Music data from OriginOS repository
const MUSIC_BASE_URL = 'https://cdn.jsdelivr.net/gh/quandz24-ui/OriginOS_web@main/publicBeta/originos_data/Music';

export const tracks = [
    {
        id: 1,
        title: 'Dark Heart',
        artist: 'Ambient Vibes',
        album: 'Ambient Collection',
        genre: 'Ambient',
        duration: '3:45',
        coverUrl: `${MUSIC_BASE_URL}/dark_heart.png`,
        audioUrl: `${MUSIC_BASE_URL}/ambient/Dark%20Heart%20-%20ambient.mp3`,
    },
    {
        id: 2,
        title: 'HEADPHONK',
        artist: 'Phonk Masters',
        album: 'Pure Phonk',
        genre: 'Phonk',
        duration: '4:02',
        coverUrl: `${MUSIC_BASE_URL}/headphonk.png`,
        audioUrl: `${MUSIC_BASE_URL}/phonk/HEADPHONK%20-%20phonk.mp3`,
    },
    {
        id: 3,
        title: 'Happy',
        artist: 'Feel Good',
        album: 'Pop Hits',
        genre: 'Pop',
        duration: '3:28',
        coverUrl: `${MUSIC_BASE_URL}/happy.png`,
        audioUrl: null, // Placeholder for future
    },
    {
        id: 4,
        title: 'Machine',
        artist: 'Electronic Soul',
        album: 'Electric Dreams',
        genre: 'Electronic',
        duration: '4:15',
        coverUrl: `${MUSIC_BASE_URL}/machine.png`,
        audioUrl: null, // Placeholder for future
    },
];

export default tracks;
