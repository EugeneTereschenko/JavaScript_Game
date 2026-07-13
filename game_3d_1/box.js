import * as THREE from 'https://unpkg.com/three@0.180.0/build/three.module.js';
import { InputHandler } from './input.js';
import { PhysicsObject } from './physicsObject.js';
import { GAME_CONFIG } from './constants.js';

export class Box extends PhysicsObject {
    constructor(config = {}) {
        const geometry = new THREE.BoxGeometry(
            config.width || GAME_CONFIG.PLAYER.WIDTH,
            config.height || GAME_CONFIG.PLAYER.HEIGHT,
            config.depth || GAME_CONFIG.PLAYER.DEPTH
        );
        const material = new THREE.MeshStandardMaterial({ color: config.color || '#00ff00' });
        super(geometry, material, config);
        this.input = config.isEnemy ? null : new InputHandler();
        this.isEnemy = config.isEnemy || false;
    }

    updateInput() {
        if (!this.input) return;
        this.velocity.x = 0;
        this.velocity.z = 0;
        const keys = this.input.keys;
        const speed = GAME_CONFIG.PLAYER.MOVE_SPEED;
        if (keys.includes('ArrowLeft')) this.velocity.x = -speed;
        if (keys.includes('ArrowRight')) this.velocity.x = speed;
        if (keys.includes('ArrowUp')) this.velocity.z -= speed;
        if (keys.includes('ArrowDown')) this.velocity.z += speed;
        if (keys.includes(' ')) this.velocity.y = GAME_CONFIG.PLAYER.JUMP_FORCE;
    }

    updateEnemy() {
        if (!this.isEnemy) return;
        this.velocity.x = 0;
        this.velocity.z += GAME_CONFIG.ENEMY.ACCELERATION;
    }

    update(ground) {
        this.updateBounds();
        this.position.x += this.velocity.x;
        this.position.z += this.velocity.z;
        this.updateBounds();
        this.applyGravity(ground);
    }
}