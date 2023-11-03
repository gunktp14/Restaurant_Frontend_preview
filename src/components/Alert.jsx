import { useAppContext } from "../context/appContext";

const Alert = () => {
  const {alertType,alertText} = useAppContext()
  return <div className={`alt alt-${alertType}`}>{alertText}</div>;
};

export default Alert;
