[![npm (tag)](https://img.shields.io/npm/v/country-to-currency?color=green&label=NPM&style=for-the-badge)](https://github.com/thiagodp/country-to-currency/releases)
[![License](https://img.shields.io/npm/l/country-to-currency.svg?style=for-the-badge&color=green)](https://github.com/thiagodp/country-to-currency/blob/master/LICENSE.txt)
[![npm](https://img.shields.io/npm/dt/country-to-currency?style=for-the-badge&color=green)](https://www.npmjs.com/package/country-to-currency)

# country-to-currency

> Maps country codes ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)) to their default currency codes ([ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)).

⚡ Just 3 KB uncompressed (1.2 KB gzipped), no external dependencies.

🎯 Work with browsers, NodeJS, and DenoJS. JavaScript and TypeScript.

## Install

```shell
npm i country-to-currency
```

> Note: Version 3.x dropped the support to CJS and UMD, in favor of using only EcmaScript Modules (ESM).

## Usage

This library exports a default object that maps country codes to currency codes.

👉 Examples available in the folder [examples](https://github.com/thiagodp/country-to-currency/tree/master/examples).

### TypeScript

From version `1.1.0` on, there are two union types available (TypeScript 3.4+ only):
- `Currencies`, that contains all the currencies;
- `Countries`, that contains all the countries.

Example using TypeScript on NodeJS:
```typescript
  import countryToCurrency, { Currencies, Countries } from "country-to-currency";
```

### Browser - without installing anything
```html
<script type="module" >
  // import countryToCurrency from "https://unpkg.com/country-to-currency/index.esm.js"; // v2.x
  import countryToCurrency from "https://unpkg.com/country-to-currency"; // v3.x
  console.log( countryToCurrency[ 'US' ] ); // USD
</script>
```

### NodeJS
```js
// const countryToCurrency = require( 'country-to-currency' ); // v1.x and v2.0.2+
import countryToCurrency from 'country-to-currency'; // v3+
console.log( countryToCurrency[ 'US' ] ); // USD
```

### Deno

```js
// import countryToCurrency from "https://unpkg.com/country-to-currency/index.esm.js"; // v2.x
import countryToCurrency from "https://unpkg.com/country-to-currency"; // v3.x
console.log( countryToCurrency[ 'US' ] ); // USD
```

## Currency symbols

Do you also need currency symbols? [See how to get them](https://github.com/thiagodp/country-to-currency/issues/28). 💲

## Notes

- Total countries: `251`
  - Imported: `249`
  - Included: `5`
  - Fixed: `2`
- Currencies assumed:

| Country | Currency | Details | Legacy |Thanks to |
|---------|----------|---------|--------|----------|
| Antarctica (`AQ`) | `USD` | Antarctica has no official currency |  | [@thiagodp](https://github.com/thiagodp)|
| Palestine (`PS`) | `ILS` | Google |  | [@thiagodp](https://github.com/thiagodp)|
| South Georgia and the South Sandwich Islands (`GS`) | `FKP` | Wikipedia and https://gov.gs |  | [@danielrentz](https://github.com/danielrentz), [@thiagodp](https://github.com/thiagodp)|
| Netherlands Antilles (`AN`) | `ANG` | Legacy support. In 2026 Netherlands Antilles was split into separate countries. | Yes | [@jayPare](https://github.com/jayPare), [@thiagodp](https://github.com/thiagodp)|
| El Salvador (`SV`) | `USD` | Since 2001. Wikipedia |  | [@chaitanya-d](https://github.com/chaitanya-d), [@thiagodp](https://github.com/thiagodp)|
| Kosovo (`XK`) | `EUR` | [Wikipedia](https://en.wikipedia.org/wiki/Kosovo) and [Geo Names](https://geonames.wordpress.com/2010/03/08/xk-country-code-for-kosovo/) |  | [@dukesilverr](https://github.com/dukesilverr), [@thiagodp](https://github.com/thiagodp)|
| Buthan (`BT`) | `BTN` | According to [Wikipedia](https://en.wikipedia.org/wiki/Bhutan) |  | [@thiagodp](https://github.com/thiagodp)|

## Contribute

_Suggestions? Please [open an Issue](https://github.com/thiagodp/country-to-currency/issues/new). Pull Requests? Make sure to edit [generate.js](generate.js) instead of [index.ts](index.ts)._

## License

This library is inspired by Michael Rhodes' [currency-code-map](https://github.com/michaelrhodes/currency-code-map). The current project adds new currencies, fixes, offers support to browsers and DenoJS, updates dependencies, and provides new internal scripts.

[MIT](LICENSE.txt) © [Thiago Delgado Pinto](https://github.com/thiagodp)
