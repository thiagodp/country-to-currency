let countries = require( 'country-list/data' );
let currencies = require( 'currency-codes/data' );
const fs = require( 'fs' );

const result = {};
let count = 0;
let notFound = [];
for ( const country of countries ) {
  for ( const currency of currencies ) {
    const countryName = country.name.split( ',' )[ 0 ];
    if ( currency.countries.join( ',' ).indexOf( countryName ) >= 0 ) {
      result[ country.code ] = currency.code;
      ++count;
      break;
    }
  }
  if ( ! result[ country.code ] ) {
    notFound.push( country );
  }
}

if ( notFound.length > 0 ) {

  const allNotFound = [ ... notFound ];
  for ( const currency of currencies ) {
    for ( const currencyCountry of currency.countries ) {

      const currencyCountryName = currencyCountry
        .replace( /(\([A-z ]+\)| ?\[|\])/g, '' )
        .replace( /’/, "'" )
        .trim()
        .toLowerCase();

      for ( const countryNotFound of allNotFound ) {

        const nameNotFound = countryNotFound.name.replace( /(\(|\))/g, '' )
          .trim()
          .toLowerCase();

        if ( nameNotFound.indexOf( currencyCountryName ) >= 0 ) {
          notFound = notFound.filter( f => f.code != countryNotFound.code );
          result[ countryNotFound.code ] = currency.code;
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
  // According to ISO 4217, South Korea's (country code KR) uses currency 'KRW'. Thanks @MunjaeLee
  { countryCode: 'KR', currencyCode: 'KRW' },
  // According to Wikipedia, Switzerland uses 'CHF'. Thanks @betabong
  { countryCode: 'CH', currencyCode: 'CHF' },
  // According to Wikipedia, CLF is a non-circulating currency for Chile, the Chilean peso is CLP.
  { countryCode: 'CL', currencyCode: 'CLP' },
  // According to Wikipedia, Uruguay uses 'UYU'. Thanks @marneborn
  { countryCode: 'UY', currencyCode: 'UYU' },
  // According to Wikipedia and Stripe, Crotia moved from HRK (Kuna) to the EUR (Euro) on January 1, 2023. Thanks @xaphod
  { countryCode: 'HR', currencyCode: 'EUR' },
  // According to ISO 4217, Netherlands Antilles ('AN') uses Netherlands Antillean Guilder, code 'ANG'. Thanks @jayPare
  { countryCode: 'AN', currencyCode: 'ANG' },
];

let inclusions = 0;
for ( const item of inclusionsOrFixes ) {
  if ( ! result[ item.countryCode ] ) {
    inclusions++;
  }
  result[ item.countryCode ] = item.currencyCode;
}

//
// Sort keys
//

let countryCount = 0;
const sorted = Object.keys( result )
  .sort()
  .reduce( ( accumulator, key ) => {
      ++countryCount;
      accumulator[ key ] = result[ key ];
      return accumulator;
    }, {} );

//
// Generate file
//

const content = 'export default ' +
  JSON.stringify( sorted, null, 2 )
    .replace(/"([A-Z]{2})":/g, '$1:')
    .replace(/"/g, "'") +
  "\n";

fs.writeFileSync( 'index.ts', content );


//
// Report
//

console.log( 'index.ts generated.' );
console.log( countryCount, '\tcountries in which:' );
console.log( '\t', countries.length, '\tcountries were imported;');
console.log( '\t', notFound.length, '\tcountries were originally not found for currency data;' );
if ( notFound.length > 0 ) console.log( notFound );
console.log( '\t', inclusions, '\tmanual inclusions;' );
console.log( '\t', inclusionsOrFixes.length - inclusions, '\tmanual fixes.' );

