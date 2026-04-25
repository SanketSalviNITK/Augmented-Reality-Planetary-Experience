import * as THREE from 'three';
import { SceneManager } from './src/core/SceneManager.js';
import { SolarSystemView } from './src/views/SolarSystemView.js';
import { DetailView } from './src/views/DetailView.js';
import { planetData } from './src/data/planets.js';
import { telemetry } from './src/utils/telemetry.js';

// Initialize Core
const sm = new SceneManager('canvas-container');
let currentView = null;
const initialUI = document.getElementById('ui-layer').innerHTML;

// Nav Logic
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('collapsed');
    const isCollapsed = navMenu.classList.contains('collapsed');
    navToggle.innerHTML = isCollapsed ? '☰' : '✕';
    navToggle.classList.toggle('active', !isCollapsed);

    const uiLayer = document.getElementById('ui-layer');
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
        uiLayer.style.setProperty('--ui-left', isCollapsed ? '80px' : '300px');
    }
});

// View Switching Logic
async function switchView(viewType, planetKey = null) {
    if (currentView) currentView.destroy();
    
    document.getElementById('loading-screen').style.display = 'flex';
    document.getElementById('loading-screen').style.opacity = '1';

    if (viewType === 'overview') {
        currentView = new SolarSystemView(sm);
        document.getElementById('ui-layer').innerHTML = initialUI;
    } else if (viewType === 'detail' && planetKey) {
        currentView = new DetailView(sm, planetKey, planetData[planetKey]);
    }

    telemetry.logEvent('view_switch', { viewType, planetKey });

    try {
        await currentView.load();
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 1000);
    } catch (error) {
        console.error('View Load Error:', error);
    }
}

// Event Listeners for Nav
Object.keys(planetData).forEach(key => {
    const el = document.getElementById(`nav-${key}`);
    if (el) {
        el.addEventListener('click', () => switchView('detail', key));
    }
});

// Global Event for Back Button and Direct Selection
window.addEventListener('changeView', (e) => {
    if (typeof e.detail === 'string') {
        switchView(e.detail);
    } else {
        switchView(e.detail.type, e.detail.key);
    }
});

// Animation Loop
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (currentView) currentView.update(delta);
    sm.render();
}
animate();

// Initial View
switchView('overview');
