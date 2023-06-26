import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000/combo-data';

const ComboChartLW = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      const data = response.data;
      setPost(data);
    });
  }, []);

  useEffect(() => {
    console.log(post);
    if (!post) return;

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
          color: 'white',
        },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: {
          color: 'rgba(0, 0, 0, 0)',
        },
        horzLines: {
          color: 'rgba(0, 0, 0, 0)',
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
    

    const areaSeriesData = post.price;

    const volumeSeriesData = post.volume;

    areaSeries.setData(areaSeriesData);
    volumeSeries.setData(volumeSeriesData);

    return () => {
      chartRef.current.remove();
    };
  }, [post]);

  return <div ref={chartContainerRef}></div>;
};

export default ComboChartLW;
