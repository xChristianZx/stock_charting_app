import React, { Component } from "react";
import "./WatchList.css";
import ListItem from "../../components/ListItem/ListItem";
import Axios from "axios";
import API_KEY from "../../config/keys";

class WatchList extends Component {
  state = {
    data: [],
    focus: null
  };

  componentDidMount() {
    const data = [{ ticker: "AAPL", price: 300 }, { ticker: "GE", price: 40 }];
    this.setState({ data: data });
  }

  Axios = ticker => {
    const baseUrl =
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";
    const options = {
      params: {
        symbol: ticker,
        apikey: API_KEY
      }
    };

    Axios
      .get(baseUrl, options)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  fetchTicker = (ticker, id) => {
    this.Axios(ticker);
    this.setState({ focus: id });
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
            <ListItem data={this.state.data} fetchTicker={this.fetchTicker} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default WatchList;
