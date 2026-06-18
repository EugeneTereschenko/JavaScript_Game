export class Layer {
    constructor(game, width, height, speedModifier,  image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update() {
        if (this.x <= -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layer1image = layer1;
        this.layer2image = layer2;
        this.layer3image = layer3;
        this.layer4image = layer4;
        this.layer5image = layer5;
        this.backgroundLayers = [
            new Layer(this.game, this.width, this.height, 0, this.layer1image),
            new Layer(this.game, this.width, this.height, 0.2, this.layer2image),
            new Layer(this.game, this.width, this.height, 0.4, this.layer3image),
            new Layer(this.game, this.width, this.height, 0.8, this.layer4image),
            new Layer(this.game, this.width, this.height, 1, this.layer5image)
        ];

        this.layer1Ver2 = layer1Forest;
        this.layer2Ver2 = layer2Forest;
        this.layer3Ver2 = layer3Forest;
        this.layer4Ver2 = layer4Forest;
        this.layer5Ver2 = layer5Forest; 


        this.backgroundLayersVer2 = [
            new Layer(this.game, this.width, this.height, 0, this.layer1Ver2),
            new Layer(this.game, this.width, this.height, 0.2, this.layer2Ver2),
            new Layer(this.game, this.width, this.height, 0.4, this.layer3Ver2),
            new Layer(this.game, this.width, this.height, 0.8, this.layer4Ver2),
            new Layer(this.game, this.width, this.height, 1, this.layer5Ver2)
        ];
    }
    update() {
        //this.backgroundLayers.forEach(layer => layer.update());
        this.backgroundLayersVer2.forEach(layer => layer.update());
    }
    draw(context) {
        //this.backgroundLayers.forEach(layer => layer.draw(context));
        this.backgroundLayersVer2.forEach(layer => layer.draw(context));
    }
}