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
            redis.addFundamentals(data)
          })
          .catch(() => {
            res.status(404).json('no data found');
          });
      });
  },

  getQuote: (req, res) => {
    model.getQuote(req.query.ticker)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(404).json(err);
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

  addSecurity: (req, res) => {
    model.addSecurity(req)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        res.status(400).json(e);
      });
  },

  deleteSecurity: (req, res) => {
    model.deleteSecurity(req)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        res.status(400).json(e);
      });
  },

  getWatchlist: (req, res) => {
    model.getWatchlist(req)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        res.status(400).json(e);
      });
  },

  getWatchlists: (req, res) => {
    model.getWatchlists(req)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        res.status(400).json(e);
      });
  },

  addWatchlist: (req, res) => {
    model.addWatchlist(req)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        res.status(400).json(e);
      });
  },

  deleteWatchlist: (req, res) => {
    model.deleteWatchlist(req)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        res.status(400).json(e);
      });
  },

  editWatchlist: (req, res) => {
    model.editWatchlist(req)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        res.status(400).json(e);
      });
  },


};
