import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const ComboChartLW = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    chartRef.current = createChart(chartContainerRef.current, {
      width: 600,
      height: 300,
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        borderVisible: false,
      },
      layout: {
        background: {
          type: 'solid',
          // color: '#131722',
          color: 'white'
        },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: {
          color: 'rgba(42, 46, 57, 0)',
        },
        horzLines: {
          color: 'rgba(42, 46, 57, 0.6)',
        },
      },
    });

    const areaSeries = chartRef.current.addAreaSeries({
      topColor: 'rgba(38,198,218, 0.56)',
      bottomColor: 'rgba(38,198,218, 0.04)',
      lineColor: 'rgba(38,198,218, 1)',
      lineWidth: 2,
    });

    const volumeSeries = chartRef.current.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });

    chartRef.current.priceScale('').applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    const areaSeriesData = [
      { time: '2018-10-19', value: 54.90 },
      { time: '2018-10-22', value: 54.98 },
      { time: '2018-10-23', value: 57.21 },
      // Add more data points
    ];

    const volumeSeriesData = [
      { time: '2018-10-19', value: 19103293.00, color: 'rgba(0, 150, 136, 0.8)' },
      { time: '2018-10-22', value: 21737523.00, color: 'rgba(255,82,82, 0.8)' },
      { time: '2018-10-23', value: 22737523.00, color: 'rgba(255,82,82, 0.8)' },
      // Add more data points
    ];

    areaSeries.setData(areaSeriesData);
    volumeSeries.setData(volumeSeriesData);

    return () => {
      chartRef.current.remove();
    };
  }, []);

  return <div ref={chartContainerRef}></div>;
};

export default ComboChartLW;
