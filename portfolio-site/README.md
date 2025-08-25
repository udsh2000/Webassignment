# Personal Portfolio — Sandamali Jayasekara

A clean, responsive portfolio built with **HTML, CSS, and JavaScript**. No build tools required.

## Features
- Sections: Landing, About, Projects, Skills, Contact
- Responsive, mobile-first layout
- Accessible semantics and skip link
- CSS transitions & IntersectionObserver reveal
- Dark/Light theme toggle (localStorage)
- Simple client-side contact form validation

## Quick Start
Open `index.html` in your browser.

## Customize
- Replace text in `index.html`
- Update skills and projects (search for "Projects" section)
- Put your image at `assets/profile.svg` (or `profile.jpg` and change src)
- Add your CV to `assets/Sandamali_Jayasekara_CV.pdf`

## Add Your Projects
Each project card is HTML. Update title, description, tech, and links.
You can duplicate a `<article class="card project">` block to add more.

## Deploy to GitHub Pages
1. Create a new repo (e.g., `portfolio`), then:
   ```bash
   git init
   git remote add origin https://github.com/<yourhandle>/portfolio.git
   git branch -M main
   git add .
   git commit -m "feat: portfolio v1"
   git push -u origin main
   ```
2. On GitHub → Settings → Pages → Source: **Deploy from a branch**, Branch: **main**, Folder: **/** (root). Save.
3. Your site will be live at `https://<yourhandle>.github.io/portfolio/`.

## Netlify (optional)
- Drag-and-drop the folder into Netlify, or connect your Git repo.

## License
MIT — make it yours.
