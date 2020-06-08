const router = require('express').Router();
const controllers = require('../controllers/index.js');

router.get('/timeseries/', controllers.getTimeSeries);

router.get('/quote/', controllers.getQuote);

router.get('/fundamentals/', controllers.getFundamentals);

router.get('/watchlistTimeseries/', controllers.getWatchlistTimeseries)

// router.get('/watchlist/', controllers.getSecurity);

// router.post('/watchlist/', controllers.addSecurity);

// router.delete('/watchlist/', controllers.deleteSecurity);

// router.put('/watchlist/', controllers.updateName);

module.exports = router;