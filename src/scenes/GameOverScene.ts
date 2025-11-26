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
        ctx.fillStyle = '#fff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.message, this.game.canvas.width / 2, this.game.canvas.height / 2 - 50);

        ctx.font = '24px Arial';
        ctx.fillText(
            'Press ENTER or Tap to Return to Menu',
            this.game.canvas.width / 2,
            this.game.canvas.height / 2 + 50,
        );
    }
}
