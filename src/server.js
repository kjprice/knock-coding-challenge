const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.json({ limit: '50mb' }));

// a bit overkill but I really like my routes in a different file
require('./set-routes')(app);

app.listen(port, () => {
  // in production, this would use something other than `console` to log
  console.log(`Started Project Lighthouse Rest API - listening on ${port}`);
});
