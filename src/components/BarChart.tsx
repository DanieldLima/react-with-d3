import React, {useEffect, useRef } from 'react';
import {axisBottom, axisRight, scaleBand, scaleLinear, select} from "d3";
import { useResizeObserver } from "../hooks/useResizeObserver";


type BarChartProps = {
  data: [xAxisData: string, yAxisData: number][]
}

const BarChart = ({ data }: BarChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null!);
  const xAxisRef = useRef<SVGGElement>(null!);
  const yAxisRef = useRef<SVGGElement>(null!);
  const wrapperRef = useRef<HTMLDivElement>(null!);

  const rect = useResizeObserver(wrapperRef)

  useEffect(() => {
    const svg = select(svgRef.current);
    const xAxisSVGG = select(xAxisRef.current);
    const yAxisSVGG = select(yAxisRef.current);

    if (!rect) return;

    const domainXData = data.map((value) => value[0])
    const { width, height } = rect;

    const xScale = scaleBand()
      .range([0, width])
      .domain(domainXData as string[])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([height, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, height])
      .range(['green', 'orange', 'red'] as any)
      .clamp(true);


    const xAxisBottom = axisBottom(xScale)
      .ticks(data.length)

    xAxisSVGG
      .style('transform', `translateY(${height}px)`)
      .call(xAxisBottom)

    yAxisSVGG
      .style('transform', `translateX(${width}px)`)
      .call(axisRight(yScale))

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1, -1)')
      .attr('x', (value) => xScale(value[0] as string) as number)
      .attr('y', -height)
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
      .attr('height', (value) => height - yScale(value[1] as number))


  }, [data, rect])

  return (
    <div ref={wrapperRef} className="chart-wrapper">
      <svg ref={svgRef}>
        <g ref={xAxisRef} className="x-axis" />
        <g ref={yAxisRef} className="y-axis" />
      </svg>
    </div>
  );
};

export default BarChart;