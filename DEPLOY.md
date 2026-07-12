# Deploying alpha.ekantikcapital.com

## What's in this folder

```
alpha-landing/
├── index.html      ← Main page (SEO meta, OG tags, React CDN)
├── app.js          ← Pre-compiled landing page (no build step needed)
├── _redirects      ← Cloudflare Pages SPA routing
├── _headers        ← Security headers + caching
└── DEPLOY.md       ← This file (don't deploy)
```

Total size: **68KB** — deploys in seconds.

---

## Step 1: Deploy to Cloudflare Pages (5 minutes)

### Option A: Direct Upload (fastest)

1. Go to **[Cloudflare Dashboard](https://dash.cloudflare.com)** → Pages
2. Click **"Create a project"** → **"Direct Upload"**
3. Name the project: `alpha-ekantikcapital` (or anything — the custom domain overrides this)
4. Drag and drop these 4 files into the upload area:
   - `index.html`
   - `app.js`
   - `_redirects`
   - `_headers`
5. Click **"Deploy"**
6. You'll get a URL like `alpha-ekantikcapital.pages.dev` — verify it works

### Option B: Git-connected (for ongoing updates)

1. Create a GitHub repo (e.g., `ekantik-alpha-landing`)
2. Push these 4 files to the repo (no `DEPLOY.md`)
3. In Cloudflare Pages → **"Connect to Git"** → select the repo
4. Build settings: **None** (no build command, output directory = `/`)
5. Deploy

---

## Step 2: Add Custom Domain (2 minutes)

1. In Cloudflare Pages → your project → **"Custom domains"**
2. Click **"Set up a custom domain"**
3. Enter: `alpha.ekantikcapital.com`
4. Cloudflare will prompt you to add a **CNAME record**:

   ```
   Type:  CNAME
   Name:  alpha
   Target: alpha-ekantikcapital.pages.dev
   ```

   (If ekantikcapital.com DNS is already on Cloudflare, it will auto-add this)

5. Wait for SSL certificate provisioning (usually < 2 minutes)
6. Visit **https://alpha.ekantikcapital.com** — you're live

---

## Step 3: Verify (1 minute)

- [ ] Page loads at `https://alpha.ekantikcapital.com`
- [ ] SSL padlock shows (HTTPS working)
- [ ] All sections render (scroll through entire page)
- [ ] "Start Free Trial" buttons link to `ekantik-research-portal.pages.dev/register`
- [ ] "See the Methodology" links to `ekantik-research-portal.pages.dev/methodology`
- [ ] Mobile responsive (check on phone)
- [ ] Favicon shows (gold E on navy square)

---

## Updating the Page

### Direct Upload method:
1. Edit the JSX source file
2. Recompile with: `npx babel src.jsx --presets=@babel/preset-react --out-file app.js`
3. Re-upload `app.js` to Cloudflare Pages (new deployment)

### Git-connected method:
1. Edit, compile, commit, push — auto-deploys

---

## Architecture

```
alpha.ekantikcapital.com          → This landing page (public, no auth)
research.ekantikcapital.com       → Research Portal (behind auth)
ekantik-research-portal.pages.dev → Portal alternate URL

CTAs on landing page → research portal /register
```

---

## Technical Notes

- **React 18** loaded from unpkg.com CDN (production build)
- **Fonts**: Playfair Display + DM Sans from Google Fonts
- **No build step required** — app.js is pre-compiled from JSX via Babel
- **No framework dependencies** — pure HTML + JS, works anywhere
- **68KB total** — loads fast on any connection
- **Cloudflare edge-cached** — served from 300+ global PoPs
