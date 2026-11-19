# HabitFlow — Project Notes

Habit tracker. Single-user, no authentication, deployed as a **fully static bundle**.

## Architecture

| Path | Status |
|---|---|
| `client/` | **The entire deployed app.** CRA 5 (`react-scripts`) + React 18 + react-router 7 + Tailwind 3. |
| `server/`, `habitflow.sql` | **Dormant — do not wire up.** Kept in the repo as reference only. Hosting a DB costs money; the deploy is deliberately static. |

### Data layer

All persistence goes through **`client/src/lib/habitStore.js`** and nothing else — no component touches `localStorage` or `fetch` directly. Habits are stored under the key `habitflow.habits`.

Stored rows deliberately mirror the `habits` table in `habitflow.sql`:

```
{ id, user_id, title, description, category, streak, created_at, updated_at }
```

`user_id` is pinned to `CURRENT_USER_ID = 1`. There is no login, but the column shape is preserved so `server/routes/habits.js` can be reattached later by rewriting this one module's internals.

The store seeds two example habits on first run so a fresh visitor never lands on an empty screen, and every read is wrapped against corrupt or unavailable storage.

### Deployment (Netlify)

- Base directory `client`, build `npm run build`, publish `client/build`.
- `client/public/_redirects` holds `/*  /index.html  200`. **Required** — without it a hard refresh on `/about` or `/habit/3` 404s before react-router ever sees the request.
- `REACT_APP_BACKEND_URL` is no longer read by any file and can be deleted from the Netlify environment.

## Design system

Follows the global `/pro-design` + `/responsive-design` skills. Project-specific choices:

| Token | Value | Note |
|---|---|---|
| Mode | Dark | `bg-slate-950` canvas |
| Neutral | `slate` | 950 canvas → 900 cards → 800 elevated → `800/95 + backdrop-blur-xl` modals |
| **Accent** | **`violet`** | Carries the original `#764ba2` brand purple while staying clear of the semantic colors |
| Success | `emerald` | "Mark complete" action, active-habit stat |
| Warning | `amber` | Edit affordance |
| Error | `red` | Delete, validation errors |
| Font | Inter (Google Fonts CDN) | `font-sans` in `tailwind.config.js` |
| Icons | FontAwesome 6.7.2 (cdnjs, SRI-pinned) | Loaded in `public/index.html` |

Rules in force across every component: no hover motion (color-only state changes), no scroll- or viewport-triggered reveals, 44px minimum touch targets, `backdrop-blur` only on the sticky header, modals, and toasts. Mobile nav is a **right-side drawer**, logo left / trigger right.

Tailwind is installed via PostCSS (`postcss.config.js`), not the CDN — CRA 5 ships PostCSS 8, so no `craco` and no ejecting.

User-facing messages go through `useToast()` from `client/src/components/ToastProvider.js`. Destructive confirmations use `client/src/components/Modal.js`. **No `alert()` or `window.confirm()`.**

## Gotchas

- Bootstrap, MUI and Emotion were removed from `client/package.json`. MUI was never imported anywhere; don't reintroduce a second component library.
- `Mark complete today` increments the streak on every click — there is no once-per-day guard. Adding one means adding a `last_completed_at` field to the stored row.
- `server/routes/auth.js` stores and compares passwords in plaintext. The file is dormant; it must not be revived as-is.
