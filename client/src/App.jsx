import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import WatchList from "./containers/WatchList/WatchList";
import Charts from "./containers/Charts/Charts";
import Axios from "axios";
import _ from "lodash";

const socket =
  process.env.NODE_ENV === "production"
    ? new WebSocket("wss://intense-eyrie-24761.herokuapp.com/")
    : new WebSocket("ws://localhost:5000");

class App extends Component {
  state = {
    stocksArray: [],
    stocksArrayData: [],
    currentTicker: "",
    chartStockData: [],
    focus: null,
    inputValue: "",
    isLoading: true
  };

  componentDidMount() {
    console.log("Dev Environment: ", process.env.NODE_ENV);
    this.wsSetup();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.stocksArray !== this.state.stocksArray) {
      this.getStocksArrayData(this.state.stocksArray);
    }
  }

  componentWillUnmount() {
    socket.onclose = msg => {
      console.log("WebSocket Connection Close:", msg);
    };
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
      const openResponse = JSON.stringify({
        type: "message",
        data: "Client Connected"
      });
      socket.send(openResponse);
    };

    socket.onmessage = msg => {
      const payload = JSON.parse(msg.data);
      switch (payload.type) {
        case "data":
          const list = payload.data.map(item => item.symbol);
          console.log("DBWL: ", list);
          this.setState({ stocksArray: list });
          break;
        case "add_stock":
          const newTicker = payload.data.symbol;
          this.setState(prevState => ({
            stocksArray: [...prevState.stocksArray, newTicker]
          }));
          console.log("Server: A stock was added", newTicker);
          break;
        case "remove_stock":
          const removeTicker = payload.data.symbol;
          this.setState(prevState => ({
            stocksArray: prevState.stocksArray.filter(
              ticker => ticker !== removeTicker
            )
          }));
          console.log("Server: A stock was REMOVED", removeTicker);
          break;
        default:
          console.log("Server: ", payload.data);
      }
    };

    socket.onerror = err => {
      console.log("Error:", err);
    };

    window.addEventListener("beforeunload", () => {
      socket.close();
    });
  };

  wsNewTicker = symbol => {
    const newSymbol = { type: "addSymbol", data: symbol };
    socket.send(JSON.stringify(newSymbol));
  };

  wsRemoveTicker = symbol => {
    const delSymbol = { type: "removeSymbol", data: symbol };
    socket.send(JSON.stringify(delSymbol));
  };

  getChartStockData = ticker => {
    const baseUrl = "https://api.iextrading.com/1.0/stock/";
    const compUrl = `${baseUrl}${ticker}/chart/5y`;

    Axios.get(compUrl)
      .then(payload => {
        // console.log(ticker, payload);
        const data = payload.data;
        this.setState({
          chartStockData: data,
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
        // console.log("StocksArrayData:", payload);
        this.setState({ stocksArrayData: data });
      })
      .catch(err => console.log(err));
  };

  tickerValidation = ticker => {
    const baseUrl = "https://api.iextrading.com/1.0/tops/";
    const compUrl = `${baseUrl}?symbols=${ticker}`;

    Axios.get(compUrl)
      .then(payload => {
        const data = payload.data;
        console.log("TickerCheck:", payload);
        if (_.isEmpty(data[0])) {
          alert("Error: Invalid symbol or problem with data provider");
        } else {
          this.wsNewTicker(ticker);
          this.setState(prevState => ({
            stocksArray: [...prevState.stocksArray, ticker],
            inputValue: ""
          }));
        }
      })
      .catch(err => console.log(err));
  };

  fetchTicker = (ticker, id) => {
    this.getChartStockData(ticker);
    this.setState({ focus: id });
  };

  handleTickerSubmit = e => {
    e.preventDefault();
    if (this.state.inputValue === "") {
      alert("Cannot submit empty string");
      return;
    }
    const newTicker = this.state.inputValue.trim().toUpperCase();
    this.tickerValidation(newTicker);
  };

  handleTickerChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  deleteTicker = symbol => {
    this.setState(prevState => ({
      stocksArray: prevState.stocksArray.filter(item => item !== symbol)
    }));
    this.wsRemoveTicker(symbol);
  };

  render() {
    return (
      <div className="page-wrapper">
        <NavBar />
        <div className="App">
          <WatchList
            stocksArray={this.state.stocksArray}
            stocksArrayData={this.state.stocksArrayData}
            inputValue={this.state.inputValue}
            fetchTicker={this.fetchTicker}
            handleTickerChange={this.handleTickerChange}
            handleTickerSubmit={this.handleTickerSubmit}
            deleteTicker={this.deleteTicker}
          />
          {this.state.isLoading ? (
            <div className="charts-container loading">
              <h2 className="loading-header">Select a stock from Watchlist</h2>
            </div>
          ) : (
            <Charts
              data={this.state.chartStockData}
              ticker={this.state.currentTicker}
            />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
