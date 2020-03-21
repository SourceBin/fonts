const fs = require('fs');
const { join } = require('path');

const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2');

const TTF_REGEX = /\.ttf$/;

function transformTTF(dir, file) {
  const ttf = fs.readFileSync(join(dir, file));

  const filename = file.replace(TTF_REGEX, '');
  const woffFileName = join(dir, `${filename}.woff`);
  const woff2FileName = join(dir, `${filename}.woff2`);

  if (!fs.existsSync(woffFileName)) {
    const woff = Buffer.from(ttf2woff(ttf).buffer);
    fs.writeFileSync(woffFileName, woff);
  }

  if (!fs.existsSync(woff2FileName)) {
    const woff2 = ttf2woff2(ttf);
    fs.writeFileSync(woff2FileName, woff2);
  }
}

module.exports.transformFonts = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith('.ttf')) {
      transformTTF(dir, file);
    }
  });
};
