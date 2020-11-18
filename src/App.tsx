import React, {useEffect, useRef, useState} from 'react';
import { select } from 'd3';

import './App.css';

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20])

  const svgRef = useRef<SVGSVGElement>(null!);

  useEffect(() => {
    const { current: svgCurrentRef } = svgRef;

    const svg = select(svgCurrentRef);
    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', value => value)
      .attr('cx', value => (value * 2))
      .attr('cy', value => (value * 2))
      .attr('stroke', 'red')

  }, [data])

  console.log('data ->', data);

  return (
    <>
      <svg ref={svgRef} />
      <br/>
      <button onClick={() => {
        setData((prevState) => prevState.map(value => (value + 5)))
      }}>
        Update data
      </button>
      <button onClick={() => {
        setData((prevState) => prevState.filter(value => (value < 35)))
      }}>
        Filter data
      </button>
    </>
  );
}

export default App;
