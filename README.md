# PIPO // DEEP SPACE SIGNAL

A personal mini escape room / CTF gift for Pipo.

The game begins like a small astronomy and cybersecurity system, then slowly reveals that the deep-space signal is really from Lisa.

Tagline: `A signal from somewhere in the universe.`

## Run It

Open `index.html` in a browser.

For the most realistic test, serve the folder locally:

```sh
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

No Node.js, build step, backend, API key, analytics, or login is required.

## Project Structure

```text
.
├── index.html
├── css/style.css
├── js/main.js
├── js/game.js
├── js/puzzles.js
├── js/audio.js
├── puzzles/solutions.md
├── 3d/pipo_access_card.scad
├── 3d/qr_plate.scad
├── docs/GAME_DESIGN.md
├── docs/GIFT_INSTRUCTIONS.md
└── docs/PRINTING_GUIDE.md
```

## Customize It

Most game content is in `js/puzzles.js`.

To change the recipient name, search for `Pipo` and `PIPO`.

To change Lisa's name, search for `Lisa` and `LISA`.

To change the final message, edit the `renderFinal()` function in `js/game.js`.

To change puzzle answers, edit each puzzle object's `answer` array in `js/puzzles.js`.

To change hints, edit each puzzle object's `hints` array.

## Validate Content

Optional development check:

```sh
node tests/validate.js
```

The game itself does not need Node.js; this script only checks puzzle consistency while editing.

## Publish It

This is a static site. You can publish it with GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any simple web host.

After publishing, replace the QR placeholder:

```js
const GAME_URL = "GAME_URL_PLACEHOLDER";
```

Use your final public URL instead. The constant is in `js/puzzles.js`.

## QR Code

Do not print the placeholder URL. Publish the site first, then generate a QR code for the final URL.

Recommended process:

1. Publish the site.
2. Open the final URL on your phone and confirm the game loads.
3. Generate a QR code for that URL.
4. Test the QR from another phone.
5. Use the QR image as a sticker, printed insert, or back-plate detail for the 3D card.

The OpenSCAD files include a raised placeholder QR grid, not a real encoded QR. Replace it with an actual printed QR sticker or convert a real QR SVG/DXF into geometry before final printing.

## 3D Card

The access card model is in `3d/pipo_access_card.scad`.

Recommended dimensions:

```text
85 mm × 54 mm × 3 mm
```

Open the file in OpenSCAD, press Preview, then Render, then export STL.

See `docs/PRINTING_GUIDE.md` for print settings.

## Testing Checklist

Before gifting:

- Complete every level from a fresh reset.
- Try at least one wrong answer per puzzle.
- Press Hint several times on each puzzle.
- Close and reopen the browser to verify progress is saved.
- Use Reset Mission and confirm it starts from the boot screen.
- Test on a phone in portrait mode.
- Test the final published QR code.
- Preview the OpenSCAD card and confirm text is readable at your printer scale.

## License

See `LICENSE`.
