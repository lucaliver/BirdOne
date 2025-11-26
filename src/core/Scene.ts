import { Game } from './Game';

export abstract class Scene {
    game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    abstract update(dt: number): void;
    abstract draw(ctx: CanvasRenderingContext2D): void;

    // Optional lifecycle hooks
    enter(): void {}
    exit(): void {}
}
