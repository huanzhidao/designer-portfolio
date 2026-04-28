# Portfolio Site Maintenance

This document is the long-term maintenance record for this portfolio site.

It is meant to answer four practical questions:

1. What platform is the site using now?
2. How do I safely update and deploy it later?
3. How do I use Git so versions do not get lost?
4. How do I roll back if a later change goes wrong?

## 1. Core Project Record

### Local project

- Local path: `C:\Users\huanzhidao\Documents\New project 53`
- Project type: static website
- No React
- No build tool
- No package-based app framework

Main runtime files:

- `index.html`
- `styles.css`
- `script.js`
- `assets/`

### GitHub

- Repository: `https://github.com/huanzhidao/designer-portfolio`
- Remote name: `origin`
- Current default branch at time of writing: `main`

Check remote:

```powershell
git remote -v
```

### Cloudflare

- Platform: `Cloudflare Pages`
- Pages project name: `designer-portfolio`
- Production URL: `https://designer-portfolio-8bo.pages.dev`
- Latest recorded preview deployment URL: `https://1d693ab6.designer-portfolio-8bo.pages.dev`

### Cloudflare login

Current Cloudflare account used during setup:

- `1054980114qq@gmail.com`

Check login:

```powershell
npx wrangler whoami
```

If login expires:

```powershell
npx wrangler login
```

## 2. Site Architecture

This site is a direct static site.

That means:

- `index.html` holds structure
- `styles.css` holds visual style, layout, motion, scrollbar styles
- `script.js` holds language switching, gallery behavior, work track logic, reveal animations, dialog logic, cursor logic, and deployment-facing runtime behavior

There is no compile step. Editing the files directly changes the site.

## 3. Media Constraint That Must Not Be Forgotten

Cloudflare Pages only supports files up to `25 MiB`.

This local project contains a large source file:

- `assets/k5pro-final.mp4`

This file is larger than the Pages limit and must not be included in a normal Pages deployment.

Current handling:

- The local large mp4 is kept as a source backup only.
- The live site uses a remote video URL inside `index.html`.
- `.gitignore` already excludes:
  - `assets/k5pro-final.mp4`
  - `.pages-deploy/`

### Rule

Do not try to deploy the local `assets/k5pro-final.mp4` file to Pages.

If the showreel video changes in the future:

1. Upload the new video to a remote host first.
2. Replace the `<video src="...">` URL in `index.html`.
3. Keep the large local source video only as backup, not as a deploy target.

## 4. Local Preview Workflow

Because this is a static site, local preview is simple.

From project root:

```powershell
python -m http.server 4173
```

or

```powershell
npx serve . -l 4173
```

Then open:

- `http://127.0.0.1:4173/`

### Local preview checklist

Before publishing, always check:

1. Desktop layout
2. Mobile layout
3. EN / 中文 switch
4. Video section
5. Right-side rail / navigation / cursor interactions
6. Dialog popup details
7. Any newly added assets

## 5. Git Workflow

This is the most important part for long-term safety.

The goal is:

- local changes are visible
- published versions are traceable
- rollback is possible
- a future restart does not depend on memory

## 5.1 Current known commit history

Recent commits at time of writing:

```text
739414a Update portfolio contact and visual interactions
cfb2352 Save current published portfolio version
9359891 Use R2 hosted showreel video
e87cab8 Initial portfolio website
```

### Important note

Commit `cfb2352` is already named like a backup point and should be treated as an earlier stable published checkpoint.

Check log anytime:

```powershell
git log --oneline
```

## 5.2 Daily Git commands

### Check what changed

```powershell
git status --short
```

### See exact file differences

```powershell
git diff
```

### See one file only

```powershell
git diff -- index.html
git diff -- styles.css
git diff -- script.js
```

### Pull the current remote branch state

Only do this if you know you want the latest remote changes merged locally.

```powershell
git pull origin main
```

## 5.3 Recommended versioning rule

For this project, use this rule:

- every meaningful visual update gets a commit
- every published version gets either:
  - a very clear commit message, or
  - a Git tag, or
  - both

That avoids the common problem of “I know I published a good version once, but I do not know which commit it was.”

## 5.4 Recommended commit style

Use short, practical commit messages like:

```text
Polish scrollbar system and social rail spacing
Refine CGI process section and cover selection
Update showreel CTA and video handling
Publish portfolio checkpoint before redesign
```

Avoid vague messages like:

```text
update
fix
change something
```

## 5.5 Recommended “publish checkpoint” rule

Whenever you are about to deploy a version you may want to come back to later:

1. commit it
2. optionally tag it
3. then deploy it

Recommended example:

```powershell
git add index.html styles.css script.js .gitignore SITE_MAINTENANCE.md
git commit -m "Publish checkpoint: scrollbar polish and CGI layout refinement"
git push origin main
git tag publish-2026-04-26-scrollbar-cgi
git push origin publish-2026-04-26-scrollbar-cgi
```

If you do not want tags every time, at least keep the commit message explicit.

## 5.6 Safe backup flow before a risky redesign

If you are about to do a major redesign or structure rewrite:

```powershell
git status --short
git add .
git commit -m "Backup before major homepage redesign"
git push origin main
git tag backup-before-homepage-redesign
git push origin backup-before-homepage-redesign
```

This is the safest low-friction backup pattern for this project.

## 6. Standard Publish Process

