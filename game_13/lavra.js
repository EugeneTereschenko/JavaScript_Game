export class Lavra {
    constructor(game, x, y){
        this.game = game;
        this.collisionX = x;
        this.collisionY = y;
        this.collisionRadius = 30;
        this.image = document.getElementById('lavra');
        this.spriteWidth = 150;
        this.spriteHeight = 150;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.spriteX;
        this.spriteY;
        this.speedY = 1 + Math.random();
    }
    update(){
        this.collisionY -= this.speedY;
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5;
    }
    draw(context){
        context.drawImage(this.image, this.spriteX, this.spriteY);
    }
}