import React from 'react';
import Chart from './Chart.jsx';
import Description from './Description.jsx';
import ChartCarousel from './ChartCarousel.jsx'
import Header from './Header.jsx'
import Earnings from './Earnings.jsx'
import Quote from './Quote.jsx'

const axios = require('axios').default;
const config = require('../../../config.js');


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: 'AAPL',
      cName: '',
      desInfo: {},
      labels: [],
      datasets: [],
      earnInfo: {},
      quote: {},
      user_id: '1',
      watchlists: [],
    }

    this.getFundamentals = this.getFundamentals.bind(this);
    this.getIntraday = this.getIntraday.bind(this);
    this.updateTicker = this.updateTicker.bind(this);
    this.getQuote = this.getQuote.bind(this);
    this.getWatchlists = this.getWatchlists.bind(this);
  }

  componentDidMount() {
    this.getFundamentals()
    this.getIntraday()
    this.getQuote()
    this.getWatchlists()
  }

  getWatchlists() {
    axios.get(`/data/watchlist?user_id=${this.state.user_id}`)
    .then((response) => {
      this.setState({
        watchlists: response.data,
      }, () => {console.log(this.state)})
    })
    .catch((err) => err);
  }

  updateTicker(newticker) {
    this.setState({
      ticker: newticker
    }, () => {
      this.getFundamentals();
      this.getQuote()
      this.getIntraday();
    })
  }

  getFundamentals() {
    axios.get(`/data/fundamentals?ticker=${this.state.ticker}`)
      .then((response) => {
        this.setState({
          cName: response.data.desInfo.companyName,
          desInfo: response.data.desInfo,
          earnInfo: response.data.earnInfo,
        })
      })
      .catch((err) => err);
  }

  getQuote() {
    axios.get(`/data/quote?ticker=${this.state.ticker}`)
      .then((response) => {
        this.setState({
          quote: response.data,
        })
      })
      .catch((err) => err);
  }

  getIntraday() {
    axios.get(`/data/timeseries?ticker=${this.state.ticker}`)
      .then((response) => {
        this.setState({
          datasets: [
            {
              label: this.state.ticker,
              fill: true,
              lineTension: 0,
              backgroundColor: 'rgba(75,192,192,0.25)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: response.data.price,
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 0,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 0,
              pointHitRadius: 10,
            }
          ],
          labels: response.data.time,
        })
      })
      .catch((err) => err);
  }

  render() {
    return (
      <div className='master-grid'>
        <Header updateTicker={this.updateTicker} watchlists={this.state.watchlists}/>
        <ChartCarousel labels={this.state.labels} datasets={this.state.datasets} ticker={this.state.ticker} cName={this.state.cName} updateTicker={this.updateTicker}/>

        <div className='static-grid'>
          <div className='chart-main'>
            <Chart labels={this.state.labels} datasets={this.state.datasets} cName={this.state.cName} isMini={false}/>
          </div>
          <Quote quote={this.state.quote}/>
        </div>

        <div className='collapse-grid'>
          <Description desInfo={this.state.desInfo}/>
          <Earnings earnInfo={this.state.earnInfo}/>
        </div>
        <div className='iex-cloud'>
        <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
        </div>

      </div>
    );
  }
}

export default App;