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

    saveToLeaderboard(playerName = this.playerName) {
        const board = JSON.parse(localStorage.getItem('cosmic_leaderboard') || '[]');
        const existing = board.find(p => p.name === playerName);
        
        if (existing) {
            existing.score = Math.max(existing.score, this.score);
            existing.lastUpdated = new Date().toISOString();
        } else {
            board.push({
                name: playerName,
                score: this.score,
                date: new Date().toLocaleDateString(),
                lastUpdated: new Date().toISOString()
            });
        }
        
        // Sort by score
        board.sort((a, b) => b.score - a.score);
        localStorage.setItem('cosmic_leaderboard', JSON.stringify(board.slice(0, 50)));
        this.leaderboard = board;
        console.log('🏆 Leaderboard Updated & Persisted');
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
