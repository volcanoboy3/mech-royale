# 🤖 Mech Royale

A fast top-down mech battle-royale you play right in your browser. Pick a mech, bolt on a gun, and be the **last mech standing** against 5 enemy bots. One single HTML file — no downloads, no installs.

**▶ Play:** open `index.html` (double-click it) or visit the live site.

## ✨ Features
- 🤖 **60 mechs** to buy — Common → Rare → Mythic → Legendary (each with its own health, speed & signature ⚡ super ability)
- 🔫 **Dozens of guns × 4 rarities** to collect, buy, and upgrade to Level 5
- 🐾 **Pets** — drones & animals that fight, heal, or grab coins alongside you
- 🎩 **Decorations** — buy hats & accessories (crown, top hat, shades, headphones…) and wear them on your mech
- ⚔️ **9 game modes:**
  - 🎯 Free For All & 🤝 Teams from **1v1 up to 50v50**
  - 👹 Boss Fight (one giant mega-boss) and 🌊 Survival (10 waves)
  - 🔫 Gun Game (every kill upgrades your gun) and 🗼 Tower Climb (solo, forever-powers)
  - 🧟 **Zombie Horde** — endless waves of fast zombies + a BRUTE every 5th wave
  - 👹 **Boss Rush** — endless bosses back-to-back, each one tougher
  - 🚩 **Capture the Flag** — grab the enemy flag and run it home, first team to 3
- 🗺️ **30 different maps** — pick a themed battleground or go random
- 🏅 **Ranks** that climb as you win — Leather → Wood → … → Multiverse → Everything, and enemies get **tougher** the higher your rank
- 🏆 **Personal records** & 🎁 **daily login rewards** (streak up to day 7)
- 🏪 **Mech Store & Gun Store** — spend coins you earn from kills and wins
- ⚡ **Dash** move to dodge, 🧱 **blocks** to hide behind, ❤️ **health packs** to heal
- 📱 **Plays on phones** with twin thumbsticks, plus 🗺️ minimap, 🔥 kill streaks & juicy effects
- 🌐 **Automatic online matchmaking when hosted** — real players take over CPU slots in Free For All, Teams, Gun Game, Capture the Flag, Soccer, and Race; CPUs fill every empty slot
- 🔑 **Secret codes** for bonus coins (shhh — you have to know them!)
- ⏸️ Pause, 🔊 mute, and everything **auto-saves** in your browser
- ☁️ Optional player accounts keep progress synced across devices

## 🎮 Controls
| Key | Action |
| --- | --- |
| **WASD** / Arrows | Move |
| **Mouse** | Aim |
| **Click** | Shoot |
| **Space** | Dash |
| **P** | Pause |
| **Esc** | Leave match |

## 🌐 Online matches

Nothing needs to be switched on in the game. When the site is posted online over HTTPS, supported battle modes automatically look for real players using the same mode, player count, and map. Each person who connects replaces one CPU. If nobody else is playing, or somebody disconnects, CPU control fills the slot immediately.

Opening `index.html` directly, or running it on `localhost`, always keeps the game offline and CPU-only. Online matchmaking uses encrypted browser-to-browser connections and does not require player accounts.

## 🏆 How to win
Wander the arena, hide behind blocks, grab health packs, and knock out all 5 enemy mechs. Earn coins → buy better mechs and guns → upgrade them → dominate. Coins come from kills (+20), playing (+15), and winning (+150).

## ☁️ Player accounts and cloud saves

Device saving always works, even when cloud accounts are unavailable. To enable account sign-in and cross-device saves on the hosted game:

1. Create a Supabase project and run `supabase/player_saves.sql` in its SQL editor.
2. In the Supabase authentication settings, add the live game URL as the Site URL and an allowed redirect URL.
3. Add `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` to the Vercel project environment variables. A legacy `SUPABASE_ANON_KEY` also works.
4. Redeploy the site.

The browser receives only the public Supabase key. Row-level security restricts each signed-in player to their own save. On a new device, the game asks whether to use the cloud progress or upload the device progress, and keeps a local backup before replacing anything.

## 🛠️ Run it locally
It's just one file, so any static server works:
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## 💰 Turning on real ads (for a grown-up)
The game ships with safe **pretend ads** (rewarded "watch for coins", a lose-screen interstitial, and occasional menu pop-ups) already wired through one function. To make them real, money-earning ads:

1. Sign up (free, 18+) at [gamemonetize.com](https://gamemonetize.com) and register the game to get a **Game ID**.
2. In `index.html`, find `AD_CONFIG` and change it to:
   ```js
   const AD_CONFIG = { provider: "gamemonetize", gameId: "YOUR-GAME-ID" };
   ```
3. Redeploy. Every pretend ad now requests a real ad first and falls back to the pretend one if none is available. Earnings are paid to the account holder.

In-game, the secret **No Ads** unlock disables all interstitials/pop-ups either way.

## 💳 Turning on real payments for packs (for a grown-up)
The 💎 PACKS shop is fully built — only the payment account is missing:

1. Create a [Stripe](https://stripe.com) account (18+, free) and make **5 Payment Links**, one per pack, matching the in-game prices ($0.99 / $5.99 / $12.99 / $29.99 / $59.99).
2. In `index.html`, find `PACK_CODES` and **change the redemption codes** to your own secrets.
3. For each Stripe Payment Link, set the **confirmation page message** to show that pack's redemption code ("Your pack code: MRP-…").
4. Paste the 5 Payment Link URLs into `PAY_CONFIG` in `index.html` and redeploy.

Flow: BUY opens the Stripe page → buyer pays → sees their code → types it in 🔑 SECRET CODES → the pack's contents are granted. Packs are repeatable: pay again to get the pack again (coins stack; already-owned mechs/guns aren't duplicated).

Created by Isaac with help from his dad. Made with ❤️ and vanilla JavaScript + HTML canvas.
