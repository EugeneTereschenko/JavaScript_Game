import { Game } from './game.js';

class Layer {
    constructor(game, image, speedModifier){
        this.game = game;
        this.image = image;
        this.speedModifier = speedModifier;
        this.width = 1280;
        this.height = 720;
        this.x = 0;
        this.y = 0;

    }
    update(){
        if (this.x <= -this.width){
            this.x = 0;
        }
        this.x -= this.game.speed * this.speedModifier;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}


export class Background {
    constructor(game){
        this.game = game;
        this.image1 = document.getElementById('background');
        this.image2 = document.getElementById('overlay');
        this.layer1 = new Layer(this.game, this.image1, 0);
        this.layer2 = new Layer(this.game, this.image2, 0);

        this.layers = [this.layer1, this.layer2];
    }
    update(){
        this.layers.forEach(layer => layer.update());
    }
    draw(context){
        this.layers.forEach(layer => layer.draw(context));
    }
}