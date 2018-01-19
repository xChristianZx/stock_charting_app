import React from "react";
import "./ListItem.css";

const ListItem = props => {
  return (
    <tr className="item-row">
      <td className="ticker">GE</td>
      <td className="price">100</td>
    </tr>
  );
};

export default ListItem;
