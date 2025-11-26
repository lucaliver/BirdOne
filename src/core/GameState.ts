import { Bird } from '../entities/Bird';
import { Projectile } from '../entities/Projectile';
import { GAME_CONFIG } from '../config/Constants';

export class GameState {
    player: Bird | null = null;
    allies: Bird[] = [];
    enemies: Bird[] = [];
    projectiles: Projectile[] = [];

    matchTime: number = GAME_CONFIG.MATCH_DURATION;
    score: { player: number; enemy: number } = { player: 0, enemy: 0 };
    isGameOver: boolean = false;

    constructor() {}

    init(player: Bird, allies: Bird[], enemies: Bird[]) {
        this.player = player;
        this.allies = allies;
        this.enemies = enemies;
        this.projectiles = [];
        this.matchTime = GAME_CONFIG.MATCH_DURATION;
        this.score = { player: 0, enemy: 0 };
        this.isGameOver = false;
    }

    update(dt: number) {
        if (this.isGameOver) return;

        this.matchTime -= dt;
        if (this.matchTime <= 0) {
            this.matchTime = 0;
            this.isGameOver = true;
        }

        // Remove dead entities
        this.allies = this.allies.filter((a) => a.hp > 0);
        this.enemies = this.enemies.filter((e) => e.hp > 0);
        this.projectiles = this.projectiles.filter((p) => !p.markedForDeletion);
    }

    addProjectile(p: Projectile) {
        this.projectiles.push(p);
    }
}
