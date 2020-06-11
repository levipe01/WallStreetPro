const router = require('express').Router();
const controllers = require('../controllers/index.js');

router.get('/timeseries/', controllers.getTimeSeries);

router.get('/quote/', controllers.getQuote);

router.get('/fundamentals/', controllers.getFundamentals);


router.get('/watchlist/timeseries', controllers.getWatchlistTimeseries)

router.post('/watchlist/security', controllers.addSecurity);

router.delete('/watchlist/security', controllers.deleteSecurity);

router.get('/watchlist/security', controllers.getWatchlist);


router.get('/watchlist', controllers.getWatchlists);

router.post('/watchlist', controllers.addWatchlist);

router.delete('/watchlist', controllers.deleteWatchlist);


module.exports = router;