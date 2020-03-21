const fs = require('fs');
const { join } = require('path');

const DIST_DIR = join(__dirname, '..', 'dist');
const FONTS_DIR = join(__dirname, '..', 'fonts');
const EXTENSION_REGEX = /\.woff2?$/;

const fontWeights = {
  regular: 400,
};

function getCSS(font, dir) {
  return [
    ...new Set(
      fs
        .readdirSync(dir)
        .filter(file => file.match(EXTENSION_REGEX))
        .map(file => file.replace(EXTENSION_REGEX, '')),
    ),
  ].map(weight => `
    @font-face {
      font-family: '${font}';
      font-weight: ${fontWeights[weight]};
      font-display: swap;
      src:
        local('${font}'),
        url('../fonts/${font}/${weight}.woff2') format('woff2'),
        url('../fonts/${font}/${weight}.woff') format('woff');
    }
  `);
}

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}

const fonts = fs.readdirSync(FONTS_DIR);

const css = fonts
  .map(font => getCSS(font, join(FONTS_DIR, font)))
  .reduce((a, b) => a + b);

fs.writeFileSync(join(DIST_DIR, 'index.json'), JSON.stringify(fonts, null, 2));
fs.writeFileSync(join(DIST_DIR, 'index.css'), css);
