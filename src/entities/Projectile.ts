import { Entity } from './Entity';
import { COLORS } from '../config/Constants';
import { AssetManager } from '../core/AssetManager';

export class Projectile extends Entity {
    owner: Entity;
    damage: number;
    active: boolean = true;

    constructor(x: number, y: number, vx: number, vy: number, owner: Entity, damage: number) {
        super(x, y, 32, 32, COLORS.PROJECTILE);
        this.vx = vx;
        this.vy = vy;
        this.owner = owner;
        this.damage = damage;
    }

    update(dt: number) {
        super.update(dt);
        // Deactivate if out of bounds (assuming 2000x2000 world for now, or just screen)
        // For now, just simple lifetime or bounds check
        // Let's assume screen bounds for simplicity of the prototype
        if (this.x < -100 || this.x > 3000 || this.y < -100 || this.y > 3000) {
            this.active = false;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        const img = AssetManager.getImage('Projectile');
        if (img) {
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            
            // Rotate based on velocity
            if (this.vx !== 0 || this.vy !== 0) {
                const angle = Math.atan2(this.vy, this.vx);
                ctx.rotate(angle);
            }

            ctx.drawImage(img, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        } else {
            super.draw(ctx);
        }
    }
}
