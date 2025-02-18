"use client";
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import PropTypes from 'prop-types';

const TradingViewWidget = ({ data, symbol, theme = 'dark' }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current || !data) return;

    const chartOptions = {
      layout: {
        background: { type: 'solid', color: theme === 'dark' ? '#0D0E17' : '#ffffff' },
        textColor: theme === 'dark' ? '#ffffff' : '#000000',
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      grid: {
        vertLines: { color: theme === 'dark' ? '#1e222d' : '#e1e1e1' },
        horzLines: { color: theme === 'dark' ? '#1e222d' : '#e1e1e1' },
      },
      rightPriceScale: {
        borderColor: theme === 'dark' ? '#1e222d' : '#e1e1e1',
      },
    };

    const chart = createChart(chartContainerRef.current, chartOptions);
    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    // Transform data for the chart
    const transformedData = data.map(point => ({
      time: point.x / 1000, // Convert ms to seconds for the chart
      open: point.o,
      high: point.h,
      low: point.l,
      close: point.c,
    }));

    candlestickSeries.setData(transformedData);

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ 
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [data, theme]);

  return (
    <div 
      ref={chartContainerRef} 
      style={{ width: '100%', height: '100%' }}
    />
  );
};

TradingViewWidget.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    o: PropTypes.number.isRequired,
    h: PropTypes.number.isRequired,
    l: PropTypes.number.isRequired,
    c: PropTypes.number.isRequired,
  })).isRequired,
  symbol: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
};

export default TradingViewWidget;
