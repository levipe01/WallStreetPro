import React from 'react';
import {Line} from 'react-chartjs-2';


const Chart = ({labels, datasets, cName, isMini, updateTicker, removeVisible, deleteSecurity, addSecurity, isTemp}) => {

  const chartData = {
    labels: labels,
    datasets: datasets
  }

  const toggleIsTemp = () => {
    isTemp = !isTemp
  }

  let headerFontSize = 25;
  let xTicks = true;
  let yGridLines = true;
  let yTicks = true;
  let wrapperId = null
  let clickHandler = null
  let cardClassName = ''
  let card_overlay_text = ''
  let handleClick = null
  let removeWrapperClassName = ''

  if(isMini) {
    clickHandler = (event) => {
      updateTicker(event.currentTarget.id);
    }
    if (removeVisible) {
      clickHandler = null
      removeWrapperClassName = 'carousel-remove-wrapper'
      handleClick = (e) => {
        deleteSecurity(String(e.currentTarget.id))
      }
    }
    if (isTemp) {
      removeWrapperClassName = 'temp-card'
      handleClick = (e) => {
        toggleIsTemp()
        addSecurity(String(e.currentTarget.id))
      }
    }
    cardClassName = 'a-carousel-card'

    headerFontSize = 15;
    xTicks = false;
    yGridLines = false;
    yTicks = false;
    wrapperId = datasets[0].label
  }

  return (
    <div className={removeWrapperClassName} id={wrapperId} onClick={handleClick}>
      <div className={cardClassName} id={wrapperId} onClick={clickHandler}>
        <Line
        data={chartData}
        options={{
          title:{
            display:true,
            text:cName,
            fontSize: headerFontSize,
            fontColor: 'black',
          },
          spanGaps:true,
          legend:{
            display:false,
          },
          scales: {
            xAxes: [{
                gridLines: {
                    display:false
                },
                ticks: {
                  display: xTicks
                }
            }],
            yAxes: [{
              gridLines: {
                  display:yGridLines
              },
              ticks: {
                display: yTicks
              }
          }],
          },
          scaleShowLabels : false
        }}
        />
        </div>
    </div>
  );
}

export default Chart;