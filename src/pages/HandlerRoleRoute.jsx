import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
import UserPage from "./UserPage";
import Dashboard from "./DashboardPage";

const ProtectedRoleRoute = () => {
  const { user } = useAppContext();
  if (user.role === "user") {
    return <UserPage/>
  }
  if(user.role === "admin"){
    return <Dashboard/>
  }
  return children;
};

export default ProtectedRoleRoute;