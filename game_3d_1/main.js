
import { Game } from "./game.js";
import { CubePlayer } from "./cubePlayer.js";


const game = new Game(window.innerWidth, window.innerHeight);
    game.init();

function animate() {

    requestAnimationFrame(animate);

    game.update();
}

animate();
