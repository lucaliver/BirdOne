# BIRD MOBA 2D - DOCUMENTAZIONE

Videogioco 2D d'azione single-player in stile MOBA (5v5) web per mobile con controlli touch.

- **Gameplay MOBA 5v5**: Controlla un uccello e combatti insieme a 4 alleati bot contro 5 nemici.
- **AI Reattiva**: Bot intelligenti che cercano bersagli, schivano e attaccano autonomamente.
- **Mobile First**: Controlli touch ottimizzati (Joystick virtuale) per un'esperienza fluida su smartphone.
- **Performance Elevate**: Motore grafico basato su HTML5 Canvas e TypeScript.
- **Architettura Modulare**: Codice organizzato, tipizzato e scalabile.

## 1. PANORAMICA TECNOLOGICA

### STACK TECNOLOGICO

- **Linguaggio:** TypeScript (Strict Mode).
- **Build Tool:** Vite (HMR, Optimized Build).
- **Rendering:** HTML5 Canvas API.

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

- **Game Loop:** Implementato con `requestAnimationFrame` e calcolo del `dt`.
- **Scene Management:** Sistema di transizione tra scene (`enter`, `exit`, `update`, `draw`).
- **Input Handling:** Sistema centralizzato che normalizza Mouse e Touch, con supporto al reset tra scene.
- **OOP:** Architettura basata su ereditarietà (`Entity` -> `Bird`).
- **Code Quality:** Linting (ESLint) e Formatting (Prettier) attivi. Strict Typing abilitato.
- **Git:** Uso di Conventional Commits.

---

## 2. ARCHITETTURA

- **Core Engine:** `[OK]` (Game Loop, Scene Management, Input Handling).
- **Game State:** `[OK]` (Centralized GameState, Entity Management).
- **AI:** `[OK]` (BotController con logica di ricerca, movimento e sparo).
- **UI/HUD:** `[OK]` (HUD Class, Mobile-First Design, Scaling Logico).
- **Event System:** `[OK]` (EventBus tipizzato per eventi critici).
- **Assets:** `[TO DO]` (Placeholder shapes attuali, necessario caricamento sprite).
- **Audio:** `[SOON]` (Sistema audio non ancora implementato).

### Core

- **Game.ts:** Entry point. Gestisce il loop principale, il canvas, l'input e l'EventBus.
- **Scene.ts:** Classe base per le scene (Menu, Game, GameOver, ecc.).
- **GameState.ts:** "Single Source of Truth". Contiene i dati della partita (player, entities, score, time).
- **EventBus.ts:** Sistema Pub/Sub per disaccoppiare la logica (es. Game Over, Entity Death).
- **Input.ts:** Gestisce tastiera, mouse e touch, con correzione delle coordinate per lo scaling.

### Entities

- **Bird.ts:** Classe base per Player e Bot. Gestisce fisica, rendering e stato (HP, Team).
- **Projectile.ts:** Gestisce i proiettili.
- **BotController.ts:** Incapsula la logica AI (Targeting, Movement, Shooting).

### UI

- **HUD.ts:** Gestisce il rendering dell'interfaccia di gioco (HP, Timer, Score).
- **TouchControls.ts:** Gestisce i controlli touch su mobile (Joystick, Button).

### Scaling

Il gioco utilizza una **Risoluzione Logica** (es. 1920x1080).

- Il Canvas si adatta alla finestra del browser.
- Il contesto di rendering (`ctx`) viene scalato automaticamente per mantenere le proporzioni e la visibilità verticale.
- Le coordinate di input vengono convertite dallo spazio schermo allo spazio logico.

## 3. ROADMAP

### PRIORITÀ ALTA

- **Pubblicare su Github Pages:** rendere online.
- **Assets Grafici:** Sostituire i cerchi colorati con Sprite (Bird, Sfondi, Proiettili).
- **Audio:** Implementare effetti sonori (Sparo, Colpo, Game Over) e musica.
- **Polish Gameplay:** Bilanciamento danni/velocità, feedback visivo (particelle).
- **Miglior schermata di selezione personaggi:** migliorare la grafica e i personaggi.
- **Mappa:** Ostacoli distruttibili, cespugli per nascondersi (Fog of War), power-up spawnabili (Cura, Velocità, Danno x2).
- **Obiettivi:** Non solo Deathmatch, ma magari "Cattura la Bandiera" o "Distruggi il Nido Nemico".
- **Feedback:** Numeri di danno a schermo (floating text), effetti particellari per colpi e morti, screen shake.

### PRIORITÀ MEDIA

- **Settings:** Aggiungere opzioni per volume audio, vibrazione, effetti.
- **Achievements:** Aggiungere obiettivi sbloccabili (es. "Cecchino: Uccidi 3 nemici senza mancare", "Sopravvissuto: Vinci con 1 HP").
- **Tutorial:** Aggiungere una breve guida interattiva per imparare i comandi.
- **Map Design:** Aggiungere ostacoli o elementi ambientali.
- **Progressione:** Sbloccare nuovi uccelli o skin.
  **Schermata Vittoria/Sconfitta (Aftermatch)**

### PRIORITÀ BASSA

- **Multiplayer Online:** (Attualmente il gioco è Single Player vs AI).
- **CI/CD:** Pipeline di build automatica.

# QUICK START

## Sviluppo

```bash
npm install
npm run dev:host
```

## Build

```bash
npm run build
```

## Deployment

Il gioco è configurato per il deploy automatico su GitHub Pages tramite GitHub Actions.
.
