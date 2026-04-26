import { scoreManager } from './ScoreManager.js';

export const quizData = {
    sun: [
        { q: "How much of the solar system's mass is in the Sun?", a: "99.8%", o: ["50%", "75%", "99.8%", "100%"] },
        { q: "What is the Sun primarily made of?", a: "Hydrogen & Helium", o: ["Rock", "Hydrogen & Helium", "Iron", "Oxygen"] },
        { q: "What type of star is the Sun?", a: "G-type main-sequence", o: ["Red Giant", "White Dwarf", "G-type main-sequence", "Blue Supergiant"] },
        { q: "How old is the Sun?", a: "4.6 billion years", o: ["1 million years", "1 billion years", "4.6 billion years", "10 billion years"] },
        { q: "What is the surface temperature of the Sun?", a: "5,500°C", o: ["1,000°C", "5,500°C", "15,000°C", "1 million °C"] },
        { q: "How long does it take for light to reach Earth?", a: "8 minutes", o: ["1 second", "8 minutes", "1 hour", "1 day"] },
        { q: "What is the outermost layer of the Sun called?", a: "Corona", o: ["Core", "Photosphere", "Corona", "Crust"] },
        { q: "What process powers the Sun?", a: "Nuclear Fusion", o: ["Burning Coal", "Nuclear Fission", "Nuclear Fusion", "Gravity"] },
        { q: "How far is the Sun from Earth?", a: "150 million km", o: ["1 million km", "50 million km", "150 million km", "1 billion km"] },
        { q: "What will the Sun become at the end of its life?", a: "White Dwarf", o: ["Black Hole", "Supernova", "White Dwarf", "New Star"] }
    ],
    mercury: [
        { q: "Which planet is the smallest in our solar system?", a: "Mercury", o: ["Mars", "Mercury", "Venus", "Pluto"] },
        { q: "How long is a day on Mercury?", a: "59 Earth days", o: ["24 hours", "59 Earth days", "1 year", "10 hours"] },
        { q: "How many moons does Mercury have?", a: "0", o: ["0", "1", "2", "50"] },
        { q: "Which planet is closest to the Sun?", a: "Mercury", o: ["Venus", "Mercury", "Earth", "Mars"] },
        { q: "What is Mercury's core primarily made of?", a: "Iron", o: ["Rock", "Ice", "Iron", "Gas"] },
        { q: "What does Mercury's surface look like?", a: "The Moon", o: ["Earth", "The Moon", "Jupiter", "Sun"] },
        { q: "How long is a year on Mercury?", a: "88 Earth days", o: ["88 Earth days", "365 days", "10 days", "2 years"] },
        { q: "Does Mercury have an atmosphere?", a: "No (Very thin)", o: ["Yes, thick", "No (Very thin)", "Only oxygen", "Made of clouds"] },
        { q: "What is the temperature range on Mercury?", a: "-180°C to 430°C", o: ["Constant 20°C", "-180°C to 430°C", "0°C to 100°C", "Always freezing"] },
        { q: "Which NASA mission mapped Mercury?", a: "MESSENGER", o: ["Apollo", "Voyager", "MESSENGER", "Curiosity"] }
    ],
    venus: [
        { q: "Which planet is the hottest in our solar system?", a: "Venus", o: ["Mercury", "Venus", "Mars", "Sun"] },
        { q: "What are the clouds on Venus made of?", a: "Sulfuric acid", o: ["Water", "Methane", "Sulfuric acid", "Cotton candy"] },
        { q: "Venus is often called Earth's...?", a: "Twin", o: ["Brother", "Twin", "Moon", "Enemy"] },
        { q: "In which direction does Venus rotate?", a: "Backwards (Retrograde)", o: ["Forward", "Backwards (Retrograde)", "Sideways", "None"] },
        { q: "How long is a day on Venus compared to its year?", a: "Day is longer", o: ["Day is shorter", "Day is longer", "They are same", "Venus has no days"] },
        { q: "What is the pressure on Venus's surface?", a: "92 times Earth", o: ["Same as Earth", "10 times Earth", "92 times Earth", "1,000 times Earth"] },
        { q: "Which gas causes the Greenhouse Effect on Venus?", a: "Carbon Dioxide", o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"] },
        { q: "What is Venus known as in the sky?", a: "Morning Star", o: ["Red Star", "Morning Star", "North Star", "Blue Planet"] },
        { q: "Does Venus have any moons?", a: "0", o: ["0", "1", "2", "10"] },
        { q: "What is the name of the highest mountain on Venus?", a: "Maxwell Montes", o: ["Everest", "Olympus Mons", "Maxwell Montes", "Mauna Kea"] }
    ],
    earth: [
        { q: "What percentage of Earth's surface is water?", a: "71%", o: ["50%", "71%", "90%", "25%"] },
        { q: "Which gas is most abundant in Earth's atmosphere?", a: "Nitrogen", o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"] },
        { q: "What is the only planet known to harbor life?", a: "Earth", o: ["Mars", "Venus", "Earth", "Europa"] },
        { q: "How many moons does Earth have?", a: "1", o: ["0", "1", "2", "4"] },
        { q: "What layer protects us from UV radiation?", a: "Ozone Layer", o: ["Crust", "Ozone Layer", "Ocean", "Clouds"] },
        { q: "What causes Earth's magnetic field?", a: "Liquid Iron Core", o: ["Gravity", "Liquid Iron Core", "The Moon", "Trees"] },
        { q: "What is the distance from the Sun to Earth?", a: "1 AU", o: ["1 AU", "10 AU", "100 AU", "0.5 AU"] },
        { q: "What causes the seasons on Earth?", a: "Axial Tilt", o: ["Distance from Sun", "Axial Tilt", "Ocean currents", "Moon phases"] },
        { q: "What is the highest point on Earth?", a: "Mount Everest", o: ["K2", "Mount Everest", "Olympus Mons", "Fuji"] },
        { q: "How old is the Earth?", a: "4.5 billion years", o: ["1 million years", "2024 years", "4.5 billion years", "10 billion years"] }
    ],
    mars: [
        { q: "Why is Mars red?", a: "Iron oxide (rust)", o: ["Red sand", "Iron oxide (rust)", "Hot lava", "Red plants"] },
        { q: "What is the tallest volcano in the solar system?", a: "Olympus Mons", o: ["Everest", "Olympus Mons", "Vesuvius", "Mauna Loa"] },
        { q: "How many moons does Mars have?", a: "2", o: ["0", "1", "2", "79"] },
        { q: "What are the names of Mars' moons?", a: "Phobos & Deimos", o: ["Io & Europa", "Phobos & Deimos", "Titan & Rhea", "Luna & Sol"] },
        { q: "What is the giant canyon on Mars called?", a: "Valles Marineris", o: ["Grand Canyon", "Valles Marineris", "Rift Valley", "Deep Trench"] },
        { q: "What is the main gas in the Martian atmosphere?", a: "Carbon Dioxide", o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Methane"] },
        { q: "What did NASA rovers find evidence of on Mars?", a: "Ancient water", o: ["Aliens", "Ancient water", "Gold mines", "Forests"] },
        { q: "How long is a day on Mars (a Sol)?", a: "24.6 hours", o: ["10 hours", "24 hours", "24.6 hours", "50 hours"] },
        { q: "What are Mars' polar caps made of?", a: "Water & Dry ice", o: ["Just rock", "Water & Dry ice", "Red sand", "Liquid methane"] },
        { q: "How much gravity does Mars have compared to Earth?", a: "38%", o: ["10%", "38%", "50%", "100%"] }
    ],
    jupiter: [
        { q: "Which planet is the largest?", a: "Jupiter", o: ["Saturn", "Jupiter", "Sun", "Neptune"] },
        { q: "What is the Great Red Spot?", a: "A giant storm", o: ["A desert", "A volcano", "A giant storm", "An island"] },
        { q: "What are the four largest moons of Jupiter called?", a: "Galilean moons", o: ["Space moons", "Galilean moons", "Titan moons", "Inner moons"] },
        { q: "Which moon is the largest in the solar system?", a: "Ganymede", o: ["Titan", "Ganymede", "The Moon", "Callisto"] },
        { q: "How many Earths could fit inside Jupiter?", a: "1,300", o: ["10", "100", "1,300", "5,000"] },
        { q: "How long is a day on Jupiter?", a: "10 hours", o: ["10 hours", "24 hours", "5 hours", "1 year"] },
        { q: "What type of planet is Jupiter?", a: "Gas Giant", o: ["Terrestrial", "Ice Giant", "Gas Giant", "Dwarf"] },
        { q: "What are Jupiter's clouds made of?", a: "Ammonia & Sulfur", o: ["Water", "Ammonia & Sulfur", "Carbon", "Oxygen"] },
        { q: "Which moon is famous for volcanoes?", a: "Io", o: ["Io", "Europa", "Ganymede", "Callisto"] },
        { q: "Does Jupiter have rings?", a: "Yes (Faint)", o: ["No", "Yes (Faint)", "Yes (Bright)", "Only one"] }
    ],
    saturn: [
        { q: "What are Saturn's rings primarily made of?", a: "Ice & Rock", o: ["Diamond", "Ice & Rock", "Gas", "Dust"] },
        { q: "Which planet would float in a giant bathtub?", a: "Saturn", o: ["Jupiter", "Saturn", "Uranus", "Mars"] },
        { q: "What is Saturn's largest moon?", a: "Titan", o: ["Titan", "Enceladus", "Europa", "Rhea"] },
        { q: "What is unique about Titan's atmosphere?", a: "It is thick", o: ["It has no atmosphere", "It is thick", "It is pure gold", "It is made of fire"] },
        { q: "How many moons does Saturn have (approx)?", a: "Over 140", o: ["1", "10", "50", "Over 140"] },
        { q: "What is the strange storm at Saturn's north pole?", a: "The Hexagon", o: ["The Square", "The Hexagon", "The Circle", "The Triangle"] },
        { q: "Which moon of Saturn has water geysers?", a: "Enceladus", o: ["Titan", "Enceladus", "Dione", "Iapetus"] },
        { q: "Saturn is the ____ largest planet?", a: "2nd", o: ["1st", "2nd", "3rd", "8th"] },
        { q: "How fast are Saturn's winds?", a: "1,800 km/h", o: ["100 km/h", "500 km/h", "1,800 km/h", "Supersonic"] },
        { q: "What mission explored Saturn for 13 years?", a: "Cassini", o: ["Voyager", "Cassini", "Apollo", "Juno"] }
    ],
    uranus: [
        { q: "Why is Uranus blue-green?", a: "Methane", o: ["Water", "Methane", "Copper", "Blue sand"] },
        { q: "What is unique about Uranus's rotation?", a: "Rotates on its side", o: ["Fastest", "Slowest", "Rotates on its side", "None"] },
        { q: "Uranus is an...?", a: "Ice Giant", o: ["Gas Giant", "Ice Giant", "Rock Planet", "Fire Star"] },
        { q: "Who discovered Uranus?", a: "William Herschel", o: ["Galileo", "William Herschel", "Newton", "Einstein"] },
        { q: "Uranus's moons are named after...?", a: "Literary characters", o: ["Gods", "Kings", "Literary characters", "Scientists"] },
        { q: "How many rings does Uranus have?", a: "13", o: ["0", "1", "13", "1,000"] },
        { q: "What is the coldest planet?", a: "Uranus", o: ["Neptune", "Uranus", "Pluto", "Mars"] },
        { q: "Uranus was the first planet found by...?", a: "Telescope", o: ["Eyes", "Math", "Telescope", "Space probe"] },
        { q: "How long is a year on Uranus?", a: "84 Earth years", o: ["1 year", "10 years", "84 Earth years", "165 years"] },
        { q: "What is Uranus's largest moon?", a: "Titania", o: ["Titan", "Titania", "Miranda", "Oberon"] }
    ],
    neptune: [
        { q: "Which planet has the fastest winds?", a: "Neptune", o: ["Jupiter", "Saturn", "Neptune", "Mars"] },
        { q: "How was Neptune discovered?", a: "Math", o: ["Telescope", "Math", "Binoculars", "Accident"] },
        { q: "What is Neptune's largest moon?", a: "Triton", o: ["Triton", "Nereid", "Proteus", "Titan"] },
        { q: "What is strange about Triton's orbit?", a: "It is backwards", o: ["It is circular", "It is backwards", "It is very fast", "None"] },
        { q: "What color is Neptune?", a: "Vivid Blue", o: ["Red", "Green", "Vivid Blue", "Purple"] },
        { q: "What was the name of the storm on Neptune?", a: "Great Dark Spot", o: ["Red Spot", "Great Dark Spot", "Blue Hole", "The Vortex"] },
        { q: "Neptune is the ____ planet from the Sun?", a: "8th", o: ["1st", "5th", "8th", "9th"] },
        { q: "How long is a year on Neptune?", a: "165 Earth years", o: ["1 year", "10 years", "84 years", "165 Earth years"] },
        { q: "Which mission visited Neptune in 1989?", a: "Voyager 2", o: ["Apollo", "Voyager 2", "Cassini", "New Horizons"] },
        { q: "What are Neptune's rings made of?", a: "Dust & Rocks", o: ["Pure ice", "Gas", "Dust & Rocks", "Diamonds"] }
    ]
};

import { scoreManager } from './ScoreManager.js';

export class AssessmentModule {
    constructor(telemetry) {
        this.telemetry = telemetry;
        this.container = this.createUI();
    }

    createUI() {
        const div = document.createElement('div');
        div.id = 'quiz-overlay';
        div.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(25px);
            border: 1px solid rgba(79, 172, 254, 0.4); padding: 40px; border-radius: 24px;
            color: white; z-index: 3000; display: none; max-width: 450px; width: 90%;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(79, 172, 254, 0.2);
            font-family: 'Outfit', sans-serif; text-align: center;
        `;
        document.body.appendChild(div);
        return div;
    }

    showQuiz(id) {
        console.log(`[Assessment] Requesting quiz for: ${id}`);
        const pool = quizData[id];
        if (!pool || pool.length === 0) {
            console.error(`[Assessment] No questions found for planet: ${id}`);
            return;
        }

        const data = pool[Math.floor(Math.random() * pool.length)];
        this.telemetry.logEvent('quiz_started', { id, q: data.q });

        this.container.innerHTML = `
            <button id="close-quiz" style="position: absolute; top: 15px; right: 15px; background: none; border: none; color: white; opacity: 0.5; cursor: pointer; font-size: 1.2rem;">✕</button>
            <div style="margin-bottom: 20px;"><span style="background: rgba(79, 172, 254, 0.2); color: #4facfe; padding: 5px 12px; border-radius: 20px; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Mission Knowledge Check</span></div>
            <h3 style="margin: 0 0 10px; font-size: 1.5rem;">${id.toUpperCase()}</h3>
            <p style="font-size: 1rem; line-height: 1.4; margin-bottom: 25px;">${data.q}</p>
            <div id="quiz-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                ${data.o.map(opt => `<button class="quiz-opt" style="padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 10px; cursor: pointer; transition: 0.3s; font-family: 'Outfit'; font-size: 0.9rem;">${opt}</button>`).join('')}
            </div>
        `;

        this.container.style.display = 'block';
        
        const closeBtn = document.getElementById('close-quiz');
        if (closeBtn) closeBtn.onclick = () => this.container.style.display = 'none';

        this.container.querySelectorAll('.quiz-opt').forEach(btn => {
            btn.onclick = () => {
                try {
                    this.handleAnswer(btn, btn.innerText.trim(), data.a, id);
                } catch (e) {
                    console.error('[Assessment] Error in handleAnswer:', e);
                }
            };
        });
    }

    handleAnswer(btn, selected, correct, id) {
        console.log(`[Assessment] Answered: ${selected} (Correct: ${correct})`);
        const isCorrect = selected === correct;
        this.telemetry.logEvent('quiz_answered', { id, selected, isCorrect });

        this.container.querySelectorAll('.quiz-opt').forEach(b => b.style.pointerEvents = 'none');

        btn.style.background = isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)';
        btn.style.borderColor = isCorrect ? '#22c55e' : '#ef4444';
        btn.style.boxShadow = isCorrect ? '0 0 20px rgba(34, 197, 94, 0.3)' : '0 0 20px rgba(239, 68, 68, 0.3)';

        if (isCorrect) {
            if (scoreManager) scoreManager.addPoints(100);
        } else {
            if (scoreManager) scoreManager.addPoints(-25);
            const correctBtn = Array.from(this.container.querySelectorAll('.quiz-opt')).find(b => b.innerText.trim() === correct);
            if (correctBtn) {
                correctBtn.style.borderColor = '#22c55e';
                correctBtn.style.color = '#22c55e';
            }
        }

        setTimeout(() => {
            this.container.style.opacity = '0';
            setTimeout(() => {
                this.container.style.display = 'none';
                this.container.style.opacity = '1';
            }, 500);
        }, 1800);
    }
}
