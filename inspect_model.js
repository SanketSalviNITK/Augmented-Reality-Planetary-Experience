import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('assets/solar_system_animation.glb', (gltf) => {
    console.log('Model Hierarchy:');
    gltf.scene.traverse(child => {
        console.log(`- ${child.name} (${child.type})`);
    });
    
    // Check for animations
    if (gltf.animations && gltf.animations.length) {
        console.log('Animations found:', gltf.animations.map(a => a.name));
    }
}, undefined, (error) => {
    console.error('Error loading model:', error);
});
