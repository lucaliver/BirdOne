import { Scene } from '../core/Scene';
import { Game } from '../core/Game';
import { MenuScene } from './MenuScene';

export class GameOverScene extends Scene {
    message: string;

    constructor(game: Game, message: string) {
        super(game);
        this.message = message;
    }

    enter(): void {
        this.game.touchControls.hide();
    }

    update(_dt: number): void {
        if (this.game.input.keys['Enter'] || this.game.input.keys['Space'] || this.game.input.mouse.down) {
            this.game.setScene(new MenuScene(this.game));
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const scale = ctx.getTransform().a;
        const w = ctx.canvas.width / scale;
        const h = 1080;

        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.message, w / 2, h / 2 - 50);

        ctx.font = '20px Arial';
        ctx.fillText(
            'Press Enter / Tap to Return to Hub',
            w / 2,
            h / 2 + 50,
        );
    }
}
