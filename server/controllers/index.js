/* eslint-disable no-console */
const model = require('../models/index.js');
const redis = require('../../database/redis_db.js');

module.exports = {
  getFundamentals: (req, res) => {
    redis.getFundamentals(req.query.ticker)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        model.getFundamentals(req.query.ticker)
          .then((response) => {
            res.status(200).json(response);
            const data = response
            return data;
          })
          .then((data) => {
            redis.addFundamentals(data);
          })
          .catch(() => {
            res.status(404).json('no data found');
          });
      });
  },

  getTimeSeries: (req, res) => {
    model.getTimeSeries(req.query.ticker)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },

  getWatchlistTimeseries: (req, res) => {
    model.getWatchlistTimeseries(req.query)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },

  // addTrack: (req, res) => {
  //   model.addTrack(req)
  //     .then((data) => {
  //       res.status(200).json(data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       res.status(400).json(e);
  //     });
  // },

  // deleteTrack: (req, res) => {
  //   model.deleteTrackById(req)
  //     .then((data) => {
  //       res.status(200).json(data);
  //     })
  //     .catch((e) => {
  //       res.status(400).json(e);
  //     });
  // },

  // updatePlayCount: (req, res) => {
  //   model.updatePlayCountById(req)
  //     .then((data) => {
  //       res.status(200).json(data);
  //     })
  //     .catch((e) => {
  //       res.status(400).json(e);
  //     });
  // },
};
