export class InputHandler {
    constructor() {
        this.keys = [];
        this.validKeys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', ' ', 'Enter'];
        this.initListeners();
    }

    initListeners() {
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    onKeyDown(e) {
        if (!this.validKeys.includes(e.key)) return;
        if (this.keys.indexOf(e.key) === -1) {
            this.keys.push(e.key);
        }
    }

    onKeyUp(e) {
        if (!this.validKeys.includes(e.key)) return;
        const index = this.keys.indexOf(e.key);
        if (index > -1) {
            this.keys.splice(index, 1);
        }
    }
}