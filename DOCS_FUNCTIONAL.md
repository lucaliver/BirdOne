# BIRD MOBA 2D - DOCUMENTAZIONE FUNZIONALE

## 1. PANORAMICA ATTUALE
Videogioco d'azione single-player in stile MOBA (5v5) su browser. Il giocatore controlla un uccello contro bot AI.

### GAMEPLAY
*   **Formato:** 5v5 (1 Giocatore + 4 Bot Alleati vs 5 Bot Nemici).
*   **Durata:** 60 secondi per round.
*   **Vittoria:** Eliminare tutti i nemici o avere più sopravvissuti allo scadere del tempo.
*   **Sconfitta:** Morte del giocatore o meno sopravvissuti.

### PERSONAGGI (RAZZE)
*   **EAGLE:** Veloce 1/3, Danno 3/3, HP 2/3.
*   **OWL:** Veloce 3, Danno 2/3, HP 3/3.
*   **PIDGEON:** Veloce 2/3, Danno 1/3, HP 3/3.
*   **HUMMINGBIRD:** Veloce 3/3, Danno 1/3, HP 1/3.

### CONTROLLI
*   **Desktop:** `WASD`/`Frecce` per muoversi, `Mouse` per sparare.
*   **Mobile:** `Joystick Virtuale` (Sinistra) per muoversi, `Tasto Fuoco` (Destra) per sparare.
*   **Menu:** `Frecce` o `Touch` per navigare, `Invio` o `Tasto Start` per confermare.

---

## 2. IDEE PER IL FUTURO (ROADMAP)

### FLUSSO UTENTE ESTESO
L'obiettivo è trasformare il prototipo in un gioco completo e rifinito.

1.  **Main Menu (Hub Centrale)**
    *   **Gioca:** Porta alla selezione personaggio.
    *   **Impostazioni:** Volume audio, sensibilità controlli, toggle vibrazione/effetti.
    *   **Achievements:** Lista di obiettivi sbloccabili (es. "Cecchino: Uccidi 3 nemici senza mancare", "Sopravvissuto: Vinci con 1 HP").
    *   **Tutorial:** Una breve guida interattiva per imparare i comandi.

2.  **Selezione Personaggio (Draft)**
    *   Visualizzazione 3D o sprite dettagliato dell'uccello selezionato.
    *   Grafico radar delle statistiche (Velocità, Attacco, Difesa).
    *   Selezione Skin/Colori alternativi.
    *   Selezione Abilità Speciale (ogni razza potrebbe avere una "Ultimate").

3.  **Lobby di Caricamento**
    *   Schermata "Versus" che mostra i due team a confronto.
    *   Consigli di gioco durante il caricamento.
    *   Generazione procedurale della mappa (opzionale).

4.  **Gameplay & Arena**
    *   **Mappa:** Ostacoli distruttibili, cespugli per nascondersi (Fog of War), power-up spawnabili (Cura, Velocità, Danno x2).
    *   **Obiettivi:** Non solo Deathmatch, ma magari "Cattura la Bandiera" o "Distruggi il Nido Nemico".
    *   **Feedback:** Numeri di danno a schermo (floating text), effetti particellari per colpi e morti, screen shake.

5.  **Schermata Vittoria/Sconfitta (Aftermatch)**
    *   **MVP:** Mostra il miglior giocatore della partita.
    *   **Statistiche:** Danni inflitti, Uccisioni, Morti, Precisione.
    *   **Progressione:** Barra dell'esperienza che sale, sblocco di nuove skin o razze.
    *   **Replay:** Possibilità di rivedere gli ultimi secondi o l'intera partita.
