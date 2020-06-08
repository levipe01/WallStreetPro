import React from 'react';


const Quote = ({quote}) => {
  let lowTime = '';
  let highTime = '';
  let rtQuote = '';
  let change = '';
  let changePercent = ''
  let high = ''
  let low = ''

  if (quote.lowTime) {
    lowTime = new Date(quote.lowTime).toUTCString()
    highTime = new Date(quote.highTime).toUTCString()
    rtQuote = quote.iexRealtimePrice.toFixed(2)
    change = quote.change.toFixed(2)
    changePercent = (quote.changePercent * 100).toFixed(2)
    high = quote.high.toFixed(2)
    low = quote.low.toFixed(2)
  }

  return (
    <div className='quote-main'>
      <div className='quote-top'>
        <span className='curr-price'>{rtQuote} </span><span className='curr-chng'>{change} </span> <span className='curr-prct'>{changePercent}%</span>
        <div className='quote-time'>{quote.latestTime}</div>
      </div>

      <table>
        <tr>
          <td><b>High: </b></td>
          <td>{high} <i>{highTime}</i></td>
        </tr>
        <tr>
          <td><b>Low: </b></td>
          <td>{low} <i>{lowTime}</i></td>
        </tr>
        <tr>
          <td><b>Volume: </b></td>
          <td>{quote.avgTotalVolume}</td>
        </tr>
        <tr>
          <td><b>Prev: </b></td>
          <td>{quote.previousClose}</td>
        </tr>
        <tr>
          <td><b>52-Wk High: </b></td>
          <td>{quote.week52High}</td>
        </tr>
        <tr>
          <td><b>52-Wk Low: </b></td>
          <td>{quote.week52Low}</td>
        </tr>
        <tr>
          <td><b>Market Cap: </b></td>
          <td>{quote.marketCap}</td>
        </tr>
        <tr>
          <td><b>PE Ratio: </b></td>
          <td>{quote.peRatio}</td>
        </tr>
      </table>
    </div>
  );
}

export default Quote;