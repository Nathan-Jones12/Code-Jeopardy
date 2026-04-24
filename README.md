# Jeopardy! — Computer Science Edition

A multiplayer online Jeopardy web app. Players join from different devices
(laptop, phone, anything with a browser) using a 4-letter room code.

All 200 Jeopardy clues are drawn from a Computer Science technical-terms
vocabulary list, spread across 15 topic categories. Each game picks 6
random categories with 5 clues each ($200 through $1000) for Regular Jeopardy,
then 5 doubled values ($400–$2000) for Double Jeopardy, followed by Final Jeopardy.

**Features:**
- **Individual or Teams mode** — play solo or organize into teams with captains
- **Three rounds** — Regular Jeopardy, Double Jeopardy (with 2 Daily Doubles), and Final Jeopardy
- **Daily Doubles** — wager-based power plays during rounds 1 and 2
- **Live multiplayer** — all game state syncs in real-time across all connected players
- **Gemini AI integration** (optional) — generates intelligent clue variants and checks answers for acceptable synonyms

Built with:

- **Vue 3** (`<script setup>` / Composition API)
- **Vite** (dev server + bundler)
- **Vue Router** — navigation between Home, Lobby, Game, Game Over
- **Pinia** — local state management
- **Firebase Realtime Database** — live multiplayer state sync
- **Google Gemini API** (optional) — AI clue generation and intelligent answer checking

---

## Gemini API (optional, for AI-powered clues + answer checking)

Set `VITE_GEMINI_API_KEY` in a local `.env` (copy from `.env.example`) to enable:

- **Intelligent clue generation**: Full game content (categories and scenario/definition clues) is generated in one Gemini call per round, then cached in Firebase (`cluesCache/<termId>`).
- **Smart synonym checking**: If the local fuzzy checker marks an answer wrong, Gemini adjudicates whether it's an acceptable alternate phrasing before penalizing the player.
- **Clue variant support**: Each clue is available in multiple formats (definition-only, scenario-based, or both).

Without a key, the game falls back to the static clues in `src/data/terms.js` and the local fuzzy checker — everything still works.

### For local development

Set `VITE_GEMINI_API_KEY` in a local `.env` file:
```env
VITE_GEMINI_API_KEY=your-api-key-here
```

### For GitHub Pages deployment

Add the key to your repo as a GitHub secret named `GEMINI_API_KEY`. The GitHub Actions workflow automatically injects it at build time. The key is bundled into the client JS, so restrict it in Google Cloud Console:
- HTTP referrer: your Pages domain (e.g., `https://yourname.github.io`)
- Set a daily quota cap to prevent accidental overages.

---

## 1 — Install

You must have **Node.js 20+** installed (<https://nodejs.org/>).

From a terminal, inside this folder:

```bash
npm install
```

This downloads the dependencies into `node_modules/`. Only needed once.

---

## 2 — Set up Firebase (this is the important step)

The app needs a free Firebase project to relay game state between players.
Follow these steps carefully — it takes about 3 minutes.

### Step A — Create a Firebase project

1. Go to <https://console.firebase.google.com/>.
2. Sign in with any Google account.
3. Click **"Add project"** (or **"Create a project"**).
4. Give it a name, e.g. `jeopardy-game`. Click **Continue**.
5. On the "Google Analytics" screen: click **Disable** — you don't need it.
6. Click **Create project**, wait ~20 seconds, then **Continue**.

### Step B — Add a Web app

1. On the project overview page, look for the row of icons that says
   "Get started by adding Firebase to your app". Click the **Web** icon —
   it looks like `</>`.
2. Register an app nickname (anything, e.g. `jeopardy-web`). Do **not**
   tick "Also set up Firebase Hosting". Click **Register app**.
3. You will now see a code snippet with a `firebaseConfig` object that
   looks roughly like this:

   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "jeopardy-xxxx.firebaseapp.com",
     databaseURL: "https://jeopardy-xxxx-default-rtdb.firebaseio.com",
     projectId: "jeopardy-xxxx",
     storageBucket: "jeopardy-xxxx.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123:web:abc..."
   };
   ```

   **Copy that entire object.** You will paste it in Step D.

   Note: if you don't see `databaseURL` in the snippet yet, don't worry —
   it gets added automatically after Step C. Just copy what's there now.

4. Click **Continue to console**.

### Step C — Enable the Realtime Database

1. In the left sidebar, click **Build** → **Realtime Database**.
2. Click **Create Database**.
3. Pick any location (the default is fine). Click **Next**.
4. Choose **Start in test mode**. Click **Enable**.

   > Test mode means reads/writes are open for 30 days so you can play
   > without extra setup. If you want to keep using it past 30 days,
   > extend the test-mode rules or lock it down with proper rules later.

### Step D — Paste the config into the app

1. Open `src/firebase.js` in this project.
2. You'll see a placeholder `firebaseConfig = { ... }` near the top.
3. **Replace the entire placeholder object** with the one you copied in
   Step B. Save the file.

   Double-check that `databaseURL` is present and starts with
   `https://` and ends with `.firebaseio.com`. If it's missing, go back
   to the Firebase console → Project Settings → Your apps → Web app
   config, and copy the URL from there.

