import { Entity } from './Entity';

export class Projectile extends Entity {
    owner: Entity;
    damage: number;
    active: boolean = true;

    constructor(x: number, y: number, vx: number, vy: number, owner: Entity, damage: number) {
        super(x, y, 8, 8, 'yellow');
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
}
