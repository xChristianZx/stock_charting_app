import React from "react";
import "./ListItem.css";

const ListItem = props => {
  const stocksArray = props.stocksArray;
  const fetchTicker = props.fetchTicker;
  console.log("DATA:", stocksArray);
  const list = stocksArray.map((item, i) => {
    return (
      <tr
        className="item-row"
        key={i}
        onClick={fetchTicker.bind(this, item.ticker, i)}
      >
        <td className="ticker">{item.ticker}</td>
        <td className="price">{item.price}</td>
      </tr>
    );
  });

  return [list];
};

export default ListItem;
