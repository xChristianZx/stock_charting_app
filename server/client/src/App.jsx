import React, { Component } from "react";
import "./App.css";
import WatchList from "./containers/WatchList/WatchList";
// import Charts from "./containers/Charts/Charts";

class App extends Component {
  render() {
    return (
      <div className="App">
        <WatchList />
        {/* <Charts /> */}
      </div>
    );
  }
}

export default App;
