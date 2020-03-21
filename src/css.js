const fs = require('fs');
const { join } = require('path');

const EXTENSION_REGEX = /\.woff2?$/;

const fontWeights = {
  regular: 400,
};

const formats = {
  woff2: 'woff2',
  woff: 'woff',
  ttf: 'truetype',
};

module.exports.getFontFace = (font, dir) => [
  ...new Set(
    fs
      .readdirSync(dir)
      .filter(file => file.match(EXTENSION_REGEX))
      .map(file => file.replace(EXTENSION_REGEX, '')),
  ),
].map((weight) => {
  function src(ext) {
    const filename = `${weight}.${ext}`;

    return fs.existsSync(join(dir, filename))
      ? `, url('./fonts/${font}/${filename}') format('${formats[ext]}')`
      : '';
  }

  return `
    @font-face {
      font-family: '${font}';
      font-weight: ${fontWeights[weight]};
      font-display: swap;
      src:
        local('${font}')
        ${src('woff2')}
        ${src('woff')}
        ${src('ttf')}
        ;
    }
  `;
});
