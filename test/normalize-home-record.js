const { expect } = require('chai');
const { normalizeProperty } = require('../src/helpers/normalize-data/normalize-property');

const mlsA = require('./data/mls_a.json');
const mlsB = require('./data/mls_b.json');

describe('Normalize Properties - Unit Test', () => {
  it('should normalize property a', () => {
    const normalizedProperty = normalizeProperty(mlsA);
    expect(normalizedProperty).to.deep.equal({
      mls_name: 'ga_fmls',
      mls_id: 76257,
      street_address: '176 Milton Ave',
      city: 'Atlanta',
      state: 'GA',
      zip_code: 30317,
      list_price: 275000,
      list_date: 1525249167000,
      bedrooms: 3,
      full_baths: 2,
      half_baths: 1,
      size: 2300,
    });
  });
  it('should normalize property b', () => {
    const normalizedProperty = normalizeProperty(mlsB);
    expect(normalizedProperty).to.deep.equal({
      mls_name: 'ncsc_cmls',
      mls_id: 53728,
      street_address: '256 Old Mill',
      city: 'Charlotte',
      state: 'NC',
      zip_code: 28269,
      list_price: 29999900,
      list_date: 1526284800000,
      bedrooms: 4,
      full_baths: 3,
      size: 1975,
    });
  });
});

describe('Normalize Properties - End to End Test', () => {
  it('should reject one of the properties', () => {});
});
