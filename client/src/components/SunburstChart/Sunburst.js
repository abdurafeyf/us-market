import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { scaleOrdinal } from 'd3-scale';

const Sunburst = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    const color = scaleOrdinal(d3.schemeCategory10);

    const partition = d3.partition().size([2 * Math.PI, radius]);

    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1 - 1);

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const root = d3.hierarchy(data);
    root.sum((d) => d.value);

    partition(root);

    svg
      .selectAll('path')
      .data(root.descendants())
      .enter()
      .append('path')
      .attr('display', (d) => (d.depth ? null : 'none'))
      .attr('d', arc)
      .style('stroke', '#fff')
      .style('fill', (d) => color((d.children ? d : d.parent).data.name))
      .style('fill-opacity', (d) => (d.children ? 1 : 0.5))
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    function handleMouseOver(d) {
      const sequence = d.ancestors().reverse();
      svg
        .selectAll('path')
        .style('opacity', 0.3)
        .filter((node) => sequence.includes(node))
        .style('opacity', 1);
    }

    function handleMouseOut() {
      svg.selectAll('path').style('opacity', 1);
    }
  };

  return <div ref={chartRef}></div>;
};

export default Sunburst;
