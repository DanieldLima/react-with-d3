import React, { useEffect, useRef, useState } from 'react';
import { select, scaleBand, axisBottom, axisRight, scaleLinear, pointer } from 'd3';

import './App.css';

const value = [25, 30, 45, 60, 10, 65, 75];
const months = ['01', '02', '03', '04', '05', '06', '07'];

function App() {
  const [axisData, setAxisData] = useState(() => {
    return value.map((value, idx) => ([months[idx], value]))
  })

  const svgRef = useRef<SVGSVGElement>(null!);

  useEffect(() => {
    const { current: svgCurrentRef } = svgRef;
    const svg = select(svgCurrentRef);

    const domainXData = axisData.map((value) => value[0])

    console.log('filter ->', axisData.map((value) => value[0]));

    const xScale = scaleBand()
      .range([0, 300])
      .domain(domainXData as string[])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(['green', 'orange', 'red'] as any)
      .clamp(true);


    const xAxis = axisBottom(xScale)
      .ticks(axisData.length)

    svg.select('.x-axis')
      .style('transform', 'translateY(150px)')
      .call(xAxis as any)

    svg.select('.y-axis')
      .style('transform', 'translateX(300px)')
      .call(axisRight(yScale) as any)

    svg
      .selectAll('.bar')
      .data(axisData)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1, -1)')
      .attr('x', (value) => xScale(value[0] as string) as number)
      .attr('y', -150)
      .attr('width', xScale.bandwidth())
      .on('mouseenter', (event, value) => {

        // events have changed in d3 v6:
        // https://observablehq.com/@d3/d3v6-migration-guide#events
        // const index = svg.selectAll(".bar").nodes().indexOf(event.currentTarget);

        svg
          .selectAll('.tooltip')
          .data([event])
          .join('text')
          .attr('class', 'tooltip')
          .attr("text-anchor", "middle")
          .text(value[1])
          .attr('x', xScale(value[0] as string) as number + (xScale.bandwidth() / 2))
          .style('transform', `translateY(${yScale(value[1] as number) - 6}px)`)
          .attr('text-anchor', 'middle')
          .transition()
          .attr('opacity', 1)
          .style('transform', `translateY(${yScale(value[1] as number) - 8}px)`);

      })
      .on('mouseleave', () => {
        svg.select('.tooltip').remove()
      })
      .transition()
      .attr('fill', (value) => colorScale(value[1] as number))
      .attr('height', (value) => 150 - yScale(value[1] as number))


  }, [axisData])

  console.log('axisData ->', axisData);

  return (
    <>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br/>
      <button onClick={() => {
        setAxisData((prevState) =>
          prevState.map((value) => [value[0], value[1] as number + 10]))
      }}>
        Update data
      </button>
      <button onClick={() => {
        setAxisData((prevState) => prevState.filter((value) => value[1] < 65))
      }}>
        Filter data
      </button>
      <button onClick={() => {
        if (+axisData[axisData.length - 1][0] < 12) {
          setAxisData((prevState) => {
            const round = Math.round(Math.random() * 100)
            const newValueMonth = +prevState[prevState.length - 1][0] + 1;
            return [...prevState, [newValueMonth < 10 ? `0${newValueMonth}` : String(newValueMonth), round]]
          })
        }
      }}>
        Add data
      </button>
    </>
  );
}

export default App;
