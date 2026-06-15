export class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.maxSpeed = 10;

    }
    update(input) {
        this.x += this.speed;
        if (input.includes('ArrowRight')) {
            this.speed = this.maxSpeed;
        }
        if (input.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed;
        }
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;



        if (input.includes('ArrowUp') && this.onGround()) {
            this.vy -= 25;
        }
                this.y += this.vy;
        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }

    }
    draw(context) {
        //context.fillStyle = 'black';
        //context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height;
    }
}