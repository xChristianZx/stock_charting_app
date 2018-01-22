import React, { Component } from "react";
import "./App.css";
import WatchList from "./containers/WatchList/WatchList";
// import Charts from "./containers/Charts/Charts";
import Axios from "axios";

class App extends Component {
  state = {
    stocksArray: [],
    focus: null,
    inputValue: ""
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

  handleTickerSubmit = e => {
    e.preventDefault();
    const newTicker = { ticker: this.state.inputValue.toUpperCase() };
    this.setState(prevState => ({
      stocksArray: [...prevState.stocksArray, newTicker],
      inputValue: ""
    }));
  };

  handleTickerChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <WatchList
          data={this.state.stocksArray}
          inputValue={this.state.inputValue}
          fetchTicker={this.fetchTicker}
          handleTickerChange={this.handleTickerChange}
          handleTickerSubmit={this.handleTickerSubmit}
        />
        {/* <Charts /> */}
      </div>
    );
  }
}

export default App;
