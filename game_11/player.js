import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit, states, State } from './playerStates.js';
import { CollisionAnimation } from './collisionAnimation.js';

export class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];

    }
    update(input, deltaTime) {


        this.checkCollision();
        this.currentState.handleInput(input);



        this.x += this.speed;
        if (input.includes('ArrowRight') && this.currentState !== this.states[6]) {
            this.speed = this.maxSpeed;
        }
        if (input.includes('ArrowLeft') && this.currentState !== this.states[6]) {
            this.speed = -this.maxSpeed;
        }
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;



        this.y += this.vy;
        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }

        if (this.y > this.game.height - this.height - this.game.groundMargin) {
            this.y = this.game.height - this.height - this.game.groundMargin;
        }

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

    }
    draw(context) {
        //context.fillStyle = 'black';
        //context.fillRect(this.x, this.y, this.width, this.height);
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed) {
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if (enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y) {
                //collision detected
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                if (this.currentState === this.states[states.ROLLING] || this.currentState === this.states[states.DIVING]) {
                    this.game.score++;
                   // this.game.particles.unshift(new Splash(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                } else {
                    //this.game.particles.unshift(new Dust(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                    this.setState(states.HIT, 0);
                }

            } 
        });
    }
}