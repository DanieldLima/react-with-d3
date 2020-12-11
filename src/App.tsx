import React, { useEffect, useRef, useState } from 'react';
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear} from 'd3';

import './App.css';

function App() {
  const [data, setData] = useState<[number, number][]>([[0, 0], [0, 70], [100, 35], [150, 75], [200, 30], [250, 120], [300, 90]])

  const svgRef = useRef<SVGSVGElement>(null!);

  useEffect(() => {
    const { current: svgCurrentRef } = svgRef;
    const svg = select(svgCurrentRef);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((idx) => `${Number(idx) + 1}`)

    svg.select('.x-axis')
      .style('transform', 'translateY(150px)')
      .call(xAxis as any)

    svg.select('.y-axis')
      .style('transform', 'translateX(300px)')
      .call(axisRight(yScale) as any)

    const pathLine = line().curve(curveCardinal)
      .x((value, idx) => xScale(idx))
      .y((value, idx) => yScale(value[1]))

    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', pathLine)
      .attr('fill', 'none')
      .attr('stroke', 'blue')

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
