"use client";

import s from "./styles.module.css";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { dataset } from "@/data/staticOverview";
import Chart from "chart.js/auto";
import LineChart from "./LineChart";


const Overview = () => {
  const [townOptions, setTownOptions] = useState("burlington");
  const chartRef = useRef(null)


  return (
    <div className={`${s.overviewContainer} wrapper`}>
      <div className={s.overviewContainerTasks}>
        <h2>List of tasks that need to be completed</h2>
      </div>
      <div className={s.overviewCrimeStats}>
        <h2>Number of incidents by jursidiction</h2>
        <div className={s.overviewCrimeStatsOptions}>
          <ToggleButtonGroup
            value={townOptions}
            exclusive
            onChange={(_, newValue) => setTownOptions(newValue)}
            aria-label="text alignment"
          >
            <ToggleButton value="burlington" aria-label="Burlington">
              Burlington
            </ToggleButton>
            <ToggleButton value="oakville" aria-label="Oakville">
              Oakville
            </ToggleButton>
            <ToggleButton value="milton" aria-label="Milton">
              Milton
            </ToggleButton>
            <ToggleButton value="haltonHills" aria-label="Halton Hills">
              Halton Hills
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className={s.overviewCrimeStatChart}>
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Overview;
