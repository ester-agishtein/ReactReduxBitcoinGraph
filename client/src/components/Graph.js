import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import "../App.css";
import { useSelector } from "react-redux";
const Graph = () => {
  const graphData = useSelector(state => state);

  useEffect(() => {
    if (typeof graphData.height == "object") {
      return;
    }
  }, []);

  const data = {
    labels: ["High", "Low", "Open", "Close"],
    datasets: [
      {
        label: "Bitcoin value",
        data: [
          Math.round(parseInt(graphData.high)),
          Math.round(parseInt(graphData.low)),
          Math.round(parseInt(graphData.open)),
          Math.round(parseInt(graphData.close))
        ],
        fill: false,
        backgroundColor: "gold",
        borderColor: "darkgray"
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return (
    <div id="Graph">
      <Line data={data} options={options} />
    </div>
  );
};

export default Graph;
