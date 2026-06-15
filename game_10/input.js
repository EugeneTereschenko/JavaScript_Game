export default class InputHandler {
    constructor() {
        this.lastKey = '';
       // console.log('InputHandler initialized');
        window.addEventListener('keydown', (e) => {
           // console.log(e.key);
            switch(e.key) {
                case 'ArrowLeft':
                    this.lastKey = 'PRESS_LEFT';
                    break;
                case 'ArrowRight':
                    this.lastKey = 'PRESS_RIGHT';
                    break;
                case 'ArrowUp':
                    this.lastKey = 'PRESS_UP';
                    break;
                case 'ArrowDown':
                    this.lastKey = 'PRESS_DOWN';
                    break;
            }
        });
        window.addEventListener('keyup', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.lastKey = 'RELEASE_LEFT';
                    break;
                case 'ArrowRight':
                    this.lastKey = 'RELEASE_RIGHT';
                    break;
                case 'ArrowUp':
                    this.lastKey = 'RELEASE_UP';
                    break;
                case 'ArrowDown':
                    this.lastKey = 'RELEASE_DOWN';
                    break;
            }
        });
    }
}