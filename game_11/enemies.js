class Enemy {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 160;
        this.spriteHeight = 119;
        this.width = 160;
        this.height = 119;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speedX = Math.random() * -1.5 - 0.5;
        this.speedY = 0;
        this.maxFrame = 4;
        this.markedForDeletion = false;
    }
    update(deltaTime) {
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}


export class FlyingEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.spriteWidth = 60;
        this.spriteHeight = 44;
        this.width = 60;
        this.height = 44;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById('enemyFlying');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.spriteWidth = 60;
        this.spriteHeight = 87;
        this.width = 60;
        this.height = 87;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('enemyPlant');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}


export class DiggerEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.spriteWidth = 260;
        this.spriteHeight = 180;
        this.width = this.spriteWidth / 4;
        this.height = this.spriteHeight / 4;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('enemDigger');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 7;
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}


export class GroundZombieEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.spriteWidth = 120;
        this.spriteHeight = 90;
        this.width = this.spriteWidth / 1.5;
        this.height = this.spriteHeight / 1.5;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('enemyGhostZombie');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 7;
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}

export class HandEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.spriteWidth = 56;
        this.spriteHeight = 75;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('enemyHand');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 7;
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}

export class WormEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.spriteWidth = 80;
        this.spriteHeight = 60;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('enemyWorm');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 5;
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}

export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.spriteWidth = 120;
        this.spriteHeight = 144;
        this.width = 120;
        this.height = 144;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
        this.image = document.getElementById('enemySpider');

    }
    update(deltaTime) {
        super.update(deltaTime);
        if (this.y > this.game.height - this.game.groundMargin - this.height) {
            this.speedY *= -1;
        }
        if (this.y < -this.height) {
            this.markedForDeletion = true;
        }

    }
    draw(context){
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + this.width / 2, 0);
        context.lineTo(this.x + this.width / 2, this.y + 50);
        context.stroke();  
    }
}

export class SmallSpider extends Enemy {
    constructor(game){
        super(game);
        this.game = game;
        this.spriteWidth = 312;
        this.spriteHeight = 168;
        this.width = this.spriteWidth / 4;
        this.height = this.spriteHeight / 4;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = 0;
        this.speedY = Math.random() * 0.1 + 0.2;
        this.maxFrame = 5;
        this.image = document.getElementById('enemySpiderSmall');
    }
    update(deltaTime) {
        super.update(deltaTime);
        if (this.y > this.game.height - this.game.groundMargin - this.height) {
            this.speedY *= -2;
        }
        if (this.y < -this.height) {
            this.markedForDeletion = true;
        }
    }
     draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, 0);
        ctx.lineTo(this.x + this.width / 2, this.y + 10);
        ctx.stroke();
        super.draw(ctx);
        ctx.restore();
    }
}



export class BatFlying extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.spriteWidth = 83;
        this.spriteHeight = 44;
        this.width = 83;
        this.height = 44;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById('enemBat1');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}


export class BatFlyingTwo extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.spriteWidth = 238;
        this.spriteHeight = 166;
        this.width = this.spriteWidth / 4;
        this.height = this.spriteHeight / 4;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 7;
        this.image = document.getElementById('enemBat2');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class BatFlyingTree extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.spriteWidth = 266;
        this.spriteHeight = 185;
        this.width = this.spriteWidth / 4;
        this.height = this.spriteHeight / 4;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById('enemBat3');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class RavenFlying extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.spriteWidth = 270;
        this.spriteHeight = 190;
        this.width = this.spriteWidth / 4;
        this.height = this.spriteHeight / 4;
        this.x = this.game.width + 10 + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById('enemyRaven');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
    
}

export class SpinnerFlying extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.spriteWidth = 214;
        this.spriteHeight = 210;
        this.width = this.spriteWidth / 4;
        this.height = this.spriteHeight / 4;
        this.x = this.game.width + 10 + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 8;
        this.image = document.getElementById('enemySpinner');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
    
}