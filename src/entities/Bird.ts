import { Entity } from './Entity';
import { Projectile } from './Projectile';
import { BIRD_STATS, COLORS } from '../config/Constants';

export type BirdRace = 'Eagle' | 'Owl' | 'Pidgeon' | 'Hummingbird';

export class Bird extends Entity {
    race: BirdRace;
    hp: number;
    maxHp: number;
    attackDamage: number;
    speed: number;
    cooldown: number = 0;
    maxCooldown: number = 0.5; // Seconds between shots
    team: 'player' | 'enemy';

    constructor(x: number, y: number, race: BirdRace, team: 'player' | 'enemy') {
        super(x, y, 32, 32, team === 'player' ? COLORS.PLAYER : COLORS.ENEMY);
        this.race = race;
        this.team = team;

        // Stats based on race
        switch (race) {
            case 'Eagle':
                this.maxHp = BIRD_STATS.EAGLE.MAX_HP;
                this.attackDamage = BIRD_STATS.EAGLE.DAMAGE;
                this.speed = BIRD_STATS.EAGLE.SPEED;
                break;
            case 'Owl':
                this.maxHp = BIRD_STATS.OWL.MAX_HP;
                this.attackDamage = BIRD_STATS.OWL.DAMAGE;
                this.speed = BIRD_STATS.OWL.SPEED;
                break;
            case 'Pidgeon':
                this.maxHp = BIRD_STATS.PIDGEON.MAX_HP;
                this.attackDamage = BIRD_STATS.PIDGEON.DAMAGE;
                this.speed = BIRD_STATS.PIDGEON.SPEED;
                break;
            case 'Hummingbird':
                this.maxHp = BIRD_STATS.HUMMINGBIRD.MAX_HP;
                this.attackDamage = BIRD_STATS.HUMMINGBIRD.DAMAGE;
                this.speed = BIRD_STATS.HUMMINGBIRD.SPEED;
                break;
        }
        this.hp = this.maxHp;
    }

    update(dt: number) {
        super.update(dt);
        if (this.cooldown > 0) {
            this.cooldown -= dt;
        }
    }

    shoot(targetX: number, targetY: number): Projectile | null {
        if (this.cooldown > 0) return null;

        const dx = targetX - (this.x + this.width / 2);
        const dy = targetY - (this.y + this.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist === 0) return null;

        const speed = 500;
        const vx = (dx / dist) * speed;
        const vy = (dy / dist) * speed;

        this.cooldown = this.maxCooldown;
        return new Projectile(
            this.x + this.width / 2 - 4,
            this.y + this.height / 2 - 4,
            vx,
            vy,
            this,
            this.attackDamage,
        );
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);

        // Draw HP bar
        const hpPercent = this.hp / this.maxHp;
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y - 10, this.width, 5);
        ctx.fillStyle = 'lime';
        ctx.fillRect(this.x, this.y - 10, this.width * hpPercent, 5);

        // Draw Race Name
        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.race, this.x + this.width / 2, this.y - 15);
    }
}
