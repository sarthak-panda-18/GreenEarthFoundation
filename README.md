# 🌿 Green Earth Foundation

> A modern, responsive web application for **Green Earth Foundation**, an environmental non-profit organization dedicated to native reforestation, coastal cleanup campaigns, and community eco-literacy workshops.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features & Sections

- **Navigation Bar**: Responsive glassmorphism header with leaf emblem, smooth-scroll links, donation shortcut, and an animated mobile hamburger drawer.
- **Hero Section**: Full-width nature background with a soft dark overlay, gentle fade-in animations, bold typography (*“Together, We Can Heal Our Planet”*), verified volunteer social proof, and primary CTA buttons (*“Donate”* & *“Join Us”*).
- **About Us**: Comprehensive story of how the NGO began with a 200-sapling creek cleanup in 2018, accompanied by Mission, Vision, and core conservation pillars.
- **Our Services**: Detailed initiative cards with custom floating icons:
  - *Tree Planting & Forestry* (native species reforestation with >92% survival rate)
  - *Clean-Up Drives* (plastic recovery and circular sorting)
  - *Awareness Workshops* (youth literacy, school gardens, and home composting)
- **Impact Stats**: Real-time animated counters triggered on scroll using `IntersectionObserver` (*125,000+ Trees*, *14,800+ Volunteers*, *450+ Events*, *85+ Restored Ecosystems*).
- **Our Past Events (Gallery)**: Clean 8-photo grid highlighting actual drives with smooth hover zoom effects (`scale(1.08)`), badges, and captions.
- **Donation Section**:
  - 3 preset tiers: **₹500** *(plants 5 trees)*, **₹1,000** *(plants 10 trees + tree guards)*, and **₹2,500** *(restores 50m of riverbank)*.
  - Custom amount input option.
  - Dual frequency modes (**One-Time** vs. **Monthly Sustainer**) offering the exact same transparent tiers.
- **Volunteer Testimonials**: 3 community coordinator reviews with verified volunteer tags and star ratings.
- **Contact & Headquarters**: Contact form with client-side validation, HQ address, direct telephone, email, and social media links.
- **Dedicated Legal Pages**:
  - [`privacy.html`](privacy.html): Comprehensive Privacy Policy outlining donor data security, 256-bit SSL encryption, and non-profit zero-sale data integrity.
  - [`terms.html`](terms.html): Full Terms of Service for volunteer field participation, charitable donations, and governance.
- **Interactive Toast Notifications**: Contextual floating notifications for donation processing, volunteer signup, contact submissions, and newsletter enrollment.
- **Back-to-Top Navigation**: Smooth floating button that activates upon scrolling down.

---

## 🎨 Design System

- **Palette**: Lush forest green (`#1b4332`), emerald (`#2d6a4f`), mint accents (`#52b788`), sage highlights (`#d8f3dc`), and crisp white background cards.
- **Typography**: `Plus Jakarta Sans` via Google Fonts for clean readability and modern optical sizing.
- **Card Aesthetics**: Rounded card borders (`border-radius: 18px - 28px`), subtle multi-tier box shadows, and fluid hover lifts.
- **Mobile First**: Fluid layouts using CSS Grid and Flexbox, adapted with responsive breakpoints for desktop, tablet, and mobile displays.

---

## 📁 Project Structure

```text
Task3/
├── .gitignore             # Git ignore file for OS, editor, and cache files
├── README.md              # Project documentation and setup guide
├── index.html             # Main single-page website
├── style.css              # Modern eco design system and responsive styles
├── script.js              # Navbar scroll spy, animated counters, modals, and toasts
├── privacy.html           # Dedicated Privacy Policy page
├── terms.html             # Dedicated Terms of Service page
└── images/                # High-resolution environmental photography
    ├── hero.jpg           # Reforestation hero backdrop
    ├── about.jpg          # Community volunteer rally
    ├── cleanup.jpg        # Beach and ocean plastic cleanup
    ├── tree_planting.jpg  # Community tree planting drive
    ├── workshop.jpg       # Eco-center workshop
    ├── event_school.jpg   # Schoolyard green garden initiative
    ├── event_river.jpg    # Riverbank cleanup drive
    ├── event_mangrove.jpg # Mangrove coastal restoration
    ├── event_compost.jpg  # Zero-waste composting masterclass
    ├── sarah.jpg          # Volunteer Coordinator portrait
    ├── michael.jpg        # Youth Eco-Ambassador portrait
    └── priya.jpg          # Coastal Cleanup Lead portrait
```

---

## 🚀 Getting Started

### 1. View Directly in Browser
You can open `index.html` directly in any modern web browser:
```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

### 2. Run with a Local Web Server

#### Using Python:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

#### Using Node.js (`npx`):
```bash
npx serve .
# or
npx http-server -p 3000
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
