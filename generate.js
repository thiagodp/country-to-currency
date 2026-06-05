import { readFileSync, writeFileSync } from 'node:fs';
import { XMLParser } from "fast-xml-parser";

// ----------------------------------------------------------------------------
// Utilities
// ----------------------------------------------------------------------------

function removeAccentuation( text ) {
  return text.normalize('NFD').replace( /[\u0300-\u036f]/g, '' );
}

function replaceStrangeApostrophe( text ) {
  return text.replace( '’', "'" );
}

function removeCommaAndParenthesisAndBrackets( text ) {
  return text.replaceAll( /[,\(\)\[\]]/g, '' );
}

function removeThe( text ) {
  return text.replaceAll( /(THE | THE | THE)/g, ' ' ).trim();
}

function fixCountryName( name = '' ) {
  return removeThe(
    removeCommaAndParenthesisAndBrackets(
      replaceStrangeApostrophe(
        removeAccentuation( name.toUpperCase() )
      )
    )
  );
}

// ----------------------------------------------------------------------------
// Get currencies from the web (XML fetch + parsing)
// ----------------------------------------------------------------------------

async function fetchXML( url ) {
    const response = await fetch( url );
    if ( ! response.ok ) {
        throw new Error( `Error fetching the XML file: ${response.status}` );
    }
    return await response.text();
}

async function parseXML( content ) {
    const parser = new XMLParser();
    return await parser.parse( content );
}

const CURRENCY_XML = 'https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml';

let jsContent;
try {
    const xmlContent = await fetchXML( CURRENCY_XML );
    jsContent = await parseXML( xmlContent );
} catch ( error ) {
    console.error( `Error processing the XML file: ${error.message}` );
    process.exit( 1 );
}

const countryNameToCurrencyCodeMap = {};
// const countryNameToCodeMap = new Map();
for ( const entry of jsContent.ISO_4217.CcyTbl.CcyNtry ) {
    const currencyCode = entry.Ccy;
    const countryName = fixCountryName( entry.CtryNm );
    // console.log( `Country ${countryName}`, (( countryName != entry.CtryNm ) ? 'Original: ' + entry.CtryNm : '' ) );
    if ( countryNameToCurrencyCodeMap[ countryName ] ) {
      continue;
    }
    // countryNameToCodeMap.set( country, code );
    countryNameToCurrencyCodeMap[ countryName ] = currencyCode;
}

// ----------------------------------------------------------------------------
// Get countries from JSON (local package)
// ----------------------------------------------------------------------------

// Read countries from the JSON file
const countries = JSON.parse( readFileSync( './node_modules/country-list/data.json' ).toString() );

// ----------------------------------------------------------------------------
// Create country code to currency map
// ----------------------------------------------------------------------------

const result = {};
let count = 0;

for ( const country of countries ) { // eg: [ { "code": "AD", "name": "Andorra" }, ...]

  const countryName = fixCountryName( country.name );
  // console.log( `Trying ${countryName}` );

  let currencyCode = countryNameToCurrencyCodeMap[ countryName ]; // Currency code

  if ( ! currencyCode ) {
    console.log( `Note: Code not detected for the country ${countryName}. Maybe it has no currency code (eg, Antarctiva, Palestine).` );
    continue;
  }

  result[ country.code ] = currencyCode;
  ++count;
}

// ----------------------------------------------------------------------------
// Inclusions or Fixes
// ----------------------------------------------------------------------------

