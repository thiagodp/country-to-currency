# country-to-currency

> Maps country codes ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)) to their default currency codes ([ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)).

⚡ Just 3 KB and no external dependencies.

🎯 Works with browsers, NodeJS and DenoJS (JavaScript and TypeScript).

## Install

```shell
npm install country-to-currency
```

## Usage

This library exports a default object that maps country codes to currency codes.

[Available formats]() include [UMD](https://github.com/umdjs/umd) (therefore [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) and [CommonJS](http://wiki.commonjs.org/wiki/CommonJS)) and
[ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

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

_Note_: [UMD](https://github.com/umdjs/umd) is available in `index.umd.js`.

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

- All the countries included (currently `249`).
- For `Antarctica` (`AQ`), the currency `US Dollars` (`USD`) is being assumed.
- For `Palestine` (`PS`), the currency `New Israeli Sheqel` (`ILS`) is being assumed.

> _Suggestions? Please [open an Issue](https://github.com/thiagodp/country-to-currency/issues/new)._

## License

This library is inspired by [currency-code-map](https://github.com/michaelrhodes/currency-code-map) from Michael Rhodes. This project adds new currencies, offers support to browsers and DenoJS, updates dependencies and provide new internal scripts.

[MIT](LICENSE.txt) © [Thiago Delgado Pinto](https://github.com/thiagodp)
