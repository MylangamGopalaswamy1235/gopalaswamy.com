# MYLANGAM GOPALASWAMY — Portfolio

Dark-to-Cream luxury portfolio with the **Dexter** AI chatbot powered by OpenRouter.

## File Structure

```
portfolio/
├── index.html           ← Main portfolio page
├── style.css            ← Cream glassmorphism styles
├── script.js            ← Animations, modals, Dexter AI
├── server.py            ← Python local server
├── certificates/        ← ⬅ DROP YOUR CERTIFICATE IMAGES HERE
├── dexter icon/         ← ⬅ DROP dexter.jpg HERE
└── image/               ← ⬅ DROP profile.jpg HERE
```

## Quick Start

```bash
python server.py
# Opens http://localhost:8080 automatically
```

Or just open `index.html` directly in your browser.

## Customisation Checklist

### Required file drops (folders already exist):

| Folder | What to put | Filename expected |
|---|---|---|
| `certificates/` | Your certificate images | Any .jpg/.png name — update `CERT_FILES` array in script.js |
| `dexter icon/` | Dexter chatbot image | `dexter.png` |
| `image/` | Your profile photo | `profile.jpg` |

### After adding certificates:
Open `script.js` and update the `CERT_FILES` array at the top:
```javascript
const CERT_FILES = [
  'cert1.jpg',
  'cert2.png',
  // add more...
];
```

## Features

- Cream/luxury paper background
- Bradley Hand ITC name, Book Antiqua tagline, Edwardian Script intro
- Harrington font throughout
- Custom animated dot cursor
- Three-column layout (Explore | Credentials | Connect)
- Expandable modals: Projects, Focus/Facts, Travel, Skillsets, Certificates
- Travel section with individual Google Maps links for every place
- Focus (left-aligned) + Facts (right-aligned) layout
- **Dexter AI** chatbot — powered by OpenRouter API, speaks only about projects
  - Animated blinking eyes + smiling face (CSS-animated fallback if no image)
  - "Ask me anything!" floating label
- Profile image (right side, cream shadow)
- Fully responsive (mobile + desktop)
