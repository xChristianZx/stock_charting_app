import React from "react";
import "./ListItem.css";

const ListItem = ({ data }) => {
  const list = data.map(item => {
    return (
      <tr className="item-row">
        <td className="ticker">{item.ticker}</td>
        <td className="price">{item.price}</td>
      </tr>
    );
  });

  return [list];
};

export default ListItem;
