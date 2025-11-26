import { Scene } from '../core/Scene';
import { Game } from '../core/Game';
import { GameScene } from './GameScene';
import { MenuScene } from './MenuScene';
import type { BirdRace } from '../entities/Bird';

export class CharacterSelectionScene extends Scene {
    races: BirdRace[] = ['Eagle', 'Owl', 'Pidgeon', 'Hummingbird'];
    selectedRaceIndex: number = 0;

    constructor(game: Game) {
        super(game);
    }

    update(_dt: number): void {
        // Selection
        let selectNext = false;
        let selectPrev = false;
        let startGame = false;
        let goBack = false;

        // Keyboard
        if (this.game.input.keys['ArrowRight'] && !this.game.input.isDown('ArrowRight_prev')) selectNext = true;
        if (this.game.input.keys['ArrowLeft'] && !this.game.input.isDown('ArrowLeft_prev')) selectPrev = true;
        if (this.game.input.keys['Enter'] || this.game.input.keys['Space']) startGame = true;
        if (this.game.input.keys['Escape']) goBack = true;

        // Touch / Mouse Click
        if (this.game.input.mouse.down && !this.game.input.isDown('Mouse_prev')) {
            const x = this.game.input.mouse.x;
            const y = this.game.input.mouse.y;
            const w = this.game.canvas.width;
            const h = this.game.canvas.height;

            // Back Button (Top-Left)
            if (x < 100 && y < 60) {
                goBack = true;
            }
            // Simple zones
            else if (y > h * 0.7) {
                // Bottom area for Start
                startGame = true;
            } else {
                if (x < w * 0.3) selectPrev = true;
                else if (x > w * 0.7) selectNext = true;
                else startGame = true; // Center tap also starts
            }
        }

        // Update State
        if (selectNext) {
            this.selectedRaceIndex = (this.selectedRaceIndex + 1) % this.races.length;
        }
        if (selectPrev) {
            this.selectedRaceIndex = (this.selectedRaceIndex - 1 + this.races.length) % this.races.length;
        }

        // Reset prev states
        this.game.input.keys['ArrowRight_prev'] = this.game.input.keys['ArrowRight'];
        this.game.input.keys['ArrowLeft_prev'] = this.game.input.keys['ArrowLeft'];
        this.game.input.keys['Mouse_prev'] = this.game.input.mouse.down;

        // Transitions
        if (goBack) {
            this.game.setScene(new MenuScene(this.game));
        } else if (startGame) {
            this.game.setScene(new GameScene(this.game, this.races[this.selectedRaceIndex]));
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const w = this.game.canvas.width;
        const h = this.game.canvas.height;

        ctx.fillStyle = '#fff';
        const titleSize = Math.min(48, Math.floor(w * 0.1));
        ctx.font = `${titleSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText('BIRD MOBA', w / 2, h / 2 - 100);

        ctx.font = '24px Arial';
        ctx.fillText('Select Your Bird:', w / 2, h / 2 - 20);

        this.races.forEach((race, index) => {
            const isSelected = index === this.selectedRaceIndex;
            ctx.fillStyle = isSelected ? 'yellow' : 'gray';
            ctx.font = isSelected ? 'bold 30px Arial' : '24px Arial';
            ctx.fillText(race, w / 2, h / 2 + 30 + index * 40);
        });

        // Draw Touch Controls Hints
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        // Left Arrow
        ctx.beginPath();
        ctx.moveTo(50, h / 2);
        ctx.lineTo(100, h / 2 - 30);
        ctx.lineTo(100, h / 2 + 30);
        ctx.fill();

        // Right Arrow
        ctx.beginPath();
        ctx.moveTo(w - 50, h / 2);
        ctx.lineTo(w - 100, h / 2 - 30);
        ctx.lineTo(w - 100, h / 2 + 30);
        ctx.fill();

        // Start Button
        ctx.fillStyle = 'lime';
        ctx.fillRect(w / 2 - 100, h - 100, 200, 60);
        ctx.fillStyle = 'black';
        ctx.font = 'bold 30px Arial';
        ctx.fillText('START', w / 2, h - 60);

        ctx.fillStyle = '#aaa';
        ctx.font = '16px Arial';
        ctx.fillText('Tap Left/Right to Select, Bottom to Start', w / 2, h - 20);

        // Back Button
        ctx.fillStyle = '#f00';
        ctx.fillRect(10, 10, 80, 40);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('BACK', 50, 38);
    }
}
