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
const countryToCurrency = require( 'country-to-currency/index.cjs' ); // '/index.cjs' needed since version 2.0
console.log( countryToCurrency[ 'US' ] ); // USD
```

### Deno

```js
import countryToCurrency from "https://unpkg.com/country-to-currency/index.esm.js";
console.log( countryToCurrency[ 'US' ] ); // USD
```

## Notes

- Countries included: `251`
  - Imported: `249`
  - Included: `2`
  - Fixed: `17`
- Currencies assumed:

| Country | Currency | Details | Thanks to |
|---------|----------|---------|-----------|
| Antarctica (`AQ`) | `USD` | Antarctica has no official currency | [@thiagodp](https://github.com/thiagodp)|
| Palestine (`PS`) | `ILS` | Google | [@thiagodp](https://github.com/thiagodp)|
| Turkey (`TR`) | `TRY` | Wikipedia | [@kylem123](https://github.com/kylem123), [@thiagodp](https://github.com/thiagodp)|
| South Korea (`KR`) | `KRW` | ISO 4217 | [@MunjaeLee](https://github.com/MunjaeLee), [@thiagodp](https://github.com/thiagodp)|
| Switzerland (`CH`) | `CHF` | Wikipedia | [@betabong](https://github.com/betabong), [@thiagodp](https://github.com/thiagodp)|
| Chile (`CL`) | `CLP` | `CLF` is a non-circulating currency. Wikipedia | [@thiagodp](https://github.com/thiagodp)|
| Uruguay (`UY`) | `UYU` | Wikipedia | [@marneborn](https://github.com/marneborn), [@thiagodp](https://github.com/thiagodp)|
| Croatia (`HR`) | `EUR` | Since January 1st, 2023. Wikipedia and Stripe | [@xaphod](https://github.com/xaphod), [@thiagodp](https://github.com/thiagodp)|
| Netherlands Antilles (`AN`) | `ANG` | ISO 4217 | [@jayPare](https://github.com/jayPare), [@thiagodp](https://github.com/thiagodp)|
| El Salvador (`SV`) | `USD` | Since 2001. Wikipedia | [@chaitanya-d](https://github.com/chaitanya-d), [@thiagodp](https://github.com/thiagodp)|
| South Georgia and the South Sandwich Islands (`GS`) | `FKP` | Wikipedia and https://gov.gs | [@danielrentz](https://github.com/danielrentz), [@thiagodp](https://github.com/thiagodp)|
| Cuba (`CU`) | `CUP` | Wikipedia | [@jasongitmail](https://github.com/jasongitmail), [@thiagodp](https://github.com/thiagodp)|
| Hungary (`HU`) | `HUF` | Wikipedia | [@jasongitmail](https://github.com/jasongitmail), [@thiagodp](https://github.com/thiagodp)|
| Samoa (`WS`) | `WST` | Wikipedia | [@jasongitmail](https://github.com/jasongitmail), [@thiagodp](https://github.com/thiagodp)|
| Niger (`NE`) | `XOF` | Wikipedia | [@danielrentz](https://github.com/danielrentz), [@thiagodp](https://github.com/thiagodp)|
| Republic of the Congo (`CG`) | `XAF` | Wikipedia | [@jasongitmail](https://github.com/jasongitmail), [@thiagodp](https://github.com/thiagodp)|
| Dominican Republic (`DM`) | `XCD` | Wikipedia | [@jasongitmail](https://github.com/jasongitmail), [@thiagodp](https://github.com/thiagodp)|
| Sierra Leone (`SL`) | `SLE` | Wikipedia and [European Union](https://publications.europa.eu/code/en/en-5000700.htm#fn*) | [@jasongitmail](https://github.com/jasongitmail), [@thiagodp](https://github.com/thiagodp)|
| Kosovo (`XK`) | `EUR` | [Wikipedia](https://en.wikipedia.org/wiki/Kosovo) and [Geo Names](https://geonames.wordpress.com/2010/03/08/xk-country-code-for-kosovo/) | [@dukesilverr](https://github.com/dukesilverr), [@thiagodp](https://github.com/thiagodp)|

## Contribute

_Suggestions? Please [open an Issue](https://github.com/thiagodp/country-to-currency/issues/new). Pull Requests? Make sure to edit [generate.js](generate.js) instead of [index.ts](index.ts)._

## License

This library is inspired by Michael Rhodes' [currency-code-map](https://github.com/michaelrhodes/currency-code-map). The current project adds new currencies, fixes, offers support to browsers and DenoJS, updates dependencies, and provides new internal scripts.

[MIT](LICENSE.txt) © [Thiago Delgado Pinto](https://github.com/thiagodp)
