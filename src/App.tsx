import React, { useEffect, useRef, useState } from 'react';
import { select, scaleBand, axisBottom, axisRight, scaleLinear, scaleOrdinal } from 'd3';

import './App.css';

function App() {
  const [data, setData] = useState<[number, number][]>([[0, 10], [0, 70], [100, 35], [150, 75], [200, 30], [250, 120], [300, 90]])

  const svgRef = useRef<SVGSVGElement>(null!);

  useEffect(() => {
    const { current: svgCurrentRef } = svgRef;
    const svg = select(svgCurrentRef);

    const xScale = scaleBand()
      .domain(data.map((_, idx) => String(idx)))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(['green', 'orange', 'red'] as any)
      .clamp(true);


    const xAxis = axisBottom(xScale)
      .ticks(data.length)

    svg.select('.x-axis')
      .style('transform', 'translateY(150px)')
      .call(xAxis as any)

    svg.select('.y-axis')
      .style('transform', 'translateX(300px)')
      .call(axisRight(yScale) as any)

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1, -1)')
      .attr('x', (value, idx) => String(xScale(`${idx}`)))
      .attr('y', -150)
      .attr('width', xScale.bandwidth())
      .transition()
      .attr('fill', (value) => colorScale(value[1]))
      .attr('height', (value) => 150 - yScale(value[1]))


  }, [data])

  console.log('data ->', data);

  return (
    <>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br/>
      <button onClick={() => {
        setData((prevState) =>
          prevState.map((value) =>
            value.map(item => (item + 10))
          ) as [number, number][]
        )
      }}>
        Update data
      </button>
      <button onClick={() => {
        setData((prevState) => prevState.filter(value => (value.map(item => item < 35))))
      }}>
        Filter data
      </button>
    </>
  );
}

export default App;
