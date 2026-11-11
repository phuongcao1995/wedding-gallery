# Wedding photo album

A static wedding gallery: plain HTML, CSS and JavaScript. No build step, no server code.

```
index.html          page structure, title and description
style.css           all styling (colours and fonts are at the top)
script.js           names, date, chapters and the photo list (top of file)
assets/images/      your photos
tools/list_images.py  optional helper that reads each photo's size
```

## Add your 30 photos

1. Copy your photos into `assets/images/`.
2. The quickest way: name them `photo-01.jpg` … `photo-30.jpg`. They will appear immediately, in that order, six per chapter.
3. If you keep your own file names, change the `src` values in the `chapters` list at the top of `script.js`.

Photos are shown at full quality. Nothing is compressed or cropped: every frame takes the exact shape of its photo.

### Get the real sizes (recommended)

Each photo line has `w` and `h` (width and height in pixels). These let the page reserve the right space before a photo loads, so nothing jumps while scrolling. The values in the file are only guesses. To get the real ones:

```
python3 tools/list_images.py --chapters 5
```

It prints ready-to-paste lines for every photo in the folder, including photos that the camera stored sideways. Paste them into the chapters in `script.js` and add a short description to each `alt` (read aloud by screen readers, and shown to search engines).

If you skip this step the page still works: it measures each photo when it loads and corrects the shape.

## Edit the names, date and words

At the top of `script.js`:

- `partnerOne`, `partnerTwo`, `subtitle`, `date`, `dateISO`
- `hero`: the opening photo, and `focus` to choose which part stays visible on phones (for example `"50% 30%"`)
- `closing`: the photo beside the closing words
- each chapter's `title` and `intro`

In `index.html`, also update the `<title>`, the `description` and the `og:title` lines, and keep the `preload` path the same as `hero.src`.

## Chapters

- The first photo in each chapter is shown large next to the chapter title. Pick a strong one.
- Reorder photos by moving lines; remove one by deleting its line.
- Add, rename or delete chapters freely. Chapters with no photos are skipped, and the menu updates by itself.
- Optional per photo: `caption: "…"` (shown in the full-screen viewer) and `thumb: "small/photo-05.jpg"` (a smaller copy for the grid; the viewer always opens the original).

## Background music (optional)

Put an MP3 in `assets/music/` and set `music: "assets/music/your-song.mp3"` in `script.js`. A play button appears at the bottom left. Music never starts on its own.

## Preview and publish

Open `index.html` directly, or for the most accurate preview run a tiny local server from this folder:

```
python3 -m http.server 8000
```

then visit http://localhost:8000. To put it online, upload the whole folder to any static host (Netlify, GitHub Pages, Cloudflare Pages, or your own web space).

If a file name in the list doesn't match a file in the folder, that frame shows the expected file name and a note at the bottom tells you how many are missing, so typos are easy to spot.

## Viewer controls

- Click or tap any photo to open it full screen.
- Left and right arrow keys (or swipe) move between photos; Escape (or swipe down) closes.
- Respects the visitor's reduced-motion setting.

---

## Cập nhật (tiếng Việt)

**Ảnh nhẹ:** ảnh gốc trong `assets/images/` rất nặng (~256MB). Chạy lệnh sau để tạo ảnh WebP nhẹ (~7MB) trong `assets/img/` và ảnh chia sẻ `assets/og.jpg`:

```
pip install pillow
python tools/optimize_images.py
```

Khi đưa lên host chỉ cần `assets/img/`, `assets/og.jpg`, favicon và các file trang; **không cần** `assets/images/`. Thêm ảnh mới: bỏ vào `assets/images/`, thêm dòng vào `script.js`, rồi chạy lại lệnh trên.

**Tên miền (SEO + chia sẻ):** sau khi có tên miền, chạy một lần:

```
python tools/set_site_url.py https://ten-mien-cua-ban.com
```

Lệnh này điền tên miền vào canonical, og:image, sitemap.xml và robots.txt. Facebook/Zalo cần đường dẫn ảnh đầy đủ mới hiện ảnh xem trước.
