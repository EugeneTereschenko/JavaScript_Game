export class InputHandler{
    constructor(game, canvas){
        this.game = game;
        this.canvas = canvas;
        canvas.addEventListener('mousedown', (e) => {
            this.game.mouse.x = e.offsetX;
            this.game.mouse.y = e.offsetY;
            this.game.mouse.pressed = true;

        });
        canvas.addEventListener('mouseup', (e) => {
            this.game.mouse.x = e.offsetX;
            this.game.mouse.y = e.offsetY;
            this.game.mouse.pressed = false;

        });
        canvas.addEventListener('mousemove', (e) => {
            if (this.game.mouse.pressed) {
                this.game.mouse.x = e.offsetX;
                this.game.mouse.y = e.offsetY;
            }
            //console.log("mouse move", this.game.mouse.x, this.game.mouse.y, "#######");
        });
        window.addEventListener('keydown', e => {
            if (e.key == 'd'){
                this.game.debug = !this.game.debug;
            }
        });
    }
}