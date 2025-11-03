import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../ReduxToolkit/Hooks";

const PrivateRoute = () => {
  // const login = JSON.parse(localStorage.getItem("login")!) ? JSON.parse(localStorage.getItem("login")!) : false;
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? (
    <Outlet />
    ) : (
    <Navigate to={`${process.env.PUBLIC_URL}/login`} />
  );
};

export default PrivateRoute;
