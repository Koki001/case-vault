import { Paper } from "@mui/material";
import s from "./styles.module.css";

interface TaskProps {
  type: string;
  status: string;
  time: string;
  description: string;
  notes?: string | null;
  location: string;
}

const TaskHolder: React.FC<TaskProps> = ({
  type,
  status,
  time,
  description,
  notes,
  location,
}) => {
  return (
    <Paper elevation={3} className={s.taskCard}>
      <div className={s.taskCardHeading}>
        <div className={s.taskCardHeadingLeft}>
          <h3>{type}</h3>
          <span>{status}</span>
        </div>
        <p>{time}</p>
      </div>
      <div className={s.taskCardContent}>
        <div className={s.taskCardContentLeft}>
          <p>{description}</p>
          {notes && <p>{notes}</p>}
        </div>
        <p>{location}</p>
      </div>
    </Paper>
  );
};
export default TaskHolder;
