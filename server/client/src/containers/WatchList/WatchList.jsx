import React, { Component } from "react";
import "./WatchList.css";
import ListItem from "../../components/ListItem/ListItem";
import AddTicker from "../../components/AddTicker/AddTicker";

class WatchList extends Component {
  renderList = () => {
    if (!this.props.stocksArrayData) {
      return (
        <tbody>
          <tr>
            <td>Loading...</td>
          </tr>
          <AddTicker
            inputValue={this.props.inputValue}
            handleTickerSubmit={this.props.handleTickerSubmit}
            handleTickerChange={this.props.handleTickerChange}
          />
        </tbody>
      );
    } else {
      return (
        <tbody>
          <ListItem
            stocksArray={this.props.stocksArray}
            stocksArrayData={this.props.stocksArrayData}
            fetchTicker={this.props.fetchTicker}
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
