// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { APP_NAME, NODE_ENV, MONGO_URI } = process.env;
module.exports = {
  appConfig: {
    APP_NAME,
    NODE_ENV,
    MONGO_URI,
  },
  development: {},
};
