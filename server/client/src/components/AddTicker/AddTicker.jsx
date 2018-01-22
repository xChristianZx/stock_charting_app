import React, { Component } from "react";
import "./AddTicker.css";

class AddTicker extends Component {
  render() {
    return (
      <tr className="item-row">
        <td className="add-ticker">
          <form onSubmit={this.props.handleTickerSubmit}>
            <input
              type="text"
              value={this.props.inputValue}
              onChange={this.props.handleTickerChange}
            />
          </form>
        </td>
        <td className="filler" />
      </tr>
    );
  }
}

export default AddTicker;
