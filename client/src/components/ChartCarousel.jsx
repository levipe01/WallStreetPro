import React from 'react';
import {Collapse} from 'react-collapse';
import PropTypes from 'prop-types';
import Carousel, { consts } from 'react-elastic-carousel';
import Chart from './Chart.jsx'

const axios = require('axios').default;

class ChartCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: '',
      watchlistTickers: ['AAPL', 'TSLA', 'IBM', 'KO', 'PFE', 'INTC', 'DOW', 'X', 'JNJ', 'HOG', 'SBUX'],
      watchlistNames: ['Apple Inc', 'Telsa Inc', 'IBM Corp', 'The Coca-Cola Co.', 'Pfizer Inc', 'Intel Corp', 'Dow Inc', 'United Steel Corp', 'Johnson & Johnson', 'Harley-Davidson', 'Starbucks Corp' ],
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

  }

  componentDidMount() {
    const stringifiedTickers = JSON.stringify(this.state.watchlistTickers)
    axios.get(`/data/watchlistTimeseries?watchlist=${stringifiedTickers}`)
    .then((response) => {
      const newCarouselData = []
      let lineColor = ''
      response.data.forEach((item, index) => {
        let i = item.price.length - 1
        while (item.price[i] === null) {i--}
        if (item.price[0] < item.price[i]) {
          lineColor = 'rgba(13,236,13,1)'
        } else {
          lineColor = 'rgba(236,13,13,1)'
        }
        newCarouselData.push({
          datasets: [
            {
              label: this.state.watchlistTickers[index],
              fill: false,
              lineTension: 0,
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: lineColor,
              borderWidth: 2,
              data: item.price,
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

  render() {
    const myArrow = ({ type, onClick }) => {
      const pointer = type === consts.PREV ? 'button-left' : 'button-right';
      return (<button className="carousel_button" onClick={onClick}><div className={pointer}></div></button>);
    };

    return (

      <div className='chart-carousel'>
        <Carousel itemsToShow={8} ref={(ref) => { this.carousel = ref; }} renderArrow={myArrow}
           breakPoints={this.breakPoints}
           transitionMs={900} itemsToScroll={8} pagination={false}>

          {this.state.carouselData.map((company) => <Chart labels={company.labels} datasets={company.datasets} cName={company.cName} isMini={true} updateTicker={this.props.updateTicker}/>)}
        </Carousel>
      </div>

    );
  }
}


export default ChartCarousel;