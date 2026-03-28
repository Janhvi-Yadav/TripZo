# ✈ Tripzo — Explore Incredible India

A fully responsive travel booking website built with pure **HTML, CSS & JavaScript**.  
No frameworks, no build tools — just open `index.html` and it works.

![Tripzo](https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80)

---

## 🌐 Live Demo
> After deploying, paste your Netlify / GitHub Pages URL here.

---

## 📁 Project Structure

```
Tripzo/
├── index.html       ← Homepage — hero, packages, destinations, hotels,
│                      activities, guide, why-us, testimonials,
│                      newsletter, contact, footer
├── booking.html     ← Trip booking — 28-state cascade, live summary,
│                      3-step progress, confirmation modal
├── Activity.html    ← Activity booking — emoji chips, member counter,
│                      live summary, confirmation modal
├── loginpg.html     ← Login / Sign-up — responsive split layout,
│                      password strength, remember me, localStorage auth
├── 404.html         ← Custom 404 page with animated plane
├── style.css        ← Complete stylesheet — CSS variables, AOS,
│                      newsletter, nav overlay, all breakpoints
├── travel.js        ← All JS — auth, nav, search, booking, activity,
│                      contact form, toast, newsletter, keyboard shortcuts,
│                      active-nav-on-scroll, lazy image fade-in
├── data.js          ← All 28 states + 8 UTs: cities, tourist sites,
│                      activities (~36 states/territories total)
├── netlify.toml     ← Netlify deploy config (redirects + cache headers)
├── .gitignore       ← Standard git ignore
└── README.md        ← This file
```

---

## ✨ Features

### 🏠 Homepage (`index.html`)
- Full-screen hero with **live search** across all 28+ states (click a result → pre-fills booking page)
- Press `/` to focus search, `Escape` to close
- AOS scroll-triggered animations on all sections
- **6 curated tour packages** with pricing badges
- **Destination filter tabs** — Mountains, Beaches, Heritage, Nature, Spiritual
- Asymmetric **activities showcase** layout
- Featured **hotels** with 5-star ratings
- **"Why Tripzo"** trust-building section
- **Testimonials** from travellers
- **Newsletter signup** with localStorage subscription storage
- Working **contact form** with inline validation
- **Active nav highlight** updates as you scroll
- **Back-to-top button** appears after 400px scroll
- Mobile nav with hamburger + dark overlay

### 📋 Booking Page (`booking.html`)
- Dynamically populated from `data.js` — **all 28 states + 8 UTs**
- State → City → Tourist Attractions cascade (checkboxes as styled chips)
- **Live booking summary sidebar** updates on every change
- 3-step progress indicator animates on submit
- Guide/language selector (8 Indian languages)
- Full validation — all fields required, end date > start date
- **Confirmation modal** with unique Booking ID (`TRP-XXXXXX`)
- Search pre-fill — clicking a search result on homepage pre-fills the form

### 🏄 Activity Page (`Activity.html`)
- Same data cascade — all states, cities and activities from `data.js`
- Activities shown as **emoji chips** (🤿 🪂 🥾 🎈 🐪 🌊 etc.)
- **+/− member counter** widget
- **Live activity summary** sidebar with coloured tags
- Full validation with inline field errors
- **Confirmation modal** with Booking ID (`ACT-XXXXXX`)

### 🔐 Login Page (`loginpg.html`)
- Scenic **split layout** — mountain photo left, dark form right
- Login ↔ Sign Up with smooth tab animation
- **Password show/hide toggle** on all password fields
- **Live password strength meter** (Weak → Fair → Good → Strong)
- **Remember Me** (restores email from localStorage)
- Inline form validation with error messages
- **Fully responsive** — left panel hides on tablet/mobile, Tripzo brand appears in form panel
- `localStorage` persistence — registrations survive page refresh

### 🎨 Design & UX
- **AOS.js** scroll animations on every section
- **Lazy image loading** with smooth fade-in via IntersectionObserver
- **Toast notifications** for login, signup, newsletter
- **Keyboard shortcuts** — `/` focuses search, `Escape` closes dropdowns/modals
- **Active nav** automatically highlights current section while scrolling
- **Custom 404 page** with animated floating plane
- Mobile hamburger with **dark backdrop overlay**
- Confirmation modals close on overlay click or `Escape`

### 🗺 Data (`data.js`)
Full coverage of:

| Region | States / UTs |
|---|---|
| North | Delhi NCT, J&K, Ladakh, Himachal Pradesh, Punjab, Haryana, Uttarakhand, Uttar Pradesh |
| East | West Bengal, Odisha, Bihar, Jharkhand, Assam, Arunachal Pradesh, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, Sikkim |
| West | Rajasthan, Gujarat, Goa, Maharashtra, Chhattisgarh |
| South | Karnataka, Kerala, Tamil Nadu, Telangana, Andhra Pradesh, Puducherry |
| Islands | Andaman & Nicobar, Lakshadweep |

Each city includes: **Tourist Sites** (4–6) + **Activities** (4–6)

---

## 🛠 Technologies

| Technology | Usage |
|---|---|
| HTML5 | Semantic markup, SEO meta tags, favicon |
| CSS3 | Custom properties, Grid, Flexbox, keyframe animations |
| JavaScript ES6+ | Modules pattern, IntersectionObserver, localStorage, sessionStorage |
| [Font Awesome 6](https://fontawesome.com) | Icons throughout |
| [Google Fonts](https://fonts.google.com) | Playfair Display + DM Sans |
| [AOS.js](https://michalsnik.github.io/aos/) | Scroll-triggered animations |

---

## 🚀 Getting Started

### Option 1 — Just open it
```bash
# Unzip / clone the repo, then:
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

### Option 2 — VS Code Live Server (recommended for dev)
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**

---

## 🌍 Deploy in 60 Seconds (Netlify)

### Drag & Drop (no account needed for testing)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `Tripzo` folder onto the page
3. Done — you get a live URL instantly

### Connect GitHub (auto-deploy on push)
1. Push to GitHub (see below)
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Select your repo → **Deploy**

The included `netlify.toml` handles:
- Custom 404 page routing
- Security headers (X-Frame-Options, XSS protection)
- Cache headers (1 week for CSS/JS, 1 hour for HTML)

---

## 📤 Push to GitHub

```bash
cd Tripzo          # enter the project folder
git init
git add .
git commit -m "feat: initial Tripzo travel website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tripzo.git
git push -u origin main
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| > 1100px | Full desktop layout |
| 960–1100px | Why-section stacks, activity grid adjusts |
| < 960px | 2-col cards, contact section stacks |
| < 768px | Single column, hamburger nav, login panel hides |
| < 480px | Compact spacing, stacked activity/newsletter |
| < 360px | Minimal padding, reduced font sizes |

---

## 🔮 Possible Future Improvements

- [ ] Integrate **EmailJS** — real contact form + booking confirmation emails (free, no backend)
- [ ] Add **Firebase Auth** — persistent login across devices
- [ ] **Destination detail pages** — click a card → full info page
- [ ] **OpenWeatherMap API** — live weather at each destination
- [ ] **Price filter / search** on destinations
- [ ] **Dark mode toggle**
- [ ] **PWA support** — add manifest.json + service worker for offline use

---

## 👨‍💻 Built For

Frontend internship project — demonstrates:
- Multi-page HTML/CSS/JS architecture
- Dynamic DOM manipulation (cascading dropdowns, live summary)
- Form validation patterns
- localStorage for client-side data persistence
- Responsive design across all screen sizes
- Scroll animations and micro-interactions
- Deployment-ready configuration

---

## 📄 License

MIT — free to use, modify and deploy.
