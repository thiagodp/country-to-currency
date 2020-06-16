var countries = require('country-list/data')
var currencies = require('currency-codes/data')
const fs = require('fs')

// const countryNames = countries.map( c => c.name );
// const currencyCountries = currencies.map( c => c.countries.join( ',' ) );
// for ( const c of countryNames ) {
//   console.log( c );
// }
// console.log( '_'.repeat( 40 ) );
// for ( const c of currencyCountries ) {
//   console.log( c );
// }


const r = {};
let count = 0;
let notFound = [];
for ( const country of countries ) {
  for ( const currency of currencies ) {
    const countryName = country.name.split( ',' )[ 0 ];
    if ( currency.countries.join( ',' ).indexOf( countryName ) >= 0 ) {
      // console.log( country, '->', currency.countries.join( ',' ), '->', currency.code );
      r[ country.code ] = currency.code;
      ++count;
      break;
    }
  }
  if ( ! r[ country.code ] ) {
    notFound.push( country );
  }
}

// console.log( r );
// console.log( countries.length, '<->', count );
// console.log( 'Not found:', notFound );

if ( notFound.length > 0 ) {

  // console.log( '_'.repeat( 40 ) );

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
          // console.log( 'found', nf );
          notFound = notFound.filter( f => f.code != nf.code );
          r[ nf.code ] = curr.code;
          ++count;
        }

      }
    }
  }
}

const manualEntries = [
  // Antactica has no official currency, so we will assume 'USD'
  { countryCode: 'AQ', currencyCode: 'USD' },
  // According to Google, Palestine uses the currency 'New Israeli Sheqel', code 'ILS'
  { countryCode: 'PS', currencyCode: 'ILS' },
];

for ( const m of manualEntries ) {
  if ( ! r[ m.countryCode ] ) {
    r[ m.countryCode ] = m.currencyCode;
    ++count;
    notFound = notFound.filter( f => f.code != m.countryCode );
  }
}

console.log( countries.length, 'countries,', count, 'mapped' );
console.log( 'Not found:', notFound );

const content = 'export default ' +
  JSON.stringify( r, null, 2 )
    .replace(/"([A-Z]{2})":/g, '$1:')
    .replace(/"/g, "'") +
  "\n";

fs.writeFileSync( 'index.ts', content );

console.log( 'index.ts generated.' );
