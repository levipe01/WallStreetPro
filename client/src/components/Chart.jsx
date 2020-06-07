import React from 'react';
import {Line} from 'react-chartjs-2';


const Chart = ({labels, datasets, cName}) => {

  const chartData = {
    labels: labels,
    datasets: datasets
  }

  return (
    <div>
      <Line
        data={chartData}
        options={{
          title:{
            display:true,
            text:cName,
            fontSize:20
          },
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
          },
          scaleShowLabels : false
        }}
      />
    </div>
  );
}

export default Chart;