const inclusionsOrFixes = [

  //
  // Countries with no official currency
  //

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

  // South Georgia and the South Sandwich Islands ('GS') uses the currency 'Falkland Islands Pound' (FKP), according to Wikipedia and https://gov.gs.
  { countryCode: 'GS', currencyCode: 'FKP',
    country: 'South Georgia and the South Sandwich Islands',
    details: 'Wikipedia and https://gov.gs',
    thanks: [ 'danielrentz', 'thiagodp' ]
  },

  //
  // Legacy support (inclusion)
  //

  // Netherlands Antilles (AN) uses Netherlands Antillean Guilder (ANG), according to ISO 4217.
  { countryCode: 'AN', currencyCode: 'ANG',
    country: 'Netherlands Antilles', details: 'Legacy support. In 2026 Netherlands Antilles was split into separate countries.', legacy: true,
    thanks: [ 'jayPare', 'thiagodp' ]
  },

  //
  // Other
  //

  // El Salvador (SV) changed from 'SVC' to 'USD' since 2001, according to Wikipedia.
  { countryCode: 'SV', currencyCode: 'USD',
    country: 'El Salvador', details: 'Since 2001. Wikipedia',
    thanks: [ 'chaitanya-d', 'thiagodp' ]
  },

  // Kosovo is using "XK" as a temporary country code (https://geonames.wordpress.com/2010/03/08/xk-country-code-for-kosovo/) and it's using Euro (EUR) (https://en.wikipedia.org/wiki/Kosovo)
  { countryCode: 'XK', currencyCode: 'EUR',
    country: 'Kosovo',
    details: '[Wikipedia](https://en.wikipedia.org/wiki/Kosovo) and [Geo Names](https://geonames.wordpress.com/2010/03/08/xk-country-code-for-kosovo/)',
    thanks: [ 'dukesilverr', 'thiagodp' ] },

  // Buthan has two currencies, BTN and INR, but BTN is the official one.
  { countryCode: 'BT', currencyCode: 'BTN',
    country: 'Buthan',
    details: 'According to [Wikipedia](https://en.wikipedia.org/wiki/Bhutan)',
    thanks: [ 'thiagodp' ] },

  //
  // Not needed anymore
  //

  // // Turkey uses 'Turkish lira' (TRY), according to Wikipedia.
  // { countryCode: 'TR', currencyCode: 'TRY',
  //   country: 'Turkey', details: 'Wikipedia',
  //   thanks: [ 'kylem123', 'thiagodp' ]
  // },

  // // South Korea (KR) uses currency 'KRW', according to ISO 4217.
  // { countryCode: 'KR', currencyCode: 'KRW',
  //   country: 'South Korea', details: 'ISO 4217',
  //   thanks: [ 'MunjaeLee', 'thiagodp' ]
  // },

  // // Switzerland uses 'CHF', according to Wikipedia.
  // { countryCode: 'CH', currencyCode: 'CHF',
  //   country: 'Switzerland', details: 'Wikipedia',
  //   thanks: [ 'betabong', 'thiagodp' ]
  // },

  // // Chile uses 'Chilean peso' (CLP), and 'CLF' is a non-circulating currency, according to Wikipedia.
  // { countryCode: 'CL', currencyCode: 'CLP',
  //   country: 'Chile', details: '`CLF` is a non-circulating currency. Wikipedia',
  //   thanks: [ 'thiagodp' ]
  // },

  // // Uruguay uses 'UYU', according to Wikipedia.
  // { countryCode: 'UY', currencyCode: 'UYU',
  //   country: 'Uruguay', details: 'Wikipedia',
  //   thanks: [ 'marneborn', 'thiagodp' ]
  // },

  // // Niger (NE) uses West African CFA Franc (XOF), according to Wikipedia.
  // { countryCode: 'NE', currencyCode: 'XOF',
  //   country: 'Niger', details: 'Wikipedia',
  //   thanks: [ 'danielrentz', 'thiagodp' ] },

  // // Republic of the Congo (CG) uses 'Central African CFA Franc' (XAF), according to Wikipedia.
  // { countryCode: 'CG', currencyCode: 'XAF',
  //   country: 'Republic of the Congo', details: 'Wikipedia',
  //   thanks: [ 'jasongitmail', 'thiagodp' ] },

  // // Dominican Republic (DM) uses 'East Caribbean Dollar' (XCD), according to Wikipedia.
  // { countryCode: 'DM', currencyCode: 'XCD',
  //   country: 'Dominican Republic', details: 'Wikipedia',
  //   thanks: [ 'jasongitmail', 'thiagodp' ] },

  // // Sierra Leone (SL) uses the new 'Leone' code SLE since January 1st, 2024 - according to European Union (https://publications.europa.eu/code/en/en-5000700.htm#fn*).
  // { countryCode: 'SL', currencyCode: 'SLE',
  //   country: 'Sierra Leone',
  //   details: 'Wikipedia and [European Union](https://publications.europa.eu/code/en/en-5000700.htm#fn*)',
  //   thanks: [ 'jasongitmail', 'thiagodp' ] },

  // // On 01 January 2026, Bulgaria joined the Eurozone (https://www.ecb.europa.eu/euro/changeover/bulgaria/html/index.en.html).
  // { countryCode: 'BG', currencyCode: 'EUR',
  //   country: 'Bulgaria',
  //   details: '[On 01 January 2026, Bulgaria joined the Eurozone](https://www.ecb.europa.eu/euro/changeover/bulgaria/html/index.en.html)',
  //   thanks: [ 'joelpickup', 'thiagodp' ] },

  // // Samoa (WS) uses Tālā ('WST'), according to Wikipedia.
  // { countryCode: 'WS', currencyCode: 'WST',
  //   country: 'Samoa', details: 'Wikipedia',
  //   thanks: [ 'jasongitmail', 'thiagodp' ] },

  // // Hungary (HU) uses Forint (HUF), according to Wikipedia.
  // { countryCode: 'HU', currencyCode: 'HUF',
  //   country: 'Hungary', details: 'Wikipedia',
  //   thanks: [ 'jasongitmail', 'thiagodp' ] },

  // // Cuba (CU) changed from 'CUC' to 'CUP' since 2021, according to Wikipedia.
  // { countryCode: 'CU', currencyCode: 'CUP',
  //   country: 'Cuba', details: 'Wikipedia',
  //   thanks: [ 'jasongitmail', 'thiagodp' ]
  // },

  // // Croatia moved from Kuna (HRK) to Euro (EUR) on January 1, 2023, according to Wikipedia and Stripe.
  // { countryCode: 'HR', currencyCode: 'EUR',
  //   country: 'Croatia', details: 'Since January 1st, 2023. Wikipedia and Stripe',
  //   thanks: [ 'xaphod', 'thiagodp' ]
  // },

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
    '| ' + ( item.legacy ? 'Yes' : '' ) + ' ' +
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
const includedCountriesCount = inclusions;
const fixedCountriesCount = inclusionsOrFixes.length - inclusions;

console.log( '\nindex.ts generated sucessfully.\n' );
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
  '| Country | Currency | Details | Legacy |Thanks to |',
  '|---------|----------|---------|--------|----------|',
].concat( authoredNotes );

const newLines = lines.slice( 0, notesIndex + 1 ).concat( notes, lines.slice( contributeIndex - 1 ) );

writeFileSync( 'readme.md', newLines.join( '\r\n' ) );

