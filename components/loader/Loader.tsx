import s from "./styles.module.css";

interface LoaderProps {
  message?: string; // Optional message prop
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className={s.loaderContainer}>
      <div className={s.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h3>{message || "Loading"}</h3>
    </div>
  );
};

export default Loader;
