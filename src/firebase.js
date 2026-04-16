import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// ============================================================================
// REPLACE THIS with your own Firebase config from console.firebase.google.com
//
// Steps (see README.md for the non-technical walkthrough):
//   1. Go to https://console.firebase.google.com/ and create a new project.
//   2. In the project, click the Web icon (</>) to "Add a web app". Give it
//      any nickname, skip hosting, and click "Register app".
//   3. Firebase will show you a `firebaseConfig` object — copy it and paste it
//      in place of the placeholder below.
//   4. In the left sidebar click "Build" → "Realtime Database" → "Create
//      Database". Choose any region. Pick "Start in TEST MODE" so reads/writes
//      are open. (For real production use you would lock this down later.)
//   5. Save this file. `npm run dev` will pick it up automatically.
// ============================================================================
const firebaseConfig = {
  apiKey: "AIzaSyD233wpQdiGCt9Q6X5KPM2GKQODVB759vs",
  authDomain: "jeopardy-3d8e4.firebaseapp.com",
  databaseURL: "https://jeopardy-3d8e4-default-rtdb.firebaseio.com",
  projectId: "jeopardy-3d8e4",
  storageBucket: "jeopardy-3d8e4.firebasestorage.app",
  messagingSenderId: "1072161924939",
  appId: "1:1072161924939:web:59c5c1a57c8a406aa6eace"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export default app;
