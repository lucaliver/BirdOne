export class Input {
    keys: { [key: string]: boolean } = {};
    mouse: { x: number, y: number, down: boolean } = { x: 0, y: 0, down: false };

    constructor() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mousedown', () => {
            this.mouse.down = true;
        });

        window.addEventListener('mouseup', () => {
            this.mouse.down = false;
        });
    }

    isDown(code: string): boolean {
        return !!this.keys[code];
    }
}
