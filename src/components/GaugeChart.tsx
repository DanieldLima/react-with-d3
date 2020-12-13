import React, {useEffect, useRef } from 'react';
import { select, arc, pie, interpolate } from "d3";

import { useResizeObserver } from "../hooks/useResizeObserver";


type GaugeChartProps = {
  data: number[]
}

const GaugeChart = ({data}: GaugeChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null!);
  const wrapperRef = useRef<HTMLDivElement>(null!);

  const rect = useResizeObserver(wrapperRef)

  useEffect(() => {
    const {current: svgCurrentRef} = svgRef;
    const svg = select(svgCurrentRef);

    const innerRadius = 75;
    const outerRadius = 150;

    if (!rect) return;

    const {width, height} = rect;

    const arcGenerator = arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)

    const pieGenerator = pie()
      .startAngle(-0.5 * Math.PI)
      .endAngle(0.5 * Math.PI)
      .sort(null);
    const instructions = pieGenerator(data);

    svg
      .selectAll('.slice')
      .data(instructions)
      .join('path')
      .attr('class', 'slice')
      .attr('fill', (_, idx) => (idx === 0 ? '#ffcc00' : '#eee'))
      .style('transform', `translate(${width / 2}px, ${height / 2}px)`)
      .transition()
      .attrTween('d', function (nextInstruction: any) {
        const interpolator = interpolate(this.lastInstruction, nextInstruction)
        this.lastInstruction = interpolator(1)

        return function (t: number) {
          return arcGenerator(interpolator(t))
        }
      } as any);


  }, [data, rect])

  return (
    <div ref={wrapperRef} className="chart-wrapper">
      <svg ref={svgRef} />
    </div>
  );
};

export default GaugeChart;