
import { Game } from "./game.js";


const game = new Game(window.innerWidth, window.innerHeight);
    game.init();

let frames = 0;
function animate() {

    const animationId = requestAnimationFrame(animate);

    game.update(animationId, frames);
    frames++;
}

animate();
