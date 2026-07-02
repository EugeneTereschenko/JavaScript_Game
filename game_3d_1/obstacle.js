import * as THREE from "https://unpkg.com/three@0.180.0/build/three.module.js";

export class Obstacle extends THREE.Mesh {
    constructor({x, y, z, width, height, depth, color = '#64749b'}){
        super(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshStandardMaterial({color})
        );

        this.position.set(x, y, z);
        this.castShadow = true;
        this.receiveShadow = true;

        this.width = width;
        this.height = height;
        this.depth = depth;

        this.velocity = { x: 0, y: 0, z: 0 };
        this.gravity = -0.002;

        this.updateBounds();

    }
    updateBounds() {
        this.right = this.position.x + this.width / 2;
        this.left = this.position.x - this.width / 2;
        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;
        this.front = this.position.z + this.depth / 2;
        this.back = this.position.z - this.depth / 2;
    }

    getDistance(box) {
        const xDistance = box.right < this.left
            ? this.left - box.right
            : box.left > this.right
                ? box.left - this.right
                : 0;

        const yDistance = box.top < this.bottom
            ? this.bottom - box.top
            : box.bottom > this.top
                ? box.bottom - this.top
                : 0;

        const zDistance = box.front < this.back
            ? this.back - box.front
            : box.back > this.front
                ? box.back - this.front
                : 0;

        return {
            xDistance,
            yDistance,
            zDistance,
            distance: Math.sqrt(xDistance * xDistance + yDistance * yDistance + zDistance * zDistance)
        };
    }
//        const yCollision = box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom;
    checkCollision(box){
        const xCollision = box.right >= this.left && box.left <= this.right;
        const yCollision = box.bottom <= this.top && box.top >= this.bottom;
        const zCollision = box.front >= this.back && box.back <= this.front;

        return xCollision && yCollision && zCollision;
    }
    boxCollision(box1, box2){
        const xCollision = box1.right >= box2.left && box1.left <= box2.right;
        const yCollision = box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom;
        const zCollision = box1.front >= box2.back && box1.back <= box2.front;

        return (xCollision && yCollision && zCollision);
    }
    applyGravity(ground){
        this.velocity.y += this.gravity;

        if (this.boxCollision(this, ground)){
            const friction = 0.5;
            this.velocity.y *= friction;
            this.velocity.y = -this.velocity.y;

        } else {
            this.position.y += this.velocity.y;
        }
    }
    update(ground){
        this.updateBounds();
        this.applyGravity(ground);
    }
}