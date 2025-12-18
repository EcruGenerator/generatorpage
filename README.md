# Generator Sales Website Walkthrough

I have set up the complete static website structure for you. The site is ready to be hosted on GitHub Pages.

## 📂 Project Structure

```
generatorpage/
├── index.html           # Main Gallery Page
├── detail.html          # Product Detail Page
├── css/
│   └── styles.css       # Design & Styling
├── js/
│   └── app.js           # Logic (loads data & images)
├── data/
│   └── generators.json  # YOUR DATA FILE (Edit this!)
└── generators/          # IMAGE FOLDERS (Drop images here!)
    ├── 001/             # Images for Generator 001
    │   ├── 001.jpg
    │   └── 002.jpg
    ├── 002/
    └── ...
```



**IMPORTANT**: You do NOT need to create a new `detail.html` file for every product. The site uses one smart template that updates automatically based on the ID.

### 1. Add Text Data
1.  Open `data/ADD_NEW_ITEM_TEMPLATE.txt`.
2.  Copy the code block.
3.  Open `data/generators.json`.
4.  Paste the code at the bottom of the list (remember to add a comma `,` after the previous item!).
5.  Fill in your `id` (must match folder name), `title`, `price`, etc.

### 2. Add Images
1.  Create a folder inside `generators/` matching your ID.
2.  Drop your images in there.
3.  **Naming**:
    *   **Simple Way**: Name them `001.jpg`, `002.jpg`... (Default).
    *   **Other Formats**: If using `.png` or `.webp`, add `"imageExtension": "png"` to your JSON.
    *   **Custom Names**: If you want mixed types or specific names, use `"images": ["my-pic.jpg", "other.png"]` in your JSON instead of `imageCount`.

## 🌐 Serving on GitHub
1. Commit and push these files to your GitHub repository.
2. Go to **Settings > Pages**.
3. Select `Source: main branch` (or `/docs` if you move files there).
4. Your site will be live!

> **Note**: If you see broken images initially, ensure your file extensions are lowercase `.jpg` (not `.JPG`) and numbers match the `imageCount` in your JSON.
