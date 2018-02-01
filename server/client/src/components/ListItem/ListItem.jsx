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
      <tr className="item-row" key={i}>
        <td className="ticker" onClick={() => fetchTicker(item.symbol, i)}>
          {item.symbol}{" "}
          <button className="delete" onClick={() => deleteTicker(item.symbol)}>
            X
          </button>
        </td>
        <td className="price">{item.price}</td>
      </tr>
    );
  });

  return [list];
};

export default ListItem;
