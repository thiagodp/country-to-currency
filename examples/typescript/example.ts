// pnpm exec tsc && node example.js

import countryToCurrency, { Currencies, Countries } from "../../index.js";

const currency: Currencies = 'BRL';
const country: Countries = 'BR';

console.log( countryToCurrency[ 'BR' ] );
console.log( currency, country );
