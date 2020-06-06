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
            text:`${cName} Intraday Stock Price`,
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

export default Chart;