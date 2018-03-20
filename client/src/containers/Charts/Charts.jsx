import React, { Component } from "react";
import "./Charts.css";
import ReactHighStock from "react-highcharts/ReactHighstock.src";

class Charts extends Component {
  render() {
    const data = this.props.data;
    const ticker = this.props.ticker;
    const dataClose = data.map(item => [Date.parse(item.date), item.close]);
    console.log("Charts Data:", data);

    const config = {
      title: {
        align: "left",
        text: ticker,
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
