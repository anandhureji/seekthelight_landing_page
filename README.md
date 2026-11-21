# SEEK THE LIGHT — Pre-Launch Site

A single-page, mobile-first, static website for the SEEK THE LIGHT pre-launch streetwear brand.
Zero build step. Zero dependencies. Runs anywhere static files are served.

---

## Quick Start (local preview)

You need any static file server. Pick one:

```bash
# Option A — Python (built into macOS / Linux / Windows)
python -m http.server 3000
# then open http://localhost:3000

# Option B — Node.js (npx, no install)
npx serve .
# then open the URL it prints

# Option C — VS Code
# Install the "Live Server" extension, right-click index.html → Open with Live Server
```

> **Why a server?** `config.js` uses ES modules (`import`/`export`), which browsers
> block when opened as a local `file://` URL. Any HTTP server fixes this.

---

## Deploy

### Vercel (recommended — zero config)
1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → New Project → import the repo.
3. Leave all settings as defaults. Click **Deploy**.

### Netlify
1. Push to GitHub, or drag-and-drop the folder into [app.netlify.com/drop](https://app.netlify.com/drop).
2. Done. Netlify detects the static site automatically.

### GitHub Pages
1. Push to a GitHub repo.
2. Settings → Pages → Source: **Deploy from a branch** → `main` / `root`.
3. Wait ~1 minute, then visit `https://<username>.github.io/<repo>/`.

---

## File Structure

```
seekthelight/
├── index.html          Single-page markup (sections, semantic HTML)
├── config.js           ← ALL editable content lives here
├── style.css           All styles + CSS variables (design tokens)
├── main.js             Interactions (cursor glow, FAQ, reactions, etc.)
├── assets/
│   ├── logo.jpg        ← Place your logo here
│   └── products/       ← Place product photos here (see config.js)
└── README.md
```

---

## How to Edit Content

### Change any text
Open **`config.js`** — it's the single source of truth for:
- Brand name, tagline, email, Instagram handle
- Brand story paragraphs and pull-quote
- All product names, descriptions, and prices
- Feedback section heading and incentive text
- Every FAQ question and answer
- Google Form URL
- Analytics settings

### Swap in real product photos
1. Place your images in `assets/products/` (e.g. `product-01.jpg`).
2. In `config.js`, update each product's `image` field:
   ```js
   image: "/assets/products/product-01.jpg",
   ```
   Set `image: null` to show the CSS placeholder.

### Change colors
Open **`style.css`**, find the `:root` block at the top (Section 1):
```css
:root {
  --color-bg:   #0B0B0B;   /* background */
  --color-gold: #C8A45A;   /* gold accent */
  --color-text: #EAE5DA;   /* body text */
  /* … */
}
```
Change these three variables to update the whole site.

---

## Google Form Setup

1. In Google Forms, click **Send → Embed (‹›)** and copy the `src` URL.
   It will look like:
   `https://docs.google.com/forms/d/e/XXXXX.../viewform?embedded=true`
2. Paste it as `formUrl` in `config.js`:
   ```js
   formUrl: "https://docs.google.com/forms/d/.../viewform?embedded=true",
   ```
   
> **Note:** The form embed URL (`/e/XXXXX/viewform`) is different from the edit
> URL you're currently using. Get the embed URL from the **Send** dialog in
> Google Forms editor. The current URL will still work as a fallback link.

---

## Analytics

No tracking is active by default.

### Google Analytics 4
1. Set `analytics.enabled: true` and `analytics.ga4MeasurementId: "G-YOURCODE"` in `config.js`.
2. Paste the GA4 `<script>` snippet into the Analytics Placeholder comment in `index.html`.

### Plausible
1. Set `analytics.enabled: true`, `analytics.provider: "plausible"`, and your domain in `config.js`.
2. Paste the Plausible `<script>` tag into the placeholder in `index.html`.

---

## Logo & Favicon

- Place your logo at **`/assets/logo.jpg`** — it's used as the favicon and Open Graph share image.
- For a sharper favicon, convert `logo.jpg` to a 32×32 `favicon.ico` using
  [favicon.io](https://favicon.io/favicon-converter/) and place it at `/assets/favicon.ico`,
  then update the `<link rel="icon">` tag in `index.html`.

---

## Design Decisions & Assumptions

| Decision | Rationale |
|---|---|
| **Plain HTML/CSS/JS** | Zero build step, deployable anywhere, fastest possible Time-to-Interactive, easy to edit without Node.js |
| **ES modules** | Keeps code split across files without a bundler; supported by all modern browsers |
| **CSS custom properties** | All design tokens in one `:root` block — change 3 variables to retheme the site |
| **Jost + Inter** | Jost is a clean geometric sans-serif with the wide, uppercase feel of the logo wordmark; Inter is highly legible for body text at small sizes |
| **Gold sampled at `#C8A45A`** | Visually matched to the logo; adjust in `:root` once you have the logo file for pixel-precise sampling |
| **CSS-only product placeholders** | No placeholder image files needed; product numbers and labels are readable, branded, and swappable with real images by updating one line in `config.js` |
| **Reaction buttons → localStorage** | Fully client-side, no backend required; vote state persists on return visits |
| **`prefers-reduced-motion`** | All animations (glow pulse, cursor glow, scroll-reveal, fade-up) are disabled when the OS preference is set |
| **Navbar offset for anchor scroll** | 68px offset prevents fixed navbar from covering section headings |
| **Form fallback link** | Google Form iframes can be blocked by some mobile browsers; the fallback button always works |
| **`@seekthelight` / `hello@seekthelight.com`** | Placeholder values — update `config.js` |
| **`[INCENTIVE]` → "Early access + 20% off at launch"** | Assumed; update in `config.js` |

---

## Accessibility Checklist

- Semantic HTML (`header`, `nav`, `main` via sections with `aria-labelledby`, `footer`, `article`, `dl`)
- All interactive elements have visible focus rings (gold outline)
- Mobile menu has `aria-expanded`, `aria-controls`, `role="dialog"`
- FAQ accordion uses `aria-expanded` and `aria-controls`
- Reaction buttons use `aria-pressed` and `role="group"`
- Decorative glow spans are `aria-hidden="true"` with `.sr-only` text equivalents
- `prefers-reduced-motion` respected throughout
- Color contrast: gold `#C8A45A` on black `#0B0B0B` ≈ 7.1:1 (WCAG AAA)
- Off-white `#EAE5DA` on black ≈ 16.8:1 (WCAG AAA)
