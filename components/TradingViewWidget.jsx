"use client";
import React, { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';

const TradingViewWidget = ({ symbol = "0xb3e41d6e0ea14b43bc5de3c314a408af171b03dd" }) => {
  const container = useRef(null);

  useEffect(() => {
    // Remove existing script if any
    const existingScript = container.current.querySelector("script");
    if (existingScript) {
      container.current.removeChild(existingScript);
    }

    // Create the script element
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${symbol}",
        "interval": "15",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "gridColor": "rgba(0, 0, 0, 0.06)",
          "hide_top_toolbar": true,
          "allow_symbol_change": false,
          "range": "3D",
          "save_image": false,
          "calendar": false,
          "hide_volume": true,
        "support_host": "https://www.tradingview.com"
      }`;

    // Append the script to the container
    if (container.current) {
      container.current.appendChild(script);
    }

    // Cleanup function to remove the script when the component unmounts or before adding a new one
    return () => {
      if (container.current && script.parentNode === container.current) {
        container.current.removeChild(script);
      }
    };
  }, [symbol]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

// Update PropTypes
TradingViewWidget.propTypes = {
  symbol: PropTypes.string,
};

// Remove defaultProps
// TradingViewWidget.defaultProps = {
//   symbol: "NASDAQ:AAPL",
// };

export default memo(TradingViewWidget);
