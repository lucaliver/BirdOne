import './style.css';
import { Game } from './core/Game';
import { MenuScene } from './scenes/MenuScene';
import { GAME_CONFIG } from './config/Constants';

// Wait for DOM
window.addEventListener('DOMContentLoaded', () => {
    const game = new Game(GAME_CONFIG.CANVAS_ID);
    game.setScene(new MenuScene(game));
});
