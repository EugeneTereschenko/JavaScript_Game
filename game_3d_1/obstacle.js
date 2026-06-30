import * as THREE from "https://unpkg.com/three@0.180.0/build/three.module.js";

export class Obstacle extends THREE.Mesh {
    constructor({x, y, z, width, height, depth, color = '#64749b'}){
        super(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshStandardMeterial({color})
        );

        this.position.set(x, y, z);
        this.castShadow = true;
        this.receiveShadow = true;

        this.width = width;
        this.height = height;
        this.depth = depth;

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

    checkCollision(box){
        const xCollision = box.right >= this.left && box.left <= this.right;
        const yCollision = box.bottom + box.velocity.y <= this.top && box.top >= this.bottom;
        const zCollision = box.front >= this.back && box.back <= this.front;

        return (xCollision && yCollision && zCollision);
    }
}