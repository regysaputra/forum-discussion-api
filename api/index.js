let path;

if (process.env.NODE_ENV === 'development') {
  path = '.development.env';
} else if (process.env.NODE_ENV === 'test') {
  path = '.test.env';
} else {
  path = '.env';
}

require('dotenv').config({ path });
const swagger = require("../swagger/swagger");
const config = require("../src/Commons/config");
const app = require("../src/Infrastructures/http/app");

const host = config.app.host;
const port = Number(config.app.port);

swagger(app);

app.listen(port, host, () => console.log(`server start at http://${host}:${port}`));

module.exports = app;