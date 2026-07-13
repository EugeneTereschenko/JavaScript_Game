import * as THREE from 'https://unpkg.com/three@0.180.0/build/three.module.js';
import { PhysicsObject } from './physicsObject.js';

export class Obstacle extends PhysicsObject {
    constructor(config = {}) {
        const geometry = new THREE.BoxGeometry(
            config.width || 1,
            config.height || 1,
            config.depth || 1
        );
        const material = new THREE.MeshStandardMaterial({
            color: config.color || '#64748b'
        });
        super(geometry, material, {
            ...config,
            gravity: -0.002
        });
    }

    update(ground) {
        this.updateBounds();
        this.applyGravity(ground);
    }
}
