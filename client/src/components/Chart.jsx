import React from 'react';
import {Line} from 'react-chartjs-2';


const Chart = ({labels, datasets, cName, isMini, updateTicker}) => {

  const chartData = {
    labels: labels,
    datasets: datasets
  }

  const clickHandler = (event) => {
    updateTicker(event.currentTarget.id);
  }

  return (
    <div>
      {
        isMini
        ? <div className='a-carousel-card' id={datasets[0].label} onClick={clickHandler}>
        <Line
        data={chartData}
        options={{
          title:{
            display:true,
            text:cName,
            fontSize: 15,
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
                  display: false
                }
            }],
            yAxes: [{
              gridLines: {
                  display:false
              },
              ticks: {
                display: false
              }
          }],
          },
          scaleShowLabels : false
        }}
        />
        </div>
      : <Line
        data={chartData}
        options={{
          title:{
            display:true,
            text:cName,
            fontSize:25,
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
                  display: true
                }
            }],
          },
          scaleShowLabels : false
        }}
        />
      }
    </div>
  );
}

export default Chart;