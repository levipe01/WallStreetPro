import React from 'react';
import Chart from './Chart.jsx';
import Description from './Description.jsx';

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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.getCompanyInfo = this.getCompanyInfo.bind(this);
    this.getIntraday = this.getIntraday.bind(this);
  }

  componentDidMount() {
    this.getCompanyInfo()
    this.getIntraday()
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
      console.log(response)
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

  handleSubmit(event) {
    event.preventDefault();
    this.getIntraday();
    this.getCompanyInfo();
  }

  handleUpdate(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <h1>The Secaucus Observer</h1>
        <form action="/action_page.php">
          <label htmlFor="fname">Ticker: </label>
          <input type="text" id="ticker" name="ticker" value={this.state.ticker} onChange={this.handleUpdate}></input>
          <input className='submit-button' type="submit" value="Submit" onClick={this.handleSubmit}></input>
        </form>
        <Chart labels={this.state.labels} datasets={this.state.datasets} ticker={this.state.ticker} cName={this.state.cName}/>
        <Description desInfo={this.state.desInfo}/>
      </div>
    );
  }
}

export default App;