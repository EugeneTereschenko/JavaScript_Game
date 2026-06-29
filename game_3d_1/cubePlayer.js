import { InputHandler } from "./input.js";

export class CubePlayer{
    constructor(cube){
        this.cube = cube;
        this.input = new InputHandler();
    }
    update(){
        if (this.input.keys.includes('ArrowLeft')){
            this.cube.position.x -= 0.05;
        }
        if (this.input.keys.includes('ArrowRight')){
            this.cube.position.x += 0.05;
        }
        if (this.input.keys.includes('ArrowUp')){
            this.cube.position.z -= 0.05;
        }
        if (this.input.keys.includes('ArrowDown')){
            this.cube.position.z += 0.05;
        }
    }
}