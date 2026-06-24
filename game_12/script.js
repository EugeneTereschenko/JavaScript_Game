import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Game } from './game.js';

window.addEventListener('load', (e) => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 1500;
    canvas.height = 500;


    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        //console.log(deltaTime);
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        game.draw(ctx);
        game.update(deltaTime);

        requestAnimationFrame(animate);
    }

    animate(0);
});