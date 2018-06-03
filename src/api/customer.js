// This would ideally be done on some sort of ORM
function validateCustomerProperty(customerProperty) {
  const expectedFields = {
    mls_name: {
      type: 'string',
      required: true,
    },
    mls_id: {
      type: 'number',
      required: true,
    },
    street_address: {
      type: 'string',
      required: true,
    },
    city: {
      type: 'string',
      required: true,
    },
    state: {
      type: 'string',
      required: true,
    },
    zip_code: {
      type: 'number',
      required: true,
    },
    list_price: {
      type: 'number',
      required: true,
    },
    list_date: {
      type: 'number',
      required: true,
    },
    bedrooms: {
      type: 'number',
    },
    full_baths: {
      type: 'number',
    },
    half_baths: {
      type: 'number',
    },
    size: {
      type: 'number',
    },
  };

  const errors = [];

  Object.keys(expectedFields).forEach((key) => {
    const { type: expectedType, required = false } = expectedFields[key];
    if (!(key in customerProperty)) {
      if (required) {
        errors.push(`${key} is required`);
      }

      return;
    }

    const value = customerProperty[key];
    const actualType = typeof value;

    if ((actualType !== expectedType)) {
      errors.push(`Expected ${key} to be a ${expectedType}`);
    }
  });

  if (errors.length) {
    throw new Error(errors.join('\n'));
  }

  return true;
}

function saveCustomerProperty(req, res) {
  const { property } = req.body;
  const { id: customerId } = req.params;

  try {
    validateCustomerProperty(property);
  } catch (e) {
    return res.status(400).send({
      success: false,
      message: e.message,
    });
  }

  // TODO: Store data somewhere. For now just respond with the data we received
  return res.send({
    success: true,
    property,
    customerId,
  });
}

module.exports.saveCustomerProperty = saveCustomerProperty;
