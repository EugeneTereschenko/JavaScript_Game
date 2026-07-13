export class CollisionSystem {
    constructor(config = {}) {
        this.enemyObstacleMode = config.enemyObstacleMode || 'block-player-only';
        this.collisions = [];
    }

    checkAABBCollision(box1, box2) {
        const xCollision = box1.right >= box2.left && box1.left <= box2.right;
        const yCollision = box1.top >= box2.bottom && box1.bottom <= box2.top;
        const zCollision = box1.front >= box2.back && box1.back <= box2.front;
        return xCollision && yCollision && zCollision;
    }

    checkCollisionWithVelocity(box1, box2) {
        const xCollision = box1.right >= box2.left && box1.left <= box2.right;
        const yCollision = box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom;
        const zCollision = box1.front >= box2.back && box1.back <= box2.front;
        return xCollision && yCollision && zCollision;
    }

    getDistance(box, obstacle) {
        const xDistance = box.right < obstacle.left
            ? obstacle.left - box.right
            : box.left > obstacle.right
                ? box.left - obstacle.right
                : 0;
        const yDistance = box.top < obstacle.bottom
            ? obstacle.bottom - box.top
            : box.bottom > obstacle.top
                ? box.bottom - obstacle.top
                : 0;
        const zDistance = box.front < obstacle.back
            ? obstacle.back - box.front
            : box.back > obstacle.front
                ? box.back - obstacle.front
                : 0;
        return {
            xDistance,
            yDistance,
            zDistance,
            distance: Math.sqrt(xDistance * xDistance + yDistance * yDistance + zDistance * zDistance)
        };
    }

    handleEnemyObstacleCollision(enemy, obstacle) {
        if (this.enemyObstacleMode === 'bounce') {
            this.bounceOff(enemy, obstacle);
        } else if (this.enemyObstacleMode === 'slowdown') {
            this.slowDown(enemy);
        }
    }

    bounceOff(object, obstacle) {
        const dx = Math.abs(object.position.x - obstacle.position.x);
        const dz = Math.abs(object.position.z - obstacle.position.z);
        if (dx > dz) {
            object.velocity.x *= -0.8;
        } else {
            object.velocity.z *= -0.8;
        }
    }

    slowDown(object, factor = 0.5) {
        object.velocity.x *= factor;
        object.velocity.z *= factor;
    }

    setEnemyObstacleMode(mode) {
        const validModes = ['bounce', 'slowdown', 'block-player-only'];
        if (validModes.includes(mode)) {
            this.enemyObstacleMode = mode;
            return true;
        }
        console.error('Invalid collision mode. Use: bounce, slowdown, or block-player-only');
        return false;
    }
}