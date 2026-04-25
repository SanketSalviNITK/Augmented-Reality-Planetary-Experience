export const quizData = {
    mercury: {
        question: "Which planet is the smallest in our solar system?",
        options: ["Mars", "Mercury", "Venus", "Pluto"],
        answer: "Mercury"
    },
    venus: {
        question: "Which planet is known as the 'Morning Star'?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        answer: "Venus"
    },
    earth: {
        question: "What percentage of Earth's surface is covered by water?",
        options: ["50%", "61%", "71%", "80%"],
        answer: "71%"
    },
    mars: {
        question: "Why is Mars red?",
        options: ["Red vegetation", "Iron oxide (rust)", "High temperature", "Reflection from the Sun"],
        answer: "Iron oxide (rust)"
    },
    jupiter: {
        question: "How many Earths could fit inside Jupiter?",
        options: ["100", "500", "1,300", "5,000"],
        answer: "1,300"
    }
    // ... add more as needed
};

export class AssessmentModule {
    constructor(telemetry) {
        this.telemetry = telemetry;
        this.container = this.createUI();
    }

    createUI() {
        const div = document.createElement('div');
        div.id = 'quiz-overlay';
        div.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(25px);
            border: 1px solid rgba(79, 172, 254, 0.4);
            padding: 40px;
            border-radius: 24px;
            color: white;
            z-index: 2000;
            display: none;
            max-width: 450px;
            width: 90%;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(79, 172, 254, 0.2);
            font-family: 'Outfit', sans-serif;
            text-align: center;
        `;
        document.body.appendChild(div);
        return div;
    }

    showQuiz(planetId) {
        const data = quizData[planetId];
        if (!data) return;

        this.telemetry.logEvent('quiz_started', { planetId });

        this.container.innerHTML = `
            <div style="margin-bottom: 25px;">
                <span style="background: rgba(79, 172, 254, 0.2); color: #4facfe; padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Mission Knowledge Check</span>
            </div>
            <h3 style="color: white; margin: 0 0 15px; font-size: 1.8rem; letter-spacing: -1px;">${planetId.toUpperCase()}</h3>
            <p style="font-size: 1.1rem; line-height: 1.6; opacity: 0.9; margin-bottom: 30px;">${data.question}</p>
            <div id="quiz-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                ${data.options.map(opt => `
                    <button class="quiz-opt" style="
                        padding: 15px;
                        background: rgba(255,255,255,0.03);
                        border: 1px solid rgba(255,255,255,0.1);
                        color: white;
                        border-radius: 12px;
                        cursor: pointer;
                        text-align: center;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        font-family: 'Outfit', sans-serif;
                        font-size: 0.95rem;
                        font-weight: 500;
                    ">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        `;

        this.container.style.display = 'block';

        const buttons = this.container.querySelectorAll('.quiz-opt');
        buttons.forEach(btn => {
            btn.onmouseover = () => {
                btn.style.background = 'rgba(79, 172, 254, 0.1)';
                btn.style.borderColor = '#4facfe';
                btn.style.transform = 'translateY(-2px)';
            };
            btn.onmouseout = () => {
                btn.style.background = 'rgba(255,255,255,0.03)';
                btn.style.borderColor = 'rgba(255,255,255,0.1)';
                btn.style.transform = 'translateY(0)';
            };
            btn.onclick = () => this.handleAnswer(btn, btn.innerText.trim(), data.answer, planetId);
        });
    }

    handleAnswer(btn, selected, correct, planetId) {
        const isCorrect = selected === correct;
        this.telemetry.logEvent('quiz_answered', { 
            planetId, 
            selected, 
            isCorrect 
        });

        // Disable all buttons
        this.container.querySelectorAll('.quiz-opt').forEach(b => b.style.pointerEvents = 'none');

        btn.style.background = isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)';
        btn.style.borderColor = isCorrect ? '#22c55e' : '#ef4444';
        btn.style.boxShadow = isCorrect ? '0 0 20px rgba(34, 197, 94, 0.3)' : '0 0 20px rgba(239, 68, 68, 0.3)';

        if (!isCorrect) {
            // Find correct one
            const correctBtn = Array.from(this.container.querySelectorAll('.quiz-opt')).find(b => b.innerText.trim() === correct);
            correctBtn.style.borderColor = '#22c55e';
            correctBtn.style.color = '#22c55e';
        }

        setTimeout(() => {
            this.container.style.opacity = '0';
            this.container.style.transform = 'translate(-50%, -45%)';
            setTimeout(() => {
                this.container.style.display = 'none';
                this.container.style.opacity = '1';
                this.container.style.transform = 'translate(-50%, -50%)';
            }, 500);
        }, 1800);
    }
}
