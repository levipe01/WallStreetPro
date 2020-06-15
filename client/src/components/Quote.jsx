import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';


const Quote = ({ quote }) => {
  let lowTime = '';
  let highTime = '';
  let rtQuote = '';
  let change = '';
  let changePercent = '';
  let ytdChange = '';
  let high = '';
  let low = '';
  let open = '';
  let lastTradeTime = '';
  let marketCap = 0;
  let volume = 0;
  let divStyle = {};

  function thousandsSeparators(num) {
    const numParts = num.toString().split('.');
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return numParts.join('.');
  }

  if (quote.lowTime) {
    lastTradeTime = moment(quote.lastTradeTime).format('LLLL');
    lowTime = moment(quote.lowTime).format('h:mm A');
    highTime = moment(quote.highTime).format('h:mm A');
    rtQuote = quote.isUSMarketOpen ? quote.iexRealtimePrice.toFixed(2) : quote.iexClose.toFixed(2);
    change = quote.change.toFixed(2);
    changePercent = (quote.changePercent * 100).toFixed(2);
    high = quote.high.toFixed(2);
    low = quote.low.toFixed(2);
    marketCap = thousandsSeparators((quote.marketCap / 1000000000).toFixed(2));
    volume = thousandsSeparators(quote.avgTotalVolume);
    ytdChange = (quote.ytdChange * 100).toFixed(2);
  }

  if (quote.open) {
    open = quote.open.toFixed(2);
  }

  if (quote.change > 0) {
    divStyle = { color: 'rgba(13,236,13,1)' };
  } else if (quote.change < 0) {
    divStyle = { color: 'rgba(236,13,13,1)' };
  }

  return (
    Object.keys(quote).length > 0
      && <div className='quote-main'>
        <div className='quote-top'>
          <span className='curr-price'>${rtQuote}</span>
          <span className='curr-chng' style={divStyle}>{change}</span>
          <span className='curr-prct' style={divStyle}>{changePercent}%</span>
          <div className='quote-time'>{lastTradeTime}</div>
        </div>

        <table cellSpacing="0" cellPadding="0" className='quote-table'>
          <tbody>
          {
            quote.open
            && <tr>
                <td className='table-field'><b>Open: </b></td>
                <td>${open}</td>
              </tr>
          }
          <tr>
            <td className='table-field'><b>High: </b></td>
            <td>${high} <i>({highTime})</i></td>
          </tr>
          <tr>
            <td className='table-field'><b>Low: </b></td>
            <td>${low} <i>({lowTime})</i></td>
          </tr>
          <tr>
            <td className='table-field'><b>Prev: </b></td>
            <td>${quote.previousClose}</td>
          </tr>
          <tr>
            <td className='table-field'><b>Volume: </b></td>
            <td>{volume}</td>
          </tr>
          <tr>
            <td className='table-field'><b>52-Wk High: </b></td>
            <td>${quote.week52High}</td>
          </tr>
          <tr>
            <td className='table-field'><b>52-Wk Low: </b></td>
            <td>${quote.week52Low}</td>
          </tr>
          <tr>
            <td className='table-field'><b>YTD Chng: </b></td>
            <td>{ytdChange}%</td>
          </tr>
          <tr>
            <td className='table-field'><b>Market Cap: </b></td>
            <td>${marketCap} bil.</td>
          </tr>
          <tr>
            <td className='table-field'><b>PE Ratio: </b></td>
            <td>{quote.peRatio}</td>
          </tr>
          </tbody>
        </table>
        <div className='iex-cloud'>
          <a href="https://iexcloud.io">IEX Cloud</a>
        </div>
      </div>
  );
};

Quote.propTypes = {
  quote: PropTypes.shape({
    peRatio: PropTypes.number,
    week52Low: PropTypes.number,
    week52High: PropTypes.number,
    previousClose: PropTypes.number,
    open: PropTypes.number,
    high: PropTypes.number,
    low: PropTypes.number,
    change: PropTypes.number,
    changePercent: PropTypes.number,
    ytdChange: PropTypes.number,
    avgTotalVolume: PropTypes.number,
    marketCap: PropTypes.number,
    iexRealtimePrice: PropTypes.number,
    iexClose: PropTypes.number,
    isUSMarketOpen: PropTypes.bool,
    lowTime: PropTypes.number,
    highTime: PropTypes.number,
    lastTradeTime: PropTypes.number,
  }),
};

export default Quote;
