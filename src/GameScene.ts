import { Scene } from './Scene';
import { Game } from './Game';
import { GameOverScene } from './GameOverScene';
import { Bird, type BirdRace } from './Bird';
import { Projectile } from './Projectile';

export class GameScene extends Scene {
    player: Bird;
    enemies: Bird[] = [];
    allies: Bird[] = [];
    projectiles: Projectile[] = [];
    gameTime: number = 60; // 60 seconds match

    constructor(game: Game, playerRace: BirdRace) {
        super(game);

        // Create Player
        this.player = new Bird(100, 300, playerRace, 'player');

        // Create Allies (4)
        for (let i = 0; i < 4; i++) {
            const races: BirdRace[] = ['Eagle', 'Owl', 'Parrot', 'Penguin'];
            const randomRace = races[Math.floor(Math.random() * races.length)];
            this.allies.push(new Bird(100, 100 + i * 100, randomRace, 'player'));
        }

        // Create Enemies (5)
        for (let i = 0; i < 5; i++) {
            const races: BirdRace[] = ['Eagle', 'Owl', 'Parrot', 'Penguin'];
            const randomRace = races[Math.floor(Math.random() * races.length)];
            this.enemies.push(new Bird(this.game.canvas.width - 100, 100 + i * 100, randomRace, 'enemy'));
        }
    }

    update(dt: number): void {
        this.gameTime -= dt;
        if (this.gameTime <= 0) {
            this.checkWinCondition();
            return;
        }

        // Player Movement
        this.player.vx = 0;
        this.player.vy = 0;
        if (this.game.input.keys['KeyW'] || this.game.input.keys['ArrowUp']) this.player.vy = -this.player.speed;
        if (this.game.input.keys['KeyS'] || this.game.input.keys['ArrowDown']) this.player.vy = this.player.speed;
        if (this.game.input.keys['KeyA'] || this.game.input.keys['ArrowLeft']) this.player.vx = -this.player.speed;
        if (this.game.input.keys['KeyD'] || this.game.input.keys['ArrowRight']) this.player.vx = this.player.speed;

        // Player Shooting
        if (this.game.input.mouse.down) {
            const proj = this.player.shoot(this.game.input.mouse.x, this.game.input.mouse.y);
            if (proj) this.projectiles.push(proj);
        }

        // AI Logic (Simple)
        this.updateAI(dt);

        // Update Entities
        this.player.update(dt);
        this.allies.forEach(e => e.update(dt));
        this.enemies.forEach(e => e.update(dt));
        this.projectiles.forEach(p => p.update(dt));

        // Cleanup Inactive Projectiles
        this.projectiles = this.projectiles.filter(p => p.active);

        // Collisions
        this.checkCollisions();

        // Check Death
        if (this.player.hp <= 0) {
            this.game.setScene(new GameOverScene(this.game, 'You Died! Defeat!'));
        }

        // Remove dead bots
        this.allies = this.allies.filter(a => a.hp > 0);
        this.enemies = this.enemies.filter(e => e.hp > 0);

        if (this.enemies.length === 0) {
            this.game.setScene(new GameOverScene(this.game, 'All Enemies Defeated! Victory!'));
        }
    }

    updateAI(_dt: number) {
        // Simple AI: Move towards nearest enemy and shoot
        const allPlayers = [this.player, ...this.allies];

        this.enemies.forEach(enemy => {
            // Find nearest target
            let nearest: Bird | null = null;
            let minDst = Infinity;

            allPlayers.forEach(p => {
                if (p.hp <= 0) return;
                const dist = Math.hypot(p.x - enemy.x, p.y - enemy.y);
                if (dist < minDst) {
                    minDst = dist;
                    nearest = p;
                }
            });

            if (nearest) {
                // Move towards
                const dx = (nearest as Bird).x - enemy.x;
                const dy = (nearest as Bird).y - enemy.y;
                const dist = Math.hypot(dx, dy);

                if (dist > 200) { // Keep distance
                    enemy.vx = (dx / dist) * enemy.speed * 0.5;
                    enemy.vy = (dy / dist) * enemy.speed * 0.5;
                } else {
                    enemy.vx = 0;
                    enemy.vy = 0;
                }

                // Shoot
                const proj = enemy.shoot((nearest as Bird).x, (nearest as Bird).y);
                if (proj) this.projectiles.push(proj);
            }
        });

        // Allies AI (similar to enemies but targeting enemies)
        this.allies.forEach(ally => {
            let nearest: Bird | null = null;
            let minDst = Infinity;

            this.enemies.forEach(e => {
                if (e.hp <= 0) return;
                const dist = Math.hypot(e.x - ally.x, e.y - ally.y);
                if (dist < minDst) {
                    minDst = dist;
                    nearest = e;
                }
            });

            if (nearest) {
                const dx = (nearest as Bird).x - ally.x;
                const dy = (nearest as Bird).y - ally.y;
                const dist = Math.hypot(dx, dy);

                if (dist > 200) {
                    ally.vx = (dx / dist) * ally.speed * 0.5;
                    ally.vy = (dy / dist) * ally.speed * 0.5;
                } else {
                    ally.vx = 0;
                    ally.vy = 0;
                }

                const proj = ally.shoot((nearest as Bird).x, (nearest as Bird).y);
                if (proj) this.projectiles.push(proj);
            }
        });
    }

    checkCollisions() {
        // Projectiles vs Birds
        const allBirds = [this.player, ...this.allies, ...this.enemies];

        this.projectiles.forEach(p => {
            if (!p.active) return;

            allBirds.forEach(b => {
                if (b.hp <= 0) return;
                if (p.owner === b) return; // Don't hit self
                if ((p.owner as Bird).team === b.team) return; // Don't hit teammates

                if (p.collidesWith(b)) {
                    b.hp -= p.damage;
                    p.active = false;
                }
            });
        });
    }

    checkWinCondition() {
        if (this.enemies.length < (this.allies.length + 1)) { // +1 for player
            this.game.setScene(new GameOverScene(this.game, 'Time Up! Victory (More Alive)!'));
        } else {
            this.game.setScene(new GameOverScene(this.game, 'Time Up! Defeat (Less Alive)!'));
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.player.draw(ctx);
        this.allies.forEach(e => e.draw(ctx));
        this.enemies.forEach(e => e.draw(ctx));
        this.projectiles.forEach(p => p.draw(ctx));

        // Draw HUD
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Time: ${Math.ceil(this.gameTime)}`, 20, 30);
        ctx.fillText(`HP: ${this.player.hp}/${this.player.maxHp}`, 20, 60);
        ctx.fillText(`Allies: ${this.allies.length} | Enemies: ${this.enemies.length}`, 20, 90);
    }
}
