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
  { countryCode: 'AQ', currencyCode: 'USD',
    country: 'Antactica', details: 'Antactica has no official currency',
    thanks: [ 'thiagodp' ]
  },
  // Palestine uses the currency 'New Israeli Sheqel' (ILS), according to Google.
  { countryCode: 'PS', currencyCode: 'ILS',
    country: 'Palestine', details: 'Google',
    thanks: [ 'thiagodp' ]
  },
  // Turkey uses 'Turkish lira' (TRY), according to Wikipedia. Thanks @kylem123
  { countryCode: 'TR', currencyCode: 'TRY',
    country: 'Turkey', details: 'Wikipedia',
    thanks: [ 'kylem123', 'thiagodp' ]
  },
  // South Korea (KR) uses currency 'KRW', according to ISO 4217. Thanks @MunjaeLee
  { countryCode: 'KR', currencyCode: 'KRW',
    country: 'South Korea', details: 'ISO 4217',
    thanks: [ 'MunjaeLee', 'thiagodp' ]
  },
  // Switzerland uses 'CHF', according to Wikipedia. Thanks @betabong
  { countryCode: 'CH', currencyCode: 'CHF',
    country: 'Switzerland', details: 'Wikipedia',
    thanks: [ 'betabong', 'thiagodp' ]
  },
  // Chile uses 'Chilean peso' (CLP), and 'CLF' is a non-circulating currency, according to Wikipedia.
  { countryCode: 'CL', currencyCode: 'CLP',
    country: 'Chile', details: '`CLF` is a non-circulating currency. Wikipedia',
    thanks: [ 'thiagodp' ]
  },
  // Uruguay uses 'UYU', according to Wikipedia. Thanks @marneborn
  { countryCode: 'UY', currencyCode: 'UYU',
    country: 'Uruguay', details: 'Wikipedia',
    thanks: [ 'marneborn', 'thiagodp' ]
  },
  // Croatia moved from Kuna (HRK) to Euro (EUR) on January 1, 2023, according to Wikipedia and Stripe. Thanks @xaphod
  { countryCode: 'HR', currencyCode: 'EUR',
    country: 'Croatia', details: 'Since January 1st, 2023. Wikipedia and Stripe',
    thanks: [ 'xaphod', 'thiagodp' ]
  },
  // Netherlands Antilles (AN) uses Netherlands Antillean Guilder (ANG), according to ISO 4217. Thanks @jayPare
  { countryCode: 'AN', currencyCode: 'ANG',
    country: 'Netherlands Antilles', details: 'ISO 4217',
    thanks: [ 'jayPare', 'thiagodp' ]
  },
  // El Salvador (SV) changed from 'SVC' to 'USD' since 2001, according to Wikipedia. Thanks @chaitanya-d
  { countryCode: 'SV', currencyCode: 'USD',
    country: 'El Salvador', details: 'Since 2001. Wikipedia',
    thanks: [ 'chaitanya-d', 'thiagodp' ]
  },
  // South Georgia and the South Sandwich Islands ('GS') uses the currency 'Falkland Islands Pound' (FKP), according to Wikipedia and https://gov.gs. Thanks @danielrentz
  { countryCode: 'GS', currencyCode: 'FKP',
    country: 'South Georgia and the South Sandwich Islands',
    details: 'Wikipedia and https://gov.gs',
    thanks: [ 'danielrentz', 'thiagodp' ]
  },
  // Cuba (CU) changed from 'CUC' to 'CUP' since 2021, according to Wikipedia. Thanks @jasongitmail
  { countryCode: 'CU', currencyCode: 'CUP',
    country: 'Cuba', details: 'Wikipedia',
    thanks: [ 'jasongitmail', 'thiagodp' ]
  },
  // Hungary (HU) uses Forint (HUF), according to Wikipedia. Thanks @jasongitmail
  { countryCode: 'HU', currencyCode: 'HUF',
    country: 'Hungary', details: 'Wikipedia',
    thanks: [ 'jasongitmail', 'thiagodp' ] },
  // Samoa (WS) uses Tālā ('WST'), according to Wikipedia. Thanks @jasongitmail
  { countryCode: 'WS', currencyCode: 'WST',
    country: 'Samoa', details: 'Wikipedia',
    thanks: [ 'jasongitmail', 'thiagodp' ] },
  // Niger (NE) uses West African CFA Franc (XOF), according to Wikipedia. Thanks @danielrentz
  { countryCode: 'NE', currencyCode: 'XOF',
    country: 'Niger', details: 'Wikipedia',
    thanks: [ 'danielrentz', 'thiagodp' ] },
  // Republic of the Congo (CG) uses 'Central African CFA Franc' (XAF), according to Wikipedia. Thanks @jasongitmail
  { countryCode: 'CG', currencyCode: 'XAF',
    country: 'Republic of the Congo', details: 'Wikipedia',
    thanks: [ 'jasongitmail', 'thiagodp' ] },
  // Dominican Republic (DM) uses 'East Caribbean Dollar' (XCD), according to Wikipedia. Thanks @jasongitmail
  { countryCode: 'DM', currencyCode: 'XCD',
    country: 'Dominican Republic', details: 'Wikipedia',
    thanks: [ 'jasongitmail', 'thiagodp' ] },
  // Sierra Leone (SL) uses the new 'Leone' code SLE since January 1st, 2024 - according to European Union (https://publications.europa.eu/code/en/en-5000700.htm#fn*). Thanks @jasongitmail
  { countryCode: 'SL', currencyCode: 'SLE',
    country: 'Sierra Leone',
    details: 'Wikipedia and [European Union](https://publications.europa.eu/code/en/en-5000700.htm#fn*)',
    thanks: [ 'jasongitmail', 'thiagodp' ] },
];

