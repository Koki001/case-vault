import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const LineChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales foor 2020 (M)",
        data: [3, 2, 2, 3, 5],
      },
    ],
  };
  return <Chart type="bar" data={data} options={{responsive: true, maintainAspectRatio: true}} />;
};

export default LineChart;
