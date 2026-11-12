# Lily Gift Website

A small, romantic, mobile-friendly surprise website designed for GitHub Pages. It is a plain static site: no build tools, frameworks, or paid hosting required.

## 1. Add your six images

Put your image files inside the `assets` folder and rename them **exactly** as follows (keep the `.png` extension if they are PNG files):

| Your image | Required filename |
|---|---|
| Image 1 – first lily | `lily-1.png` |
| Image 2 – panda holding the present | `panda.png` |
| Image 3 – second lily | `lily-3.png` |
| Image 4 – close-up present | `gift-closeup.png` |
| Image 5 – your hand-drawn Next button | `next-button.png` |
| Image 6 – paper background | `paper-background.png` |

If an image is JPG or WEBP, either convert it to PNG or change the matching filename in `index.html` / `style.css` to its real extension. Filenames are case-sensitive on GitHub.

**Image placement tips**
- Keep the panda image as a PNG with a transparent background if possible. The panda's gift is made clickable with an invisible tap area; if that area misses the gift in your actual image, adjust `.panda-gift-hit` in `style.css`.
- Keep the two lily images as separate files; the page repeats them in a varied layout.
- The close-up present image should ideally have a transparent background.
- The paper image is used as a subtle page texture and behind the letter. If it is very dark or busy, the text may need a lighter paper overlay.

## 2. Upload to GitHub

1. Go to [github.com](https://github.com) and create a new repository. A name such as `lily-gift` is fine.
2. On the repository page, choose **Add file → Upload files**.
3. Upload `index.html`, `style.css`, `script.js`, `README.md`, and the complete `assets` folder with your six images inside it.
4. Commit the upload.
5. Open the repository's **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select the `main` branch and the `/(root)` folder, then save.
8. Wait a minute or two. GitHub will show your website address in the Pages section. It will look like `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## 3. Preview it on your computer first (optional)

You can double-click `index.html` to preview the site locally. For the closest match to GitHub Pages, use a simple local web server or the VS Code Live Server extension.

## 4. Personalise the message

The letter is in `index.html`, inside `<div class="letter-content">`. Edit the words there if you want to change the message. The line that currently says “I'll see you in two days (I can't wait).” is already set to your Sabbath timing.

## 5. Notes

- The fireworks are drawn in the browser with a canvas animation; no video or extra library is needed.
- The car at the end is a simple original SVG-style SUV illustration with a sunset, sea and coastal greenery. It is not a photorealistic Jetour X70. If you later add a real car photo, the final scene can be upgraded to use it.
- The site uses Google Fonts when internet access is available and falls back to system serif/sans-serif fonts.
- The swipe scene also accepts a tap, so it remains usable on desktop and on devices where a horizontal swipe is awkward.
