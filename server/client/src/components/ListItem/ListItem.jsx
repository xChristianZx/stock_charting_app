import React from "react";
import "./ListItem.css";

const ListItem = props => {
  const { stocksArrayData, fetchTicker, deleteTicker } = props;
  if (!stocksArrayData) {
    return (
      <tr>
        <td>Loading</td>
      </tr>
    );
  }

  const list = stocksArrayData.map((item, i) => {
    return (
      <tr
        className="item-row"
        key={i}
        onClick={() => fetchTicker(item.symbol, i)}
      >
        <td className="ticker">
          {item.symbol}
          <button className="delete" onClick={() => deleteTicker(item.symbol)}>
            x
          </button>
        </td>
        <td className="price">{item.price}</td>
      </tr>
    );
  });

  return [list];
};

export default ListItem;
