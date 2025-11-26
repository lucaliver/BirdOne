import { Scene } from './Scene';
import { Game } from './Game';
import { GameScene } from './GameScene';
import type { BirdRace } from './Bird';

export class MenuScene extends Scene {
    races: BirdRace[] = ['Eagle', 'Owl', 'Parrot', 'Penguin'];
    selectedRaceIndex: number = 0;

    constructor(game: Game) {
        super(game);
    }

    update(_dt: number): void {
        // Selection
        if (this.game.input.keys['ArrowRight'] && !this.game.input.isDown('ArrowRight_prev')) {
            this.selectedRaceIndex = (this.selectedRaceIndex + 1) % this.races.length;
            this.game.input.keys['ArrowRight_prev'] = true; // Simple debounce hack
        }
        if (!this.game.input.keys['ArrowRight']) {
            this.game.input.keys['ArrowRight_prev'] = false;
        }

        if (this.game.input.keys['ArrowLeft'] && !this.game.input.isDown('ArrowLeft_prev')) {
            this.selectedRaceIndex = (this.selectedRaceIndex - 1 + this.races.length) % this.races.length;
            this.game.input.keys['ArrowLeft_prev'] = true;
        }
        if (!this.game.input.keys['ArrowLeft']) {
            this.game.input.keys['ArrowLeft_prev'] = false;
        }

        // Start
        if (this.game.input.keys['Enter'] || this.game.input.keys['Space']) {
            this.game.setScene(new GameScene(this.game, this.races[this.selectedRaceIndex]));
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#fff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('BIRD MOBA', this.game.canvas.width / 2, this.game.canvas.height / 2 - 100);

        ctx.font = '24px Arial';
        ctx.fillText('Select Your Bird:', this.game.canvas.width / 2, this.game.canvas.height / 2 - 20);

        this.races.forEach((race, index) => {
            const isSelected = index === this.selectedRaceIndex;
            ctx.fillStyle = isSelected ? 'yellow' : 'gray';
            ctx.font = isSelected ? 'bold 30px Arial' : '24px Arial';
            ctx.fillText(race, this.game.canvas.width / 2, this.game.canvas.height / 2 + 30 + (index * 40));
        });

        ctx.fillStyle = '#aaa';
        ctx.font = '16px Arial';
        ctx.fillText('Use Arrow Keys to Select, Enter to Start', this.game.canvas.width / 2, this.game.canvas.height - 50);
    }
}
