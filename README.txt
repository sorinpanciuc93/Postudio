ROSÉ STUDIO — put it on GitHub Pages (free, one live URL)
=========================================================

You do NOT need Firebase to start. The app opens in DEMO MODE and works
immediately (data saves on the device you're testing on). When you're
ready for the real multi-phone setup with the live central overview, you
paste Firebase keys once — nothing else changes.

==========================================================
A) GET IT ONLINE ON GITHUB PAGES  (~3 minutes)
==========================================================
  1. Sign in at https://github.com  (make a free account if needed).
  2. Click the + (top right) -> "New repository".
       - Name: rose-studio   (anything is fine)
       - Public
       - Create repository
  3. On the new repo page click "uploading an existing file"
     (link in the "Quick setup" box).
  4. Unzip the folder I gave you, then drag ALL of these files in:
       index.html
       firebase-config.js
       manifest.webmanifest
       service-worker.js
       icon-180.png  icon-192.png  icon-512.png
     Click "Commit changes".
  5. Go to the repo's  Settings -> Pages.
       - "Build and deployment" -> Source: "Deploy from a branch"
       - Branch: main   Folder: / (root)   -> Save
  6. Wait ~1 minute, refresh the Pages settings page. It shows:
       "Your site is live at https://YOURNAME.github.io/rose-studio/"
     Open that link. Done — it works in demo mode right now.

  To change anything later: open the file in the repo, click the pencil
  (Edit), make changes, Commit. Pages redeploys in a minute. (The app is
  set to load fresh on refresh, so you'll see your changes without fighting
  a cache.)

==========================================================
B) TEST IT (demo mode)
==========================================================
  - First open asks you to set a MANAGER CODE. That's you.
  - Gear (top right) -> Accounts tab -> add accounts, links, daily goals.
  - Team tab -> add people, give each a code, tick which accounts they see.
  - Log out (crown icon) and log back in with a team code to see what that
    person sees. Each device remembers its own login.
  NOTE: in demo mode each device is separate, so a teammate on another
  phone won't see your data yet. That's what part C fixes.

==========================================================
C) GO LIVE ACROSS ALL PHONES  (when ready — ~5 min, free)
==========================================================
  1. https://console.firebase.google.com -> Add project.
  2. Build -> Firestore Database -> Create database ->
       "Start in production mode" -> pick a location -> Enable.
  3. Build -> Authentication -> Get started -> enable "Anonymous".
  4. Project settings (gear) -> "Your apps" -> click </> (Web) ->
       register app -> copy the config values.
  5. In your GitHub repo, open firebase-config.js -> pencil (Edit) ->
       paste the values over the PASTE_... placeholders -> Commit.
  6. Firestore -> Rules tab -> replace all with the block below -> Publish:

       rules_version = '2';
       service cloud.firestore {
         match /databases/{database}/documents {
           match /{document=**} {
             allow read, write: if request.auth != null;
           }
         }
       }

  That's it. The banner disappears and every phone now shares the same
  accounts, codes, goals and live progress. Your manager login shows the
  live overview of all accounts.

  Security note: this is lightweight internal-tool security — the access
  codes are the practical gate, and anyone using the app can read/write the
  studio data. Fine for a small private team. Strict per-person permissions
  would need real user accounts (can be added later).

==========================================================
D) ADD TO HOME SCREEN (each phone)
==========================================================
  iPhone (Safari):  Share -> "Add to Home Screen".
  Android (Chrome): menu -> "Install app / Add to Home screen".

Want next: a per-day history/report, or letting employees mark a specific
piece of content done (not just a counter)? Ask and I'll add it.
