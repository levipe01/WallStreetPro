import React from 'react';
import {Line} from 'react-chartjs-2';

const axios = require('axios').default;
const config = require('../../../config.js');

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: ['10:00AM', '11:00AM', '12:00PM',
      '1:00PM', '2:00PM', '3:00PM', '4:00PM'],
      datasets: [
        {
          label: '',
          fill: false,
          lineTension: 1.0,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: []
        }
      ],
      ticker: this.props.ticker
    }

    this.getIntraday = this.getIntraday.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }


  componentDidMount() {
    this.getIntraday(this.state.ticker)
    console.log(this.props)
  }

  getIntraday() {
    axios.get(`https://sandbox.iexapis.com/stable/stock/${this.state.ticker}/intraday-prices?token=${config.app.api}&chartInterval=5`)
    .then((response) => {
      const price = response.data.map((tick) => {return tick.marketAverage})
      const time = response.data.map((tick) => {return tick.minute})
      const data = {
        price: price,
        time: time,
      }
      return data
    })
    .then((data) => {
      this.setState({
        datasets: [
          {
            label: this.state.ticker,
            fill: true,
            lineTension: 0,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: data.price,
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
        labels: data.time,
      },() => {console.log(this.state)})
    })
    .catch((err) => err);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getIntraday()
  }

  handleUpdate(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {console.log(this.state)});
  }

  render() {
    return (
      <div>
        <form action="/action_page.php">
          <label htmlFor="fname">Ticker:</label>
          <input type="text" id="ticker" name="ticker" value={this.state.ticker} onChange={this.handleUpdate}></input>
          <input type="submit" value="Submit" onClick={this.handleSubmit}></input>
        </form>
        <Line
          data={this.state}
          options={{
            title:{
              display:true,
              text:`${this.props.cName} Intraday Stock Price`,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;