import React from 'react';
import Chart from './Chart.jsx';
import Description from './Description.jsx';
import ChartCarousel from './ChartCarousel.jsx'
import Header from './Header.jsx'
import Earnings from './Earnings.jsx'
import Quote from './Quote.jsx'

const axios = require('axios').default;

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
      currentWatchlist: 0,
      watchlistTickers: [],
      watchlistNames: [],
    }

    this.getFundamentals = this.getFundamentals.bind(this);
    this.getIntraday = this.getIntraday.bind(this);
    this.updateTicker = this.updateTicker.bind(this);
    this.getQuote = this.getQuote.bind(this);
    this.getWatchlists = this.getWatchlists.bind(this);
    this.getCurrentWatchlist = this.getCurrentWatchlist.bind(this);
    this.getWatchlistData = this.getWatchlistData.bind(this);
    this.deleteSecurity = this.deleteSecurity.bind(this);
    this.checkWatchlist = this.checkWatchlist.bind(this);
    this.addWatchlist =  this.addWatchlist.bind(this);
  }

  componentDidMount() {
    this.getFundamentals()
    this.getIntraday()
    this.getQuote()
    this.getWatchlists()
  }

  getWatchlists(watchlistId) {
    axios.get(`/data/watchlist?user_id=${this.state.user_id}`)
      .then((response) => {
        this.setState({
          watchlists: response.data,
          currentWatchlist: watchlistId || response.data[0].id
        }, () => {this.getWatchlistData()})
      })
      .catch((err) => err);
  }

  checkWatchlist(searchTicker) {
    const isPresent = this.state.watchlistTickers.find(function isTicker(ticker) {
      return ticker === 'searchTicker';
    })
    const newTickers = this.state.watchlistTickers
    const newCname = this.state.watchlistNames
    if (isPresent === undefined) {
      newTickers.unshift(searchTicker)
      newCname.unshift(this.state.cName)
      this.setState({
        watchlistTickers: newTickers,
        watchlistNames: newCname,
      })
    }
  }

  getCurrentWatchlist(newWatchlist) {
    this.setState({
      currentWatchlist: newWatchlist,
    }, () => {this.getWatchlistData()})
  }

  deleteSecurity(ticker) {
    axios.delete(`/data/watchlist/security?ticker=${ticker}&watchlist_id=${this.state.currentWatchlist}`)
    .then(() => {
      this.getWatchlistData()
    })
    .catch((err) => err);
  }

  getWatchlistData() {
    axios.get(`/data/watchlist/security?watchlist_id=${this.state.currentWatchlist}`)
      .then((response) => {
        const tickers = response.data.map((comp) => {return comp.id})
        const names = response.data.map((comp) => {return comp.name})
        this.setState({
          watchlistTickers: tickers,
          watchlistNames: names,
        }, () => {
          this.updateTicker(this.state.watchlistTickers[0])
        })
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

    // return new Promise((resolve, reject) => {
    //   this.doStuff(newticker, (err, data) => {
    //     console.log()
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve();
    //     }
    //   })
    // })
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

  addWatchlist (watchlist) {
    const options = {
      watchlist_name: watchlist,
      user_id: this.state.user_id,
    }
    axios.post(`/data/watchlist`, options)
      .then((response) => {
        this.setState({
          currentWatchlist: response.data,
        }, () => {this.getWatchlists(response.data)})
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
      // .then(() => {console.log(this.state)})
      .catch((err) => err);
  }

  render() {
    return (
      <div className='master-grid'>
        <Header updateTicker={this.updateTicker} watchlists={this.state.watchlists} getCurrentWatchlist={this.getCurrentWatchlist} checkWatchlist={this.checkWatchlist} addWatchlist={this.addWatchlist}/>
        <ChartCarousel labels={this.state.labels} datasets={this.state.datasets} ticker={this.state.ticker} cName={this.state.cName} updateTicker={this.updateTicker} watchlistTickers={this.state.watchlistTickers} watchlistNames={this.state.watchlistNames} deleteSecurity={this.deleteSecurity}/>

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