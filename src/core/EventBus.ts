export type GameEvents = {
    'GAME_OVER': { winner: 'player' | 'enemy'; message: string };
    'ENTITY_DIED': { entityId: string; type: 'player' | 'enemy' | 'ally' };
    'PROJECTILE_FIRED': { x: number; y: number };
};

export class EventBus {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private listeners: { [K in keyof GameEvents]?: ((payload: any) => void)[] } = {};

    on<K extends keyof GameEvents>(event: K, callback: (payload: GameEvents[K]) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(callback);
    }

    off<K extends keyof GameEvents>(event: K, callback: (payload: GameEvents[K]) => void) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event]!.filter(cb => cb !== callback);
    }

    emit<K extends keyof GameEvents>(event: K, payload: GameEvents[K]) {
        if (!this.listeners[event]) return;
        this.listeners[event]!.forEach(cb => cb(payload));
    }
}
