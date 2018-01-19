import React, { Component } from "react";
import "./WatchList.css";
import ListItem from "../../components/ListItem/ListItem";

class WatchList extends Component {
  render() {
    return (
      <div className="watchlist-container">
        <table className="list">
          <thead>
            <tr className="header-row">
              <th className="ticker">Ticker</th>
              <th className="price">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="body-row">
              <td className="ticker">AAPL</td>
              <td className="price">300</td>
            </tr>
            <ListItem />
          </tbody>
        </table>
      </div>
    );
  }
}

export default WatchList;
