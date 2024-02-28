"use client";

import { Button, Paper } from "@mui/material";
import { useNotificationStore } from "../../store/notificationSlice";
import s from "./styles.module.css";

// interface Notifcations {
//   isOpen?: boolean;
//   message: string;
// }

const Notifications = () => {
  const { setNotificationClose, message } = useNotificationStore(
    (state) => state
  );
  const notification = useNotificationStore((state) => state.isOpen);

  if (notification) {
    return (
      <div
        onClick={() => setNotificationClose(false)}
        className={s.notificationBackdrop}
      >
        <Paper
          elevation={3}
          onClick={(e) => e.stopPropagation()}
          className={`${s.notificationContainer} wrapper`}
        >
          <div className={s.notificationContent}>
            <p>{message}</p>
          </div>

          <Button
            variant="outlined"
            onClick={() => setNotificationClose(false)}
          >
            Ok
          </Button>
        </Paper>
      </div>
    );
  }
};
export default Notifications;
