import React from "react";
import FaClose from "react-icons/lib/fa/close";
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
          {item.symbol}
        </td>
        <td className="delete">
          <FaClose onClick={() => deleteTicker(item.symbol)} />
        </td>
        <td className="price">{item.price}</td>
      </tr>
    );
  });

  return [list];
};

export default ListItem;
