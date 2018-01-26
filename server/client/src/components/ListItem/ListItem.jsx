import React from "react";
import "./ListItem.css";

const ListItem = props => {
  // const stocksArray = props.stocksArray;
  const stocksArrayData = props.stocksArrayData;
  const fetchTicker = props.fetchTicker;
  if (!stocksArrayData) {
    return <tr><td>Loading</td></tr>
  }
  const list = stocksArrayData.map((item, i) => {
    return (
      <tr
        className="item-row"
        key={i}
        onClick={fetchTicker.bind(this, item.symbol, i)}
      >
        <td className="ticker">{item.symbol}</td>
        <td className="price">{item.price}</td>
      </tr>
    );
  });

  return [list];
};

export default ListItem;
