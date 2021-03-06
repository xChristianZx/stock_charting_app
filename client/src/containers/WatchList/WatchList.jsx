import React, { Component } from "react";
import "./WatchList.css";
import ListItem from "../../components/ListItem/ListItem";
import AddTicker from "../../components/AddTicker/AddTicker";

class WatchList extends Component {
  renderList = () => {
    if (!this.props.stocksArrayData) {
      return (
        <p>Loading...</p>
      );
    } else {
      return (
        <tbody>
          <ListItem
            stocksArray={this.props.stocksArray}
            stocksArrayData={this.props.stocksArrayData}
            fetchTicker={this.props.fetchTicker}
            deleteTicker={this.props.deleteTicker}
          />

          <AddTicker
            inputValue={this.props.inputValue}
            handleTickerSubmit={this.props.handleTickerSubmit}
            handleTickerChange={this.props.handleTickerChange}
          />
        </tbody>
      );
    }
  };

  render() {
    return (
      <div className="watchlist-container">
        <table className="list">
          <thead>
            <tr className="wl-header-row">
              <th>WatchList</th>
            </tr>
            <tr className="header-row">
              <th className="ticker">Ticker</th>
              <th className="price">Price</th>
            </tr>
          </thead>
          {this.renderList()}
        </table>
      </div>
    );
  }
}

export default WatchList;
