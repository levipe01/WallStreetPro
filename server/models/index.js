/* eslint-disable no-console */
const config = require('../../config.js');
const axios = require('axios').default;

module.exports = {
  getFundamentals: (req) => {
    return axios.get(`https://cloud.iexapis.com/stable/stock/${req}/company?token=${config.app.api}`)
      .then((res) => res)
      .catch((err) => err);
  },

  getTimeSeries: (req) => {
    return axios.get(`https://cloud.iexapis.com/stable/stock/${req}/intraday-prices?token=${config.app.api}`)
      .then((response) => {
        const price = response.data.map((tick) => {return tick.marketAverage})
        const time = response.data.map((tick) => {return tick.minute})
        const res = {
          price: price,
          time: time,
        }
        console.log(res)
        return res
      })
      .then((res) => res)
      .catch((err) => err);
  },

  // addTrack: (req) => {
  //   const queryString = 'INSERT INTO songs (name, artist, artistid, image, playcount, length) VALUES ($1, $2, $3, $4, $5, $6)';
  //   const options = [req.body.name, req.body.artist, req.body.artistid,
  //     req.body.image, req.body.playcount, req.body.length];

  //   return db.query(queryString, options);
  // },

  // deleteTrackById: (req) => {
  //   const queryString = 'DELETE FROM songs WHERE (id=$1)';
  //   const options = [req.query.id];

  //   return db.query(queryString, options);
  // },

  // updatePlayCountById: (req) => {
  //   const queryString = 'UPDATE songs SET playcount = $1 WHERE (id=$2)';
  //   const options = [req.body.playcount, req.body.id];
  //   console.log(options);

  //   return db.query(queryString, options);
  // },
};