Run these commands in:

`C:\Users\huanzhidao\Documents\New project 53`

## 6.1 Step 1: review local changes

```powershell
git status --short
git diff -- index.html
git diff -- styles.css
git diff -- script.js
```

## 6.2 Step 2: optionally create a Git checkpoint before deploy

Recommended:

```powershell
git add index.html styles.css script.js .gitignore SITE_MAINTENANCE.md
git commit -m "Publish checkpoint: describe the visible change"
git push origin main
```

## 6.3 Step 3: create temporary deployment directory

This avoids uploading the large local mp4 file.

```powershell
if (Test-Path '.pages-deploy') { Remove-Item -Recurse -Force '.pages-deploy' }
New-Item -ItemType Directory -Path '.pages-deploy' | Out-Null
robocopy . .pages-deploy /E /XD .git .wrangler output .pages-deploy /XF k5pro-final.mp4 > $null
if ($LASTEXITCODE -ge 8) { exit $LASTEXITCODE } else { exit 0 }
```

## 6.4 Step 4: deploy to Cloudflare Pages

```powershell
npx wrangler pages deploy .pages-deploy --project-name designer-portfolio --commit-dirty=true
```

On success, Wrangler returns a preview deployment URL like:

`https://<deployment-id>.designer-portfolio-8bo.pages.dev`

## 6.5 Step 5: verify live URLs

Check production:

```powershell
Invoke-WebRequest -UseBasicParsing 'https://designer-portfolio-8bo.pages.dev'
```

Check preview:

```powershell
Invoke-WebRequest -UseBasicParsing 'https://<deployment-id>.designer-portfolio-8bo.pages.dev'
```

Expected result:

- HTTP status `200`

## 6.6 Step 6: record the deployment

After a successful deploy, update this file with:

- the latest preview URL
- any important platform changes
- any new media hosting rule

That keeps maintenance state current.

## 7. Production URL vs Preview URL

### Production URL

`https://designer-portfolio-8bo.pages.dev`

Use this for:

- sharing with clients
- portfolio submissions
- resumes
- public profile links

### Preview URL

`https://<deployment-id>.designer-portfolio-8bo.pages.dev`

Use this for:

- keeping a snapshot of a specific deployment
- comparing one release against another
- checking whether the latest deployment actually contains the expected change

### Key rule

Production URL changes to the newest deployed version.

Preview URL stays fixed to that one deployment.

## 8. Rollback and Recovery

There are two realistic rollback methods for this project.

## 8.1 Roll back from Git

This is the preferred method when you know the earlier good commit.

### Find the commit

```powershell
git log --oneline
```

### Inspect it

```powershell
git show <commit>
```

### Create a rollback branch safely

```powershell
git switch -c rollback-check <commit>
```

Preview it locally, then deploy from that state if it is correct.

### If you want `main` to return to that state

Use a normal commit-based revert when possible, not a destructive reset.

If the bad change is one commit:

```powershell
git revert <bad-commit>
git push origin main
```

Then deploy again.

## 8.2 Roll back from a known preview deployment

If you know an older preview URL looked correct but you do not remember the commit:

1. find the matching code version locally or in Git history
2. restore that code state in a safe branch
3. redeploy that code

Cloudflare preview URLs are useful as visual references, but Git should remain the source of truth.

## 8.3 What not to do

Avoid these unless you are completely certain:

- `git reset --hard`
- `git checkout -- .`
- deleting local files to “clean up” unknown changes

These are high-risk if you are maintaining visual work over time.

## 9. Recovery If Setup Information Gets Lost

If this project is reopened much later, recover it in this order:

1. Open this file: `SITE_MAINTENANCE.md`
2. Confirm remote repo:
   `git remote -v`
3. Confirm branch:
   `git branch --show-current`
4. Confirm Cloudflare login:
   `npx wrangler whoami`
5. Confirm production URL still works:
   `https://designer-portfolio-8bo.pages.dev`
6. Confirm large local video is still excluded:
   check `.gitignore`
7. Run local preview
8. Make a small test change
9. Deploy through `.pages-deploy`

## 10. Files That Must Be Protected

Maintenance-critical files:

- `index.html`
- `styles.css`
- `script.js`
- `.gitignore`
- `.assetsignore`
- `SITE_MAINTENANCE.md`

Important assets:

- `assets/wechat-qr.jpg`
- `assets/avatar.webp`
- `assets/gallery-manifest.json`
- all active cover and gallery images

Important backup-only asset:

- `assets/k5pro-final.mp4`

## 11. Recommended Practical Workflow

For normal small updates:

1. edit locally
2. preview locally
3. commit with a clear message
4. push to GitHub
5. deploy via `.pages-deploy`
6. save the preview URL in case this becomes a rollback reference

For large visual redesigns:

1. create a backup commit first
2. optionally create a Git tag
3. do redesign work
4. preview locally
5. deploy only when stable

For emergency fixes:

1. identify the exact visible problem
2. fix only the affected files
3. commit with a “hotfix” style message
4. deploy immediately
5. verify production URL

## 12. Known Current State

- Site is static and intentionally lightweight.
- Production depends on Cloudflare Pages.
- Showreel depends on remote video hosting.
- Large source videos should be treated as backup assets, not Pages assets.
- Current repository remote points to GitHub and is available.
- Current Pages project name is confirmed as `designer-portfolio`.
