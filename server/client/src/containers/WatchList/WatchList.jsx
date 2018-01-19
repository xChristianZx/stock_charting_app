import React, { Component } from "react";
import "./WatchList.css";

class WatchList extends Component {
  render() {
    return (
      <div className="watchlist-container">
        <table className="list">
          <tr>
            <td className="ticker">Ticker</td>
            <td className="price">Price</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default WatchList;
