[![npm (tag)](https://img.shields.io/npm/v/country-to-currency?color=green&label=NPM&style=for-the-badge)](https://github.com/thiagodp/country-to-currency/releases)
[![License](https://img.shields.io/npm/l/country-to-currency.svg?style=for-the-badge&color=green)](https://github.com/thiagodp/country-to-currency/blob/master/LICENSE.txt)
[![npm](https://img.shields.io/npm/dt/country-to-currency?style=for-the-badge&color=green)](https://www.npmjs.com/package/country-to-currency)

# country-to-currency

> Maps country codes ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)) to their default currency codes ([ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)).

⚡ Just 2.3 KB (uncompressed), no external dependencies.

🎯 Work with browsers, NodeJS, and DenoJS. JavaScript and TypeScript.

## Install

```shell
npm i country-to-currency
```

## Usage

This library exports a default object that maps country codes to currency codes.

[Available formats]() include [UMD](https://github.com/umdjs/umd) (therefore [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) and [CommonJS](http://wiki.commonjs.org/wiki/CommonJS)) and
[ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

### TypeScript

From version `1.1.0` on, there are two union types available (TypeScript 3.4+ only):
- `Currencies`, that contains all the currencies;
- `Countries`, that contains all the countries.

Example (TypeScript on NodeJS):
```typescript
  import countryToCurrency, { Currencies, Countries } from "country-to-currency";
```

### Browser - without installing anything

Global:
```html
<script crossorigin src="https://unpkg.com/country-to-currency" ></script>
<script>
  console.log( countryToCurrency ); // {AF: "AFN", AX: "EUR", ... }
  console.log( countryToCurrency[ 'US' ] ); // USD
  console.log( countryToCurrency[ 'DE' ] ); // EUR
  console.log( countryToCurrency[ 'BR' ] ); // BRL
</script>
```

ESM:
```html
<script type="module" >
  import countryToCurrency from "https://unpkg.com/country-to-currency/index.esm.js";
  console.log( countryToCurrency[ 'US' ] ); // USD
</script>
```

### NodeJS
```js
const countryToCurrency = require( 'country-to-currency' );
console.log( countryToCurrency[ 'US' ] ); // USD
```

### DenoJS

```js
import countryToCurrency from "https://unpkg.com/country-to-currency/index.esm.js";
console.log( countryToCurrency[ 'US' ] ); // USD
```

## Notes

- Countries included: `250`.
- For `Antarctica` (`AQ`), the currency `USD` is being assumed.
- For `Chile` (`CLF`), the currency `CLP` is being assumed.
- For `Croatia` (`HR`), the currency `EUR` is being assumed since January 1st, 2023.
- For `Cuba` (`CU`), the currency `CUP` is being assumed since 2021.
- For `Dominican Republic` (`DM`), the currency `XCD` is being assumed.
- For `El Salvador` (`SV`), the currency `USD` is being assumed.
- For `Hungary` (`HU`), the currency `HUF` is being assumed.
- For `Niger` (`NE`), the currency `XOF` is being assumed.
- For `Palestine` (`PS`), the currency `ILS` is being assumed.
- For `Republic of the Congo` (`CG`), the currency `XAF` is being assumed.
- For `Samoa` (`WS`), the currency `WST` is being assumed.
- For `Sierra Leone` (`SL`), the currency `SLE` is being assumed since since January 1st, 2024.
- For `South Georgia and the South Sandwich Islands` (`GS`), the currency `FKP` is being assumed.
- For `South Korea` (`KR`), the currency `KRW` is being assumed.
- For `Switzerland` (`CH`), the currency `CHF` is being assumed.
- For `Uruguay` (`UY`), the currency `UYU` is being assumed.

> _Suggestions? Please [open an Issue](https://github.com/thiagodp/country-to-currency/issues/new). Pull Requests? Make sure to edit [generate.js](generate.js) instead of [index.ts](index.ts)._

## License

This library is inspired by Michael Rhodes' [currency-code-map](https://github.com/michaelrhodes/currency-code-map). The current project adds new currencies, offers support to browsers and DenoJS, updates dependencies, and provides new internal scripts.

[MIT](LICENSE.txt) © [Thiago Delgado Pinto](https://github.com/thiagodp)
