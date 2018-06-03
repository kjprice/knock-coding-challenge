/* eslint no-multi-spaces: 0 no-param-reassign: 0 */
function getMlsName(homeRecord) {
  if (homeRecord.data_name) {
    return homeRecord.data_name;
  } else if (homeRecord.name) {
    return homeRecord.name;
  }

  throw new Error('No MLS Name found');
}

function getMlsId(homeRecord) {
  if (homeRecord.vendor_id) {
    return parseInt(homeRecord.vendor_id, 10);
  } else if (homeRecord.id) {
    return parseInt(homeRecord.id, 10);
  }

  throw new Error('No MLS ID found');
}

function getStreetAddress(homeRecord) {
  const useAddressComponents = homeRecord.address_components && ['street_name', 'street_number', 'street_suffix'].every(field => field in homeRecord.address_components);
  if (useAddressComponents) {
    const { address_components: addressFields } = homeRecord;
    return `${addressFields.street_number} ${addressFields.street_name} ${addressFields.street_suffix}`;
  }

  if ((homeRecord.geo || {}).address) {
    return homeRecord.geo.address;
  }

  throw new Error('No address found');
}

function getCity(homeRecord) {
  if ((homeRecord.address_components || {}).city) {
    return homeRecord.address_components.city;
  }

  if ((homeRecord.geo || {}).city) {
    return homeRecord.geo.city;
  }

  throw new Error('No city found');
}

function getState(homeRecord) {
  if ((homeRecord.address_components || {}).state) {
    return homeRecord.address_components.state;
  }

  if ((homeRecord.geo || {}).state) {
    return homeRecord.geo.state;
  }

  throw new Error('No state found');
}

function getZip(homeRecord) {
  if ((homeRecord.address_components || {}).zipcode) {
    return parseInt(homeRecord.address_components.zipcode, 10);
  }

  if ((homeRecord.geo || {}).zip) {
    return parseInt(homeRecord.geo.zip, 10);
  }

  throw new Error('No zipcode found');
}

function getListPrice(homeRecord) {
  let listPrice;
  if (homeRecord.list) {
    listPrice = homeRecord.list;
  } else if ((homeRecord.listing || {}).price) {
    listPrice = homeRecord.listing.price;
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
  } else if (homeRecord.created) {
    listDate = homeRecord.created;
  }


  if (listDate) {
    const listDateObject = new Date(listDate);
    // check that date is valid
    if (listDateObject.getTime() === 'NaN') {
      throw new Error(`List Date is invalid ${listDate}`);
    }

    return listDateObject.getTime();
  }

  throw new Error('No list date found');
}

function getBedrooms(homeRecord) {
  if ((homeRecord.property || {}).bed_count) {
    return parseInt(homeRecord.property.bed_count, 10);
  } else if ((homeRecord.listing || {}).bedrooms) {
    return parseInt(homeRecord.listing.bedrooms, 10);
  }

  return null;
}

function getBaths(homeRecord) {
  if ((homeRecord.property || {}).bath_count) {
    return parseInt(homeRecord.property.bath_count, 10);
  } else if ((homeRecord.listing || {}).bathrooms) {
    return parseInt(homeRecord.listing.bathrooms, 10);
  }

  return null;
}

function getHalfBaths(homeRecord) {
  if ((homeRecord.property || {}).half_bath_count) {
    return parseInt(homeRecord.property.half_bath_count, 10);
  } else if ((homeRecord.listing || {}).half_bathrooms) {
    return parseInt(homeRecord.listing.half_bathrooms, 10);
  }

  return null;
}

function getSize(homeRecord) {
  if ((homeRecord.property || {}).square_feet) {
    return parseInt(homeRecord.property.square_feet, 10);
  } else if ((homeRecord.listing || {}).square_feet) {
    return parseInt(homeRecord.listing.square_feet, 10);
  }

  return null;
}

function removeNullValues(property) {
  Object.keys(property).forEach((field) => {
    const value = property[field];
    if (value === null) {
      delete property[field];
    }
  });

  return property;
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

  return removeNullValues(property);
}

module.exports.normalizeProperty = normalizeProperty;
