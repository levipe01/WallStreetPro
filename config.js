require('dotenv').config();

const env = process.env.NODE_ENV;

const config = {
  app: {
    api: process.env.IEX_API_KEY || 'Tsk_687240cf3cfc4978aa3096a6609e31a9'
    // port: parseInt(process.env.APP_PORT, 10) || 3003,
  },
  db: {
    // host: process.env.DB_HOST || '52.14.145.242',
    // port: parseInt(process.env.DB_PORT, 10) || 5432,
    // database: process.env.DB_DATABASE || 'toptracks',
    // user: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
  },
  cache: {
    // port: 6379,
    // host: 'cache',
  },
};

module.exports = config;