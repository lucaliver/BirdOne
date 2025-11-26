# BIRD MOBA 2D - DOCUMENTAZIONE TECNICA

## 1. PANORAMICA TECNOLOGICA

### STACK TECNOLOGICO
*   **Linguaggio:** TypeScript (Strict Mode).
*   **Build Tool:** Vite (HMR, Optimized Build).
*   **Rendering:** HTML5 Canvas API.

### STRUTTURA DEL PROGETTO
Il progetto è organizzato per dominio:

```
/src
  ├── core/             # Motore del gioco
  │   ├── Game.ts       # Loop principale, Scene Management
  │   ├── Input.ts      # Gestione input (Mouse, Keyboard, Touch)
  │   ├── Scene.ts      # Classe base Scene
  │   └── Utils.ts      # Helper matematici
  ├── scenes/           # Schermate di gioco
  │   ├── MenuScene.ts  # Main Hub
  │   ├── CharacterSelectionScene.ts
  │   ├── GameScene.ts
  │   ├── GameOverScene.ts
  │   ├── SettingsScene.ts
  │   ├── AchievementsScene.ts
  │   └── TutorialScene.ts
  ├── entities/         # Oggetti di gioco
  │   ├── Entity.ts     # Classe base
  │   ├── Bird.ts       # Logica personaggi
  │   └── Projectile.ts # Logica proiettili
  ├── ui/               # Interfaccia Utente
  │   ├── TouchControls.ts # Joystick e Bottoni
  │   └── HUD.ts        # (Placeholder)
  ├── config/           # Configurazioni globali
  │   └── Constants.ts  # Velocità, danni, colori
  └── main.ts           # Entry point
```

### ARCHITETTURA & PRACTICES
*   **Game Loop:** Implementato con `requestAnimationFrame` e calcolo del `dt`.
*   **Scene Management:** Sistema di transizione tra scene (`enter`, `exit`, `update`, `draw`).
*   **Input Handling:** Sistema centralizzato che normalizza Mouse e Touch, con supporto al reset tra scene.
*   **OOP:** Architettura basata su ereditarietà (`Entity` -> `Bird`).
*   **Code Quality:** Linting (ESLint) e Formatting (Prettier) attivi. Strict Typing abilitato.
*   **Git:** Uso di Conventional Commits.

---

## 2. ARCHITETTURA SEMPLIFICATA (NEXT STEPS)

Per mantenere il gioco leggero e manutenibile su mobile/web, adotteremo questi specifici "mattoni" architetturali.

### A) GAMESTATE CENTRALE
Un singolo oggetto/classe `GameState` che funge da "Single Source of Truth" per la partita corrente.
*   **Contiene:** Tempo partita, Punteggio Team, Stato Vittoria/Sconfitta, Riferimento al Player, Lista Entità.
*   **Uso:** Tutto il resto (HUD, GameOver, AI) legge da qui. Niente stati sparsi.

### B) AI MINIMALE (BOT CONTROLLER)
Niente Behavior Trees complessi. Una classe `BotController` semplice:
*   Ogni X ms sceglie un target (il player o un nemico vicino).
*   Si muove verso il target.
*   Spara quando è a range.
*   Logica: "Muoviti verso/indietro, Spara".

### C) EVENT BUS MINIMALE & TIPATO
Un sistema di eventi molto piccolo, non globale onnipresente, solo per eventi critici di UI/Audio.
*   **Eventi:** `ENTITY_DIED`, `SCORE_CHANGED`, `MATCH_ENDED`.
*   **Consumer:** HUD (aggiorna score), Audio (suona SFX), Achievements.

### D) UI & SCALING
*   **HUD:** Legge passivamente dal `GameState` (Vita Player, Score, Timer).
*   **Scaling:** Definire una risoluzione logica (es. 1920x1080) e usare una singola funzione per convertire coordinate `Schermo <-> Mondo`, gestendo il `devicePixelRatio`.

### E) PERFORMANCE & TOOLING
*   **Object Pool:** Solo per i **Proiettili** (sono tanti e frequenti). Le entità uccelli sono poche (5v5), non serve pool.
*   **Debug Overlay:** Semplice contatore FPS, Numero Entità, Numero Proiettili.

---

## 3. ORDINE PRATICO DI LAVORO (WORKFLOW)

1.  **Stabilizzare Core:** Game Loop + Implementazione `GameState`.
2.  **AI Base:** Implementare `BotController` (seguire e sparare).
3.  **UI:** Implementare `HUD` collegato al `GameState`.
4.  **Events:** Aggiungere Event Bus minimale per score/morte.
5.  **Polish:** Object Pooling proiettili, Achievements, Settings.
