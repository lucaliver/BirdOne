# BIRD MOBA 2D - DOCUMENTAZIONE

## 1. PANORAMICA PROGETTO
Videogioco d'azione single-player in stile MOBA (5v5) su browser. Il giocatore controlla un uccello contro bot AI.
**Tech Stack:** TypeScript, Vite, HTML5 Canvas (Vanilla).

## 2. DESCRIZIONE FUNZIONALE

### GAMEPLAY
*   **Formato:** 5v5 (1 Giocatore + 4 Bot Alleati vs 5 Bot Nemici).
*   **Durata:** 60 secondi.
*   **Vittoria:** Eliminare tutti i nemici o avere più sopravvissuti allo scadere del tempo.
*   **Sconfitta:** Morte del giocatore o meno sopravvissuti.

### PERSONAGGI (RAZZE)
*   **EAGLE:** Bilanciato (Velocità/Danno).
*   **OWL:** Danno alto, Lento.
*   **PARROT:** Veloce, Danno basso (Glass Cannon).
*   **PENGUIN:** Tank (HP alti), Lento.

### CONTROLLI
*   **Movimento:** `WASD` o `Frecce`.
*   **Attacco:** `Click Sinistro` (Spara al cursore).
*   **Menu:** `Frecce` per scegliere, `Invio` per confermare.

## 3. ARCHITETTURA TECNICA

### CORE ENGINE
*   **`Game.ts`**: Gestisce loop (`requestAnimationFrame`), canvas e scene.
*   **`Input.ts`**: Gestisce input tastiera/mouse.

### SCENE SYSTEM
*   **`Scene.ts`**: Classe base astratta.
*   **`MenuScene.ts`**: Selezione personaggio.
*   **`GameScene.ts`**: Logica di gioco, collisioni, AI.
*   **`GameOverScene.ts`**: Schermata finale.

### ENTITÀ & AI
*   **`Entity.ts`**: Oggetto base (pos, vel, collisioni).
*   **`Bird.ts`**: Logica personaggio (statistiche, cooldown).
*   **`Projectile.ts`**: Proiettili.
*   **AI**: Macchina a stati finiti semplice (Cerca nemico -> Muovi -> Spara).

## 4. GUIDA SVILUPPO

### SETUP
```bash
npm install
npm run dev   # Server sviluppo
npm run build # Build produzione
```

### ESTENSIONI
*   **Nuova Razza:** Aggiungi a `BirdRace` in `Bird.ts` e definisci stats nel costruttore.
*   **Nuova Scena:** Estendi `Scene` e usa `game.setScene()`.
