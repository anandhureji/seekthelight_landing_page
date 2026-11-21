# SEEK THE LIGHT — Pre-Launch Master Plan & Project Blueprint

## 1. Executive Summary
**Brand:** SEEK THE LIGHT  
**Status:** Pre-Launch  
**Niche:** Quiet, premium, minimal streetwear ("Nothing loud, because the message is already in the name")  
**Tagline:** *"We Believe"*  
**Signature Motif:** Glowing "I" in LIGHT with restrained gold accents on a near-black background  
**Website Goal:**
1. Introduce the brand ethos and preview the debut collection.
2. Collect customer feedback, style preferences, and early-access signups directly through an integrated custom form that submits to Google Forms.

---

## 2. Technical Architecture & Stack Choice

| Layer | Technology | Decision Rationale |
|---|---|---|
| **Structure** | Semantic HTML5 | Accessible, SEO-ready, zero build step required |
| **Styling** | Vanilla CSS3 (Custom Properties) | 3-color strict palette tokenized in `:root`; ultra-fast rendering; zero bundle bloat |
| **Interactivity** | Vanilla JS (ES Modules) | Native `import`/`export` across modern browsers; zero external npm dependencies |
| **Form Integration** | Custom multi-step wizard → Google Forms | Fully on-brand dark UI; submits background POST requests to Google Forms via `mode: 'no-cors'` |
| **Hosting** | Vercel / Netlify / GitHub Pages | 100% free static hosting with zero maintenance or server overhead |

---

## 3. Site Architecture & Section Blueprint

```
Navbar (Sticky + Blur)
├── Live text wordmark with CSS Glowing "I"
├── Anchor Links: Story | Collection | Feedback
└── CTA Button: "Join Early Access" (leads to Feedback)

[Hero]
├── Glowing wordmark ("SEEK THE LIGHT")
├── Tagline ("We Believe")
├── Primary CTA ("Join Early Access")
└── Animated vertical scroll cue

[Brand Story]
├── Narrative copy with generous whitespace
├── Vertical gold light divider
└── Pull-quote: "Seek the light. Wear the journey."

[Collection Preview]
├── 6 Product Cards (Coming Soon)
│   ├── CSS-styled dark numbered placeholders (swappable for real photos)
│   ├── Product name, description, and price range
│   └── Reaction control ("Would you buy this?" -> Yes / Maybe / No)
└── Client-side state persistence in localStorage

[Feedback & Early Access]
├── Value proposition & incentive ("Early access + launch discount")
└── 5-step interactive custom form posting to Google Forms in background

[Community & Social]
├── Instagram link & handle
└── Future photo strip placeholder

[FAQ]
├── 5 Accordion items (launch date, shipping, sizing, pricing, data privacy)
└── Accessible disclosure widgets (<dt>, <dd>, aria-expanded)

[Footer]
├── Wordmark with Glowing "I"
├── Contact email & Instagram handle
├── Data privacy declaration
└── Semantic navigation & copyright
```

---

## 4. Google Forms Custom Integration Blueprint

### Form Endpoint
- **URL:** `https://docs.google.com/forms/d/e/1FAIpQLScFaWmabosviWpVfzsIX2c4RCvpjXCtiay1XCJBFGyPV_99GA/formResponse`
- **Method:** `POST`
- **Mode:** `no-cors`
- **Payload Parameters:**
  - `fvv=1`
  - `pageHistory=0,1,2,3,4`
  - Dynamic `fbzx` CSRF token

### Field ID Mapping (21 Questions Across 5 Sections)

| Step | Field Label | Question Type | Entry ID | Validation |
|---|---|---|---|---|
| **Step 1: About You** | Name | Text | `entry.603986773` | Optional |
| | Age group | Radio | `entry.801150847` | Required |
| | Sex | Radio + Other | `entry.1392927831` | Optional |
| | Current occupation | Radio + Other | `entry.929803418` | Required |
| | District in Kerala | Dropdown | `entry.1391941207` | Required |
| **Step 2: Shopping Behaviour** | Interests & lifestyle | Radio | `entry.1898789881` | Optional |
| | T-shirt purchase frequency | Radio | `entry.1731138509` | Required |
| | Usual spend per T-shirt | Radio | `entry.988806588` | Required |
| | Where you buy T-shirts | Checkbox + Other | `entry.155074726` | Required |
| | Recent brands purchased | Text | `entry.224987114` | Optional |
| **Step 3: Design & Colours** | Which T-Shirt design style do you prefer? | Radio | `entry.739911614` | Optional |
| | Attractive design categories | Checkbox + Other | `entry.596003593` | Required (Max 3) |
| | Graphic placement preference | Radio | `entry.1137595705` | Optional |
| | Colours you would buy | Checkbox + Other | `entry.1360660877` | Required (Max 4) |
| | Print/decoration styles | Checkbox | `entry.2051225245` | Optional |
| | What matters most in print | Radio | `entry.205500098` | Optional |
| **Step 4: Fit & Fabric** | T-shirt fit preference | Radio | `entry.1358416048` | Required |
| | Fabric weight preference | Radio | `entry.977780200` | Optional |
| **Step 5: Pricing & Drivers** | Top 3 purchase factors | Checkbox | `entry.1764931093` | Required (Max 3) |
| | Willingness to pay (oversized) | Radio | `entry.642821210` | Optional |
| | What you want to see | Textarea | `entry.1364478885` | Optional |

---

## 5. Mobile & Performance Checklist

- [x] **Viewport Configuration:** `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
- [x] **Fluid Typography:** CSS `clamp()` used for all headings and wordmarks.
- [x] **Mobile Drawer Navigation:** Accessible burger toggle, focus trap, body scroll-lock on open.
- [x] **Zero iOS Safari Zoom:** Input font-size set to `16px` on screens $\le 480\text{px}$.
- [x] **Touch Targets:** Form buttons and pill options stack comfortably for one-thumb mobile operation.
- [x] **Reduced Motion Support:** `@media (prefers-reduced-motion: reduce)` disables all animations and transitions.
- [x] **No Heavy Assets:** Pure CSS placeholders; total initial payload $< 100\text{KB}$.

---

## 6. Pre-Launch Action Items (Next Steps)

### Step 1: Asset Placement
- [ ] Place brand logo image at `c:\seekthelight\assets\logo.jpg` (used automatically for favicon and Open Graph preview).
- [ ] Sample the exact gold color from the logo and update `--color-gold` in `style.css` `:root` if needed.

### Step 2: Content Customization in `config.js`
- [ ] Update Instagram URL and handle (`@seekthelight`).
- [ ] Update contact email address (`hello@seekthelight.com`).
- [ ] When ready, swap product image paths from `image: null` to real paths in `/assets/products/`.

### Step 3: Deployment
- [ ] **Option A (Netlify):** Drag & drop the `c:\seekthelight` folder into [app.netlify.com/drop](https://app.netlify.com/drop).
- [ ] **Option B (Vercel):** Push to GitHub and import into Vercel with zero configuration.
- [ ] **Option C (GitHub Pages):** Push to a GitHub repo and activate Pages in repository settings.

### Step 4: Analytics (Optional)
- [ ] Paste Google Analytics 4 or Plausible snippet into the marked slot in `index.html`.
- [ ] Set `analytics.enabled = true` in `config.js`.
