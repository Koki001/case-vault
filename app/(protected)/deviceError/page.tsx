import s from "./page.module.css"

const DeviceError = () => {
  return <div className={s.mobileRestrictedPage}>
    <h1>This application is not available on mobile devices</h1>
  </div>;
};
export default DeviceError;
