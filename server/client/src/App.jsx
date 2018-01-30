import React, { Component } from "react";
import "./App.css";
import WatchList from "./containers/WatchList/WatchList";
import Charts from "./containers/Charts/Charts";
import Axios from "axios";

const socket = new WebSocket("ws://localhost:5000");

class App extends Component {
  state = {
    isLoading: true,
    stocksArray: [],
    stocksArrayData: [],
    focus: null,
    inputValue: "",
    currentTicker: "",
    currentStockData: []
  };

  componentDidMount() {
    this.wsSetup();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.stocksArray !== this.state.stocksArray) {
      this.getStocksArrayData(this.state.stocksArray);
    }
  }

  wsSetup = () => {
    /* CONNECTING */
    if (socket.readyState === 0) {
      console.log(
        `WS State: ${socket.readyState}\nconnecting to ${socket.url} ${
          socket.protocol
        }`
      );
    }

    socket.onopen = msg => {
      console.log("WS State:", msg.type, socket.readyState);
      const openRes = JSON.stringify({
        type: "message",
        data: "Client Connected"
      });
      socket.send(openRes);
    };

    socket.onmessage = msg => {
      // console.log(msg);
      const payload = JSON.parse(msg.data);
      if (payload.type === "data") {
        const list = payload.data.map(item => item.symbol);
        console.log("DBWL: ", list);
        this.setState({ stocksArray: list });
      } else {
        console.log("Server: ", payload.data);
      }
    };

    socket.onclose = msg => {
      console.log("WebSocket Connection Close:", msg);
    };

    socket.onerror = err => {
      console.log("Error:", err);
    };

    window.addEventListener("beforeunload", () => {
      socket.close();
    });
  };

  wsNewTickerSend = symbol => {
    const newSymbol = { type: "addSymbol", data: symbol };
    socket.send(JSON.stringify(newSymbol));
  };

  getCurrentStockData = ticker => {
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

  getStocksArrayData = listArr => {
    const tickerArr = listArr.map(item => item).join(",");

    const baseUrl = "https://api.iextrading.com/1.0/tops/";
    const compUrl = `${baseUrl}last?symbols=${tickerArr}`;

    Axios.get(compUrl)
      .then(payload => {
        const data = payload.data;
        console.log("StocksArrayData:", payload);
        this.setState({ stocksArrayData: data });
      })
      .catch(err => console.log(err));
  };

  fetchTicker = (ticker, id) => {
    this.getCurrentStockData(ticker);
    this.setState({ focus: id });
  };

  handleTickerSubmit = e => {
    e.preventDefault();
    const newTicker = this.state.inputValue.toUpperCase();
    this.wsNewTickerSend(newTicker);
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
            stocksArray={this.state.stocksArray}
            stocksArrayData={this.state.stocksArrayData}
            inputValue={this.state.inputValue}
            fetchTicker={this.fetchTicker}
            handleTickerChange={this.handleTickerChange}
            handleTickerSubmit={this.handleTickerSubmit}
          />
          <div className="charts-container loading">
            <h2 className="loading-header">Select a stock from Watchlist</h2>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <WatchList
            stocksArray={this.state.stocksArray}
            stocksArrayData={this.state.stocksArrayData}
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
