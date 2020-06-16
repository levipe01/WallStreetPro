import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

class Quote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
    };
  }

  tick() {
    if (this.props.quote.isUSMarketOpen === true) {
      this.props.getQuote();
      this.setState((state) => ({
        seconds: state.seconds + 10,
      }));
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    function thousandsSeparators(num) {
      const numParts = num.toString().split('.');
      numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return numParts.join('.');
    }

    const {
      quote,
    } = this.props;

    let divStyle = {};

    if (quote.change > 0) {
      divStyle = { color: 'rgba(13,236,13,1)' };
    } else if (quote.change < 0) {
      divStyle = { color: 'rgba(236,13,13,1)' };
    }

    return (
      Object.keys(quote).length > 0
        && <div className='quote-main'>
          <div className='quote-top'>
            <span className='curr-price'>${quote.isUSMarketOpen ? quote.iexRealtimePrice.toFixed(2) : quote.iexClose.toFixed(2)}
            </span>
            <span className='curr-chng' style={divStyle}>{quote.change.toFixed(2)}</span>
            <span className='curr-prct' style={divStyle}>{(quote.changePercent * 100).toFixed(2)}%</span>
            <div className='quote-time'>{moment(quote.lastTradeTime).format('LLLL')}</div>
          </div>

          <table cellSpacing="0" cellPadding="0" className='quote-table'>
            <tbody>
            {
              quote.open
              && <tr>
                  <td className='table-field'><b>Open: </b></td>
                  <td>${quote.open.toFixed(2)}</td>
                </tr>
            }
            <tr>
              <td className='table-field'><b>High: </b></td>
              <td>${quote.high.toFixed(2)} <i>({moment(quote.highTime).format('h:mm A')})</i></td>
            </tr>
            <tr>
              <td className='table-field'><b>Low: </b></td>
              <td>${quote.low.toFixed(2)} <i>({moment(quote.lowTime).format('h:mm A')})</i></td>
            </tr>
            <tr>
              <td className='table-field'><b>Prev: </b></td>
              <td>${quote.previousClose}</td>
            </tr>
            <tr>
              <td className='table-field'><b>Volume: </b></td>
              <td>{thousandsSeparators(quote.avgTotalVolume)}</td>
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
              <td>{(quote.ytdChange * 100).toFixed(2)}%</td>
            </tr>
            <tr>
              <td className='table-field'><b>Market Cap: </b></td>
              <td>${thousandsSeparators((quote.marketCap / 1000000000).toFixed(2))} bil.</td>
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
  }
}

// const Quote = ({ quote }) => {
// function thousandsSeparators(num) {
//   const numParts = num.toString().split('.');
//   numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   return numParts.join('.');
// }

//   let divStyle = {};

//   if (quote.change > 0) {
//     divStyle = { color: 'rgba(13,236,13,1)' };
//   } else if (quote.change < 0) {
//     divStyle = { color: 'rgba(236,13,13,1)' };
//   }

//   return (
//     Object.keys(quote).length > 0
//       && <div className='quote-main'>
//         <div className='quote-top'>
//           <span className='curr-price'>${quote.isUSMarketOpen ? quote.iexRealtimePrice.toFixed(2) : quote.iexClose.toFixed(2)}
//           </span>
//           <span className='curr-chng' style={divStyle}>{quote.change.toFixed(2)}</span>
//           <span className='curr-prct' style={divStyle}>{(quote.changePercent * 100).toFixed(2)}%</span>
//           <div className='quote-time'>{moment(quote.lastTradeTime).format('LLLL')}</div>
//         </div>

//         <table cellSpacing="0" cellPadding="0" className='quote-table'>
//           <tbody>
//           {
//             quote.open
//             && <tr>
//                 <td className='table-field'><b>Open: </b></td>
//                 <td>${quote.open.toFixed(2)}</td>
//               </tr>
//           }
//           <tr>
//             <td className='table-field'><b>High: </b></td>
//             <td>${quote.high.toFixed(2)} <i>({moment(quote.highTime).format('h:mm A')})</i></td>
//           </tr>
//           <tr>
//             <td className='table-field'><b>Low: </b></td>
//             <td>${quote.low.toFixed(2)} <i>({moment(quote.lowTime).format('h:mm A')})</i></td>
//           </tr>
//           <tr>
//             <td className='table-field'><b>Prev: </b></td>
//             <td>${quote.previousClose}</td>
//           </tr>
//           <tr>
//             <td className='table-field'><b>Volume: </b></td>
//             <td>{thousandsSeparators(quote.avgTotalVolume)}</td>
//           </tr>
//           <tr>
//             <td className='table-field'><b>52-Wk High: </b></td>
//             <td>${quote.week52High}</td>
//           </tr>
//           <tr>
//             <td className='table-field'><b>52-Wk Low: </b></td>
//             <td>${quote.week52Low}</td>
//           </tr>
//           <tr>
//             <td className='table-field'><b>YTD Chng: </b></td>
//             <td>{(quote.ytdChange * 100).toFixed(2)}%</td>
//           </tr>
//           <tr>
//             <td className='table-field'><b>Market Cap: </b></td>
//             <td>${thousandsSeparators((quote.marketCap / 1000000000).toFixed(2))} bil.</td>
//           </tr>
//           <tr>
//             <td className='table-field'><b>PE Ratio: </b></td>
//             <td>{quote.peRatio}</td>
//           </tr>
//           </tbody>
//         </table>
//         <div className='iex-cloud'>
//           <a href="https://iexcloud.io">IEX Cloud</a>
//         </div>
//       </div>
//   );
// };

Quote.propTypes = {
  getQuote: PropTypes.func,
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
