import React, {useEffect, useRef } from 'react';
import { select, min, max, scaleTime, scaleLinear, axisBottom } from "d3";

import { useResizeObserver } from "../hooks/useResizeObserver";
import { BBTimelineEpisode } from "../types";
import {getDate} from "../utils/getDate";

type BBTimelineProps = {
  data: BBTimelineEpisode[],
  highlight: string,
}

const BBTimeline = ({ data, highlight }: BBTimelineProps) => {
  const svgRef = useRef<SVGSVGElement>(null!);
  const svgGRef = useRef<SVGGElement>(null!);
  const wrapperRef = useRef<HTMLDivElement>(null!);

  const rect = useResizeObserver(wrapperRef)

  useEffect(() => {
    const svg = select(svgRef.current);
    const svgG = select(svgGRef.current);

    if (!rect) return;

    const {width, height} = rect;

    const minData = min(data, (episode) => getDate(episode.air_date))
    const maxData = max(data, (episode) => getDate(episode.air_date))


    const xScale = scaleTime()
      .domain([minData as Date, maxData as Date])
      .range([0, width])

    const yScale = scaleLinear()
      .domain([max(data, (episode) => episode.characters.length) as number, 0])
      .range([0, height])

    const xAxis = axisBottom(xScale)

    // Timeline axis
    svgG
      .style('transform', `translateY(${height}px)`)
      .call(xAxis);

    // Lines episodes
    svg
      .selectAll('.episode')
      .data(data)
      .join('line')
      .attr('class', 'episode')
      .attr('stroke', (episode) => episode.characters.includes(highlight) ? 'blue' : 'black')
      .attr('x1', (episode) => xScale(getDate(episode.air_date)))
      .attr('y1', height)
      .attr('x2', (episode) => xScale(getDate(episode.air_date)))
      .attr('y2', (episode) => yScale(episode.characters.length));


  }, [data, rect, highlight])

  return (
    <div ref={wrapperRef} className="chart-wrapper">
      <svg ref={svgRef}>
         <g ref={svgGRef} className="x-axis" />
      </svg>
    </div>
  );
};

export default BBTimeline;
