import React from 'react';
import Chart from './Chart.jsx';
import Description from './Description.jsx';
import Header from './Header.jsx'

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
    }

    this.getCompanyInfo = this.getCompanyInfo.bind(this);
    this.getIntraday = this.getIntraday.bind(this);
    this.updateTicker = this.updateTicker.bind(this);
  }

  componentDidMount() {
    this.getCompanyInfo()
    this.getIntraday()
  }

  updateTicker(newticker) {
    this.setState({
      ticker: newticker
    }, () => {
      this.getCompanyInfo();
      this.getIntraday();
    })
  }

  getCompanyInfo() {
    axios.get(`/data/fundamentals?ticker=${this.state.ticker}`)
    .then((response) => {
      this.setState({
        cName: response.data.companyName,
        desInfo: response.data
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
            pointRadius: 1,
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
      <div>
        <h1 className="header-main">THE SECAUCUS SENTINEL.</h1>
        <Header labels={this.state.labels} datasets={this.state.datasets} ticker={this.state.ticker} cName={this.state.cName} updateTicker={this.updateTicker}/>
        <div className='chart-main'>
          <Chart labels={this.state.labels} datasets={this.state.datasets} ticker={this.state.ticker} cName={this.state.cName}/>
        </div>
        <Description desInfo={this.state.desInfo}/>
      </div>
    );
  }
}

export default App;