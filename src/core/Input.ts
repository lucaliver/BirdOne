export class Input {
    keys: { [key: string]: boolean } = {};
    mouse: { x: number; y: number; down: boolean } = { x: 0, y: 0, down: false };
    joystick: { x: number; y: number; active: boolean } = { x: 0, y: 0, active: false };
    isShooting: boolean = false;

    constructor(target: HTMLElement) {
        // Keyboard events are global
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        // Mouse/Touch events
        const updateMouse = (clientX: number, clientY: number) => {
            const rect = target.getBoundingClientRect();
            this.mouse.x = clientX - rect.left;
            this.mouse.y = clientY - rect.top;
        };

        window.addEventListener('mousemove', (e) => {
            updateMouse(e.clientX, e.clientY);
        });

        window.addEventListener('mousedown', () => {
            this.mouse.down = true;
        });

        window.addEventListener('mouseup', () => {
            this.mouse.down = false;
        });

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
}
