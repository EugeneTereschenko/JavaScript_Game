import { Game } from './game.js';

export class Projectile {
    constructor(game, x, y){
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 3;
        this.speedX = 3;
        this.markForDeletion = false;
        this.image = document.getElementById('projectile');
    }
    update(){
        this.x += this.speedX;
        if (this.x > this.game.width * 0.8) {
            this.markForDeletion = true;
        }
    }
    draw(context){
        //context.fillStyle = 'yellow';
        //context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y);
    }
}


export class Particle {
    constructor(game, x, y){
        this.game = game;
        this.x = x;
        this.y = y;
        this.image = document.getElementById('gears');    
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.spriteSize = 50;
        this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);
        this.size = this.spriteSize * this.sizeModifier;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * -15;
        this.gravity = 0.5;
        this.markForDeletion = false;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
        this.bounced = 0;
        this.bottomBounceBoundary = Math.random() * 100 + 60;
    }
    update(){
        this.angle += this.va;
        this.speedY += this.gravity;
        this.x -= this.speedX;
        this.y += this.speedY;
        if (this.y > this.game.height + this.size  || this.x < 0 - this.size) {
            this.markForDeletion = true;
        }
        if (this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 2){
            this.bounced++;
            this.speedY *= -0.5;
        }
    }
    draw(context){
        //console.log(this.sizeModifier);
        //context.drawImage(this.image, this.x, this.y, this.size, this.size);
        context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.x, this.y, this.size, this.size);
    }
}