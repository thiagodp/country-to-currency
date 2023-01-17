[![npm (tag)](https://img.shields.io/npm/v/country-to-currency?color=green&label=NPM&style=for-the-badge)](https://github.com/thiagodp/country-to-currency/releases)
[![License](https://img.shields.io/npm/l/country-to-currency.svg?style=for-the-badge&color=green)](https://github.com/thiagodp/country-to-currency/blob/master/LICENSE.txt)
[![npm](https://img.shields.io/npm/dt/country-to-currency?style=for-the-badge&color=green)](https://www.npmjs.com/package/country-to-currency)

# country-to-currency

> Maps country codes ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)) to their default currency codes ([ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)).

⚡ Just 2.3 KB (unzipped), no external dependencies.

🎯 Work with browsers, NodeJS, and DenoJS. JavaScript and TypeScript.

## Install

```shell
npm i country-to-currency
```

## Usage

This library exports a default object that maps country codes to currency codes.

[Available formats]() include [UMD](https://github.com/umdjs/umd) (therefore [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) and [CommonJS](http://wiki.commonjs.org/wiki/CommonJS)) and
[ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

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

- All the countries included - currently `249`.
- For `Antarctica` (`AQ`), the currency `USD` is being assumed.
- For `Palestine` (`PS`), the currency `ILS` is being assumed.
- For `South Korea` (`KR`), the currency `KRW` is being assumed.
- For `Switzerland` (`CH`), the currenty `CHF` is being assumed.
- For `Chile` (`CLF`), the currency `CLP` is being assumed.
- For `Uruguay` (`UY`), the currency `UYU` is being assumed.
- For `Croatia` (`HR`), the currency `EUR` is being assumed since January 1st, 2023.

> _Suggestions? Please [open an Issue](https://github.com/thiagodp/country-to-currency/issues/new)._

## License

This library is inspired by Michael Rhodes' [currency-code-map](https://github.com/michaelrhodes/currency-code-map). The current project adds new currencies, offers support to browsers and DenoJS, updates dependencies, and provides new internal scripts.

[MIT](LICENSE.txt) © [Thiago Delgado Pinto](https://github.com/thiagodp)
