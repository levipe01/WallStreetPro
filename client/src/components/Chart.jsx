import React from 'react';
import { Line } from 'react-chartjs-2';


class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTemp: false,
    };

    this.toggleIsTemp = this.toggleIsTemp.bind(this);
  }

  componentDidMount() {
    this.setState({
      isTemp: this.props.isTemp,
    })
  }

  toggleIsTemp() {
    const newIsTemp = !this.state.isTemp
    if (this.state.isTemp) {
      this.setState({
        isTemp: newIsTemp
      })
    }
  }

  render() {
    const { chartData, cName, isMini, ticker, updateTicker, removeVisible, deleteSecurity, addSecurity, isTemp } = this.props;

    let xTicks = true, yGridLines = true, yTicks = true, fill = true;
    let wrapperId = null, clickHandler = null, handleClick = null
    let cardClassName, card_overlay_text, removeWrapperClassName = ''
    let headerFontSize = 25;
    let lineColor = 'rgba(0,0,0,1)'
    let pointBackgroundColor = '#fff'

    if (isMini) {
      xTicks = false, yGridLines = false, yTicks = false, fill = false;
      wrapperId = chartData.ticker
      clickHandler = (event) => { updateTicker(event.currentTarget.id) }
      cardClassName = 'a-carousel-card'
      headerFontSize = 15;
      pointBackgroundColor = 'rgba(75,192,192,1)'

      let i = chartData.prices.length - 1
      while (chartData.prices[i] === null) { i-- }
      lineColor = (chartData.prices[0] < chartData.prices[i]) ? 'rgba(13,236,13,1)' : 'rgba(236,13,13,1)'

      if (removeVisible) {
        clickHandler = null
        removeWrapperClassName = 'carousel-remove-wrapper'
        handleClick = (e) => { deleteSecurity(String(e.currentTarget.id)) }
      }

      if (this.state.isTemp) {
        removeWrapperClassName = 'temp-card'
        handleClick = (e) => {
          this.toggleIsTemp()
          addSecurity(String(e.currentTarget.id))
        }
      }
    }

    return (
      <div className={removeWrapperClassName} id={wrapperId} onClick={handleClick}>
        <div className={cardClassName} id={wrapperId} onClick={clickHandler}>
          <Line
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: ticker || chartData.ticker,
                fill: fill,
                lineTension: 0,
                backgroundColor: 'rgba(75,192,192,0.25)',
                borderColor: lineColor,
                borderWidth: 2,
                data: chartData.prices,
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: pointBackgroundColor,
                pointBorderWidth: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 0,
                pointHitRadius: 10,
              }
            ],
          }}
          options={{
            title:{
              display: true,
              text: cName || chartData.cName,
              fontSize: headerFontSize,
              fontColor: 'black',
            },
            spanGaps: true,
            legend:{
              display: false,
            },
            scales: {
              xAxes: [{
                  gridLines: {
                      display: false
                  },
                  ticks: {
                    display: xTicks
                  }
              }],
              yAxes: [{
                gridLines: {
                    display: yGridLines
                },
                ticks: {
                  display: yTicks
                }
            }],
            },
            scaleShowLabels: false
          }}
          />
          </div>
      </div>
    );
  }
}

export default Chart;


