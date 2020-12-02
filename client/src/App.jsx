import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import WatchList from './containers/WatchList/WatchList';
import Charts from './containers/Charts/Charts';
import Axios from 'axios';
import _ from 'lodash';

const socket =
  process.env.NODE_ENV === 'production'
    ? new WebSocket('wss://chart-it-z.herokuapp.com')
    : new WebSocket('ws://localhost:5000');

class App extends Component {
  state = {
    currentTicker: '',
    currentStockStats: null,
    chartStockData: [],
    focus: null,
    inputValue: '',
    isLoading: true,
    watchlistArr: [],
    watchlistData: [],
  };

  componentDidMount() {
    console.log('Dev Environment: ', process.env.NODE_ENV);
    this.wsSetup();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.watchlistArr !== this.state.watchlistArr) {
      this.getWatchlistData(this.state.watchlistArr);
    }
  }

  componentWillUnmount() {
    socket.onclose = msg => {
      console.log('WebSocket Connection Close:', msg);
    };
  }
  //region WebSockets
  wsSetup = () => {
    /* CONNECTING */
    if (socket.readyState === 0) {
      console.log(
        `WS State: ${socket.readyState}\nconnecting to ${socket.url} ${socket.protocol}`
      );
    }

    socket.onopen = msg => {
      console.log('WS State:', msg.type, socket.readyState);
      const openResponse = JSON.stringify({
        type: 'message',
        data: 'Client Connected',
      });
      socket.send(openResponse);
    };

    socket.onmessage = msg => {
      const payload = JSON.parse(msg.data);
      switch (payload.type) {
        case 'data':
          const list = payload.data.map(item => item.symbol);
          console.log('DBWL: ', list);
          this.setState({ watchlistArr: list });
          break;
        case 'add_stock':
          const newTicker = payload.data.symbol;
          this.setState(prevState => ({
            watchlistArr: [...prevState.watchlistArr, newTicker],
            inputValue: '',
          }));
          console.log('Server: A stock was added', newTicker);
          break;
        case 'remove_stock':
          const removeTicker = payload.data.symbol;
          this.setState(prevState => ({
            watchlistArr: prevState.watchlistArr.filter(
              ticker => ticker !== removeTicker
            ),
          }));
          console.log('Server: A stock was REMOVED', removeTicker);
          break;
        case 'error':
          console.log('Server: ', payload.data);
          alert(payload.data);
          break;
        default:
          console.log('Server: ', payload.data);
      }
    };

    socket.onerror = err => {
      console.log('Error:', err);
    };

    window.addEventListener('beforeunload', () => {
      socket.close();
    });
  };

  wsNewTicker = symbol => {
    const newSymbol = { type: 'addSymbol', data: symbol };
    socket.send(JSON.stringify(newSymbol));
  };

  wsRemoveTicker = symbol => {
    const delSymbol = { type: 'removeSymbol', data: symbol };
    socket.send(JSON.stringify(delSymbol));
  };
  //endregion

  getChartStockData = ticker => {
    Axios.get('/chart/data', { params: { ticker } })
      .then(payload => {
        const { data } = payload.data;
        this.setState({
          chartStockData: data,
          currentTicker: ticker,
          isLoading: false,
        });
      })
      .catch(err => {
        const { msg } = err.response.data;
        console.log('getChartStockData Error: ', msg);
      });
  };

  getCurrentStockStats = ticker => {
    Axios.get('/chart/stats', { params: { ticker } })
      .then(payload => {
        const { data } = payload.data;
        this.setState({
          currentStockStats: data,
        });
      })
      .catch(err => {
        const { msg } = err.response.data;
        console.log('currentStockStats Error: ', msg);
      });
  };

  // Populates Watchlist Data
  getWatchlistData = listArr => {
    const tickerArr = listArr.map(item => item).join(',');

    Axios.get('/watchlist/data', { params: { tickerArr } })
      .then(payload => {
        const { data } = payload.data;
        this.setState({ watchlistData: data });
      })
      .catch(err => {
        const { msg } = err.response.data;
        console.log('getWatchlistData Error: ', msg);
      });
  };

  tickerValidation = ticker => {
    Axios.get(`/watchlist/validation`, { params: { ticker } })
      .then(payload => {
        if (payload.status !== 201) {
          alert('Error: Invalid symbol or problem with data provider');
        } else {
          this.wsNewTicker(ticker);
        }
      })
      .catch(err => {
        const { msg } = err.response.data;
        console.log('tickerValidation Error: ', msg);
        alert(msg);
      });
  };

  fetchTicker = (ticker, id) => {
    this.getChartStockData(ticker);
    this.getCurrentStockStats(ticker);
    this.setState({ focus: id });
  };

  handleTickerSubmit = e => {
    e.preventDefault();
    if (this.state.inputValue === '') {
      alert('Cannot submit empty string');
      return;
    }
    const newTicker = this.state.inputValue.trim().toUpperCase();
    this.tickerValidation(newTicker);
  };

  handleTickerChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  deleteTicker = symbol => {
    this.wsRemoveTicker(symbol);
  };

  render() {
    return (
      <div className="page-wrapper">
        <NavBar />
        <div className="App">
          <WatchList
            stocksArray={this.state.watchlistArr}
            stocksArrayData={this.state.watchlistData}
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
              stats={this.state.currentStockStats}
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
