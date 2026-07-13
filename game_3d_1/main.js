
import { Game } from "./game.js";
import { UIManager } from "./ui.js";


const game = new Game(window.innerWidth, window.innerHeight);
const uiManager = new UIManager();
    
game.init();

let animationId = null;
let frames = 0;

function animate() {

    animationId = requestAnimationFrame(animate);
    frames++;
    game.update(animationId, frames);
    

    const levelInfo = game.getLevelInfo();
    uiManager.update(levelInfo);
}

animate();
