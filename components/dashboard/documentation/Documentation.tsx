import { Button } from "@mui/material";
import s from "./styles.module.css";

const Documentation = () => {
  return (
    <div className={`${s.documentationContainer} wrapper`}>
      <h2>Support and Documentation</h2>
      <Button>Go to documentation</Button>
      <div className={s.supportSection}>
        <h3>support</h3>
        <h4>Frequently asked questions</h4>
        <ul>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
        </ul>
        <h4>Contact Information</h4>
      </div>
      <div className={s.documentationSection}>
        <h3>documentation</h3>
        <p>case guidelines</p>
        <p>evidence best practices</p>
        <p>storage rules</p>
        <p>tracking policy</p>
      </div>
    </div>
  );
};
export default Documentation;
