export class AudioManager {
    constructor(url) {
        this.audio = new Audio(url);
        this.audio.loop = true;
        this.audio.volume = 0.4;
        this.isPlaying = false;
        
        // Browser requires user interaction to play audio
        this.hasInteracted = false;
        
        // Speech Synthesis for Voiceover
        this.synth = window.speechSynthesis;
        this.voice = null;
        
        // Initialize voices
        const setVoice = () => {
            const voices = this.synth.getVoices();
            // Try to find a high-quality female English voice
            this.voice = voices.find(v => v.name.includes('Female') || v.name.includes('Google UK English Female') || v.name.includes('Samantha')) || voices[0];
        };
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = setVoice;
        }
        setVoice();

        console.log('🎵 Audio Manager Initialized with Voice Support');
    }

    speak(text) {
        // Stop any current speech
        this.synth.cancel();

        if (!text) return;

        const utterance = new SpeechSynthesisUtterance(text);
        if (this.voice) utterance.voice = this.voice;
        utterance.pitch = 1.1; // Slightly higher for a friendly "Teacher" tone
        utterance.rate = 0.9;  // Slightly slower for children to follow
        
        this.synth.speak(utterance);
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
            console.warn('🔇 Audio playback blocked by browser.', err);
        });
    }

    pause() {
        this.audio.pause();
        this.synth.cancel();
        this.isPlaying = false;
        console.log('⏸️ Paused all audio');
    }

    setVolume(val) {
        this.audio.volume = Math.max(0, Math.min(1, val));
    }
}

// Default ambient space track (Voyager 1 Plasma Wave sounds)
export const audioManager = new AudioManager('https://upload.wikimedia.org/wikipedia/commons/4/4c/Nasa_-_Voyager_1_-_Plasma_Wave_System.mp3');
