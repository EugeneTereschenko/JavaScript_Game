import * as THREE from "https://unpkg.com/three@0.180.0/build/three.module.js";
import { Box } from "./box.js";

export class Game{
    constructor(innerWidth, innerHeight){
        this.innerWidth = innerWidth;
        this.innerHeight = innerHeight;
        this.scene = new THREE.Scene();
        this.color = new THREE.Color(0x222233);
        this.camera = new THREE.PerspectiveCamera(75, this.innerWidth / this.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.ground = new Box({
            width: 5,
            height: 0.5,
            depth: 10, 
            color: '#808080',
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

        
        this.sun = new THREE.DirectionalLight(0xffffff, 3);
        this.ambient = new THREE.AmbientLight(0xffffff, 0.5);

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

        this.camera.position.set(3, 3, 9);
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
    update(){

        this.cube.update(this.ground);
        this.renderer.render(this.scene, this.camera);
    }
}