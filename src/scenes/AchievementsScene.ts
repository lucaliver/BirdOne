import { Scene } from '../core/Scene';
import { Game } from '../core/Game';
import { MenuScene } from './MenuScene';

export class AchievementsScene extends Scene {
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
        const scale = ctx.getTransform().a;
        const w = ctx.canvas.width / scale;
        const h = 1080;

        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#fff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('ACHIEVEMENTS', w / 2, h / 2 - 50);

        ctx.font = '24px Arial';
        ctx.fillText('(Placeholder)', w / 2, h / 2);

        // Back Button (Gray Arrow)
        ctx.fillStyle = '#888';
        ctx.beginPath();
        ctx.moveTo(60, 20);
        ctx.lineTo(30, 40);
        ctx.lineTo(60, 60);
        ctx.fill();
    }
}
