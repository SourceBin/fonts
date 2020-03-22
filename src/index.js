const fs = require('fs-extra');
const { join } = require('path');

const { getFontFace } = require('./css.js');
const { transformFontFiles } = require('./transform.js');

const DIST_DIR = join(__dirname, '..', 'dist');
const FONTS_DIR = join(DIST_DIR, 'fonts');

if (fs.existsSync(DIST_DIR)) {
  fs.emptyDirSync(DIST_DIR);
} else {
  fs.mkdirSync(DIST_DIR);
}

fs.copySync(join(__dirname, '..', 'fonts'), FONTS_DIR);

const fonts = fs.readdirSync(FONTS_DIR);

const css = fonts
  .map((font, i, array) => {
    console.log(`${i + 1}/${array.length} - ${font}`);

    const dir = join(FONTS_DIR, font);

    transformFontFiles(dir);
    return getFontFace(font, dir);
  })
  .reduce((a, b) => a + b);

fs.writeFileSync(join(DIST_DIR, 'index.json'), JSON.stringify(fonts, null, 2));
fs.writeFileSync(join(DIST_DIR, 'index.css'), css);
