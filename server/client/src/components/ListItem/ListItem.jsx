import React from "react";
import "./ListItem.css";

const ListItem = props => {
  const data = props.data;
  const fetchTicker = props.fetchTicker;

  const list = data.map((item, i) => {
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
