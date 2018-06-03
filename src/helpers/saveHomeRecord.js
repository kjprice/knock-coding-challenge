const { request } = require('./request');
const { normalizeProperty } = require('./normalize-data/normalize-property');

function saveHomeRecord(property, customerId) {
  return request.post(`/customer/${customerId}/properties`, { property });
}

function normalizeAndSaveHomeRecord(rawProperty, customerId) {
  const property = normalizeProperty(rawProperty);
  return saveHomeRecord(property, customerId);
}

module.exports.saveHomeRecord = saveHomeRecord;
module.exports.normalizeAndSaveHomeRecord = normalizeAndSaveHomeRecord;
