import './style.css'
import { Game } from './Game'
import { MenuScene } from './MenuScene'

// Wait for DOM
window.addEventListener('DOMContentLoaded', () => {
  const game = new Game('game-canvas');
  game.setScene(new MenuScene(game));
});