That's it — Firebase is set up.

---

## 3 — Run the dev server

```bash
npm run dev
```

Vite prints a URL like `http://localhost:5173`. Open it in your browser.

To test multiplayer **on one computer**, open the URL in two different
browser windows (or regular + incognito). One creates a room, the other
joins with the 4-letter code.

To test multiplayer **across devices on the same WiFi**, use the
"Network" URL Vite also prints (something like `http://192.168.x.x:5173`).
Phones on the same WiFi can open that URL.

To play **across the internet** you need to host the built app somewhere
(see below).

---

## 4 — How the game works

1. **Home** screen — pick *Create Room* or *Join Room*.
   - Creating a room makes you the **host** and gives you a 4-letter
     code to share.
   - Joining asks for the 4-letter code + your name.
2. **Lobby** — the host sees the code at the top. All joined players
   appear live. The host can switch between **individual** and **teams** mode before starting. In teams mode, the host assigns players to teams with team-specific colors. Only the host sees the **Start Game** button.
3. **Game** — the classic 6×5 board appears. The host clicks a tile to
   reveal the clue (a CS term definition). Any player (or team captain, if in teams mode) can hit the red
   **BUZZ IN** button. The first buzz wins (Firebase decides by
   first-write). The buzzed player types the term. The host marks the
   answer **Correct** (+value) or **Incorrect** (−value), or **Skip** if
   no one knows. The tile greys out and play continues. In teams mode, the team captain answers and the wager applies to the whole team score.
4. **Final Jeopardy** — after Regular Jeopardy and Double Jeopardy are complete, a single clue appears in Final Jeopardy. All players (or team captains) see a category, submit a secret wager, then provide their answer. Scores are revealed and updated. In teams mode, only team captains can wager and answer.
5. **Game Over** — when all rounds are complete, everyone is sent to the
   final-score screen. The host can start a new game.

---

## 5 — Build for production

```bash
npm run build
```

Output is a static site in `dist/`. You can drop `dist/` onto any static
host: Firebase Hosting, Vercel, Netlify, GitHub Pages, etc.

To preview the production build locally:

```bash
npm run preview
```

---

## Project layout

```
jeopardy-game/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.js                 # mounts Vue, registers router + pinia
    ├── App.vue                 # root (<router-view/>)
    ├── firebase.js             # Firebase init — PASTE YOUR CONFIG HERE
    ├── data/terms.js           # all 200 CS terms (pre-baked, not fetched)
    ├── stores/gameStore.js     # Pinia store + Firebase ops
    ├── router/index.js         # Home / Lobby / Game / GameOver
    ├── views/
    │   ├── HomeView.vue
    │   ├── LobbyView.vue
    │   ├── GameView.vue
    │   └── GameOverView.vue
    └── components/
        ├── JeopardyBoard.vue
        ├── CategoryColumn.vue
        ├── ClueTile.vue
        ├── ClueModal.vue
        ├── Scoreboard.vue
        └── PlayerBadge.vue
```

---

## Troubleshooting

- **"Permission denied" errors in the browser console** — You probably
  skipped "Start in test mode" in Step C, or test mode expired. Go to
  the Firebase console → Realtime Database → Rules, and make sure the
  rules look like:

  ```json
  { "rules": { ".read": true, ".write": true } }
  ```

  Click **Publish**. (Open rules like this are fine for playing with
  friends. Don't leave them open on a production app.)

- **"Room not found" when joining** — Double-check the 4-letter code
  (all caps). Only rooms created on the *same* Firebase project are
  visible to each other.

- **Blank page after pasting config** — Open the browser console
  (`F12`). Most errors point straight at the line in `src/firebase.js`
  you need to fix.

---

## Credits

Built by Nathan Jones with contributions from Claude AI (Gemini API integration, answer checking, and clue generation).

Special thanks to all players and testers who helped shape the game experience.
