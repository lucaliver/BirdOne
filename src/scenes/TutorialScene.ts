import { Scene } from '../core/Scene';
import { Game } from '../core/Game';
import { MenuScene } from './MenuScene';

export class TutorialScene extends Scene {
    constructor(game: Game) {
        super(game);
    }

    update(_dt: number): void {
        if (this.game.input.keys['Escape']) {
            this.game.setScene(new MenuScene(this.game));
        }

        if (this.game.input.mouse.down && !this.game.input.isDown('Mouse_prev')) {
            const x = this.game.input.mouse.x;
            const y = this.game.input.mouse.y;
            // Back Button
            if (x < 100 && y < 60) {
                this.game.setScene(new MenuScene(this.game));
            }
        }
        this.game.input.keys['Mouse_prev'] = this.game.input.mouse.down;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const w = this.game.canvas.width;
        const h = this.game.canvas.height;

        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#fff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('TUTORIAL', w / 2, h / 2 - 50);

        ctx.font = '24px Arial';
        ctx.fillText('Use WASD/Arrows to Move', w / 2, h / 2);
        ctx.fillText('Click/Tap to Shoot', w / 2, h / 2 + 40);

        // Back Button
        ctx.fillStyle = '#f00';
        ctx.fillRect(10, 10, 80, 40);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('BACK', 50, 38);
    }
}
