import './style.css';
import { Game } from './core/Game';
import { MenuScene } from './scenes/MenuScene';
import { AssetManager } from './core/AssetManager';
import { GAME_CONFIG } from './config/Constants';

const game = new Game(GAME_CONFIG.CANVAS_ID);

AssetManager.preload(() => {
    game.setScene(new MenuScene(game));
});

