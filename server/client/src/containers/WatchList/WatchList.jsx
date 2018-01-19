import React, { Component } from "react";
import "./WatchList.css";
import ListItem from "../../components/ListItem/ListItem";

class WatchList extends Component {
  state = {
    data: [{ ticker: "AAPL", price: 300 }, { ticker: "GE", price: 40 }]
  };

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
            <ListItem data={this.state.data} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default WatchList;
