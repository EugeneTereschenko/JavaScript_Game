import * as THREE from "https://unpkg.com/three@0.180.0/build/three.module.js";
import { InputHandler } from "./input.js";


export class Box extends THREE.Mesh {
    constructor({
        width,
        height,
        depth, 
        color ='#00ff00',
        velocity = {
            x: 0,
            y: 0,
            z: 0
        },
        position = {
            x: 0,
            y: 0,
            z: 0
        }
    }){
        super(new THREE.BoxGeometry(width, height, depth), new THREE.MeshStandardMaterial({color}));

        this.width = width;
        this.height = height;
        this.depth = depth;
        this.position.set(position.x, position.y, position.z);


        this.right = this.position.x + this.width / 2;
        this.left = this.position.x - this.width / 2;

        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.front = this.position.z + this.depth / 2;
        this.back = this.position.z - this.depth / 2;

        this.velocity = velocity;
        this.gravity = -0.002;

        this.input = new InputHandler();
    }
    update(ground){
        // apply velocity first, then recalc bounds

        this.updateSides();


        this.position.x += this.velocity.x;
        this.position.z += this.velocity.z;


        this.updateSides();

        this.applyGravity(ground);

    }
    updateEnemy(){
        this.velocity.z += 0.0003;
    }
    updateInput(){
        this.velocity.x = 0;
        this.velocity.z = 0;

        if (this.input.keys.includes('ArrowLeft')){
            this.velocity.x = -0.1;
        }
        if (this.input.keys.includes('ArrowRight')){
            this.velocity.x = 0.1;
        }
        if (this.input.keys.includes('ArrowUp')){
            this.velocity.z -= 0.1;
        }
        if (this.input.keys.includes('ArrowDown')){
            this.velocity.z += 0.1;
        }
        if (this.input.keys.includes(' ')){
            this.velocity.y = 0.08;
        }
    }
    updateSides(){
        this.right = this.position.x + this.width / 2;
        this.left = this.position.x - this.width / 2;

        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.front = this.position.z + this.depth / 2;
        this.back = this.position.z - this.depth / 2;
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

}