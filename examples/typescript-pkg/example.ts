// pnpm exec tsc && node example.js

import countryToCurrency, { Currencies, Countries } from "country-to-currency";

const currency: Currencies = 'BRL';
const country: Countries = 'BR';

console.log( countryToCurrency[ 'AD' ] );
console.log( currency, country );