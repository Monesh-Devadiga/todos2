# todos — React Todo App

A polished, single-page todo application built with **React 18** and **Vite 8**. It demonstrates modern component-based thinking, a single source of truth for state, and a production-ready build pipeline — all in one small, dependency-light project.

<!--Built during **SkillAudit Week 3** and shipped as a documented, tested production build in **Week 4**.-->

---

## Features 

- **Add todos** — type and press Enter (or click *Add*); the button disables itself on empty input
- **Toggle done** — click the checkbox; completed items get struck through and muted
- **Inline edit** — double-click a task (or click *Edit*) to edit it in place; Enter saves, Escape cancels, and blur also saves
- **Delete** — remove a single task, or clear all completed at once
- **Filters** — show `All` / `Active` / `Completed` with a live item counter
- **Persistence** — todos are saved to `localStorage`, so they survive page reloads
- **Keyboard friendly** — full flow works without a mouse
- **Responsive** — single-column card layout adapts down to small phones; actions collapse to a hover reveal on narrow screens

---

## Tech stack

| Layer      | Choice            | Why                                            |
| ---------- | ----------------- | ---------------------------------------------- |
| UI         | React 18 + JSX    | Component model keeps the app easy to reason about |
| Build tool | Vite 8 (ESM)      | Instant dev server, fast production bundling    |
| Styling    | Plain CSS         | Zero dependencies; CSS custom properties for theming |
| Persistence| `localStorage`    | Native, no backend or external services needed  |

No state-management library, CSS framework, or backend is required — the app runs entirely in the browser.

---

## Getting started

Requires **Node 20.19+ / 22.12+** (Vite 8) and npm. Verified on Node 24.11.

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Capsule check of what this project does — dev server
npm run dev
# Vite prints a URL, usually http://localhost:5173

# 3. Build for production
npm run build

# 4. Serve and test the production build
npm run preview
# Vite prints a URL, usually http://localhost:4173
```

### Scripts

| Command            | Description                                            |
| ------------------ | ------------------------------------------------------ |
| `npm run dev`      | Start the Vite **dev server** with hot reload          |
| `npm run build`    | Create an optimized **production build** in `dist/`    |
| `npm run preview`  | Serve the production build locally to verify it        |

---

## Project structure

```
Week4/
├── index.html               # HTML entry point (mounts #root)
├── vite.config.js           # Vite + React plugin config
├── package.json             # Metadata and scripts
├── dist/                    # ✨ Production build (generated, do not edit)
└── src/
    ├── main.jsx             # React entry: creates root & renders <App/>
    ├── App.jsx              # Single source of truth — state + all handlers
    ├── index.css            # Global styles and CSS variables
    └── components/
        ├── TodoInput.jsx    # Add-task form (local form state only)
        ├── TodoList.jsx     # Renders the list, or an empty state
        ├── TodoItem.jsx     # One task: toggle, inline edit, delete
        └── TodoFooter.jsx   # Filters, item counter, clear completed
```

### How state is organized

All state lives in **one place** — `App.jsx`:

- the `todos` array and the active `filter` are `useState` values
- derived data (`filteredTodos`, `activeCount`) is computed in the component
- every mutation (`addTodo`, `toggleTodo`, `editTodo`, `deleteTodo`, `clearCompleted`) is a handler defined there
- child components are purely **presentational** — they receive data and callbacks via props and never mutate the array themselves

A `useEffect` in `App.jsx` writes every change to `localStorage` under the key `react-todo-app`, and an initializer function reads it back on load (wrapped in `try/catch` so corrupt data is ignored).

```
             ┌──────────────┐
             │    App.jsx   │   state lives here (single source of truth)
             └──────────────┘
        props ↓        ↑ callbacks (add/toggle/edit/delete/filter/clear)
   ┌────────┴────────┐
   │  presentational components  │
   └────────────────────────────┘
```

---

## Feature details

### Editing a todo
`TodoItem.jsx` keeps a local `draft` string while editing. Saving trims whitespace, and **an empty result deletes the todo** instead of leaving a blank row. Pressing `Escape` discards the draft; focusing is handled with a ref so the text is selected as soon as editing starts.

### IDs
Todos get their unique `id` from `crypto.randomUUID()` — no counter state, no collisions.

### Narrow screens
Below `420px` the edit/delete buttons are hidden until you hover (or tap) a row, keeping each row compact on phones while preserving touch access.

### Accessibility notes
- Real `<label>`s and `aria-label`s on inputs and icon buttons
- Buttons for filters use a `<nav aria-label="Filter todos">`
- Focus-visible styles via CSS `:focus` ring
- Full keyboard operation: Tab between items, Enter to add/save, Escape to cancel

---

## Production build

The build is generated by `npm run build` (fresh from source) and ready to deploy:

```text
dist/index.html                   0.39 kB  (gzip  0.26 kB)
dist/assets/index-BfEVpxBU.css    3.42 kB  (gzip  1.14 kB)
dist/assets/index-DzRAWI_u.js   144.39 kB  (gzip 47.16 kB)
```

> `dist/` is generated output — safe to delete and regenerate at any time; it is not source.

**Security:** the toolchain was upgraded from Vite 5 → **8.3.0** specifically to clear `npm audit` — `found 0 vulnerabilities`. The original advisories only affected the **dev server** (not the shipped static `dist/`), but shipping a dependency-clean build is part of polishing it.

### Why you should test the built version, not just `npm run dev`
Dev (`vite dev`) serves **unbundled, source-mapped modules** with HMR; production (`vite build`) bundles, minifies, and hashes assets with absolute paths. The built app can behave differently — e.g., minification bugs, asset-path issues, or missing static files. Testing the actual `dist/` output (`npm run preview`, or any static file server) catches those before they ship.

### Serving `dist/` with any static server
```bash
npx serve dist
# or
python -m http.server 8080 --directory dist
```

### Deployment options
No public deployment is required for this exercise, but `dist/` is directly deployable to any static host: **Netlify**, **Vercel**, **GitHub Pages**, **Cloudflare Pages**, or a simple Nginx/S3 bucket. No build step or server configuration is needed on the host — upload `dist/` and you're live.

---

## What I learned / demonstrated

- **Component-based decomposition** — splitting UI into small presentational components with a single stateful container
- **Lifting state up** — child components stay dumb; the parent owns all logic
- **Controlled inputs** — every input's value is bound to state, so UI can never drift from the data model
- **Persistence pattern** — lazy state initializer for reading storage + `useEffect` for writing
- **Production build pipeline** — verifying the optimized `dist/` output serves correctly, not just the dev server

## Possible next steps

- Add drag-and-drop reordering (or up/down controls)
- Move state to `useReducer` as the action list grows
- Extract persistence into a small custom hook (`useLocalStorage`)
- Add tests (Vitest + Testing Library)
- Add dark mode via CSS variables

---

## License

MIT — free to use, adapt, and feature in your own portfolio.
