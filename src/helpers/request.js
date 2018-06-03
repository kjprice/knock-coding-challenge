const requestPromise = require('request-promise');

// this should be defined in an env var
const basePath = 'http://localhost:8000';

const request = {
  post(endpoint, body) {
    const url = `${basePath}${endpoint}`;

    return requestPromise.post({
      headers: {
        'Content-Type': 'application/json',
      },
      followAllRedirects: true,
      url,
      body,
      json: true,
      jar: true,
    });
  },
};

module.exports.request = request;
