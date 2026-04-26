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
        
        // Fallback: If voices still empty (common in Chrome), retry in 500ms
        setTimeout(() => { if(!this.voice) setVoice(); }, 500);

        console.log('🎵 Audio Manager Initialized with Voice Support');
    }

    speak(text, onEnd = null) {
        // Stop any current speech
        this.synth.cancel();

        if (!text) return;

        const utterance = new SpeechSynthesisUtterance(text);
        if (this.voice) utterance.voice = this.voice;
        utterance.pitch = 1.1; 
        utterance.rate = 0.9;  
        
        if (onEnd) {
            utterance.onend = onEnd;
        }
        
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

    stopAll() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.synth.cancel();
        this.isPlaying = false;
        console.log('🛑 All audio and speech halted');
    }
}

// Default ambient space track (The Mountain Space)
export const audioManager = new AudioManager('./assets/the_mountain-space-153639.mp3');

// Auto-start logic: Browsers block autoplay, so we wait for first interaction
const startAudioOnInteraction = () => {
    audioManager.setVolume(0.2); // Set low volume as requested
    audioManager.play();
    document.removeEventListener('click', startAudioOnInteraction);
    document.removeEventListener('keydown', startAudioOnInteraction);
};

document.addEventListener('click', startAudioOnInteraction);
document.addEventListener('keydown', startAudioOnInteraction);
