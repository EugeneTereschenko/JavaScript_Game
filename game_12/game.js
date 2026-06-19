import { InputHandler } from "./input.js";
import { Player } from "./player.js";
import { UI } from "./ui.js";

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.keys = [];
        this.ammo = 20;
        this.maxAmmo = 50;
        this.ammoTimer = 0;
        this.ammoInterval = 500;
        this.ui = new UI(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
    }
    update(deltaTime) {
        this.player.update();
        if (this.ammoTimer > this.ammoInterval){
            if (this.ammo < this.maxAmmo) {
                this.ammo++;
                this.ammoTimer = 0;
            } 
        } else {
                this.ammoTimer += deltaTime;
        }
    }
    draw(context) {
        this.player.draw(context);
        this.ui.draw(context);
    }
}