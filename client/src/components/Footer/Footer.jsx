import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>
        Created by{" "}
        <a
          href="https://github.com/xChristianZx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Christian Z
        </a>
      </p>
      <p>
        Data provided by{" "}
        <a
          href="https://iextrading.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          IEX
        </a>
      </p>
    </div>
  );
};

export default Footer;
