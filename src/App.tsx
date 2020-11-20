import React, {useEffect, useRef, useState} from 'react';
import { select, line, curveCardinal } from 'd3';

import './App.css';

function App() {
  const [data, setData] = useState<[number, number][]>([[0, 0], [50, 70], [100, 35], [150, 75], [200, 30], [250, 120], [300, 90]])

  const svgRef = useRef<SVGSVGElement>(null!);

  useEffect(() => {
    const { current: svgCurrentRef } = svgRef;

    const svg = select(svgCurrentRef);
    const pathLine = line().curve(curveCardinal.tension(0))
      .x((value, idx) => value[0])
      .y((value, idx) => 150 - value[1])

    svg
      .selectAll('path')
      .data([data])
      .join('path')
      .attr('d', (value) => pathLine(value))
      .attr('fill', 'none')
      .attr('stroke', 'blue')

  }, [data])

  console.log('data ->', data);

  return (
    <>
      <svg ref={svgRef} />
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
