import * as THREE from "https://unpkg.com/three@0.180.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.180.0/examples/jsm/controls/OrbitControls.js";
import { Box } from "./box.js";

export class Game{
    constructor(innerWidth, innerHeight){
        this.innerWidth = innerWidth;
        this.innerHeight = innerHeight;
        this.scene = new THREE.Scene();
        this.color = new THREE.Color(0x0c4a6e);
        this.camera = new THREE.PerspectiveCamera(75, this.innerWidth / this.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.ground = new Box({
            width: 10,
            height: 0.5,
            depth: 50, 
            color: '#29a6e9',
            position: {
                x: 0,
                y: -2,
                z: 0
            }
        }); 
        this.cube = new Box({
            width: 1,
            height: 1,
            depth: 1,
            velocity: {
                x: 0,
                y: -0.1,
                z: 0
            }
        });
        
        this.spawnRate = 200;
        this.sun = new THREE.DirectionalLight(0xffffff, 3);
        this.ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.enemies = [];
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.handleResize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", this.handleResize);
    }
    init(){
        this.cube.castShadow = true;
        this.scene.background = this.color;

        this.camera.position.set(4.61, 3, 9);
        this.camera.lookAt(0, 0, 0);


        this.renderer.setSize(this.innerWidth, this.innerHeight);
        this.renderer.shadowMap.enabled = true;


        document.body.appendChild(this.renderer.domElement);

        this.scene.add(this.cube);

        this.ground.receiveShadow = true;
        this.scene.add(this.ground);

        this.sun.position.set(5, 10, 5);
        this.sun.castShadow = true;

        this.scene.add(this.sun);
        this.scene.add(this.ambient);

    }
    addEnemy(){
        const enemy = new Box({
            width: 1,
            height: 1,
            depth: 1,
            position: {
                x: (Math.random() - 0.5) * 10,
                y: 0,
                z: -20
            },
            velocity: {
                x: 0,
                y: 0,
                z: 0.005
            },
            color: 'red'
        });
        enemy.castShadow = true;
        this.scene.add(enemy);
        this.enemies.push(enemy);
    }
    update(animationId, frames, spawnRate){

        this.cube.update(this.ground);
        this.cube.updateInput();

        this.enemies.forEach(enemy => {
            enemy.update(this.ground);
            if (enemy.boxCollision(this.cube, enemy)){
                console.log('collision');
                window.cancelAnimationFrame(animationId);
            }
            enemy.updateEnemy();
        });

        if (frames % this.spawnRate === 0){
            this.addEnemy();
            if (this.spawnRate > 20) {
                this.spawnRate -= 20;
                console.log(this.spawnRate);
            }
        }

        this.renderer.render(this.scene, this.camera);
    }
}