import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { states } from './playerStates.js';
import { FlyingEnemy, SpinnerFlying, WormEnemy, GroundEnemy, HandEnemy, GroundZombieEnemy, ClimbingEnemy, SmallSpider, BatFlying, BatFlyingTwo, BatFlyingTree, RavenFlying, DiggerEnemy  } from './enemies.js';
import { UI } from './ui.js';

window.addEventListener('load', (e) => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 40;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.floatingMessages = [];
            this.particles = [];
            this.enemies = [];
            this.collisions = [];
            this.maxParticles = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.time = 0;
            this.maxTime = 30000;
            this.gameOver = false;
            this.lives = 5;
            this.winningScore = 40;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.player.currentState = this.player.states[states.SITTING];
            this.player.currentState.enter();
        }
        update(deltaTime) {
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            this.time += deltaTime;
            if (this.time > this.maxTime) {
                this.gameOver = true;
            }

            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });

            this.floatingMessages.forEach(message => {
                message.update();
            });

            this.particles.forEach((particle, index) => {
                particle.update();
            });
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }

            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });

            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.enemies =  this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.floatingMessages =  this.floatingMessages.filter(message => !message.markedForDeletion);

        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => enemy.draw(context));
            this.floatingMessages.forEach(message => {
                message.draw(context);
            });
            this.particles.forEach(particle => particle.draw(context));
            this.collisions.forEach(collision => collision.draw(context));
            this.UI.draw(context);
        }
        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5) {

                const groundEnemies = [
                    GroundEnemy,
                    DiggerEnemy,
                    GroundZombieEnemy,
                    HandEnemy,
                    WormEnemy 
                ]

                const EnemyClass = groundEnemies[Math.floor(Math.random() * groundEnemies.length)];

                this.enemies.push(new EnemyClass(this));
            } else if (this.speed > 0) {
                if (Math.random() < 0.5) {
                    this.enemies.push(new ClimbingEnemy(this));
                } else {
                    this.enemies.push(new SmallSpider(this));
                }
            }

            const flyingEnemies = [
                FlyingEnemy,
                BatFlying,
                BatFlyingTwo,
                BatFlyingTree,
                RavenFlying,
                SpinnerFlying
                ];

            const EnemyClass = flyingEnemies[Math.floor(Math.random() * flyingEnemies.length)];
            this.enemies.push(new EnemyClass(this));

        }

    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver){
        requestAnimationFrame(animate);
        }
    }
    animate(0);
});
