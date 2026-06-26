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
        this.maxEggs = 5;
        this.score = 0;
        this.winningScore = 30;
        this.lostHatchlings = 0;
        this.obstacles = [];
        this.eggs = [];
        this.enemies = [];
        this.hatchlings = [];
        this.particles = [];
        this.gameObjects = [];
        this.gameOver = false;
        this.player = new Player(this);
        this.input = new InputHandler(this, this.canvas);
        this.background = new Background(this);

    }
    restart(){
        this.player.restart();
        this.obstacles = [];
        this.eggs = [];
        this.enemies = [];
        this.hatchlings = [];
        this.particles = [];
        this.init();
        this.mouse = {
            x: this.width * 0.5,
            y: this.height * 0.5,
            pressed: false
        }
        this.score = 0;
        this.lostHatchlings = 0;
        this.gameOver = false;
    }
    render(context, deltaTime){

        if (this.timer > this.interval){
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.background.draw(context);
            this.background.update(deltaTime);

            this.gameObjects = [...this.eggs, ...this.obstacles, this.player, ...this.enemies, ...this.hatchlings, ...this.particles];


            this.gameObjects.sort((a, b) => {
                return a.collisionY - b.collisionY;
            });

            this.gameObjects.forEach(object => {
                object.draw(context);
                object.update(deltaTime);
            });

            this.timer = 0;
        }
        this.timer += deltaTime;

        if (this.eggTimer > this.eggInterval && this.eggs.length < this.maxEggs  && !this.gameOver){
            this.addEgg();
            this.eggTimer = 0;
        } else {
            this.eggTimer += deltaTime;
        }

        context.save();
        context.textAlign = 'left';
        context.fillText('Score: ' + this.score, 25, 50);
        if (this.debug){
            context.fillText('Lost: ' + this.lostHatchlings, 25, 100);
        }
        context.restore();
        if (this.score >= this.winningScore){
            this.gameOver = true;

            context.save();
            context.fillStyle = 'rgba(0,0,0,0.5)';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.shadowOffsetX = 4;
            context.shadowOffsetY = 4;
            context.shadowColor = 'black';
            let message1;
            let message2;
            if (this.lostHatchlings <= 5){
                message1 = "Bullseye!!!!!!";
                message2 = "You bulled the bullies!";
            } else {
                message1 = "Bullocks";
                message2 = "You lost!" + this.lostHatchlings + "hatchlings, don't be a pushover!";
            }
            context.font = '130px Helvetica';
            context.fillText(message1, this.width * 0.5, this.height * 0.5 - 20);
            context.font = '40px Helvetica';
            context.fillText(message2, this.width * 0.5, this.height * 0.5 + 30);
            context.fillText("Final score " + this.score + ". Press 'R' to butt heads again!", this.width * 0.5, this.height * 0.5 + 80);
            context.restore();
            
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
    removeGameObjects(){
        this.eggs = this.eggs.filter(object => !object.markedForDeletion);
        this.hatchlings = this.hatchlings.filter(object => !object.markedForDeletion);
        this.particles = this.particles.filter(object => !object.markedForDeletion);
        //console.log(this.eggs);
    }
    init() {
        for (let i = 0; i < 5; i++){
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