const redis = require('redis');
const config = require('../config.js');

const client = redis.createClient(config.cache);

const getFundamentals = (ticker) => new Promise((resolve, reject) => {
  client.get(ticker.toUpperCase(), (err, data) => {
    if (data === null || err) {
      reject(err);
    } else {
      resolve(JSON.parse(data));
    }
  });
});

const addFundamentals = (fundamentals) => new Promise((resolve, reject) => {
  client.set(fundamentals.desInfo.symbol, JSON.stringify(fundamentals), 'EX', 600, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

module.exports.getFundamentals = getFundamentals;
module.exports.addFundamentals = addFundamentals;