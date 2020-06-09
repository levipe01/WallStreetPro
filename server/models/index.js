/* eslint-disable no-console */
const config = require('../../config.js');
const axios = require('axios').default;
const pg = require('../../database/postgres_db.js');
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

  getWatchlist: (req) => {
    const queryString = 'SELECT securities.id, securities.name FROM watchlists_securities INNER JOIN securities ON watchlists_securities.security_id = securities.id WHERE (watchlist_id=$1)';
    const options = [req.query.watchlist_id];

    return pg.query(queryString, options)
      .then((res) => res.rows)
      .catch((err) => err);
  },

  addSecurity: (req) => {
    const queryString1 = 'INSERT INTO watchlists_securities (watchlist_id, security_id) VALUES ($1, $2) RETURNING *';
    const queryString2 = 'INSERT INTO securities (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING';
    const options1 = [Number(req.body.watchlist_id), req.body.security_id];
    const options2 = [req.body.security_id, req.body.security_name];

    return pg.query(queryString2, options2)
      .then((res) => {
        return res
      })
      .then((data) => {
        return pg.query(queryString1, options1)
          .then((response) => {
            return response.rows[0].id
          })
      })
      .catch((e) => {
        return e
      });
  },

  deleteSecurity: (req) => {
    const queryString = 'DELETE FROM watchlists_securities WHERE (watchlist_id=$1 AND security_id=$2)';
    const options = [req.query.watchlist_id, req.query.ticker];

    return pg.query(queryString, options)
      .then((res) => res)
      .catch((err) => err);
  },

  getWatchlists: (req) => {
    const queryString = 'SELECT * FROM watchlists WHERE (user_id=$1)';
    const options = [req.query.user_id];

    return pg.query(queryString, options)
      .then((res) => res.rows)
      .catch((err) => err);
  },

  addWatchlist: (req) => {
    const queryString = 'INSERT INTO watchlists (name, user_id) VALUES ($1, $2) RETURNING *';
    const options = [req.body.watchlist_name, req.body.user_id];
    console.log(queryString, options)
    return pg.query(queryString, options)
      .then((res) => res.rows[0].id)
      .catch((err) => {console.log(err)});
  },

  deleteWatchlist: (req) => {
    const queryString = 'DELETE FROM watchlists WHERE (id=$1)';
    const options = [req.query.watchlist_id];

    return pg.query(queryString, options)
      .then((res) => res)
      .catch((err) => err);
  },
};