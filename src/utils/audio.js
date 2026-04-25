export class AudioManager {
    constructor(url) {
        this.audio = new Audio(url);
        this.audio.loop = true;
        this.audio.volume = 0.4;
        this.isPlaying = false;
        
        // Browser requires user interaction to play audio
        this.hasInteracted = false;
        
        console.log('🎵 Audio Manager Initialized');
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
        return this.isPlaying;
    }

    play() {
        this.audio.play().then(() => {
            this.isPlaying = true;
            console.log('▶️ Playing background music');
        }).catch(err => {
            console.warn('🔇 Audio playback blocked by browser. Awaiting interaction.', err);
        });
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        console.log('⏸️ Paused background music');
    }

    setVolume(val) {
        this.audio.volume = Math.max(0, Math.min(1, val));
    }
}

// Default ambient space track (Voyager 1 Plasma Wave sounds)
export const audioManager = new AudioManager('https://upload.wikimedia.org/wikipedia/commons/4/4c/Nasa_-_Voyager_1_-_Plasma_Wave_System.mp3');
