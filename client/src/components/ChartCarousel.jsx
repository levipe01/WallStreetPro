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
      removeVisible: false,
      currentIndex: 0,
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: 0,
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

    this.toggleRemove = this.toggleRemove.bind(this);
    this.resetCarousel = this.resetCarousel.bind(this);
    this.getTotalPages = this.getTotalPages.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.getWatchlistData = this.getWatchlistData.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.watchlistData.watchlistTickers) !== JSON.stringify(prevProps.watchlistData.watchlistTickers) && JSON.stringify(this.props.watchlistData.watchlistNames) !== JSON.stringify(prevProps.watchlistData.watchlistNames)) {

      this.getWatchlistData()
        .then((data) => {
          const newState = { carouselData: data }
          const setAsyncState = (newState) => new Promise((resolve) => this.setState(newState, resolve))
          return setAsyncState(newState)
        })
        .then(() => {
          this.getTotalPages()
        })
    }
  }

  getWatchlistData() {
    this.resetCarousel()
    const stringifiedTickers = JSON.stringify(this.props.watchlistData.watchlistTickers)
    return axios.get(`/data/watchlist/timeseries?watchlist=${stringifiedTickers}`)
      .then((response) => {
        const newCarouselData = []
        if (response.data.length > 0) {
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
                  label: this.props.watchlistData.watchlistTickers[index],
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
              cName: this.props.watchlistData.watchlistNames[index],
              isTemp: this.props.watchlistData.isTemp[index],
            })
          })
        }
        return newCarouselData
    })

    .catch((err) => err);
  }

  resetCarousel() {
    this.carousel.goTo(Number(0));
    this.setState({
      currentPage: 1,
      currentIndex: 0,
    });
  }

  getCurrentPage(currentItem, nextItem) {
    const newCurrentPage = Math.ceil(nextItem.index / this.state.itemsPerPage) + 1;

    this.setState({
      currentIndex: nextItem.index,
      currentPage: newCurrentPage,
    });
  }

  getTotalPages(currentBreakPoint) {
    const backupBP = () => {
      let i = 0
      while (this.breakPoints[i].width < window.innerWidth) {
        i++
      }
      return this.breakPoints[i].itemsToShow - 2
    }
    const itemsPerPage = currentBreakPoint ? currentBreakPoint.itemsToShow : backupBP()
    const newTotalPages = Math.ceil(this.props.watchlistData.watchlistTickers.length / itemsPerPage);


    this.setState({
      totalPages: newTotalPages,
      itemsPerPage,
      currentPage: Math.ceil(this.state.currentIndex / itemsPerPage) + 1,
    });
  }

  toggleRemove() {
    const newState = !this.state.removeVisible;

    this.setState({
      removeVisible: newState,
    });
  }

  render() {
    const myArrow = ({ type, onClick }) => {
      const pointer = type === consts.PREV ? 'button-left' : 'button-right';
      return (<button className="carousel_button" onClick={onClick}><div className={pointer}></div></button>);
    };

    return (
      <div className='chart-carousel'>
        <Carousel itemsToShow={8} ref={(ref) => { this.carousel = ref; }} renderArrow={myArrow}
           breakPoints={this.breakPoints} onResize={this.getTotalPages} onNextStart={this.getCurrentPage}
           transitionMs={900} itemsToScroll={8} pagination={false} onPrevStart={this.getCurrentPage}>
          {
            this.state.carouselData.length > 0
              ? this.state.carouselData.map((company) => <Chart addSecurity={this.props.addSecurity} isTemp={company.isTemp} key={company.datasets[0].label} labels={company.labels} datasets={company.datasets} cName={company.cName} isMini={true} updateTicker={this.props.updateTicker} removeVisible={this.state.removeVisible} deleteSecurity={this.props.deleteSecurity}/>)
              : <div>Search to add new securities</div>
          }

        </Carousel>
        <div className='carousel-footer'>
          <div className="footer-left">
            <div className="page-nums">Page {this.state.currentPage} of {this.state.totalPages}</div>
            {
              this.state.currentPage > 1
              && <div className="start-over" onClick={this.resetCarousel}>
                    <div className='seperator'></div>
                    <div className='so-button'>Start Over</div>
                  </div>
            }
          </div>
          <div className="footer-right">
            {
              !this.state.removeVisible
                ? <div className="removeButton" onClick={this.toggleRemove}>Remove</div>
                : <div className="removeButton" onClick={this.toggleRemove}>Hide</div>
            }
          </div>
        </div>
      </div>

    );
  }
}


export default ChartCarousel;