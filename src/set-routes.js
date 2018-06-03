const { saveCustomerProperty } = require('./api/customer');

module.exports = (app) => {
  // a bit of a misnomer as we seem to be just saving one property at a time
  app.post('/customer/:id/properties', saveCustomerProperty);
};
