import { Scene } from '../core/Scene';
import { Game } from '../core/Game';
import { GameScene } from './GameScene';
import { MenuScene } from './MenuScene';
import type { BirdRace } from '../entities/Bird';
import { AssetManager } from '../core/AssetManager';

export class CharacterSelectionScene extends Scene {
    races: BirdRace[] = ['Eagle', 'Owl', 'Pidgeon', 'Hummingbird'];
    selectedRaceIndex: number = 0;

    constructor(game: Game) {
        super(game);
    }

    update(_dt: number): void {
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
            const w = this.game.canvas.width / this.game.scale;
            const h = 1080;

            // Back Button (Top-Left)
            if (x < 100 && y < 60) {
                goBack = true;
            }
            // Select Button (Bottom)
            else if (y > h - 150 && y < h - 50 && x > w / 2 - 100 && x < w / 2 + 100) {
                startGame = true;
            }
            // Left Arrow Zone
            else if (x < w * 0.3) {
                selectPrev = true;
            }
            // Right Arrow Zone
            else if (x > w * 0.7) {
                selectNext = true;
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
        const scale = ctx.getTransform().a;
        const w = ctx.canvas.width / scale;
        const h = 1080;

        // Background
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, w, h);

        // Title
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SELECT YOUR HERO', w / 2, 100);

        // Current Character Sprite
        const race = this.races[this.selectedRaceIndex];
        const img = AssetManager.getImage(race);
        if (img) {
            const size = 200;
            ctx.drawImage(img, w / 2 - size / 2, h / 2 - size / 2, size, size);
        }

        // Character Name
        ctx.fillStyle = '#00BFFF';
        ctx.font = 'bold 40px Arial';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.strokeText(race, w / 2, h / 2 + 150);
        ctx.fillText(race, w / 2, h / 2 + 150);

        // Left Arrow
        ctx.fillStyle = '#888';
        ctx.beginPath();
        ctx.moveTo(100, h / 2);
        ctx.lineTo(150, h / 2 - 40);
        ctx.lineTo(150, h / 2 + 40);
        ctx.fill();

        // Right Arrow
        ctx.beginPath();
        ctx.moveTo(w - 100, h / 2);
        ctx.lineTo(w - 150, h / 2 - 40);
        ctx.lineTo(w - 150, h / 2 + 40);
        ctx.fill();

        // Select Button
        ctx.fillStyle = 'lime';
        ctx.fillRect(w / 2 - 100, h - 150, 200, 80);
        ctx.fillStyle = 'black';
        ctx.font = 'bold 30px Arial';
        ctx.fillText('SELECT', w / 2, h - 100);

        // Back Button (Gray Arrow)
        ctx.fillStyle = '#888';
        ctx.beginPath();
        ctx.moveTo(60, 20);
        ctx.lineTo(30, 40);
        ctx.lineTo(60, 60);
        ctx.fill();
    }
}
