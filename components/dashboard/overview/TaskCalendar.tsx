import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 

import s from "./styles.module.css"

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const TaskCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className={s.calendarContainer}>
      <Calendar className={s.calendarMain} minDetail="year"  onChange={onChange} value={value} />
    </div>
  );
};

export default TaskCalendar;
