import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
  }

  render() {
    return (
      <div className="App">
        <form action="/quote" method="POST">
          <input type="text" name="test"/>
          <input type="submit" />
        </form>        
      </div>
    );
  }
}

export default App;
