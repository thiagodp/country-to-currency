// deno --allow-import example-web.ts

import countryToCurrency, { Currencies, Countries } from "https://unpkg.com/country-to-currency@3";

const currency: Currencies = 'BRL';
const country: Countries = 'BR';

console.log( countryToCurrency[ 'BR' ] );
console.log( currency, country );
