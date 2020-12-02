import React, { Component } from 'react';
import './Charts.css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

class Charts extends Component {
  render() {
    const { ticker, stats, data } = this.props;
    // candlestick format  - x,open,high,low,close
    // Note: sandbox data is inaccurate and messes up candlesticks,
    // switching to line chart
    const dataClose = data.map(item => [
      Date.parse(item.date),
      // item.open,
      // item.high,
      // item.low,
      item.close,
    ]);

    // console.log('Charts Data:', data);

    const config = {
      title: {
        align: 'left',
        text: `${ticker} - ${stats.companyName}`,
        x: 15,
      },
      rangeSelector: {
        selected: 1,
      },
      series: [
        {
          // type: 'candlestick',
          name: 'Close',
          data: dataClose,

          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
    };

    return (
      <div className="charts-container">
        <HighchartsReact
          options={config}
          highcharts={Highcharts}
          constructorType={'stockChart'}
        />
      </div>
    );
  }
}

export default Charts;
