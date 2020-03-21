const fs = require('fs-extra');
const { join } = require('path');

const { getFontFace } = require('./css.js');
const { transformFonts } = require('./transform.js');

const DIST_DIR = join(__dirname, '..', 'dist');
const FONTS_DIR = join(DIST_DIR, 'fonts');

if (fs.existsSync(DIST_DIR)) {
  fs.emptyDirSync(DIST_DIR);
} else {
  fs.mkdirSync(DIST_DIR);
}

fs.copySync(join(__dirname, '..', 'fonts'), FONTS_DIR);

const fonts = fs.readdirSync(FONTS_DIR);

fonts.forEach(font => transformFonts(join(FONTS_DIR, font)));

const css = fonts
  .map(font => getFontFace(font, join(FONTS_DIR, font)))
  .reduce((a, b) => a + b);

fs.writeFileSync(join(DIST_DIR, 'index.json'), JSON.stringify(fonts, null, 2));
fs.writeFileSync(join(DIST_DIR, 'index.css'), css);
