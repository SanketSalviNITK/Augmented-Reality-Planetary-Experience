import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class DetailView {
    constructor(sceneManager, planetKey, data) {
        this.sm = sceneManager;
        this.planetKey = planetKey;
        this.data = data;
        this.loader = new GLTFLoader();
    }

    async load() {
        return new Promise((resolve, reject) => {
            const url = `assets/${this.planetKey}.glb`;
            console.log(`DetailView: Attempting to load model from ${url}`);
            this.loader.load(url, (gltf) => {
                this.model = gltf.scene;
                
                // Fix materials for legacy models (Specular-Glossiness fallback)
                this.model.traverse(child => {
                    if (child.isMesh) {
                        // If material is missing or failed to load textures due to KHR_materials_pbrSpecularGlossiness
                        if (child.material) {
                            child.material.envMapIntensity = 1.5;
                            // If the material is completely broken/grey, we try to ensure it's at least Standard
                            if (child.material.type === 'MeshStandardMaterial' && !child.material.map) {
                                console.warn(`Mesh ${child.name} has no texture map. Possible Specular-Glossiness issue.`);
                            }
                        }
                    }
                });

                this.sm.scene.add(this.model);
                
                // Auto-scale model to fit view
                const box = new THREE.Box3().setFromObject(this.model);
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 5 / maxDim;
                this.model.scale.set(scale, scale, scale);
                
                // Center model
                const center = box.getCenter(new THREE.Vector3());
                this.model.position.x -= center.x * scale;
                this.model.position.y -= center.y * scale;
                this.model.position.z -= center.z * scale;
                
                this.sm.camera.position.set(0, 0, 12);
                this.sm.controls.target.set(0, 0, 0);
                
                // Enhance lighting for detail view
                const pointLight = new THREE.PointLight(0xffffff, 2, 50);
                pointLight.position.set(10, 10, 10);
                this.sm.scene.add(pointLight);
                
                this.showInfo();
                resolve();
            }, undefined, (error) => {
                console.error(`Failed to load model: assets/${this.planetKey}.glb`, error);
                reject(error);
            });
        });
    }

    showInfo() {
        const ui = document.getElementById('ui-layer');
        ui.innerHTML = `
            <div class="detail-panel" id="planet-panel">
                <div class="panel-header" id="panel-header">
                    <h1>${this.data.name}</h1>
                    <button id="info-toggle">▼</button>
                </div>
                <div class="collapsible-content">
                    <p class="type">${this.data.type}</p>
                    <div class="stats">
                        <p><strong>Diameter:</strong> ${this.data.diameter}</p>
                        <p><strong>Temperature:</strong> ${this.data.temp}</p>
                        <p><strong>Distance from Sun:</strong> ${this.data.distance}</p>
                        <p><strong>Moons:</strong> ${this.data.moons}</p>
                    </div>
                    <p class="desc">${this.data.description}</p>
                    <div class="fact-box">
                        <p><strong>Did you know?</strong><br>${this.data.fact}</p>
                    </div>
                    <button id="back-btn">← Back to Solar System</button>
                </div>
            </div>
        `;
        
        const panel = document.getElementById('planet-panel');
        const header = document.getElementById('panel-header');
        
        header.addEventListener('click', () => {
            panel.classList.toggle('minimized');
        });

        document.getElementById('back-btn').addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('changeView', { detail: 'overview' }));
        });
    }

    update() {
        if (this.model) {
            this.model.rotation.y += 0.005;
        }
    }

    destroy() {
        this.sm.clearScene();
        const ui = document.getElementById('ui-layer');
        ui.innerHTML = ''; // Clear custom UI
    }
}
