# Indus Rise DTC — Official Club Website

> **Collegiate Entrepreneurship & Startup Club**  
> *Think Bold. Build Beyond. Ideas into Impact.*

This is the production-ready, multi-page website for **Indus Rise DTC**, crafted for student founders, builders, and innovators. Built with clean semantic HTML5, modern CSS3 design tokens, responsive layouts, interactive loading graphics, and lightweight vanilla JavaScript animations.

---

## 🎨 Brand Design System

| Role | Color Name | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| **Primary Base** | Deep Navy | `#101E3A` | Hero background, dark headers, typography, buttons |
| **Primary Accent**| Peach Orange | `#F5A16B` | CTA buttons, active state highlights, upward motifs |
| **Secondary Tint**| Soft Peach | `#FBE9DC` | Alternating section backgrounds, card containers |
| **Neutral White** | Pure White | `#FFFFFF` | Card canvases, high-contrast readability surfaces |
| **Muted Slate**   | Cool Slate | `#8190A8` / `#64748B` | Subtitles, borders, metadata badges |

* **Typography Pairing**:
  * **Headings**: *Space Grotesk* (500, 600, 700)
  * **Body**: *Inter* (400, 500, 600, 700)

---

## 📁 Multi-Page Architecture

```
website/
├── index.html              # Home Portal: Hero, ambient constellation canvas, marquee, ecosystem hubs
├── about.html              # About Us: Origin story, 4 core tenets, interactive milestone timeline
├── pillars.html            # What We Do: Deep dive into Ideation, Innovation & Growth + 4-Stage Roadmap
├── events.html             # Events & Calendar: Pitch Tank '26 flagship, category filters, RSVP triggers
├── vision.html             # Vision & Mission: 2030 Ecosystem blueprint, 5 pledges & founder manifesto
├── team.html               # Leadership: Faculty advisory, Executive Board leads & core recruitment
├── join.html               # Admissions: Cohort tracks, comprehensive application form, interactive FAQ accordion
├── css/
│   └── style.css           # Complete stylesheet, design tokens, preloader & component animations
├── js/
│   └── main.js             # Preloader controller, particle canvas, animated counters, filters, accordion
├── assets/
│   └── logo.png            # Official Indus Rise DTC emblem
└── README.md               # Documentation and deployment instructions
```

---

## ✨ Animations & Interface Graphics

1. **Interactive Branded Preloader**:
   - Orbiting glowing rings pulsing around the Indus Rise logo with spinning gradients.
   - Dynamic status phase updates (*"INITIALIZING ECOSYSTEM...", "CONNECTING FOUNDER NETWORK..."*).
   - Real-time animated progress bar with smooth fade-out dismissal.
2. **Ambient Constellation Particle Canvas**:
   - Interactive HTML5 canvas with floating nodes and dynamic connecting vectors in navy and peach orange.
   - Responds gently to mouse proximity and viewport resizing.
3. **Animated Stat Counters**:
   - Numbers (`150+`, `30+`, `12+`, `100%`) animate upward smoothly using cubic ease-out curves upon scrolling into view.
4. **Card Spotlight Glow**:
   - Cards track cursor coordinates (`--glow-x`, `--glow-y`) to cast a subtle, moving radial peach highlight on hover.
5. **Interactive Accordion UI**:
   - Smooth height transitions and animated rotating icons on the FAQs section in `join.html`.
6. **Filterable Event Sprints**:
   - Instant category filtering (*Workshops*, *Competitions*, *Speaker Sessions*, *Hackathons*) with animated card reveals.
7. **Multi-Page Active Navigation Highlighting**:
   - Automatically detects current URL path and assigns the `.active` indicator on desktop and mobile drawer navigation.

---

## 💻 How to Run Locally in VS Code

### Option 1: Live Server Extension (Recommended)
1. Install **Live Server** in VS Code.
2. Right-click `index.html` and choose **"Open with Live Server"**.

### Option 2: Built-in Terminal Server
Run in your VS Code terminal:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🌐 Deploy to GitHub Pages

1. In VS Code terminal:
   ```bash
   git add .
   git commit -m "Add multi-page architecture with loading animations and graphics"
   git push -u origin main
   ```
2. On GitHub, verify in **Settings** → **Pages** that the branch is set to `main` and folder `/ (root)`.
3. Your live site will automatically update at `https://beniwal0303.github.io/indus-rise/`!
