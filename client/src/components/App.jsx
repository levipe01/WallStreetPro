import React from 'react';
import {Line} from 'react-chartjs-2';
import Chart from './Chart.jsx'

const axios = require('axios').default;
const config = require('../../../config.js');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: 'SPY',
      cName: ''
    }

  }

  componentDidMount() {
    axios.get(`https://sandbox.iexapis.com/stable/stock/${this.state.ticker}/company?token=${config.app.api}`)
    .then((response) => {
      console.log(response)
      this.setState({
        cName: response.data.companyName
      })
    })
  }


  render() {
    return (
      <div>
        <h1>The Secaucus Observer</h1>
        <Chart ticker={this.state.ticker} cName={this.state.cName}/>
      </div>
    );
  }
}

export default App;