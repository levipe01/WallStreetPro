import React from 'react';
import Chart from './Chart.jsx';
import Description from './Description.jsx';
import ChartCarousel from './ChartCarousel.jsx'
import Header from './Header.jsx'
import Earnings from './Earnings.jsx'

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
    }

    this.getFundamentals = this.getFundamentals.bind(this);
    this.getIntraday = this.getIntraday.bind(this);
    this.updateTicker = this.updateTicker.bind(this);
  }

  componentDidMount() {
    this.getFundamentals()
    this.getIntraday()
  }

  updateTicker(newticker) {
    this.setState({
      ticker: newticker
    }, () => {
      this.getFundamentals();
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

  getIntraday() {
    axios.get(`/data/timeseries?ticker=${this.state.ticker}`)
    .then((response) => {
      this.setState({
        datasets: [
          {
            label: this.state.ticker,
            fill: false,
            lineTension: 0,
            backgroundColor: 'rgba(75,192,192,1)',
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
      }, () => {console.log(this.state)})
    })
    .catch((err) => err);
  }

  render() {
    return (
      <div className='master-grid'>
        <Header updateTicker={this.updateTicker}/>
        <ChartCarousel labels={this.state.labels} datasets={this.state.datasets} ticker={this.state.ticker} cName={this.state.cName} updateTicker={this.updateTicker}/>
        <div className='chart-main'>
        <Chart labels={this.state.labels} datasets={this.state.datasets} cName={this.state.cName} isMini={false}/>
        </div>
        <div className='collapse-grid'>
          <Description desInfo={this.state.desInfo}/>
          <Earnings earnInfo={this.state.earnInfo}/>
        </div>
      </div>
    );
  }
}

export default App;