import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class SolarSystemView {
    constructor(sceneManager) {
        this.sm = sceneManager;
        this.loader = new GLTFLoader();
        this.mixer = null;
        this.selectableObjects = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

    async load() {
        return new Promise((resolve, reject) => {
            this.loader.load('assets/solar_system_animation.glb', (gltf) => {
                this.model = gltf.scene;
                this.sm.scene.add(this.model);
                
                this.model.traverse(child => {
                    if (child.isMesh) this.selectableObjects.push(child);
                });

                if (gltf.animations && gltf.animations.length) {
                    this.mixer = new THREE.AnimationMixer(this.model);
                    gltf.animations.forEach(clip => {
                        this.mixer.clipAction(clip).play();
                    });
                }
                
                this.sm.camera.position.set(0, 40, 100);
                
                // Add click listener
                this.clickHandler = (e) => this.onClick(e);
                window.addEventListener('click', this.clickHandler);
                
                resolve();
            }, undefined, reject);
        });
    }

    onClick(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.sm.camera);
        const intersects = this.raycaster.intersectObjects(this.selectableObjects, true);

        if (intersects.length > 0) {
            const planetKey = this.getPlanetKey(intersects[0].object);
            if (planetKey) {
                window.dispatchEvent(new CustomEvent('changeView', { detail: { type: 'detail', key: planetKey } }));
            }
        }
    }

    getPlanetKey(object) {
        // Mapping of exact signatures to planet keys
        // We use the full 'Object_X' to avoid partial matches (e.g., 8 vs 28)
        const fragments = {
            "Sun": "sun", "Object_56": "sun",
            "Mercury": "mercury", "Object_5": "mercury",
            "Venus": "venus", "Object_8": "venus",
            "Earth": "earth", "Object_11": "earth",
            "Mars": "mars", "Object_14": "mars",
            "Jupiter": "jupiter", "Object_17": "jupiter",
            "Saturn": "saturn", "Object_28": "saturn", "Object_30": "saturn",
            "Uranus": "uranus", "Object_34": "uranus",
            "Neptune": "neptune", "Object_42": "neptune"
        };

        // Sort fragments by length descending to ensure longest match wins
        const sortedFrags = Object.entries(fragments).sort((a, b) => b[0].length - a[0].length);

        let current = object;
        while (current) {
            const name = current.name;
            for (const [frag, key] of sortedFrags) {
                if (name.includes(frag)) return key;
            }
            current = current.parent;
        }
        return null;
    }

    update(delta) {
        if (this.mixer) this.mixer.update(delta);
    }

    destroy() {
        window.removeEventListener('click', this.clickHandler);
        this.sm.clearScene();
    }
}
