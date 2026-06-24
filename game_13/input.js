export class InputHandler{
    constructor(game, canvas){
        this.game = game;
        this.canvas = canvas;
        canvas.addEventListener('mousedown', (e) => {
            this.game.mouse.x = e.offsetX;
            this.game.mouse.y = e.offsetY;
            this.game.mouse.pressed = true;

            //console.log(this.game.mouse.x);
            //console.log(this.game.mouse.y);
        });
        canvas.addEventListener('mouseup', (e) => {
            this.game.mouse.x = e.offsetX;
            this.game.mouse.y = e.offsetY;
            this.game.mouse.pressed = false;

            //console.log(this.game.mouse.x);
            //console.log(this.game.mouse.y);
        });
        canvas.addEventListener('mousemove', (e) => {
            this.game.mouse.x = e.offsetX;
            this.game.mouse.y = e.offsetY;
            console.log("mouse move");
            console.log(this.game.mouse.x);
            console.log(this.game.mouse.y);
            console.log("##########");
        });
    }
}