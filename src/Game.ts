import { Input } from './Input';
import { Scene } from './Scene';

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    input: Input;
    currentScene: Scene | null = null;
    lastTime: number = 0;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.input = new Input();

        this.resize();
        window.addEventListener('resize', () => this.resize());

        requestAnimationFrame((time) => this.loop(time));
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setScene(scene: Scene) {
        if (this.currentScene) {
            this.currentScene.exit();
        }
        this.currentScene = scene;
        if (this.currentScene) {
            this.currentScene.enter();
        }
    }

    loop(time: number) {
        const dt = (time - this.lastTime) / 1000;
        this.lastTime = time;

        if (this.currentScene) {
            this.currentScene.update(dt);

            // Clear screen
            this.ctx.fillStyle = '#222';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.currentScene.draw(this.ctx);
        }

        requestAnimationFrame((t) => this.loop(t));
    }
}
