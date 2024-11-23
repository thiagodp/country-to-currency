// deno example.ts

import countryToCurrency, { Currencies, Countries } from "../../index.ts";

const currency: Currencies = 'BRL';
const country: Countries = 'BR';

console.log( countryToCurrency[ 'BR' ] );
console.log( currency, country );
