import React, { useState } from 'react';

import './App.css';
import BarChart from "./BarChart";

const value = [25, 30, 45, 60, 10, 65, 75];
const months = ['01', '02', '03', '04', '05', '06', '07'];

function App() {
  const [axisData, setAxisData] = useState<[string, number][]>(() => {
    return value.map((value, idx) => ([months[idx], value]))
  })

  return (
    <>
      <BarChart data={axisData} />
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
