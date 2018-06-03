const { expect } = require('chai');
const { normalizeProperty } = require('../src/helpers/normalize-data/normalize-properties');

const mlsA = require('./data/mls_a.json');

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
  it('should normalize property b', () => {});
});

describe('Normalize Properties - End to End Test', () => {
  it('should reject one of the properties', () => {});
});
