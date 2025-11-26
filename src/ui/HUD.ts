import { GameState } from '../core/GameState';

export class HUD {
    gameState: GameState;

    constructor(gameState: GameState) {
        this.gameState = gameState;
    }

    draw(ctx: CanvasRenderingContext2D) {
        // We are drawing in a scaled context (Height = 1080).
        // We need to find the visible width in logical units.
        // ctx.canvas.width is the Window Width.
        // The scale applied is ctx.canvas.height / 1080.
        // So visible logical width = ctx.canvas.width / scale.

        // We can retrieve the scale from the transform matrix
        const scale = ctx.getTransform().a;
        const logicalWidth = ctx.canvas.width / scale;

        ctx.save();

        // 1. Health Bar (Top Left)
        // Add background for better contrast
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(10, 10, 350, 60);

        const player = this.gameState.player;
        if (player) {
            const hpPercent = Math.max(0, player.hp / player.maxHp);

            // Bar Background
            ctx.fillStyle = '#444';
            ctx.fillRect(20, 20, 300, 30);

            // Bar Foreground
            ctx.fillStyle = hpPercent > 0.5 ? 'lime' : hpPercent > 0.2 ? 'orange' : 'red';
            ctx.fillRect(20, 20, 300 * hpPercent, 30);

            // Border
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.strokeRect(20, 20, 300, 30);

            // Text
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 24px Arial'; // Larger font
            ctx.textAlign = 'left';
            ctx.fillText(`HP: ${Math.ceil(player.hp)}`, 330, 44);
        }

        // 2. Timer (Top Center)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(logicalWidth / 2 - 60, 10, 120, 50);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.ceil(this.gameState.matchTime)}`, logicalWidth / 2, 48);

        // 3. Score / Teams (Top Right)
        // Background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(logicalWidth - 260, 10, 250, 80);

        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'right';

        // Allies
        ctx.fillStyle = 'cyan';
        const alliesCount = this.gameState.allies.length + (player && player.hp > 0 ? 1 : 0);
        ctx.fillText(`Allies: ${alliesCount}`, logicalWidth - 20, 40);

        // Enemies
        ctx.fillStyle = '#ff4444';
        ctx.fillText(`Enemies: ${this.gameState.enemies.length}`, logicalWidth - 20, 80);

        ctx.restore();
    }
}