// [![GitHub profile picture](https://github.com/thiagodp.png?size=24)](https://github.com/thiagodp)

const authoredNotes = [];
// const authorToUrl = author => `[![@${author}](https://github.com/${author}.png?size=16)](https://github.com/${author})`;
const authorToUrl = author => `[@${author}](https://github.com/${author})`;

let inclusions = 0;
for ( const item of inclusionsOrFixes ) {
  if ( ! result[ item.countryCode ] ) {
    inclusions++;
  }
  result[ item.countryCode ] = item.currencyCode;

  authoredNotes.push(
    '| ' + item.country + ' (`' + item.countryCode + '`) ' +
    '| `' + item.currencyCode + '` ' +
    '| ' + item.details + ' ' +
    '| ' + item.thanks.map( authorToUrl ).join( ', ' ) +
    '|' );
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

const importedCountriesCount = countries.length;
const includedCountriesCount = inclusions - notFound.length;
const fixedCountriesCount = inclusionsOrFixes.length - inclusions + notFound.length;

console.log( 'index.ts generated sucessfully.\n' );
console.log( countryCount, 'countries total:' );
console.log( '\t', importedCountriesCount, '\timported');
console.log( '\t', includedCountriesCount, '\tincluded' );
console.log( '\t', fixedCountriesCount, '\tfixed' );

//
// Update readme.md
//

const readmeFileContent = fs.readFileSync( 'readme.md' ).toString();

const lines = readmeFileContent.replace( /[\r]+/g, '' ).split( '\n' );

const notesIndex = lines.findIndex( line => line === '## Notes' );
const contributeIndex = lines.findIndex( line => line === '## Contribute' );

const notes = [
  '',
  '<style>',
  'table {',
  '  font-size: 12px;',
  '}',
  '</style>',
  '',
  '- Countries included: `' + countryCount + '`',
  '  - Imported: `' + importedCountriesCount + '`',
  '  - Included: `' + includedCountriesCount + '`',
  '  - Fixed: `' + fixedCountriesCount + '`',
  '- Currencies assumed:',
  '',
  '| Country | Currency | Details | Thanks to |',
  '|---------|----------|---------|-----------|',
].concat( authoredNotes );

const newLines = lines.slice( 0, notesIndex + 1 ).concat( notes, lines.slice( contributeIndex - 1 ) );

fs.writeFileSync( 'readme.md', newLines.join( '\r\n' ) );

