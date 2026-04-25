export class ScoreManager {
    constructor() {
        this.score = 0;
        this.playerName = localStorage.getItem('explorer_name') || 'Explorer';
        this.leaderboard = JSON.parse(localStorage.getItem('cosmic_leaderboard') || '[]');
        
        // Listeners for score updates
        this.listeners = [];
    }

    addPoints(points) {
        this.score += points;
        this.notifyListeners();
    }

    getScore() {
        return this.score;
    }

    saveToLeaderboard() {
        const entry = {
            name: this.playerName,
            score: this.score,
            date: new Date().toISOString()
        };
        
        this.leaderboard.push(entry);
        // Sort descending and keep top 10
        this.leaderboard.sort((a, b) => b.score - a.score);
        this.leaderboard = this.leaderboard.slice(0, 10);
        
        localStorage.setItem('cosmic_leaderboard', JSON.stringify(this.leaderboard));
    }

    getLeaderboard() {
        return this.leaderboard;
    }

    reset() {
        this.score = 0;
        this.notifyListeners();
    }

    onUpdate(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb(this.score));
    }
}

export const scoreManager = new ScoreManager();
