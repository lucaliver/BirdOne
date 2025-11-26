import { Input } from '../core/Input';

export class TouchControls {
    input: Input;
    container: HTMLElement;
    joystickBase: HTMLElement;
    joystickStick: HTMLElement;
    shootBtn: HTMLElement;

    baseX: number = 0;
    baseY: number = 0;
    touchId: number | null = null;
    maxRadius: number = 40;

    constructor(input: Input) {
        this.input = input;
        this.container = document.getElementById('ui-layer')!;

        // Create Joystick UI
        this.joystickBase = document.createElement('div');
        this.joystickBase.className = 'joystick-base';
        this.joystickStick = document.createElement('div');
        this.joystickStick.className = 'joystick-stick';
        this.joystickBase.appendChild(this.joystickStick);
        this.container.appendChild(this.joystickBase);

        // Create Shoot Button UI
        this.shootBtn = document.createElement('div');
        this.shootBtn.className = 'shoot-btn';
        this.shootBtn.innerText = 'FIRE';
        this.container.appendChild(this.shootBtn);

        // Hide by default (Menu starts first)
        this.hide();

        this.setupEvents();
    }

    setupEvents() {
        // Joystick
        this.joystickBase.addEventListener(
            'touchstart',
            (e) => {
                e.preventDefault();
                const touch = e.changedTouches[0];
                this.touchId = touch.identifier;
                this.baseX = touch.clientX;
                this.baseY = touch.clientY;
                this.input.joystick.active = true;
            },
            { passive: false },
        );

        this.joystickBase.addEventListener(
            'touchmove',
            (e) => {
                e.preventDefault();
                if (this.touchId === null) return;

                for (let i = 0; i < e.changedTouches.length; i++) {
                    if (e.changedTouches[i].identifier === this.touchId) {
                        const touch = e.changedTouches[i];
                        const dx = touch.clientX - this.baseX;
                        const dy = touch.clientY - this.baseY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const angle = Math.atan2(dy, dx);

                        const force = Math.min(dist, this.maxRadius);
                        const stickX = Math.cos(angle) * force;
                        const stickY = Math.sin(angle) * force;

                        this.joystickStick.style.transform = `translate(${stickX}px, ${stickY}px)`;

                        // Normalize input -1 to 1
                        this.input.joystick.x = stickX / this.maxRadius;
                        this.input.joystick.y = stickY / this.maxRadius;
                    }
                }
            },
            { passive: false },
        );

        const endJoystick = (e: TouchEvent) => {
            for (let i = 0; i < e.changedTouches.length; i++) {
                if (e.changedTouches[i].identifier === this.touchId) {
                    this.touchId = null;
                    this.input.joystick.active = false;
                    this.input.joystick.x = 0;
                    this.input.joystick.y = 0;
                    this.joystickStick.style.transform = `translate(0px, 0px)`;
                }
            }
        };

        this.joystickBase.addEventListener('touchend', endJoystick);
        this.joystickBase.addEventListener('touchcancel', endJoystick);

        // Shoot Button
        this.shootBtn.addEventListener(
            'touchstart',
            (e) => {
                e.preventDefault();
                this.input.isShooting = true;
                this.shootBtn.style.background = 'rgba(255, 0, 0, 0.8)';
            },
            { passive: false },
        );

        const endShoot = (e: Event) => {
            e.preventDefault();
            this.input.isShooting = false;
            this.shootBtn.style.background = 'rgba(255, 0, 0, 0.5)';
        };

        this.shootBtn.addEventListener('touchend', endShoot);
        this.shootBtn.addEventListener('touchcancel', endShoot);
    }

    show() {
        this.joystickBase.style.display = 'flex';
        this.shootBtn.style.display = 'flex';
    }

    hide() {
        this.joystickBase.style.display = 'none';
        this.shootBtn.style.display = 'none';
    }
}
