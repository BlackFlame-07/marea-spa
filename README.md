# Marea Spa — Luxury Mediterranean Spa & Sanctuary Digital Flagship

> **1:1 Offline Multi-Page Suite (14 Pages) • Locked 60/120fps Lenis Momentum Engine • Zero AI Slop**  
> Architected by **Ryan Howard (Floor 2 | Full-Stack Dev)** at **Blackflame Designs**.

---

## ✨ Design & Architecture Highlights

* **1:1 Geometric Parity & Pure Aesthetic Taste:** Marea Spa embodies organic luxury and Mediterranean wellness (*Instrument Serif*, warm `#F9F4EE` limestone palette, delicate `#C2AC88` terracotta accents, tactile card geometry).
* **Locked 60/120fps Compositor Scrolling:** Zero hydration mismatch frame drops. Background React runtime hydration is deactivated in favor of GPU-accelerated static DOM composition and hardware-driven CSS layer transforms (`translate3d`, `transform: translateZ(0)`).
* **Snappy Lenis Momentum Engine (`lerp: 0.12`):** Powered by [lenis.min.js](assets/lenis.min.js) with zero input latency, natural exponential friction, anchor smooth scrolling, and dynamic frosted glass navigation transitions.
* **100% Offline Asset Localization (224 Local Files):** All 72 high-resolution photography assets, Instrument Serif & Inter typefaces, and ambient video loops are stored locally in [`assets/`](assets/) with zero external network dependencies.
* **Zero-Trace Sanitization:** Completely scrubbed of Framer tracking telemetry (Segment, Plausible, Sentry, Google Tag Manager, events.framer) and editorbar frames.

---

## 🧭 Complete 14-Page Sitemap

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | **Home** | Hero parallax drift, video reel, signature rituals, and sticky stacking cards |
| `/about` | **About** | Spa sanctuary philosophy, architecture, and wellness experts |
| `/treatments` | **Treatments** | Full service catalog with holistic category filtering |
| `/contact` | **Contact & Booking** | Session inquiries, location concierge, and digital intake |
| `/products` | **At-Home Care** | Curated organic skincare and wellness product catalog |
| `/treatments/reset-massage` | **Reset Massage** | Dedicated CMS experience page |
| `/treatments/oil-therapy` | **Oil Therapy** | Dedicated CMS experience page |
| `/treatments/glow-ritual` | **Glow Ritual** | Dedicated CMS experience page |
| `/treatments/couples-ritual` | **Couples Ritual** | Dedicated CMS experience page |
| `/treatments/hydration-facial` | **Hydration Facial** | Dedicated CMS experience page |
| `/treatments/tension-release-massage` | **Tension Release** | Dedicated CMS experience page |
| `/treatments/brightening-facial` | **Brightening Facial** | Dedicated CMS experience page |
| `/treatments/scalp-mind-release` | **Scalp & Mind** | Dedicated CMS experience page |
| `/404` | **404 Fallback** | Bespoke Mediterranean not-found fallback view |

---

## 🚀 Quickstart & Local Preview

### Run Local Preview Server
```bash
node preview.js 3000
```
Then visit **`http://localhost:3000`** in any modern web browser.

### Deploy to Vercel
Pre-configured with clean root-relative URL rewriting in `vercel.json`:
```bash
npx vercel --prod
```

---

## 🛠️ Stack Specifications

* **Markup:** Semantic HTML5 (`decoding="async"` on all images, structured OpenGraph metadata)
* **Styling:** GPU-accelerated CSS3 with CSS tokens, `backdrop-filter: blur(24px)`, and responsive breakpoints
* **Smooth Scroll:** Lenis v1.1.20 (`lerp: 0.12`, `wheelMultiplier: 1.05`)
* **Motion & Interactivity:** `framer-motion-player.js` (Parallax drift, floating nav transitions, FAQ accordion state toggles)
* **Hosting:** Vercel Edge / Node.js
