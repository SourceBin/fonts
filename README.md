# Fonts

A collection of free monospace programming fonts.

## Usage

Simply import `@sourcebin/fonts/dist/index.css` in your site and use one of the fonts listed in `@sourcebin/fonts`. Fonts are loaded through `@font-face` definitions.

```js
import fonts from '@sourcebin/fonts';

function setFont(el, font) {
  if (fonts.includes(font)) {
    el.style.fontFamily = font;
  }

  throw new Error('Invalid font');
}
```
