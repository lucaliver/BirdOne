import { Scene } from '../core/Scene';
import { Game } from '../core/Game';
import { CharacterSelectionScene } from './CharacterSelectionScene';
import { SettingsScene } from './SettingsScene';
import { AchievementsScene } from './AchievementsScene';
import { TutorialScene } from './TutorialScene';
import { AssetManager } from '../core/AssetManager';

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
            // Logical Height is always 1080
            const h = 1080;
            const optionHeight = 60;
            const startY = h / 2 - 100;

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
        const scale = ctx.getTransform().a;
        const w = ctx.canvas.width / scale;
        const h = 1080;

        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, w, h);

        // Menu Background
        const bg = AssetManager.getImage('MenuBackground');
        if (bg) {
            ctx.drawImage(bg, 0, 0, w, h);
        } else {
            // Fallback Title
            ctx.fillStyle = '#fff';
            const titleSize = Math.min(60, Math.floor(w * 0.12));
            ctx.font = `bold ${titleSize}px Arial`;
            ctx.textAlign = 'center';
            ctx.fillText('BIRD MOBA 2D', w / 2, h / 2 - 250);
        }

        const optionHeight = 60;
        const startY = h / 2 - 100;
        const menuHeight = this.options.length * optionHeight;
        const menuWidth = 400;
        const boxPadding = 20;

        // Draw Opaque Box
        // Draw Opaque Box with Rounded Corners
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        const bx = w / 2 - menuWidth / 2 - boxPadding;
        const by = startY - boxPadding;
        const bw = menuWidth + boxPadding * 2;
        const bh = menuHeight + boxPadding * 2;
        const br = 20; // Border radius

        ctx.beginPath();
        ctx.moveTo(bx + br, by);
        ctx.arcTo(bx + bw, by, bx + bw, by + bh, br);
        ctx.arcTo(bx + bw, by + bh, bx, by + bh, br);
        ctx.arcTo(bx, by + bh, bx, by, br);
        ctx.arcTo(bx, by, bx + bw, by, br);
        ctx.closePath();
        ctx.fill();

        ctx.textBaseline = 'middle';
        this.options.forEach((option, index) => {
            const isSelected = index === this.selectedOptionIndex;
            ctx.fillStyle = isSelected ? 'lime' : '#ccc';
            ctx.font = isSelected ? 'bold 40px Arial' : '30px Arial';
            // Center in the 60px height slot. startY is top of first slot.
            // slot center is startY + index*60 + 30
            ctx.fillText(option, w / 2, startY + index * optionHeight + 30);
        });
        ctx.textBaseline = 'alphabetic'; // Reset

        ctx.fillStyle = '#666';
        ctx.font = '16px Arial';
        ctx.fillText('Use Arrow Keys/Touch to Select', w / 2, h - 30);
    }
}
