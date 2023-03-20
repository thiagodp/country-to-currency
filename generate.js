let countries = require( 'country-list/data' );
let currencies = require( 'currency-codes/data' );
const fs = require( 'fs' );

const r = {};
let count = 0;
let notFound = [];
for ( const country of countries ) {
  for ( const currency of currencies ) {
    const countryName = country.name.split( ',' )[ 0 ];
    if ( currency.countries.join( ',' ).indexOf( countryName ) >= 0 ) {
      r[ country.code ] = currency.code;
      ++count;
      break;
    }
  }
  if ( ! r[ country.code ] ) {
    notFound.push( country );
  }
}

if ( notFound.length > 0 ) {

  const allNotFound = [ ... notFound ];
  for ( const curr of currencies ) {
    for ( const currCountry of curr.countries ) {

      const c = currCountry
        .replace( /(\([A-z ]+\)| ?\[|\])/g, '' )
        .replace( /’/, "'" )
        .trim()
        .toLowerCase();

      for ( const nf of allNotFound ) {

        const nfName = nf.name.replace( /(\(|\))/g, '' )
          .trim()
          .toLowerCase();

        if ( nfName.indexOf( c ) >= 0 ) {
          notFound = notFound.filter( f => f.code != nf.code );
          r[ nf.code ] = curr.code;
          ++count;
        }

      }
    }
  }
}

//
// Inclusions or Fixes
//

const inclusionsOrFixes = [
  // Antactica has no official currency, so we will assume 'USD'
  { countryCode: 'AQ', currencyCode: 'USD' },
  // According to Google, Palestine uses the currency 'New Israeli Sheqel', code 'ILS'
  { countryCode: 'PS', currencyCode: 'ILS' },
  // According to Wikipedia, Turkey uses 'Turkish lira', code 'TRY'. Thanks @kylem123
  { countryCode: 'TR', currencyCode: 'TRY' },
  // According to ISO 4217, South Korea's (country code KR) uses currency 'KRW'. Thanks @MunjaeLee for pointing it out.
  { countryCode: 'KR', currencyCode: 'KRW' },
  // According to Wikipedia, Switzerland uses 'CHF'. Thanks @betabong for pointing it out.
  { countryCode: 'CH', currencyCode: 'CHF' },
  // According to Wikipedia, CLF is a non-circulating currency for Chile, the Chilean peso is CLP.
  { countryCode: 'CL', currencyCode: 'CLP' },
  // According to Wikipedia, Uruguay uses 'UYU'. Thanks @marneborn for pointing it out.
  { countryCode: 'UY', currencyCode: 'UYU' },
  // According to Wikipedia and Stripe, Crotia moved from HRK (Kuna) to the EUR (Euro) on January 1, 2023 (@xaphod)
  { countryCode: 'HR', currencyCode: 'EUR' },
];

let inclusions = 0;
for ( const item of inclusionsOrFixes ) {
  if ( ! r[ item.countryCode ] ) {
    inclusions++;
  }
  r[ item.countryCode ] = item.currencyCode;
}

//
// Generate file
//

const content = 'export default ' +
  JSON.stringify( r, null, 2 )
    .replace(/"([A-Z]{2})":/g, '$1:')
    .replace(/"/g, "'") +
  "\n";

fs.writeFileSync( 'index.ts', content );


//
// Report
//

console.log( 'index.ts generated.' );
console.log( countries.length, '\timported countries');
console.log( inclusions, '\tmanually included.' );
console.log( inclusionsOrFixes.length - inclusions, '\tmanually fixed.' );
console.log( notFound.length, '\twere not found', notFound.length > 0 ? notFound : '' );

