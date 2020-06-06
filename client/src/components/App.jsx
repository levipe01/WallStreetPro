import React from 'react';
import Description from './Description.jsx'

const axios = require('axios').default;
const config = require('../../../config.js');


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: 'AAPL',
      cName: '',
      desInfo: {}
    }

  }

  componentDidMount() {
    axios.get(`https://cloud.iexapis.com/stable/stock/${this.state.ticker}/company?token=${config.app.api}`)
    .then((response) => {
      console.log(response)
      this.setState({
        cName: response.data.companyName,
        desInfo: response.data
      })
    })
  }

  render() {
    return (
      <div>
        <h1>The Secaucus Observer</h1>
        <Description desInfo={this.state.desInfo}/>
      </div>
    );
  }
}

export default App;