import { Player } from "./player.js";
import { InputHandler } from "./input.js";

export class Game {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.mouse = {
            x: this.width * 0.5,
            y: this.height * 0.5,
            pressed: false
        }
        this.player = new Player(this);
        this.input = new InputHandler(this, this.canvas);

    }
    render(context){
        this.player.draw(context);
        this.player.update();
    }
}