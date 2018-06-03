/* eslint no-multi-spaces: 0 */
function getMlsName(homeRecord) {
  return homeRecord.data_name;
}

function getMlsId(homeRecord) {
  return parseInt(homeRecord.vendor_id, 10);
}

function getStreetAddress(homeRecord) {
  const useAddressComponenets = homeRecord.address_components && ['street_name', 'street_number', 'street_suffix'].every(field => field in homeRecord.address_components);
  if (useAddressComponenets) {
    const { address_components: addressFields } = homeRecord;
    return `${addressFields.street_number} ${addressFields.street_name} ${addressFields.street_suffix}`;
  }

  throw new Error('No address found');
}

function getCity(homeRecord) {
  if ((homeRecord.address_components || {}).city) {
    return homeRecord.address_components.city;
  }

  throw new Error('No city found');
}

function getState(homeRecord) {
  if ((homeRecord.address_components || {}).state) {
    return homeRecord.address_components.state;
  }

  throw new Error('No state found');
}

function getZip(homeRecord) {
  if ((homeRecord.address_components || {}).zipcode) {
    return parseInt(homeRecord.address_components.zipcode, 10);
  }

  throw new Error('No zipcode found');
}

function getListPrice(homeRecord) {
  let listPrice;
  if (homeRecord.list) {
    listPrice = homeRecord.list;
  }

  if (listPrice) {
    // remove non-numerical values
    const cleanedListPrice = listPrice.replace(/[^0-9]/g, '');

    return parseInt(cleanedListPrice, 10);
  }

  throw new Error('No list price found');
}

function getListDate(homeRecord) {
  let listDate;
  if (homeRecord.date) {
    listDate = homeRecord.date;
  }

  if (listDate) {
    const listDateObject = new Date(listDate);
    // check that date is valid
    if (listDateObject.getTime() === 'NaN') {
      throw new Error(`List Date is invalid ${listDate}`);
    }

    return listDateObject.getTime();
  }

  throw new Error('No list price found');
}

function getBedrooms(homeRecord) {
  if ((homeRecord.property || {}).bed_count) {
    return parseInt(homeRecord.property.bed_count, 10);
  }

  throw new Error('No bedroom count found');
}

function getBaths(homeRecord) {
  if ((homeRecord.property || {}).bath_count) {
    return parseInt(homeRecord.property.bath_count, 10);
  }

  throw new Error('No bath count found');
}

function getHalfBaths(homeRecord) {
  if ((homeRecord.property || {}).half_bath_count) {
    return parseInt(homeRecord.property.half_bath_count, 10);
  }

  throw new Error('No half bath count found');
}

function getSize(homeRecord) {
  if ((homeRecord.property || {}).square_feet) {
    return parseInt(homeRecord.property.square_feet, 10);
  }

  throw new Error('No half bath count found');
}

function normalizeProperty(homeRecord) {
  const property          = {};
  property.mls_name       = getMlsName(homeRecord);
  property.mls_id         = getMlsId(homeRecord);
  property.street_address = getStreetAddress(homeRecord);
  property.city           = getCity(homeRecord);
  property.state          = getState(homeRecord);
  property.zip_code       = getZip(homeRecord);
  property.list_price     = getListPrice(homeRecord);
  property.list_date      = getListDate(homeRecord);
  property.bedrooms       = getBedrooms(homeRecord);
  property.full_baths     = getBaths(homeRecord);
  property.half_baths     = getHalfBaths(homeRecord);
  property.size           = getSize(homeRecord);

  return property;
}

module.exports.normalizeProperty = normalizeProperty;
