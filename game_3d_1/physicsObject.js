import * as THREE from 'https://unpkg.com/three@0.180.0/build/three.module.js';

export class PhysicsObject extends THREE.Mesh {
    constructor(geometry, material, config = {}) {
        super(geometry, material);
        this.width = config.width || 1;
        this.height = config.height || 1;
        this.depth = config.depth || 1;
        this.velocity = config.velocity || { x: 0, y: 0, z: 0 };
        this.gravity = config.gravity !== undefined ? config.gravity : -0.002;
        if (config.position) {
            this.position.set(config.position.x, config.position.y, config.position.z);
        }
        this.castShadow = config.castShadow !== undefined ? config.castShadow : true;
        this.receiveShadow = config.receiveShadow !== undefined ? config.receiveShadow : true;
        this.updateBounds();
    }

    updateBounds() {
        this.left = this.position.x - this.width / 2;
        this.right = this.position.x + this.width / 2;
        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;
        this.back = this.position.z - this.depth / 2;
        this.front = this.position.z + this.depth / 2;
    }

    applyGravity(ground) {
        this.velocity.y += this.gravity;
        if (this.checkCollision(ground)) {
            this.velocity.y *= 0.5;
            this.velocity.y = -this.velocity.y;
        } else {
            this.position.y += this.velocity.y;
        }
    }

    checkCollision(other) {
        const xCollision = this.right >= other.left && this.left <= other.right;
        const yCollision = this.top >= other.bottom && this.bottom <= other.top;
        const zCollision = this.front >= other.back && this.back <= other.front;
        return xCollision && yCollision && zCollision;
    }

    update(ground) {
        this.updateBounds();
        this.applyGravity(ground);
    }
}