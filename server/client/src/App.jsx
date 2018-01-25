import React, { Component } from "react";
import "./App.css";
import WatchList from "./containers/WatchList/WatchList";
import Charts from "./containers/Charts/Charts";
import Axios from "axios";

class App extends Component {
  state = {
    isLoading: true,
    stocksArray: [],
    focus: null,
    inputValue: "",
    currentTicker: "",
    currentStockData: []
  };

  componentDidMount() {
    const stocksArray = [{ ticker: "AAPL" }, { ticker: "GE" }];
    this.setState({ stocksArray });
  }

  getData = ticker => {
    const baseUrl = "https://api.iextrading.com/1.0/stock/";
    const compUrl = `${baseUrl}${ticker}/chart/1y`;

    Axios.get(compUrl)
      .then(payload => {
        // console.log(ticker, payload);
        const data = payload.data;
        this.setState({
          currentStockData: data,
          currentTicker: ticker,
          isLoading: false
        });
      })
      .catch(err => console.log(err));
  };

  fetchTicker = (ticker, id) => {
    this.getData(ticker);
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

  onRender = () => {
    if (this.state.isLoading) {
      return (
        <div className="App">
          <WatchList
            data={this.state.stocksArray}
            inputValue={this.state.inputValue}
            fetchTicker={this.fetchTicker}
            handleTickerChange={this.handleTickerChange}
            handleTickerSubmit={this.handleTickerSubmit}
          />
          <div className="charts-container">
            <h2 className="loading-header">Loading...</h2>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <WatchList
            data={this.state.stocksArray}
            inputValue={this.state.inputValue}
            fetchTicker={this.fetchTicker}
            handleTickerChange={this.handleTickerChange}
            handleTickerSubmit={this.handleTickerSubmit}
          />
          <Charts
            data={this.state.currentStockData}
            ticker={this.state.currentTicker}
          />
        </div>
      );
    }
  };

  render() {
    return this.onRender();
  }
}

export default App;
