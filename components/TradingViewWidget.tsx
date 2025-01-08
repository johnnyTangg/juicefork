import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';

interface PriceDataPoint {
  x: number;
  o: number;
  h: number;
  l: number;
  c: number;
}

interface TradingViewWidgetProps {
  data: PriceDataPoint[];
  symbol: string;
  theme?: 'light' | 'dark';
  autosize?: boolean;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ 
  data, 
  symbol, 
  theme = 'dark',
  autosize = true 
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: theme === 'dark' ? '#0D0E17' : '#ffffff' },
        textColor: theme === 'dark' ? '#ffffff' : '#000000',
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
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
      if (chartContainerRef.current && chartRef.current && autosize) {
        chartRef.current.applyOptions({ 
          width: chartContainerRef.current.clientWidth 
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
  }, [data, theme, autosize]);

  return <div ref={chartContainerRef} />;
};

export default TradingViewWidget; 