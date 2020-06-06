require('dotenv').config();

const env = process.env.NODE_ENV;
const config = {
  app: {
    port: process.env.SERVER_PORT || 3000,
    api: process.env.IEX_API_KEY,
  },
};

module.exports = config;