import "chart.js/auto";
import { useState } from "react";
import { Chart } from "react-chartjs-2";

const LineChart = ({ location }: any) => {
  let locationProp = {
    labels: [
      "Public Order",
      "Traffic",
      "Domestic",
      "Property",
      "Substance",
      "Violent",
      "Environmental",
      "Financial",
      "Cyber",
      "Special",
      "Terrorism",
    ],
    datasets: [
      {
        label: "Incidents",
        data: [59, 150, 27, 23, 88, 38, 11, 21, 75, 12, 2],
      },
    ],
  };

  if (location === "burlington") {
    const data = {
      labels: [
        "Public Order",
        "Traffic",
        "Domestic",
        "Property",
        "Substance",
        "Violent",
        "Environmental",
        "Financial",
        "Cyber",
        "Special",
        "Terrorism",
      ],
      datasets: [
        {
          label: "Incidents",
          data: [59, 150, 27, 23, 88, 38, 11, 21, 75, 12, 2],
        },
      ],
    };
    locationProp = data;
  } else if (location === "oakville") {
    const data = {
      labels: [
        "Public Order",
        "Traffic",
        "Domestic",
        "Property",
        "Substance",
        "Violent",
        "Environmental",
        "Financial",
        "Cyber",
        "Special",
        "Terrorism",
      ],
      datasets: [
        {
          label: "Incidents",
          data: [57, 97, 33, 18, 94, 21, 19, 18, 44, 6, 1],
        },
      ],
    };
    locationProp = data;
  } else if (location === "milton") {
    const data = {
      labels: [
        "Public Order",
        "Traffic",
        "Domestic",
        "Property",
        "Substance",
        "Violent",
        "Environmental",
        "Financial",
        "Cyber",
        "Special",
        "Terrorism",
      ],
      datasets: [
        {
          label: "Incidents",
          data: [35, 78, 14, 8, 7, 22, 4, 21, 58, 14, 0],
        },
      ],
    };
    locationProp = data;
  } else if (location === "haltonHills") {
    const data = {
      labels: [
        "Public Order",
        "Traffic",
        "Domestic",
        "Property",
        "Substance",
        "Violent",
        "Environmental",
        "Financial",
        "Cyber",
        "Special",
        "Terrorism",
      ],
      datasets: [
        {
          label: "Incidents",
          data: [12, 55, 4, 2, 0, 7, 8, 9, 13, 5, 1],
        },
      ],
    };
    locationProp = data;
  }

  return (
    <Chart
      type="pie"
      data={locationProp}
      options={{
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      }}
    />
  );
};

export default LineChart;
