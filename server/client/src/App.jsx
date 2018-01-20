import React, { Component } from "react";
import "./App.css";
import WatchList from "./containers/WatchList/WatchList";
// import Charts from "./containers/Charts/Charts";
import Axios from "axios";

class App extends Component {
  state = {
    stocksArray: [],
    focus: null
  };

  componentDidMount() {
    const stocksArray = [{ ticker: "AAPL" }, { ticker: "GE" }];
    this.setState({ stocksArray });
  }

  Axios = ticker => {
    const baseUrl = "https://api.iextrading.com/1.0/stock/";
    const compUrl = `${baseUrl}${ticker}/chart/1y`;

    Axios.get(compUrl)
      .then(payload => {
        console.log(ticker, payload);
      })
      .catch(err => console.log(err));
  };

  fetchTicker = (ticker, id) => {
    this.Axios(ticker);
    this.setState({ focus: id });
  };

  render() {
    return (
      <div className="App">
        <WatchList
          data={this.state.stocksArray}
          fetchTicker={this.fetchTicker}
        />
        {/* <Charts /> */}
      </div>
    );
  }
}

export default App;
