const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 700;

const exposions = [];
let canvasPosition = canvas.getBoundingClientRect();
console.log(canvasPosition);



class Exposion {
    constructor(x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = 'boom.wav';
    }
    update() {
        if (this.frame === 0) {
            this.sound.play();
        }
        this.timer++;
        if (this.timer % 10 === 0) {
            this.frame++;
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, -this.width/2, -this.height/2, this.width, this.height);
        ctx.restore();
    }
}



window.addEventListener('click', function(e) {

    createAnimation(e);
    //console.log(exposions);
    //let explosion1 = new Exposion(positionX, positionY);
    //explosion1.update();
    //explosion1.draw();
    //ctx.clearRect(positionX, positionY, 50, 50);
    //ctx.fillStyle = 'white';
    //ctx.fillRect(positionX, positionY, 50, 50);
    //ctx.drawImage(explosion1.image, explosion1.frame*explosion1.spriteWidth, 0, explosion1.spriteWidth, explosion1.spriteHeight, positionX, positionY, explosion1.width, explosion1.height);
});


/*
window.addEventListener('mousemove', function(e) {

    createAnimation(e);
});
*/

function createAnimation(e){
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    exposions.push(new Exposion(positionX, positionY));
}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < exposions.length; i++) {
        exposions[i].update();
        exposions[i].draw();
        if (exposions[i].frame > 5) {
            exposions.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
};

animate();

/*

ctx.fillStyle = 'white';
ctx.fillRect(50, 50, 100, 150);

*/