import s from "./styles.module.css";

const Loader = () => {
  return (
    <div className={s.loaderContainer}>
      <div className={s.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <h3>Loading</h3>
      </div>
    </div>
  );
};
export default Loader;
