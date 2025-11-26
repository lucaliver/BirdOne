# BIRD MOBA 2D - DOCUMENTAZIONE TECNICA

## 1. STACK TECNOLOGICO
*   **Linguaggio:** TypeScript (Strict Mode). Scelta obbligata per manutenibilità e refactoring sicuri.
*   **Build Tool:** Vite. Velocissimo per HMR (Hot Module Replacement) e build di produzione ottimizzate.
*   **Rendering:** HTML5 Canvas API. Performance elevate su mobile, nessun overhead di engine pesanti.
*   **Deploy:** GitHub Pages / Vercel / Netlify (Static Hosting).

## 2. STRUTTURA DEL PROGETTO (PROPOSTA REFACTORING)
Attualmente i file sono tutti nella root di `src`. Per un progetto in produzione, si consiglia una struttura organizzata per **dominio** o **tipo**:

```
/src
  ├── core/             # Il "motore" del gioco
  │   ├── Game.ts       # Loop principale
  │   ├── Input.ts      # Gestione input
  │   ├── Scene.ts      # Classe base Scene
  │   └── Utils.ts      # Helper matematici
  ├── scenes/           # Le schermate di gioco
  │   ├── MenuScene.ts
  │   ├── GameScene.ts
  │   └── GameOverScene.ts
  ├── entities/         # Oggetti di gioco
  │   ├── Entity.ts     # Classe base
  │   ├── Bird.ts       # Logica personaggi
  │   └── Projectile.ts # Logica proiettili
  ├── ui/               # Interfaccia Utente
  │   ├── TouchControls.ts
  │   └── HUD.ts        # (Da creare) Barra vita, timer
  ├── assets/           # Gestione risorse
  │   ├── images/
  │   └── audio/
  ├── config/           # Configurazioni globali
  │   └── Constants.ts  # Velocità, danni, colori
  └── main.ts           # Entry point
```

## 3. PRATICHE PER LA PRODUZIONE (SOLO DEV)

### QUALITÀ DEL CODICE
*   **Linting & Formatting:** Configurare **ESLint** e **Prettier**. Essenziale per mantenere lo stile coerente senza pensarci.
*   **Strict Typing:** Non usare mai `any`. Se TypeScript si lamenta, c'è un motivo.
*   **Testing:** Implementare test unitari (es. con **Vitest**) almeno per la logica core (es. calcolo danni, collisioni, stati AI). Non serve testare tutto, ma le regole critiche sì.

### ASSET MANAGEMENT
*   **Ottimizzazione:** Comprimere sempre immagini (WebP) e audio.
*   **Preloading:** Implementare un sistema di `AssetLoader` che carichi tutte le risorse all'avvio (schermata di Loading) per evitare "pop-in" o lag durante il gioco.

### WORKFLOW (GIT)
Anche da soli, usare Git con disciplina salva la vita:
1.  **Conventional Commits:** Messaggi chiari (es. `feat: add joystick`, `fix: collision bug`).
2.  **Feature Branches:** Non lavorare su `main`. Crea branch `feat/nuova-cosa`, lavora, e fai merge solo quando funziona.
3.  **Tags:** Taggare le versioni rilasciate (`v0.1.0`, `v1.0.0`) per poter tornare indietro facilmente.

### CI/CD (AUTOMAZIONE)
Configurare una **GitHub Action** che:
1.  Ad ogni push: Esegue `npm run build` e (se presenti) `npm run test`.
2.  Sul branch `main`: Esegue il deploy automatico (es. su GitHub Pages).
*Vantaggio:* Non devi mai fare deploy manuali e sei sicuro che il codice su `main` compili sempre.

## 4. ARCHITETTURA SOFTWARE

### CORE ENGINE
*   **Game Loop:** Disaccoppiare Update (logica) e Draw (rendering). L'Update dovrebbe girare a step fissi se possibile, o usare il `dt` per interpolare.
*   **Event Bus:** Per disaccoppiare le classi (es. quando il Player muore, emette evento `PLAYER_DIED` e la UI lo ascolta, invece che la UI controllare ogni frame gli HP del player).

### ENTITY COMPONENT SYSTEM (ECS) vs OOP
Per ora l'OOP (Ereditarietà) va bene. Se il gioco scala (es. 50 tipi di power-up, effetti di stato complessi), valutare un passaggio a **Composizione** (Entity-Component), dove un'entità è solo un ID e ha componenti come `Position`, `Sprite`, `Health`, `Input`.

### PERFORMANCE MOBILE
*   **Object Pooling:** Riutilizzare proiettili e particelle.
*   **Canvas Scaling:** Gestire correttamente il `devicePixelRatio` per schermi Retina/HighDPI, altrimenti il gioco sembrerà sfocato.
