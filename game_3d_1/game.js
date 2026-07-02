import * as THREE from "https://unpkg.com/three@0.180.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.180.0/examples/jsm/controls/OrbitControls.js";
import { Box } from "./box.js";
import { Obstacle } from "./obstacle.js";
import { LevelManager } from "./levels.js";


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

        this.levelManager = new LevelManager();
        this.score = 0;
        this.enemiesDefeated = 0;
        this.levelStartTime = Date.now();



        this.ground = null;
        
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
        this.obstacles = [];

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.handleResize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", this.handleResize);
    }
    setupLevel(){
        this.obstacles.forEach(obstacle => this.scene.remove(obstacle));
        this.enemies.forEach(enemy => this.scene.remove(enemy));
        this.obstacles = [];
        this.enemies = [];

        const level = this.levelManager.getCurrentLevel();

        if (this.ground){
            this.scene.remove(this.ground);
        }

        this.ground = new Box({
            width: level.arenaWidth,
            height: 0.5,
            depth: level.arenaDepth,
            color: '#29a6e9',
            position: {
                x: 0,
                y: -2,
                z: 0
            }
        });

        this.ground.receiveShadow = true;
        this.scene.add(this.ground);

        this.cube.position.set(0, 0, 0);
        this.cube.velocity = { x: 0, y: -0.1, z: 0};

        level.obstacles.forEach(obstacleConfig => {
            const obstacle = new Obstacle(obstacleConfig);
            this.scene.add(obstacle);
            this.obstacles.push(obstacle);
        });


        this.spawnRate = level.initialSpawnRate;
        this.enemySpeedMultiplier = level.enemySpeedMultiplier;
        this.levelStartTime = Date.now();
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

        //this.scene.add(this.ground);

        this.sun.position.set(5, 10, 5);
        this.sun.castShadow = true;

        this.scene.add(this.sun);
        this.scene.add(this.ambient);

        this.setupLevel();
       // this.addEnemy();

    }
    addEnemy(){
        const level = this.levelManager.getCurrentLevel();
        const enemy = new Box({
            width: 1,
            height: 1,
            depth: 1,
            position: {
                x: (Math.random() - 0.5) * (level.arenaWidth - 1),
                y: 0,
                z: -20
            },
            velocity: {
                x: 0,
                y: 0,
                z: 0.005 * this.enemySpeedMultiplier
            },
            color: 'red'
        });
        enemy.castShadow = true;
        this.scene.add(enemy);
        this.enemies.push(enemy);
    }

    avoidEnemyObstacleCollision(enemy) {
        const dangerMargin = 1;
        let nearestObstacle = null;
        let nearestDistance = Infinity;

        for (const obstacle of this.obstacles) {
            const dist = obstacle.getDistance(enemy);
            if (dist.distance < nearestDistance) {
                nearestDistance = dist.distance;
                nearestObstacle = { obstacle, dist };
            }
        }

        if (!nearestObstacle) return;
        console.log(`Nearest obstacle distance:`, nearestObstacle.dist);
        const { obstacle, dist } = nearestObstacle;
        if (dist.xDistance === 0 && dist.yDistance === 0 && dist.zDistance < dangerMargin) {
            const direction = enemy.position.x <= obstacle.position.x ? -1 : 1;
            enemy.velocity.z = 0.02 * direction;
            enemy.velocity.x = 0.02 * direction;
        }
    }

    update(animationId, frames, spawnRate){

        this.cube.update(this.ground);
        this.cube.updateInput();

        for (let obstacle of this.obstacles){
            obstacle.update(this.ground);
            if (obstacle.checkCollision(this.cube)){
                console.log('Obstacle collision - Game Over');
                window.cancelAnimationFrame(animationId);
                return;
            }
        }


        this.enemies.forEach(enemy => {
            enemy.update(this.ground);

            let obstacleCollision = false;
            for (let obstacle of this.obstacles){
                console.log(`Distance to obstacles:`, obstacle.getDistance(enemy));
                if (obstacle.checkCollision(enemy)){
                    obstacleCollision = true;
                    break;
                }
            }


            this.avoidEnemyObstacleCollision(enemy);
            //console.log(`Enemy position: x=${enemy.position.x}, y=${enemy.position.y}, z=${enemy.position.z}`);
            if (obstacleCollision){
                //this.scene.remove(enemy);
               // this.enemies.splice(this.enemies.indexOf(enemy), 1);
                return;
            }


            if (enemy.boxCollision(this.cube, enemy)){
                console.log('collision');
                window.cancelAnimationFrame(animationId);
            }
            enemy.updateEnemy();
        });

        if (frames % this.spawnRate === 0){
            this.addEnemy();
            if (this.spawnRate > 20) {
                this.spawnRate -= 10;
                console.log('New spawn rate:', this.spawnRate);
            }
        }

        this.score = Math.floor((Date.now() - this.levelStartTime) / 100);

        this.renderer.render(this.scene, this.camera);
    }

    getLevelInfo(){
        return {
            levelNumber: this.levelManager.currentLevel,
            levelName: this.levelManager.getCurrentLevel().name,
            score: this.score,
            enemiesDefeated: this.enemiesDefeates,
            totalLevels: this.levelManager.getTotalLevels()
        }
    }
}