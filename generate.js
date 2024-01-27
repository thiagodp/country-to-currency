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
  // Antactica has no official currency, so we will assume USD.
  { countryCode: 'AQ', currencyCode: 'USD' },
  // Palestine uses the currency 'New Israeli Sheqel' (ILS), according to Google.
  { countryCode: 'PS', currencyCode: 'ILS' },
  // Turkey uses 'Turkish lira' (TRY), according to Wikipedia. Thanks @kylem123
  { countryCode: 'TR', currencyCode: 'TRY' },
  // South Korea (KR) uses currency 'KRW', according to ISO 4217. Thanks @MunjaeLee
  { countryCode: 'KR', currencyCode: 'KRW' },
  // Switzerland uses 'CHF', according to Wikipedia. Thanks @betabong
  { countryCode: 'CH', currencyCode: 'CHF' },
  // Chile uses 'Chilean peso' (CLP), and 'CLF' is a non-circulating currency, according to Wikipedia.
  { countryCode: 'CL', currencyCode: 'CLP' },
  // Uruguay uses 'UYU', according to Wikipedia. Thanks @marneborn
  { countryCode: 'UY', currencyCode: 'UYU' },
  // Crotia moved from Kuna (HRK) to Euro (EUR) on January 1, 2023, according to Wikipedia and Stripe. Thanks @xaphod
  { countryCode: 'HR', currencyCode: 'EUR' },
  // Netherlands Antilles (AN) uses Netherlands Antillean Guilder (ANG), according to ISO 4217. Thanks @jayPare
  { countryCode: 'AN', currencyCode: 'ANG' },
  // El Salvador (SV) changed from 'SVC' to 'USD' since 2001, according to Wikipedia. Thanks @chaitanya-d
  { countryCode: 'SV', currencyCode: 'USD' },
  // South Georgia and the South Sandwich Islands ('GS') uses the currency 'Falkland Islands Pound' (FKP), according to Wikipedia and https://gov.gs. Thanks @danielrentz
  { countryCode: 'GS', currencyCode: 'FKP' },
  // Cuba (CU) changed from 'CUC' to 'CUP' since 2021, according to Wikipedia. Thanks @jasongitmail
  { countryCode: 'CU', currencyCode: 'CUP' },
  // Hungary (HU) uses Forint (HUF), according to Wikipedia. Thanks @jasongitmail
  { countryCode: 'HU', currencyCode: 'HUF' },
  // Samoa (WS) uses Tālā ('WST'), according to Wikipedia. Thanks @jasongitmail
  { countryCode: 'WS', currencyCode: 'WST' },
  // Niger (NE) uses West African CFA Franc (XOF), according to Wikipedia. Thanks @danielrentz
  { countryCode: 'NE', currencyCode: 'XOF' },
  // Republic of the Congo (CG) uses 'Central African CFA Franc' (XAF), according to Wikipedia. Thanks @jasongitmail
  { countryCode: 'CG', currencyCode: 'XAF' },
  // Dominican Republic (DM) uses 'East Caribbean Dollar' (XCD), according to Wikipedia. Thanks @jasongitmail
  { countryCode: 'DM', currencyCode: 'XCD' },
  // Sierra Leone (SL) uses the new 'Leone' code SLE since January 1st, 2024 - according to European Union (https://publications.europa.eu/code/en/en-5000700.htm#fn*). Thanks @jasongitmail
  { countryCode: 'SL', currencyCode: 'SLE' },
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

const content = '// This is a generated file - please do not modify it\n' +
  'const countryToCurrency = ' +
  JSON.stringify( sorted, null, 2 )
    .replace(/"([A-Z]{2})":/g, '$1:')
    .replace(/"/g, "'") +
    ' as const;\n\n' + // TypeScript 3.4+ (2019)
    'export default countryToCurrency;\n\n' +
    'export type Countries = keyof typeof countryToCurrency;\n\n' +
    'export type Currencies = typeof countryToCurrency[Countries];\n'
  ;

fs.writeFileSync( 'index.ts', content );


//
// Report
//

console.log( 'index.ts generated sucessfully.\n' );
console.log( countryCount, 'countries total:' );
console.log( '\t', countries.length, '\timported');
console.log( '\t', inclusions - notFound.length, '\tincluded' );
console.log( '\t', inclusionsOrFixes.length - inclusions + notFound.length, '\tfixed' );
