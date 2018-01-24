import React, { Component } from "react";
import "./Charts.css";
import ReactHighStock from "react-highcharts/ReactHighstock.src";

class Charts extends Component {
  render() {
    // const data = [
    //   [1220832000000, 22.56],
    //   [1220918400000, 21.67],
    //   [1221004800000, 21.66],
    //   [1221091200000, 21.81],
    //   [1221177600000, 21.28],
    //   [1221436800000, 20.05],
    //   [1221523200000, 19.98]
    // ];
    const data = this.props.data;
    console.log(data);

    const config = {
      rangeSelector: {
        selected: 1
      },
      series: [
        {
          name: "AAPL",
          data: data,
          tooltip: {
            valueDecimals: 2
          }
        }
      ]
    };

    return (
      <div className="charts-container">
        <ReactHighStock config={config} data={data} />
      </div>
    );
  }
}

export default Charts;
