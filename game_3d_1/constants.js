export const GAME_CONFIG = {
    CAMERA: {
        FOV: 75,
        NEAR: 0.1,
        FAR: 1000,
        POSITION: { x: 4.61, y: 3, z: 9 },
        LOOK_AT: { x: 0, y: 0, z: 0 }
    },
    SCENE: {
        BACKGROUND_COLOR: 0x0c4a6e,
        DARK_BG_COLOR: '#0f172a'
    },
    PHYSICS: {
        GRAVITY: -0.002,
        FRICTION: 0.5,
        BOUNCE_DAMPING: 0.8,
        SLOWDOWN_FACTOR: 0.5
    },
    LIGHTING: {
        SUN_INTENSITY: 3,
        AMBIENT_INTENSITY: 0.5,
        SUN_POSITION: { x: 5, y: 10, z: 5 }
    },
    PLAYER: {
        WIDTH: 1,
        HEIGHT: 1,
        DEPTH: 1,
        MOVE_SPEED: 0.1,
        JUMP_FORCE: 0.08
    },
    ENEMY: {
        WIDTH: 1,
        HEIGHT: 1,
        DEPTH: 1,
        BASE_SPEED: 0.005,
        ACCELERATION: 0.0003,
        COLOR: 'red'
    },
    GROUND: {
        HEIGHT: 0.5,
        Y_OFFSET: -2,
        COLOR: '#29a6e9'
    },
    COLLISION: {
        DANGER_MARGIN: 1.5,
        MODES: {
            BOUNCE: 'bounce',
            SLOWDOWN: 'slowdown',
            BLOCK_PLAYER_ONLY: 'block-player-only'
        }
    }
};