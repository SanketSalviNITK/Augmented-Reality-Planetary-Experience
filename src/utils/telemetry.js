class TelemetryManager {
    constructor() {
        this.sessionId = 'session_' + Date.now();
        this.logs = JSON.parse(localStorage.getItem('research_logs') || '[]');
        this.currentSession = {
            id: this.sessionId,
            startTime: new Date().toISOString(),
            events: []
        };
        
        console.log('🚀 Telemetry Manager Initialized:', this.sessionId);
        
        // Auto-save on page hide/unload
        window.addEventListener('pagehide', () => this.saveSession());
    }

    logEvent(type, details = {}) {
        const event = {
            timestamp: new Date().toISOString(),
            type,
            ...details
        };
        
        this.currentSession.events.push(event);
        console.log(`[Telemetry] ${type}:`, details);
        
        // Save periodically to prevent data loss
        if (this.currentSession.events.length % 5 === 0) {
            this.saveSession();
        }
    }

    saveSession() {
        const sessionIndex = this.logs.findIndex(s => s.id === this.sessionId);
        if (sessionIndex >= 0) {
            this.logs[sessionIndex] = this.currentSession;
        } else {
            this.logs.push(this.currentSession);
        }
        
        localStorage.setItem('research_logs', JSON.stringify(this.logs));
    }

    getLogs() {
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
        localStorage.removeItem('research_logs');
        console.warn('⚠️ Telemetry logs cleared');
    }

    exportCSV() {
        const flattenedEvents = [];
        this.logs.forEach(session => {
            session.events.forEach(event => {
                flattenedEvents.push({
                    sessionId: session.id,
                    sessionStart: session.startTime,
                    ...event
                });
            });
        });

        if (flattenedEvents.length === 0) return null;

        const headers = Object.keys(flattenedEvents[0]);
        const csvContent = [
            headers.join(','),
            ...flattenedEvents.map(row => 
                headers.map(header => JSON.stringify(row[header] || '')).join(',')
            )
        ].join('\n');

        return csvContent;
    }
}

export const telemetry = new TelemetryManager();
