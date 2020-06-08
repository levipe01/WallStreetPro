/* eslint-disable no-console */
const config = require('../../config.js');
const axios = require('axios').default;
const _ = require('underscore');

module.exports = {
  getFundamentals: (req) => {
    return axios.get(`https://cloud.iexapis.com/stable/stock/${req}/company?token=${config.app.api}`)
      .then((res) => {
        return axios.get(`https://cloud.iexapis.com/stable/stock/${req}/earnings?last=4&token=${config.app.api}`)
          .then((response) => {
            const finalData = {
              desInfo: res.data,
              earnInfo: response.data,
            }
            return finalData;
          })
          .catch((err) => err)
      })
      .catch((err) => err);
  },

  getTimeSeries: (req) => {
    return axios.get(`https://cloud.iexapis.com/stable/stock/${req}/intraday-prices?token=${config.app.api}`)
      .then((response) => {
        const price = response.data.map((tick) => {return tick.close})
        const time = response.data.map((tick) => {return tick.minute})
        const res = {
          price: price,
          time: time,
        }
        return res
      })
      .then((res) => res)
      .catch((err) => err);
  },

  getQuote: (req) => {
    return axios.get(`https://cloud.iexapis.com/stable/stock/${req}/quote?token=${config.app.api}`)
      .then((res) => res.data)
      .catch((err) => err);
  },

  // getWatchlistTimeseries: (req) => {
  //   const data = _.map(JSON.parse(req.watchlist), (ticker) => { return axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/intraday-prices?token=${config.app.api}`)
  //     .then((response) => {
  //       const price = response.data.map((tick) => {return tick.close})
  //       const time = response.data.map((tick) => {return tick.minute})
  //       const res = {
  //         price: price,
  //         time: time,
  //       }
  //       return res
  //     })
  //   })
  //   return Promise.all(data)
  //     .then((res) => res)
  //     .catch((err) => err);
  // },

  getWatchlistTimeseries: (req) => {
    return axios.get(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${req.watchlist}&types=intraday-prices&token=${config.app.api}`)
      .then((response) => {
        const resArray = Object.values(response.data).map((company) => {return company['intraday-prices']})
        let output = []
        for(let i = 0; i < resArray.length; i++) {
          const price = resArray[i].map((tick) => {return tick.close})
          const time = resArray[i].map((tick) => {return tick.minute})
          const res = {
            price: price,
            time: time,
          }
          output.push(res)
        }
        return output
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