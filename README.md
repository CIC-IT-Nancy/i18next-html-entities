# I18Next HTML Entities

Adds extended HTML entities decoding to i18next via a lightweight postProcessor built on top of the `entities` package.

Useful when your translations contain HTML character references like `&eacute;`, `&#233;`, or `&#xE9;` and you want them
decoded in the final string.

---

## Installation

```
npm install @cic-it-nancy/i18next-html-entities i18next
```

---

## Usage

The postProcessor instance is exported as the default export. It registers under the name `I18NextHTMLEntities` and
decodes values using `entities.decodeHTML`.

```ts
import i18next from 'i18next';
import htmlEntities from '@cic-it-nancy/i18next-html-entities';
import { DecodingMode } from 'entities';

i18next
  .use(htmlEntities) // registers the postProcessor
  .init({
    // ...your config
    postProcess: ['I18NextHTMLEntities'],
  });

// Optionally configure decoding mode (defaults to DecodingMode.Legacy)
htmlEntities.setOptions({
  mode: /* DecodingMode value from 'entities' */ DecodingMode.Legacy,
});

// Given a translation value "Hello &amp; welcome, Jos\u00E9! &eacute; = &#233; = &#xE9;"
const text = i18next.t('greeting');
// -> "Hello & welcome, José! é = é = é"
```

---

## Notes

- Peer dependency: `i18next` — make sure your app provides a compatible version.
- This package uses the `entities` library for robust HTML entity decoding.

---

## Authors & Contributors

- **CIC-IT Nancy** — Author
- **Pierre 'AlasDiablo' M** ([GitHub](https://github.com/AlasDiablo)) — Contributor

---

## Licence

GNU Lesser General Public License v3.0 (LGPL-3.0) - CIC-IT Nancy
