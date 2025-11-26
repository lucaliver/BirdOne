import { Input } from './Input';
import { Scene } from './Scene';
import { TouchControls } from '../ui/TouchControls';

import { GAME_CONFIG } from '../config/Constants';

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    input: Input;
    touchControls: TouchControls;
    currentScene: Scene | null = null;
    lastTime: number = 0;
    scale: number = 1;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.input = new Input(this.canvas);
        this.touchControls = new TouchControls(this.input);

        this.resize();
        window.addEventListener('resize', () => this.resize());

        requestAnimationFrame((time) => this.loop(time));
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Scale based on height to keep gameplay consistent vertically
        // Target height is logical height (e.g. 1080)
        this.scale = this.canvas.height / GAME_CONFIG.LOGICAL_RES.HEIGHT;

        // Pass scale to input for coordinate correction
        this.input.setScale(this.scale);
    }

    setScene(scene: Scene) {
        if (this.currentScene) {
            this.currentScene.exit();
        }
        this.input.reset(); // Clear input to prevent "double tap" across scenes
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

            this.ctx.save();
            this.ctx.scale(this.scale, this.scale);
            this.currentScene.draw(this.ctx);
            this.ctx.restore();
        }

        requestAnimationFrame((t) => this.loop(t));
    }
}
