import { Box } from './box.js';
import { GAME_CONFIG } from './constants.js';

export class EnemyManager {
    constructor(scene, levelManager) {
        this.scene = scene;
        this.levelManager = levelManager;
        this.enemies = [];
        this.enemiesDefeated = 0;
    }

    spawnEnemy(speedMultiplier = 1) {
        const level = this.levelManager.getCurrentLevel();
        const enemy = new Box({
            width: GAME_CONFIG.ENEMY.WIDTH,
            height: GAME_CONFIG.ENEMY.HEIGHT,
            depth: GAME_CONFIG.ENEMY.DEPTH,
            position: {
                x: (Math.random() - 0.5) * (level.arenaWidth - 1),
                y: 0,
                z: -20
            },
            velocity: {
                x: 0,
                y: 0,
                z: GAME_CONFIG.ENEMY.BASE_SPEED * speedMultiplier
            },
            color: GAME_CONFIG.ENEMY.COLOR,
            isEnemy: true
        });
        enemy.castShadow = true;
        this.scene.add(enemy);
        this.enemies.push(enemy);
        return enemy;
    }

    removeEnemy(enemy) {
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
            this.scene.remove(enemy);
            this.enemies.splice(index, 1);
            this.enemiesDefeated++;
        }
    }

    updateAll(ground) {
        this.enemies.forEach(enemy => {
            enemy.update(ground);
            enemy.updateEnemy();
        });
    }

    clear() {
        this.enemies.forEach(enemy => this.scene.remove(enemy));
        this.enemies = [];
    }

    getAll() {
        return this.enemies;
    }

    getCount() {
        return this.enemies.length;
    }
}