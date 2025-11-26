import { Bird } from '../entities/Bird';
import { GameState } from './GameState';

export class BotController {
    bot: Bird;
    gameState: GameState;
    target: Bird | null = null;

    // Simple cooldown to avoid spamming target search every frame
    searchTimer: number = 0;
    searchInterval: number = 0.5; // Search every 0.5s

    constructor(bot: Bird, gameState: GameState) {
        this.bot = bot;
        this.gameState = gameState;
    }

    update(dt: number) {
        if (this.bot.hp <= 0) return;

        // 1. Find Target
        this.searchTimer -= dt;
        if (this.searchTimer <= 0 || (this.target && this.target.hp <= 0)) {
            this.findTarget();
            this.searchTimer = this.searchInterval;
        }

        if (!this.target) return;

        // 2. Move & Shoot
        const dx = this.target.x - this.bot.x;
        const dy = this.target.y - this.bot.y;
        const dist = Math.hypot(dx, dy);

        // Movement Logic
        if (dist > 200) {
            // Move towards
            this.bot.vx = (dx / dist) * this.bot.speed * 0.5;
            this.bot.vy = (dy / dist) * this.bot.speed * 0.5;
        } else if (dist < 100) {
            // Back away if too close
            this.bot.vx = -(dx / dist) * this.bot.speed * 0.5;
            this.bot.vy = -(dy / dist) * this.bot.speed * 0.5;
        } else {
            // Stand still
            this.bot.vx = 0;
            this.bot.vy = 0;
        }

        // Shooting Logic
        // Simple chance to shoot to avoid perfect aim laser beam
        if (Math.random() < 0.05) {
            const proj = this.bot.shoot(this.target.x, this.target.y);
            if (proj) this.gameState.addProjectile(proj);
        }
    }

    findTarget() {
        let potentialTargets: Bird[] = [];

        if (this.bot.team === 'player') {
            potentialTargets = this.gameState.enemies;
        } else {
            potentialTargets = [this.gameState.player!, ...this.gameState.allies];
        }

        let nearest: Bird | null = null;
        let minDst = Infinity;

        potentialTargets.forEach((t) => {
            if (t && t.hp > 0) {
                const d = Math.hypot(t.x - this.bot.x, t.y - this.bot.y);
                if (d < minDst) {
                    minDst = d;
                    nearest = t;
                }
            }
        });

        this.target = nearest;
    }
}
