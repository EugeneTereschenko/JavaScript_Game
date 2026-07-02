export class UIManager {
    constructor(){
        this.uiContainer = null;
        this.levelDisplay = null;
        this.scoreDisplay = null;
        this.init();
    }

    init() {
        this.uiContainer = document.createElement('div');
        this.uiContainer.id = 'ui-container';
        this.uiContainer.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            color: #fff;
            font-family: Arial, sans-serif;
            font-size: 18px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
            z-index: 100;
            `;

        this.levelDisplay = document.createElement('div');
        this.levelDisplay.id = 'level-info';
        this.levelDisplay.style.cssText = `
            margin-bottom: 10px;
            padding: 10px;
            background: rgba(0, 0, 0, 0.5);
            border-left: 4px solid #29a6e9;
            border-radius: 4px;
        `;

        this.scoreDisplay = document.createElement('dev');
        this.scoreDisplay.id = 'score-info';
        this.scoreDisplay.style.cssText = `
            padding: 10 px;
            background: rgba(0, 0, 0, 0.5);
            border-left: 4px solid #10b981;
            border-radius: 4px;
        `;

        this.uiContainer.appendChild(this.levelDisplay);
        this.uiContainer.appendChild(this.scoreDisplay);
        document.body.appendChild(this.uiContainer);
    }

    update(levelInfo){
        if (this.levelDisplay){
            this.levelDisplay.innerHTML =`
                <div><strong>Level ${levelInfo.levelNumber}:</strong> ${levelInfo.levelName}</div>
                <div style="font-size: 14px; color: #cbd5e1; margin-top: 5px;">${levelInfo.levelNumber} of ${levelInfo.totalLevels}</div>
            `;
        }


        if (this.scoreDisplay) {
            this.scoreDisplay.innerHTML = `
                <div><strong>Score:</strong>${levelInfo.score}</div>
                <div style="font-size: 14px; color: #cbd5e1;">Enemies Defeated: ${levelInfo.enemiesDefeated}</div>
            `;
        }
    }


    showLevelTransition(levelName){
        const transitionDiv = documnet.createElement('div');
        trantitionDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: trannslate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        padding: 40px;
        border-radius: 10px;
        text-align: center;
        font-size: 32px;
        z-index: 200;
        `;
        transitionDiv.innerHTML = `
            <div style="margin-bottom: 20px;">LEVEL UP!</div>
            <div style="font-size: 24px;">${levelName}</div>
        `;
        document.body.appendChild(transitionDiv);

        setTimeout(() => {
            transitionDiv.remove();
        }, 2000);
    }


    remove() {
        if (this.uiContainer && this.uiContainer.parentNore){
            this.uiContainer.parentNode.removeChild(this.uiContainer);
        }
    }
}