import { Scene } from '../core/Scene';
import { Game } from '../core/Game';
import { CharacterSelectionScene } from './CharacterSelectionScene';
import { SettingsScene } from './SettingsScene';
import { AchievementsScene } from './AchievementsScene';
import { TutorialScene } from './TutorialScene';

export class MenuScene extends Scene {
    options: string[] = ['PLAY', 'SETTINGS', 'ACHIEVEMENTS', 'TUTORIAL'];
    selectedOptionIndex: number = 0;

    constructor(game: Game) {
        super(game);
    }

    enter(): void {
        this.game.touchControls.hide();
    }

    update(_dt: number): void {
        let selectNext = false;
        let selectPrev = false;
        let selectOption = false;

        // Keyboard
        if (this.game.input.keys['ArrowDown'] && !this.game.input.isDown('ArrowDown_prev')) selectNext = true;
        if (this.game.input.keys['ArrowUp'] && !this.game.input.isDown('ArrowUp_prev')) selectPrev = true;
        if (this.game.input.keys['Enter'] || this.game.input.keys['Space']) selectOption = true;

        // Touch / Mouse
        if (this.game.input.mouse.down && !this.game.input.isDown('Mouse_prev')) {
            const y = this.game.input.mouse.y;
            const h = this.game.canvas.height;
            const optionHeight = 60;
            const startY = h / 2;

            // Check if touch is on an option
            this.options.forEach((_, index) => {
                const optY = startY + index * optionHeight;
                if (y >= optY - 30 && y <= optY + 30) {
                    this.selectedOptionIndex = index;
                    selectOption = true;
                }
            });
        }

        // Update Selection
        if (selectNext) {
            this.selectedOptionIndex = (this.selectedOptionIndex + 1) % this.options.length;
        }
        if (selectPrev) {
            this.selectedOptionIndex = (this.selectedOptionIndex - 1 + this.options.length) % this.options.length;
        }

        // Reset prev states
        this.game.input.keys['ArrowDown_prev'] = this.game.input.keys['ArrowDown'];
        this.game.input.keys['ArrowUp_prev'] = this.game.input.keys['ArrowUp'];
        this.game.input.keys['Mouse_prev'] = this.game.input.mouse.down;

        // Action
        if (selectOption) {
            switch (this.options[this.selectedOptionIndex]) {
                case 'PLAY':
                    this.game.setScene(new CharacterSelectionScene(this.game));
                    break;
                case 'SETTINGS':
                    this.game.setScene(new SettingsScene(this.game));
                    break;
                case 'ACHIEVEMENTS':
                    this.game.setScene(new AchievementsScene(this.game));
                    break;
                case 'TUTORIAL':
                    this.game.setScene(new TutorialScene(this.game));
                    break;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const w = this.game.canvas.width;
        const h = this.game.canvas.height;

        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#fff';
        // Dynamic font size: max 60px, but scale down for smaller screens
        const titleSize = Math.min(60, Math.floor(w * 0.12));
        ctx.font = `bold ${titleSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText('BIRD MOBA 2D', w / 2, h / 2 - 120);

        const optionHeight = 60;
        const startY = h / 2;

        this.options.forEach((option, index) => {
            const isSelected = index === this.selectedOptionIndex;
            ctx.fillStyle = isSelected ? 'lime' : '#888';
            ctx.font = isSelected ? 'bold 40px Arial' : '30px Arial';
            ctx.fillText(option, w / 2, startY + index * optionHeight);
        });

        ctx.fillStyle = '#666';
        ctx.font = '16px Arial';
        ctx.fillText('Use Arrow Keys/Touch to Select', w / 2, h - 30);
    }
}
