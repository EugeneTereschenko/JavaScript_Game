export class LevelManager {
    constructor() {
        this.currentLevel = 1;
        this.levels = this.initializeLevels();
    }

    initializeLevels() {
        return {
            1: {
                name: 'Training Ground',
                arenaWidth: 10,
                arenaDepth: 50,
                initialSpawnRate: 300,
                enemySpeedMultiplier: 1,
                obstacles: [

                ]
            },
            2: {
                name: 'Narrow Pass',
                arenaWidth: 8,
                arenaDepth: 50,
                initialSpawnRate: 250,
                enemySpeedMultiplier: 1.1,
                obstacles: [
                    { x: 0, y: 0, z: 0, width: 1, height: 3, depth: 1, color: '#64748b'},
                    { x: -3.5, y: 0, z: 10, width: 1, height: 2.5, depth: 1, color: '#64748b'},
                    { x: 3.5, y: 0, z: 20, width: 1, height: 2.5, depth: 1, color: '#64748b'}
                ]
            },
            3: {
                name: 'Obstacle Course',
                arenaWidth: 9,
                arenaDepth: 50,
                initialSpawnRate: 220,
                enemySpeedMultiplier: 1.2,
                obstacles: [
                    { x: -3, y: 0, z: 5, width: 1.5, height: 2, depth: 1.5, color: '#475569'},
                    { x: 0, y: 0, z: 12, width: 2, height: 2.5, depth: 2, color: '#64748b'},
                    { x: 3, y: 0, z: 18, width: 1.5, height: 2, depth: 1.5, color: '#475569'},
                    { x: -3.5, y: 0, z: 28, width: 1, height: 2, depth: 1, color: '#64748b'},
                    { x: 3.5, y: 0, z: 35, width: 1, height: 2, depth: 1, color: '#64748b'}
                ]
            },
            4: {
                name: 'Maze Runner',
                arenaWidth: 10,
                arenaDepth: 50,
                initialSpawnRate: 180,
                enemySpeedMultiplier: 1.3,
                obstacles: [
                    { x: -2, y: 0, z: 3, width: 2, height: 2, depth: 0.5, color: '#334155'},
                    { x: 2, y: 0, z: 6, width: 2, height: 2, depth: 0.5, color: '#334155'},
                    { x: -4, y: 0, z: 12, width: 1.5, height: 2.5, depth: 3, color: '#475569'},
                    { x: 4, y: 0, z: 16, width: 1.5, height: 2.5, depth: 3, color: '#475569'},
                    { x: 0, y: 0, z: 24, width: 3, height: 2, depth: 1, color: '#334155'},
                    { x: -3.5, y: 0, z: 32, width: 1, height: 2.5, depth: 2, color: '#475569'},
                    { x: 3.5, y: 0, z: 38, width: 2, height: 2.5, depth: 2, color: '#475569'}
                ]
            },
            5: {
                name: 'Extreme Challenge',
                arenaWidth: 8,
                arenaDepth: 50,
                initialSpawnRate: 150,
                enemySpeedMultiplier: 1.5,
                obstacles: [
                    { x: -2.5, y: 0, z: 2, width: 1, height: 2, depth: 1, color: '#1e293b'},
                    { x: 2.5, y: 0, z: 2, width: 2, height: 2, depth: 1, color: '#1e293b'},
                    { x: 0, y: 0, z: 8, width: 1.5, height: 2.5, depth: 1.5, color: '#334155'},
                    { x: -3, y: 0, z: 14, width: 1, height: 2, depth: 1, color: '#1e293b'},
                    { x: 3, y: 0, z: 14, width: 1, height: 2, depth: 1, color: '#1e293b'},
                    { x: -2, y: 0, z: 20, width: 1.5, height: 2.5, depth: 1.5, color: '#334155'},
                    { x: 2, y: 0, z: 20, width: 1.5, height: 2.5, depth: 1.5, color: '#334155'},

                    { x: 0, y: 0, z: 26, width: 2, height: 2, depth: 1, color: '#334155'},
                    { x: -3, y: 0, z: 32, width: 2, height: 2, depth: 1, color: '#1e293b'},
                    { x: 3, y: 0, z: 32, width: 1, height: 2, depth: 1, color: '#1e293b'},
                    { x: -2.5, y: 0, z: 40, width: 1, height: 2, depth: 1, color: '#475569'},
                    { x: 2.5, y: 0, z: 42, width: 1, height: 2, depth: 1, color: '#475569'}
                ]
            },


        };
    }

    getLevel(levelNumber){
        return this.levels[levelNumber] || this.levels[1];
    }

    getCurrentLevel() {
        return this.getCurrentLevel(this.currentLevel);
    }

    nextLevel() {
        if (this.currentLevel < 5){
            this.currentLevel++;
            return true;
        }
        return false;
    }

    resetToLevel(levelNumber){
        if (levelNumber >= 1 && levelNumber <= 5){
            this.currentLevel = levelNumber;
            return true;
        }
        return false;
    }

    getTotalLevels() {
        return 5;
    }
}