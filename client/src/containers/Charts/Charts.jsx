import React, { Component } from "react";
import "./Charts.css";
import ReactHighStock from "react-highcharts/ReactHighstock.src";

class Charts extends Component {
  render() {
    const { ticker, stats, data } = this.props;
    const dataClose = data.map(item => [Date.parse(item.date), item.close]);
    console.log("Charts Data:", data);
    // console.log(stats);

    const config = {
      title: {
        align: "left",
        text: `${ticker} - ${stats.companyName}`,
        x: 15
      },
      rangeSelector: {
        selected: 1
      },
      series: [
        {
          name: "Close",
          data: dataClose,
          tooltip: {
            valueDecimals: 2
          }
        }
      ]
    };

    return (
      <div className="charts-container">
        <ReactHighStock config={config} />
      </div>
    );
  }
}

export default Charts;
