import React, {useEffect, useRef, useState} from 'react';
import ml5 from 'ml5'

import { useInterval } from "../hooks/useInterval";

import GaugeChart from "../components/GaugeChart";

let classifier: typeof ml5;

const GaugeChartPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const [gaugeData, setGaugeData] = useState([0.5, 0.5]);
  const [shouldClassify, setShouldClassify] = useState(false);

  useEffect(() => {
    classifier = ml5.imageClassifier('./my-model/model.json', () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        });
    });
  }, [])

  useInterval(() => {
    if (classifier && shouldClassify) {
      classifier.classify(videoRef.current, (error: any, results: { label?: any; confidence?: any; }[]) => {
        if (error) {
          console.log('error ->', error);
          return;
        }

        results.sort((a, b) => a.label.localeCompare(b.label));
        setGaugeData(results.map((entry) => entry.confidence))
      })
    }
  }, 500)

  return (
    <div className="app__gauge-chart-page">
      <small>
        [{gaugeData[0].toFixed(2)}, {gaugeData[1].toFixed(2)}]
      </small>

      <GaugeChart data={gaugeData} />

      <div className="app__gauge-chart-page__buttons flex flex-center">
        <button onClick={() => setShouldClassify(prevState => !prevState)}>
          {shouldClassify ? 'Stop classifying' : 'Start classifying'}
        </button>
      </div>

      <video
        ref={videoRef}
        style={{ transform: 'scale(-1, 1' }}
        width={300}
        height={150}
      />
    </div>
  );
};

export default GaugeChartPage;