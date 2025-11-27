import { Entity } from './Entity';
import { Projectile } from './Projectile';
import { BIRD_STATS, COLORS } from '../config/Constants';
import { AssetManager } from '../core/AssetManager';

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
        super(x, y, 80, 80, team === 'player' ? COLORS.PLAYER : COLORS.ENEMY);
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
        // Draw Sprite
        const img = AssetManager.getImage(this.race);
        if (img) {
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            
            // Rotate based on velocity
            if (this.vx !== 0 || this.vy !== 0) {
                const angle = Math.atan2(this.vy, this.vx);
                ctx.rotate(angle);
            }

            // Draw image centered
            ctx.drawImage(img, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        } else {
            // Fallback
            super.draw(ctx);
        }

        // Draw HP bar
        const hpPercent = this.hp / this.maxHp;
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y - 10, this.width, 5);
        ctx.fillStyle = 'lime';
        ctx.fillRect(this.x, this.y - 10, this.width * hpPercent, 5);

        // Draw Race Name
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        
        // Outline
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.strokeText(this.race, this.x + this.width / 2, this.y - 15);

        // Fill
        if (this.team === 'player') {
            ctx.fillStyle = '#00BFFF'; // Deep Sky Blue
        } else {
            ctx.fillStyle = '#FF4500'; // Orange Red
        }
        ctx.fillText(this.race, this.x + this.width / 2, this.y - 15);
    }
}
