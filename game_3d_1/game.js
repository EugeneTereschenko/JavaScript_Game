import * as THREE from "https://unpkg.com/three@0.180.0/build/three.module.js";
import { CubePlayer } from "./cubePlayer.js";

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
        this.cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({
            color: 0x00ff00
        }));
        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshStandardMaterial({ color: 0x00ff00 })
        );
        this.ground = new THREE.Mesh(
            new THREE.BoxGeometry(5, 0.5, 10),
            new THREE.MeshStandardMaterial({
                color: 0x808080
            })
        );
        this.sun = new THREE.DirectionalLight(0xffffff, 3);
        this.ambient = new THREE.AmbientLight(0xffffff, 0.5);

        this.handleResize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", this.handleResize);
        this.cubePlayer = new CubePlayer(this.cube);
    }
    init(){
        this.cube.castShadow = true;
        this.scene.background = this.color;

        this.camera.position.set(3, 3, 6);
        this.camera.lookAt(0, 0, 0);


        this.renderer.setSize(this.innerWidth, this.innerHeight);
        this.renderer.shadowMap.enabled = true;


        document.body.appendChild(this.renderer.domElement);

        this.scene.add(this.cube);

        //this.ground.rotation.x = -Math.PI / 2;
        this.ground.receiveShadow = true;
        this.ground.position.y = -2;
        this.scene.add(this.ground);

        this.sun.position.set(5, 10, 5);
        this.sun.castShadow = true;

        this.scene.add(this.sun);
        this.scene.add(this.ambient);
    }
    update(){
        this.cubePlayer.cube.rotation.x += 0.01;
        this.cubePlayer.cube.rotation.y += 0.01;
        this.cubePlayer.update();
        this.renderer.render(this.scene, this.camera);
    }
}