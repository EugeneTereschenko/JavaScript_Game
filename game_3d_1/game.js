import * as THREE from 'https://unpkg.com/three@0.180.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.180.0/examples/jsm/controls/OrbitControls.js';
import { Box } from './box.js';
import { Obstacle } from './obstacle.js';
import { LevelManager } from './levels.js';
import { CollisionSystem } from './collisionSystem.js';
import { EnemyManager } from './enemyManager.js';
import { GAME_CONFIG } from './constants.js';

export class Game {
    constructor(innerWidth, innerHeight) {
        this.innerWidth = innerWidth;
        this.innerHeight = innerHeight;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(GAME_CONFIG.SCENE.BACKGROUND_COLOR);
        this.camera = new THREE.PerspectiveCamera(
            GAME_CONFIG.CAMERA.FOV,
            this.innerWidth / this.innerHeight,
            GAME_CONFIG.CAMERA.NEAR,
            GAME_CONFIG.CAMERA.FAR
        );
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(this.innerWidth, this.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.levelManager = new LevelManager();
        this.collisionSystem = new CollisionSystem({
            enemyObstacleMode: GAME_CONFIG.COLLISION.MODES.BLOCK_PLAYER_ONLY
        });
        this.enemyManager = null;
        this.score = 0;
        this.levelStartTime = Date.now();
        this.spawnRate = 200;
        this.enemySpeedMultiplier = 1;
        this.ground = null;
        this.obstacles = [];
        this.cube = new Box({
            width: GAME_CONFIG.PLAYER.WIDTH,
            height: GAME_CONFIG.PLAYER.HEIGHT,
            depth: GAME_CONFIG.PLAYER.DEPTH,
            velocity: { x: 0, y: -0.1, z: 0 }
        });
        this.sun = new THREE.DirectionalLight(0xffffff, GAME_CONFIG.LIGHTING.SUN_INTENSITY);
        this.sun.position.set(
            GAME_CONFIG.LIGHTING.SUN_POSITION.x,
            GAME_CONFIG.LIGHTING.SUN_POSITION.y,
            GAME_CONFIG.LIGHTING.SUN_POSITION.z
        );
        this.sun.castShadow = true;
        this.ambient = new THREE.AmbientLight(0xffffff, GAME_CONFIG.LIGHTING.AMBIENT_INTENSITY);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.handleResize = () => this.onWindowResize();
        window.addEventListener('resize', this.handleResize);
    }

    init() {
        this.camera.position.set(
            GAME_CONFIG.CAMERA.POSITION.x,
            GAME_CONFIG.CAMERA.POSITION.y,
            GAME_CONFIG.CAMERA.POSITION.z
        );
        this.camera.lookAt(
            GAME_CONFIG.CAMERA.LOOK_AT.x,
            GAME_CONFIG.CAMERA.LOOK_AT.y,
            GAME_CONFIG.CAMERA.LOOK_AT.z
        );
        this.cube.castShadow = true;
        this.scene.add(this.cube);
        this.scene.add(this.sun);
        this.scene.add(this.ambient);
        document.body.appendChild(this.renderer.domElement);
        this.enemyManager = new EnemyManager(this.scene, this.levelManager);
        this.setupLevel();
    }

    setupLevel() {
        this.obstacles.forEach(obstacle => this.scene.remove(obstacle));
        this.enemyManager.clear();
        this.obstacles = [];
        const level = this.levelManager.getCurrentLevel();
        if (this.ground) {
            this.scene.remove(this.ground);
        }
        this.ground = new Box({
            width: level.arenaWidth,
            height: GAME_CONFIG.GROUND.HEIGHT,
            depth: level.arenaDepth,
            color: GAME_CONFIG.GROUND.COLOR,
            position: {
                x: 0,
                y: GAME_CONFIG.GROUND.Y_OFFSET,
                z: 0
            }
        });
        this.ground.receiveShadow = true;
        this.scene.add(this.ground);
        this.cube.position.set(0, 0, 0);
        this.cube.velocity = { x: 0, y: -0.1, z: 0 };
        level.obstacles.forEach(obstacleConfig => {
            const obstacle = new Obstacle(obstacleConfig);
            this.scene.add(obstacle);
            this.obstacles.push(obstacle);
        });
        this.spawnRate = level.initialSpawnRate;
        this.enemySpeedMultiplier = level.enemySpeedMultiplier;
        this.levelStartTime = Date.now();
    }

    update(animationId, frames) {
        this.cube.update(this.ground);
        this.cube.updateInput();
        for (let obstacle of this.obstacles) {
            if (this.collisionSystem.checkAABBCollision(this.cube, obstacle)) {
                console.log('Player hit obstacle - Game Over!');
                window.cancelAnimationFrame(animationId);
                return;
            }
        }
        this.enemyManager.updateAll(this.ground);
        this.checkEnemyObstacleCollisions();
        this.checkEnemyPlayerCollisions(animationId);
        if (frames % this.spawnRate === 0) {
            this.enemyManager.spawnEnemy(this.enemySpeedMultiplier);
            if (this.spawnRate > 20) {
                this.spawnRate -= 10;
            }
        }
        this.score = Math.floor((Date.now() - this.levelStartTime) / 100);
        this.renderer.render(this.scene, this.camera);
    }

    checkEnemyObstacleCollisions() {
        const enemies = this.enemyManager.getAll();
        for (let enemy of enemies) {
            for (let obstacle of this.obstacles) {
                if (this.collisionSystem.checkAABBCollision(enemy, obstacle)) {
                    this.collisionSystem.handleEnemyObstacleCollision(enemy, obstacle);
                }
            }
        }
    }

    checkEnemyPlayerCollisions(animationId) {
        const enemies = this.enemyManager.getAll();
        for (let enemy of enemies) {
            if (this.collisionSystem.checkCollisionWithVelocity(this.cube, enemy)) {
                console.log('Player hit enemy - Game Over!');
                window.cancelAnimationFrame(animationId);
                return;
            }
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setCollisionMode(mode) {
        return this.collisionSystem.setEnemyObstacleMode(mode);
    }

    getLevelInfo() {
        return {
            levelNumber: this.levelManager.currentLevel,
            levelName: this.levelManager.getCurrentLevel().name,
            score: this.score,
            enemiesDefeated: this.enemyManager.enemiesDefeated,
            totalLevels: this.levelManager.getTotalLevels()
        };
    }
}