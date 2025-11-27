import { GAME_CONFIG } from '../config/Constants';

export class Input {
    keys: { [key: string]: boolean } = {};
    mouse: { x: number; y: number; down: boolean } = { x: 0, y: 0, down: false };
    joystick: { x: number; y: number; active: boolean } = { x: 0, y: 0, active: false };
    isShooting: boolean = false;
    scale: number = 1;

    constructor(target: HTMLElement) {
        // Keyboard
        window.addEventListener('keydown', (e) => (this.keys[e.code] = true));
        window.addEventListener('keyup', (e) => (this.keys[e.code] = false));

        // Mouse
        const updateMouse = (clientX: number, clientY: number) => {
            const rect = target.getBoundingClientRect();
            // Calculate scale based on actual displayed size vs logical size
            // The 'scale' property in Game.ts is for drawing context.
            // Here we need to map screen coordinates to logical coordinates.
            
            // 1. Get position relative to canvas
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            // 2. Convert to logical space
            const scaleFactor = GAME_CONFIG.LOGICAL_RES.HEIGHT / rect.height;
            
            this.mouse.x = x * scaleFactor;
            this.mouse.y = y * scaleFactor;
        };

        window.addEventListener('mousemove', (e) => updateMouse(e.clientX, e.clientY));
        window.addEventListener('mousedown', (e) => {
            updateMouse(e.clientX, e.clientY);
            this.mouse.down = true;
        });
        window.addEventListener('mouseup', () => (this.mouse.down = false));

        // Touch support
        window.addEventListener(
            'touchstart',
            (e) => {
                if (e.touches.length > 0) {
                    updateMouse(e.touches[0].clientX, e.touches[0].clientY);
                    this.mouse.down = true;
                }
            },
            { passive: false },
        );

        window.addEventListener(
            'touchmove',
            (e) => {
                if (e.touches.length > 0) {
                    updateMouse(e.touches[0].clientX, e.touches[0].clientY);
                }
            },
            { passive: false },
        );

        window.addEventListener('touchend', () => {
            this.mouse.down = false;
        });
    }

    isDown(code: string): boolean {
        return !!this.keys[code];
    }

    reset() {
        this.keys = {};
        this.mouse.down = false;
        // Keep mouse position, just reset click state
    }

    setScale(s: number) {
        this.scale = s;
    }
}
