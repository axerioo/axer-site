# axer-site

A personal landing page and a fullscreen clock, built as a static multi-page app with a shared 'liquid glass' look over animated gradient backgrounds.

| Page | Path |  |
|---|---|---|
| Home | `/` | Multilingual greeting typed out letter by letter |
| Clock | `/clock/` | Large local-time clock (12/24 h, optional seconds and date) |

Demo: [axer.site](https://axer.site)

## Controls

- `I` - toggle interface (projector mode); the cursor auto-hides after a moment.
- `F` - toggle fullscreen.
- `?` - button in the top-right lists these shortcuts.
- `background picker` (top-right) - offers animated gradients, saved per browser.

## Tech stack

- Svelte 5
- TypeScript
- Vite

## Development

```powershell
npm install
npm run dev
npm run check     # svelte-check + tsc
npm run build     # production build to dist/
npm run preview   # serve dist/ locally
```

## Deployment

`npm run build` and serve `dist/` with any static file server.

## Related

The FiveM/RedM server dashboard that lives next to these pages has its own repo: [cfx-server-info](https://github.com/axerioo/cfx-server-info).
