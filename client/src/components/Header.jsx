import React from 'react';
import {Collapse} from 'react-collapse';
import PropTypes from 'prop-types';
import Carousel, { consts } from 'react-elastic-carousel';
import Chart from './Chart.jsx'

const axios = require('axios').default;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: '',
      watchlistTickers: ['AAPL', 'TSLA', 'IBM', 'KO', 'PFE', 'INTC', 'DOW'],
      watchlistNames: ['Apple Inc', 'Telsa Inc', 'IBM Corp', 'The Coca-Cola Co.', 'Pfizer Inc', 'Intel Corp', 'Dow Inc'],
      carouselData: [],
    };

    this.breakPoints = [
      { width: 1, itemsToShow: 1, itemsToScroll: 1 },
      { width: 200, itemsToShow: 2, itemsToScroll: 2 },
      { width: 475, itemsToShow: 3, itemsToScroll: 3 },
      { width: 650, itemsToShow: 4, itemsToScroll: 4 },
      { width: 825, itemsToShow: 5, itemsToScroll: 5 },
      { width: 1000, itemsToShow: 6, itemsToScroll: 6 },
      { width: 1200, itemsToShow: 7, itemsToScroll: 7 },
      { width: 1400, itemsToShow: 8, itemsToScroll: 8 },
      { width: 1600, itemsToShow: 9, itemsToScroll: 9 },
    ];

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    const stringifiedTickers = JSON.stringify(this.state.watchlistTickers)
    axios.get(`/data/watchlistTimeseries?watchlist=${stringifiedTickers}`)
    .then((response) => {
      const newCarouselData = []
      response.data.forEach((item, index) => {
        newCarouselData.push({
          datasets: [
            {
              label: this.state.watchlistTickers[index],
              fill: false,
              lineTension: 0,
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: item.price,
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
          labels: item.time,
          cName: this.state.watchlistNames[index],
        })
      })
      return newCarouselData
    })
    .then((data) => {
      this.setState({
        carouselData: data,
      })
    })
    .catch((err) => console.log(err));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateTicker(this.state.ticker);
    console.log(this.props)
  }

  handleUpdate(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const myArrow = ({ type, onClick }) => {
      const pointer = type === consts.PREV ? 'button-left' : 'button-right';
      return (<button className="carousel_button" onClick={onClick}><div className={pointer}></div></button>);
    };

    const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    return (

      <div className='header'>

        <Carousel itemsToShow={8} ref={(ref) => { this.carousel = ref; }} renderArrow={myArrow}
           breakPoints={this.breakPoints}
           transitionMs={900} itemsToScroll={8} pagination={false}>

          {this.state.carouselData.map((company) => <Chart labels={company.labels} datasets={company.datasets} cName={company.cName}/>)}

        </Carousel>
        <form>
          <label htmlFor="fname">Ticker: </label>
          <input type="text" id="ticker" name="ticker" value={this.state.ticker} onChange={this.handleUpdate}></input>
          <input className='submit-button' type="submit" value="Submit" onClick={this.handleSubmit}></input>
        </form>
      </div>

    );
  }
}


export default Header;