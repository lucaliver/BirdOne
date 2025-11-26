import { Scene } from '../core/Scene';
import { Game } from '../core/Game';
import { GameOverScene } from './GameOverScene';
import { Bird, type BirdRace } from '../entities/Bird';
import { GameState } from '../core/GameState';
import { BotController } from '../core/BotController';
import { HUD } from '../ui/HUD';

export class GameScene extends Scene {
    gameState: GameState;
    botControllers: BotController[] = [];
    hud: HUD;

    constructor(game: Game, playerRace: BirdRace) {
        super(game);
        this.gameState = new GameState();
        this.hud = new HUD(this.gameState);

        // Create Player
        const player = new Bird(100, 300, playerRace, 'player');

        // Create Allies (4)
        const allies: Bird[] = [];
        for (let i = 0; i < 4; i++) {
            const races: BirdRace[] = ['Eagle', 'Owl', 'Pidgeon', 'Hummingbird'];
            const randomRace = races[Math.floor(Math.random() * races.length)];
            const ally = new Bird(100, 100 + i * 100, randomRace, 'player');
            allies.push(ally);
            this.botControllers.push(new BotController(ally, this.gameState));
        }

        // Create Enemies (5)
        const enemies: Bird[] = [];
        // We need logical width here.
        // Since we don't have ctx here, we can estimate it or use a safe value.
        // Or we can ask Game for the scale.
        const logicalWidth = this.game.canvas.width / this.game.scale;

        for (let i = 0; i < 5; i++) {
            const races: BirdRace[] = ['Eagle', 'Owl', 'Pidgeon', 'Hummingbird'];
            const randomRace = races[Math.floor(Math.random() * races.length)];
            const enemy = new Bird(logicalWidth - 100, 100 + i * 100, randomRace, 'enemy');
            enemies.push(enemy);
            this.botControllers.push(new BotController(enemy, this.gameState));
        }

        this.gameState.init(player, allies, enemies);
    }

    enter(): void {
        // Show controls only if touch device (simple check)
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            this.game.touchControls.show();
        }
    }

    exit(): void {
        this.game.touchControls.hide();
    }

    update(dt: number): void {
        this.gameState.update(dt);

        if (this.gameState.isGameOver) {
            this.checkWinCondition();
            return;
        }

        const player = this.gameState.player!;

        // Player Movement
        player.vx = 0;
        player.vy = 0;

        // Keyboard
        if (this.game.input.keys['KeyW'] || this.game.input.keys['ArrowUp']) player.vy = -player.speed;
        if (this.game.input.keys['KeyS'] || this.game.input.keys['ArrowDown']) player.vy = player.speed;
        if (this.game.input.keys['KeyA'] || this.game.input.keys['ArrowLeft']) player.vx = -player.speed;
        if (this.game.input.keys['KeyD'] || this.game.input.keys['ArrowRight']) player.vx = player.speed;

        // Joystick Override
        if (this.game.input.joystick.active) {
            player.vx = this.game.input.joystick.x * player.speed;
            player.vy = this.game.input.joystick.y * player.speed;
        }

        // Player Shooting
        if (this.game.input.mouse.down) {
            const proj = player.shoot(this.game.input.mouse.x, this.game.input.mouse.y);
            if (proj) this.gameState.addProjectile(proj);
        }

        // Touch Shooting
        if (this.game.input.isShooting) {
            let targetX = player.x + (player.vx || 100);
            let targetY = player.y + player.vy;

            let nearest: Bird | null = null;
            let minDst = 400;
            this.gameState.enemies.forEach((e) => {
                if (e.hp <= 0) return;
                const dist = Math.hypot(e.x - player.x, e.y - player.y);
                if (dist < minDst) {
                    minDst = dist;
                    nearest = e;
                }
            });

            if (nearest) {
                targetX = (nearest as Bird).x;
                targetY = (nearest as Bird).y;
            }

            const proj = player.shoot(targetX, targetY);
            if (proj) this.gameState.addProjectile(proj);
        }

        // AI Logic
        this.botControllers.forEach((bot) => bot.update(dt));

        // Update Entities
        player.update(dt);
        this.gameState.allies.forEach((e) => e.update(dt));
        this.gameState.enemies.forEach((e) => e.update(dt));
        this.gameState.projectiles.forEach((p) => p.update(dt));

        // Collisions
        this.checkCollisions();

        // Check Death
        if (player.hp <= 0) {
            this.game.setScene(new GameOverScene(this.game, 'You Died! Defeat!'));
        }

        if (this.gameState.enemies.length === 0) {
            this.game.setScene(new GameOverScene(this.game, 'All Enemies Defeated! Victory!'));
        }
    }

    // updateAI removed - handled by BotController

    checkCollisions() {
        const allBirds = [this.gameState.player!, ...this.gameState.allies, ...this.gameState.enemies];

        this.gameState.projectiles.forEach((p) => {
            if (!p.active) return;

            allBirds.forEach((b) => {
                if (b.hp <= 0) return;
                if (p.owner === b) return;
                if ((p.owner as Bird).team === b.team) return;

                if (p.collidesWith(b)) {
                    b.hp -= p.damage;
                    p.active = false;
                }
            });
        });
    }

    checkWinCondition() {
        if (this.gameState.enemies.length < this.gameState.allies.length + 1) {
            this.game.setScene(new GameOverScene(this.game, 'Time Up! Victory (More Alive)!'));
        } else {
            this.game.setScene(new GameOverScene(this.game, 'Time Up! Defeat (Less Alive)!'));
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.gameState.player) this.gameState.player.draw(ctx);
        this.gameState.allies.forEach((e) => e.draw(ctx));
        this.gameState.enemies.forEach((e) => e.draw(ctx));
        this.gameState.projectiles.forEach((p) => p.draw(ctx));

        // Draw HUD
        this.hud.draw(ctx);
    }
}
