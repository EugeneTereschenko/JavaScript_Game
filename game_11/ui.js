export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.color = 'white';
        this.livesImage = document.getElementById('lives');
    }
    draw(context) {
        context.save();
        context.fillStyle = this.game.fontColor;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.font = this.fontSize + 'px ' + this.fontFamily;
        //score
        context.fillText('Score: ' + this.game.score, 20, 50);
        //timer
        const formattedTime = (this.game.time * 0.001).toFixed(1);
        context.fillText('Timer: ' + formattedTime, 20, 80);
        //
        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
        }
        //game over messages
        if (this.game.gameOver) {
            context.textAlign = 'center';
            let message1;
            let message2;
            if (this.game.score > this.game.winningScore) {
                message1 = 'Most Wondrous!';
                message2 = 'Well done explorer!';
            } else {
                message1 = 'Blazes!';
                message2 = 'Get out there and try again!';
            }
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
            context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 20);
        }
        context.restore();
    } 
}