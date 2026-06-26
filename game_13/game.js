import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { Obstacle } from "./obstacle.js";
import { Egg } from "./egg.js";
import { Enemy } from "./enemy.js";

export class Game {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.topMargin = 260;
        this.debug = true;
        this.mouse = {
            x: this.width * 0.5,
            y: this.height * 0.5,
            pressed: false
        }
        this.speed = 0;
        this.fps = 40;
        this.timer = 0;
        this.interval = 1000/this.fps;
        this.eggTimer = 0;
        this.eggInterval = 1000;
        this.numberOfObstacles = 10;
        this.maxEggs = 20;
        this.obstacles = [];
        this.eggs = [];
        this.enemies = [];
        this.gameObjects = [];
        this.player = new Player(this);
        this.input = new InputHandler(this, this.canvas);
        this.background = new Background(this);

    }
    render(context, deltaTime){

        if (this.timer > this.interval){
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.background.draw(context);
            this.background.update(deltaTime);

            this.gameObjects = [...this.eggs, ...this.obstacles, this.player, ...this.enemies];


            this.gameObjects.sort((a, b) => {
                return a.collisionY - b.collisionY;
            });

            this.gameObjects.forEach(object => {
                object.draw(context);
                object.update();
            });

            this.timer = 0;
        }
        this.timer += deltaTime;

        if (this.eggTimer > this.eggInterval && this.eggs.length < this.maxEggs){
            this.addEgg();
            this.eggTimer = 0;
        } else {
            this.eggTimer += deltaTime;
        }


        
    }
    checkCollision(a, b){
        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;
        const distance = Math.hypot(dy, dx);
        const sumOfRadii = a.collisionRadius + b.collisionRadius;
        return [(distance < sumOfRadii), distance, sumOfRadii, dx, dy];
    }
    addEgg(){
        this.eggs.push(new Egg(this));
    }
    addEnemy(){
        this.enemies.push(new Enemy(this));
    }
    init() {
        for (let i = 0; i < 3; i++){
            this.addEnemy();
        }
        let attempts = 0;
        while(this.obstacles.length < this.numberOfObstacles && attempts < 500) {
            let testObstacle = new Obstacle(this);
            let overlap = false;
            this.obstacles.forEach(obstacle => {
                const dx = testObstacle.collisionX - obstacle.collisionX;
                const dy = testObstacle.collisionY - obstacle.collisionY;
                const distance = Math.hypot(dy, dx);
                const distanceBuffer = 150;
                const sumOfRadii = testObstacle.collisionRadius + obstacle.collisionRadius + distanceBuffer;
                if (distance < sumOfRadii){
                    overlap = true;
                }
            });
            const margin = testObstacle.collisionRadius * 3;
            if (!overlap && 
                testObstacle.spriteX > 0 && 
                testObstacle.spriteX < this.width - testObstacle.width && 
                testObstacle.collisionY > this.topMargin + margin && 
                testObstacle.collisionY < this.height - margin){
                this.obstacles.push(testObstacle);
            }
            attempts++;
        }

    }
}