# Generator Sales Website

Static site for Ecru Generator Sales, hosted on GitHub Pages.

## 📂 Project Structure

```
generatorpage/
├── index.html              # Main Gallery Page
├── detail.html             # Product Detail Page (single template, no per-product files)
├── about.html              # About Us page
├── css/
│   └── styles.css          # Design & Styling
├── js/
│   └── app.js              # Logic: reads catalog.json, then each folder's item.json
├── data/
│   ├── catalog.json        # List of folder IDs to display  (edit this to add/remove products)
│   └── item-template.json  # Copy this into each new product folder
└── generators/
    ├── 001/               # Product folder: images + item.json
    │   ├── 001.jpg
    │   ├── 002.jpg
    │   └── item.json       # Product metadata (title, price, description, specs)
    ├── 002/
    └── ...
```

## How to Add a Product

Each product is a self-contained folder under `generators/`. No central data file to grow, no per-product HTML.

1. **Create a folder** under `generators/` named after your product ID (e.g. `generators/007/`).
2. **Drop your images** into that folder.
   - **Simple convention**: name them `001.jpg`, `002.jpg`, `003.jpg` … — all zero-padded, all the same extension.
   - **Mixed or custom filenames**: use an `"images"` list in `item.json` instead of `imageCount` (see template).
   - **Other formats**: set `"imageExtension": "png"` (or `"webp"`) in `item.json`.
3. **Create `item.json`** inside the folder — copy from `data/item-template.json` and fill in:
   - `title`, `price`, `description`, `specs` (array of strings).
   - Either `imageCount` + `imageExtension` (default `.jpg`), **or** an explicit `"images"` array.
4. **Add the folder ID to `data/catalog.json`** — one entry per line, e.g. `"007"`.

That's it. The site picks it up automatically on the next load.

## ⚠️ Tips

- Image filenames should be lowercase (`.jpg` not `.JPG`).
- Keep counts consistent: if `imageCount: 7`, you need exactly `001.jpg`–`007.jpg` in the folder.
- The site must be served over HTTP. GitHub Pages works fine; opening `index.html` directly via `file://` will not load data (browser CORS). Open the live URL instead.
- Broken images fall back to a placeholder. If a folder is listed in `catalog.json` but has no valid `item.json`, it is silently skipped — check the browser console for a warning.

## Hosting on GitHub Pages

1. Commit and push to your GitHub repository.
2. Go to **Settings → Pages**.
3. Select **Source: main branch**.
4. Your site is live at `https://<username>.github.io/<repo>/generatorpage/`.
