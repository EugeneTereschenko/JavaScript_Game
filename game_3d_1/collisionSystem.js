export class CollisionSystem {
    constructor(config = {}) {
        this.enemyObstacleMode = config.enemyObstacleMode || 'block-player-only';
        this.collisions = [];
        this.collisionRadius = config.collisionRadius || 2; // Distance threshold for enemy-obstacle avoidance
        this.enemyCollisionRadius = config.enemyCollisionRadius || 1.5; // Distance threshold for enemy-enemy avoidance
    }

    checkAABBCollision(box1, box2) {
        const xCollision = box1.right >= box2.left && box1.left <= box2.right;
        const yCollision = box1.top >= box2.bottom && box1.bottom <= box2.top;
        const zCollision = box1.front >= box2.back && box1.back <= box2.front;
        return xCollision && yCollision && zCollision;
    }

    checkRadiusCollision(box1, box2, radius = this.collisionRadius) {
        const dx = box1.position.x - box2.position.x;
        const dy = box1.position.y - box2.position.y;
        const dz = box1.position.z - box2.position.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        return distance <= radius;
    }

    checkEnemyRadiusCollision(enemy1, enemy2, radius = this.enemyCollisionRadius) {
        const dx = enemy1.position.x - enemy2.position.x;
        const dy = enemy1.position.y - enemy2.position.y;
        const dz = enemy1.position.z - enemy2.position.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        return distance <= radius;
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

    getNearestObstacle(enemy, obstacles) {
        let nearest = null;
        let minDistance = Infinity;
        for (const obstacle of obstacles) {
            const distInfo = this.getDistance(enemy, obstacle);
            if (distInfo.distance < minDistance) {
                minDistance = distInfo.distance;
                nearest = { obstacle, distance: distInfo.distance, distInfo };
            }
        }
        return nearest;
    }

    handleEnemyObstacleCollision(enemy, obstacle) {
        if (this.enemyObstacleMode === 'bounce') {
            this.bounceOff(enemy, obstacle);
        } else if (this.enemyObstacleMode === 'slowdown') {
            this.slowDown(enemy);
        }
    }

    handleEnemyObstacleAvoidance(enemy, obstacle, radius = this.collisionRadius) {
        const dx = enemy.position.x - obstacle.position.x;
        const dz = enemy.position.z - obstacle.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance < radius && distance > 0) {
            const normalizedX = dx / distance;
            const normalizedZ = dz / distance;

            enemy.position.x += normalizedX * 0.05;
            enemy.position.z += normalizedZ * 0.05;
            enemy.velocity.x = normalizedX * 0.1;
            enemy.velocity.z = normalizedZ * 0.05;
        }
    }

    handleEnemyEnemyAvoidance(enemy1, enemy2, radius = this.enemyCollisionRadius) {
        const dx = enemy1.position.x - enemy2.position.x;
        const dz = enemy1.position.z - enemy2.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance < radius && distance > 0) {
            const normalizedX = dx / distance;
            const normalizedZ = dz / distance;

            // Push enemy1 away from enemy2
            enemy1.position.x += normalizedX * 0.03;
            enemy1.position.z += normalizedZ * 0.03;
            enemy1.velocity.x = normalizedX * 0.05;
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

    setCollisionRadius(radius) {
        this.collisionRadius = radius;
    }

    setEnemyCollisionRadius(radius) {
        this.enemyCollisionRadius = radius;
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
