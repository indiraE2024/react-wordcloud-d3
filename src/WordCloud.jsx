import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import './WordCloud.css';

const WordCloud = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const layout = cloud()
      .size([800, 400])
      .words(data.map(d => ({ text: d.text, size: d.frequency * 10 })))
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .fontSize(d => d.size)
      .on('end', draw);

    layout.start();

    function draw(words) {
      const svg = d3.select(svgRef.current)
                    .attr('width', layout.size()[0])
                    .attr('height', layout.size()[1])
                    .append('g')
                    .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`);

      svg.selectAll('text')
         .data(words)
         .enter().append('text')
         .style('font-size', d => `${d.size}px`)
         .style('fill', (d, i) => d3.schemeCategory10[i % 10])
         .attr('text-anchor', 'middle')
         .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
         .text(d => d.text);
    }
  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default WordCloud;
