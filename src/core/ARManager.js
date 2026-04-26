import { audioManager } from '../utils/audio.js';
import { scoreManager } from '../utils/ScoreManager.js';

export class ARManager {
    constructor(assessment, telemetry, voiceSummaries) {
        this.assessment = assessment;
        this.telemetry = telemetry;
        this.voiceSummaries = voiceSummaries;
        this.lockedTargets = new Set();
        this.lockTimers = {};
        this.status = document.getElementById('status-indicator');
        
        this.init();
    }

    init() {
        const targets = document.querySelectorAll('[mindar-image-target]');
        targets.forEach(target => {
            target.addEventListener("targetFound", e => this.handleFound(target));
            target.addEventListener("targetLost", e => this.handleLost(target));
        });

        const resetBtn = document.getElementById('reset-ar');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.reset());
        }

        console.log('🛰️ AR Manager Initialized');
    }

    handleFound(target) {
        const id = target.id;
        const idx = target.getAttribute('mindar-image-target').split(':')[1].trim();
        const map = { "6": "sun", "3": "mercury", "8": "venus", "0": "earth", "2": "mars", "1": "jupiter", "5": "saturn", "7": "uranus", "4": "neptune" };
        const planetKey = map[idx];

        this.updateStatus('Locking Planet...', 'rgba(255, 165, 0, 0.3)', '#ffa500');

        if (this.lockTimers[id]) clearTimeout(this.lockTimers[id]);

        this.lockTimers[id] = setTimeout(() => {
            this.lockedTargets.add(id);
            this.updateStatus('Planet Locked!', 'rgba(79, 172, 254, 0.3)', '#4facfe');
            
            this.telemetry.logEvent('spatial_lock', { planetId: id, dwellTime: 2000 });
            scoreManager.addPoints(50); 

            if (planetKey) {
                const speechId = Date.now();
                target._activeSpeechId = speechId;

                audioManager.speak(this.voiceSummaries[planetKey], () => {
                    if (this.lockedTargets.has(id) && target._activeSpeechId === speechId) {
                        this.assessment.showQuiz(planetKey);
                    }
                });
            }
        }, 2000);
        
        this.telemetry.logEvent('target_found', { planetId: id });
        scoreManager.addPoints(10); 
    }

    handleLost(target) {
        const id = target.id;
        if (this.lockTimers[id]) clearTimeout(this.lockTimers[id]);

        if (this.lockedTargets.has(id)) {
            this.updateStatus('Spatial Lock Active', 'rgba(79, 172, 254, 0.2)', '#4facfe');
        } else {
            target.setAttribute('visible', false);
            this.updateStatus('Scanning...', 'rgba(0, 255, 0, 0.1)', '#00ff00');
        }
        
        this.telemetry.logEvent('target_lost', { planetId: id, wasLocked: this.lockedTargets.has(id) });
    }

    updateStatus(text, bg, color) {
        if (!this.status) return;
        this.status.innerText = text;
        this.status.style.background = bg;
        this.status.style.color = color;
    }

    reset() {
        this.lockedTargets.clear();
        const targets = document.querySelectorAll('[mindar-image-target]');
        targets.forEach(t => {
            t.setAttribute('visible', false);
            if (this.lockTimers[t.id]) clearTimeout(this.lockTimers[t.id]);
        });
        window.speechSynthesis.cancel();
        this.updateStatus('Tracker Reset', 'rgba(239, 68, 68, 0.2)', '#ef4444');
        setTimeout(() => this.updateStatus('Scanning...', 'rgba(0, 255, 0, 0.1)', '#00ff00'), 1000);
        this.telemetry.logEvent('tracker_reset');
    }
}
