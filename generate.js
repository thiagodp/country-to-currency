// import countries from 'country-list/data.json';
import { currencies as listCurrencies } from 'fresh-currency-codes';
import { readFileSync, writeFileSync } from 'node:fs';

// Read countries from the JSON file
const countries = JSON.parse( readFileSync( './node_modules/country-list/data.json' ).toString() );

const currencies = listCurrencies( { includeDeprecated: false } );


const result = {};
let count = 0;
let notFound = [];
for ( const country of countries ) {
  const countryName = country.name.split( ',' )[ 0 ].toLowerCase();
  // ISO country names lead with the country itself, so a prefix match reconciles
  // country-list's short names with the "(the)"-suffixed ISO names — and won't
  // match a short name buried inside a longer one (e.g. "mali" within "somalia").
  const match = currencies.find( currency =>
    currency.countries.some( name => name.toLowerCase().startsWith( countryName ) )
  );
  if ( match ) {
    result[ country.code ] = match.code;
    ++count;
  } else {
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
  // Antarctica has no official currency, so we will assume USD.
  { countryCode: 'AQ', currencyCode: 'USD',
    country: 'Antarctica', details: 'Antarctica has no official currency',
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
  // Netherlands Antilles (AN) was dissolved in 2010; its successor territories (Curaçao and Sint Maarten) adopted the Caribbean Guilder (XCG), which replaced the now-retired Netherlands Antillean Guilder (ANG) on 2025-07-01. Thanks @jayPare
  { countryCode: 'AN', currencyCode: 'XCG',
    country: 'Netherlands Antilles', details: 'XCG replaced ANG on 2025-07-01 ([Wikipedia](https://en.wikipedia.org/wiki/Caribbean_guilder))',
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
  // Kosovo is using "XK" as a temporary country code (https://geonames.wordpress.com/2010/03/08/xk-country-code-for-kosovo/) and it's using Euro (EUR) (https://en.wikipedia.org/wiki/Kosovo)
  { countryCode: 'XK', currencyCode: 'EUR',
    country: 'Kosovo',
    details: '[Wikipedia](https://en.wikipedia.org/wiki/Kosovo) and [Geo Names](https://geonames.wordpress.com/2010/03/08/xk-country-code-for-kosovo/)',
    thanks: [ 'dukesilverr', 'thiagodp' ] },
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

writeFileSync( 'index.ts', content );


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

const readmeFileContent = readFileSync( 'readme.md' ).toString();

const lines = readmeFileContent.replace( /[\r]+/g, '' ).split( '\n' );

const notesIndex = lines.findIndex( line => line === '## Notes' );
const contributeIndex = lines.findIndex( line => line === '## Contribute' );

const notes = [
  // '',
  // '<style>',
  // 'table {',
  // '  font-size: 12px;',
  // '}',
  // '</style>',
  '',
  '- Total countries: `' + countryCount + '`',
  '  - Imported: `' + importedCountriesCount + '`',
  '  - Included: `' + includedCountriesCount + '`',
  '  - Fixed: `' + fixedCountriesCount + '`',
  '- Currencies assumed:',
  '',
  '| Country | Currency | Details | Thanks to |',
  '|---------|----------|---------|-----------|',
].concat( authoredNotes );

const newLines = lines.slice( 0, notesIndex + 1 ).concat( notes, lines.slice( contributeIndex - 1 ) );

writeFileSync( 'readme.md', newLines.join( '\r\n' ) );

