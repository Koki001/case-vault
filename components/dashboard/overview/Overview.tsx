"use client";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import s from "./styles.module.css";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

import { dataset } from "@/data/staticOverview";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={s.customTooltip}>
        <p className="label">{`${payload[0].value} incidents`}</p>
      </div>
    );
  }

  return null;
};

const Overview = () => {

  const [townOptions, setTownOptions] = useState("burlington");
  console.log("lol");
  return (
    <div className={s.overviewContainer}>
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
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={730} height={250} data={dataset}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={townOptions} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
