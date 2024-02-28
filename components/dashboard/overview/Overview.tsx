"use client";

import s from "./styles.module.css";
import {
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

import BarChart from "./BarChart";
import TaskHolder from "./TaskHolder";
import TaskCalendar from "./TaskCalendar";
import usePagination from "@/hooks/usePagination";
import { tasks } from "@/data/staticTasks";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Overview = () => {
  const [townOptions, setTownOptions] = useState("burlington");

  const {
    currentPage,
    currentItems,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination({ data: tasks, maxPerPage: 4 });
  return (
    <div className={`${s.overviewContainer} wrapper`}>
      <h2>Today`s Tasks</h2>
      <div className={s.taskContainerMain}>
        <div className={s.overviewContainerTasks}>
          {currentItems?.map((t, index) => {
            return (
              <TaskHolder
                key={"task" + index}
                type={t.type}
                status={t.status}
                time={t.time}
                description={t.description}
                notes={t.notes}
                location={t.location}
              />
            );
          })}
          <div className={s.taskPagination}>
            <IconButton onClick={() => prevPage()}>
              <ChevronLeftIcon />
            </IconButton>
            <p>{currentPage} of {totalPages}</p>
            <IconButton onClick={() => nextPage()}>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
        <TaskCalendar />
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
          <BarChart location={townOptions} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
