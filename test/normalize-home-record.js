const { expect } = require('chai');
const { normalizeProperty } = require('../src/helpers/normalize-data/normalize-property');
const { saveHomeRecord, normalizeAndSaveHomeRecord } = require('../src/helpers/saveHomeRecord');

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
      list_price: 299999.00,
      list_date: 1526284800000,
      bedrooms: 4,
      full_baths: 3,
      size: 1975,
    });
  });
});

describe('Normalize Properties - End to End Test', () => {
  const customerId = 1234;
  const emptyProperty = {};
  it('should reject an empty property when hitting api directly (supplying empty property)', () => (
    saveHomeRecord(emptyProperty, customerId)
      .then(() => {
        throw new Error('this line should never get hit as an error should be thrown');
      })
      .catch((e) => {
        const expectedErrorMessages = [
          'mls_name is required',
          'mls_id is required',
          'street_address is required',
          'city is required',
          'state is required',
          'zip_code is required',
          'list_price is required',
          'list_date is required',
        ];
        expect(e.error.message).to.equal(expectedErrorMessages.join('\n'));
      })
  ));

  it('should reject a property when hitting api directly (incorrect list price)', () => {
    const recordWithIncorrectListPrice = {
      mls_name: 'ncsc_cmls',
      mls_id: 53728,
      street_address: '256 Old Mill',
      city: 'Charlotte',
      state: 'NC',
      zip_code: 28269,
      list_price: '$299,999.00',
      list_date: 1526284800000,
    };
    return saveHomeRecord(recordWithIncorrectListPrice, customerId)
      .then(() => {
        throw new Error('this line should never get hit as an error should be thrown');
      })
      .catch((e) => {
        expect(e.error.message).to.equal('Expected list_price to be a number');
      });
  });

  it('should expect a success message when normalizing and saving home', () => (
    normalizeAndSaveHomeRecord(mlsA, customerId)
      .then((response) => {
        const { success, property, customerId: responseCustomerId } = response;
        expect(success).to.be.true;
        expect(property).to.deep.equal(normalizeProperty(mlsA));
        expect(customerId).to.equal(parseInt(responseCustomerId, 10));
      })
  ));
});
