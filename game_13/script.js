import { Game } from "./game.js";

window.addEventListener('load', (e)=> {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    ctx.fillStyle = 'white';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    const game = new Game(canvas);
    game.init();
    console.log(game);


    let lastTime = 0;
    function animate(timeStamp){

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        game.render(ctx, deltaTime);
        window.requestAnimationFrame(animate);
    }

    animate(0);
})