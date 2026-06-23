import { InputHandler } from "./input.js";
import { Player } from "./player.js";
import { UI } from "./ui.js";
import { Enemy, Angler1 } from "./enemy.js";

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.keys = [];
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.ammo = 20;
        this.maxAmmo = 50;
        this.ammoTimer = 0;
        this.ammoInterval = 500;
        this.gameOver = false;
        this.score = 0;
        this.winningScore = 10;
        this.gameTime = 0;
        this.timeLimit = 5000;
        this.ui = new UI(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
    }
    update(deltaTime) {
        if (!this.gameOver) {
            this.gameTime += deltaTime;
        }
        if (this.gameTime > this.timeLimit) {
            this.gameOver = true;
        }
        this.player.update();
        if (this.ammoTimer > this.ammoInterval){
            if (this.ammo < this.maxAmmo) {
                this.ammo++;
                this.ammoTimer = 0;
            } 
        } else {
                this.ammoTimer += deltaTime;
        }
        this.enemies.forEach(enemy => {
            enemy.update();
            if (this.checkCollision(this.player, enemy)){
                enemy.markedForDeletion = true;
            }
            this.player.projectiles.forEach(projectile => {
                if (this.checkCollision(projectile, enemy)){
                    enemy.lives--;
                    projectile.markedForDeletion = true;
                    if (enemy.lives <= 0){
                        enemy.markedForDeletion = true;
                        if (!this.gameOver) {
                            this.score += enemy.score;
                        }
                        if (this.score > this.winningScore) {
                            this.gameOver = true;
                        }
                    }
                }
            })
        });
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        if (this.enemyTimer > this.enemyInterval && !this.gameOver){
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
    }
    draw(context) {
        this.player.draw(context);
        this.ui.draw(context);
        this.enemies.forEach(enemy => {
            enemy.draw(context);
        });
    }
    addEnemy(){
        this.enemies.push(new Angler1(this));
    }
    checkCollision(rect1, rect2){
        return (rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y)
    }
}