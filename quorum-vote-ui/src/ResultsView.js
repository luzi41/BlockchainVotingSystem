import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const ResultsView = () => {
  const [results, setResults] = useState({});

  useEffect(() => {
    fetch("/results.json")
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error("Fehler beim Laden der Ergebnisse:", err));
  }, []);

  const chartData = {
    labels: Object.keys(results),
    datasets: [
      {
        label: "Stimmenanzahl",
        data: Object.values(results),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Wahlergebnis',
        font: { size: 20 },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <h2>📊 Wahlergebnisse</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ResultsView;
