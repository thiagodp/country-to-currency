# country-to-currency

> Maps country codes ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)) to their default currency codes ([ISO 4217 currency codes](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)).

⚡ Just 3 KB and no external dependencies.

🎯 Works with browsers, NodeJS and DenoJS (JavaScript and TypeScript).

## Install

```shell
npm install country-to-currency
```

## Usage

The library just returns a default object that maps country codes to currency codes.

### Browser - without installing anything

```html
<script type="module" >
    import currency from "https://unpkg.com/country-to-currency/index.esm.js";
    console.log( currency ); // {AF: "AFN", AX: "EUR", ... }
    console.log( currency[ 'US' ] ); // USD
    console.log( currency[ 'DE' ] ); // EUR
    console.log( currency[ 'BR' ] ); // BRL
</script>
```

_Note_: UMD format is also available (`index.umd.js`).

### NodeJS
```js
const currency = require( 'country-to-currency' );
console.log( currency ); // {AF: "AFN", AX: "EUR", ... }
```

### DenoJS

```js
import currency from "https://unpkg.com/country-to-currency/index.esm.js";
console.log( currency ); // {AF: "AFN", AX: "EUR", ... }
```

## Notes

- All the countries are being imported.
- For `Antarctica` (`AQ`), the currency `US Dollars` (`USD`) is being assumed.
- For `Palestine` (`PS`), the currency `New Israeli Sheqel` (`ILS`) is being assumed.

## License

This library is inspired by [currency-code-map](https://github.com/michaelrhodes/currency-code-map) from Michael Rhodes. This project adds new currencies, offers support to browsers and DenoJS, updates dependencies and provide new internal scripts.

[MIT](LICENSE.txt) © [Thiago Delgado Pinto](https://github.com/thiagodp)
