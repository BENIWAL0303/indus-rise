# Indus Rise DTC — Official Club Website

> **Collegiate Entrepreneurship & Startup Club**  
> *Think Bold. Build Beyond. Ideas into Impact.*

This is the production-ready website for **Indus Rise DTC**, crafted for student founders, builders, and innovators. Built with clean, accessible HTML5, responsive CSS3 design tokens, and lightweight vanilla JavaScript.

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

## 🚀 Key Features

1. **Top Reading Progress Bar**: Real-time progress bar reflecting user scroll depth.
2. **Fixed Navigation with Mobile Drawer**: Responsive glassmorphism navbar on desktop and a slide-out hamburger drawer on mobile devices with the official **Indus Rise DTC** logo.
3. **Floating Section Dots**: Quick-jump dot navigation pinned to the right margin on desktop screens with active section tracking.
4. **Hero Section**: Engaging value proposition, official floating emblem, cohort status badges, and quick CTA actions.
5. **Marquee Ticker**: Continuous animated running ticker (`IDEATE · INNOVATE · BUILD · RISE · EMPOWER · LAUNCH · SCALE`).
6. **Core Action Pillars**: Interactive cards for *Ideation*, *Innovation*, and *Growth*.
7. **Filterable Events & Activities**: Interactive category filter (*Workshops*, *Competitions*, *Speaker Sessions*) with date and venue badges.
8. **Vision & Mission**: Dual split-tone presentation cards emphasizing student empowerment.
9. **Leadership & Faculty Showcase**: Spotlights the Faculty Coordinator advisory and student core leadership roles.
10. **Interactive Membership Modal & Toast Feedback**: Accessible popup dialog form with branch, academic year, and interest selection, plus simulated submission feedback.
11. **Floating Back-to-Top**: Smooth scroll-to-top button that appears after scrolling down.

---

## 📁 File Structure

```
website/
├── index.html              # Main semantic HTML5 document
├── css/
│   └── style.css           # Complete design tokens, animations, responsive grid/flex layouts
├── js/
│   └── main.js            # IntersectionObserver reveals, modal logic, nav tracking, filters
└── README.md               # Documentation and deployment instructions
```

---

## 💻 How to Run Locally

Because this project is built with vanilla web technologies, there are **no heavy npm dependencies or build steps required**.

### Option 1: VS Code Live Server (Recommended)
1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` and choose **"Open with Live Server"**.

### Option 2: Python HTTP Server
Run the following command in this folder:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option 3: Node.js (npx serve)
```bash
npx serve .
```

---

## 🌐 How to Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Navigate to your repository's **Settings** → **Pages**.
3. Under **Branch**, select `main` and folder `/ (root)`.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repo-name>/` in 1–2 minutes!
