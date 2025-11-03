import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LayoutRoutes from "./LayoutRoutes";
import Login from "../Component/Vyapara/Authentication/Login/Login";
import { authRoutes } from "./AuthRoutes";
import { useAppSelector } from "../ReduxToolkit/Hooks";
// import Login from "../Component/Authentication/Login";

const RouterData = () => {
  // const login = localStorage.getItem("login");
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  return (
    <BrowserRouter basename={"/"}>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              path={`${process.env.PUBLIC_URL}` || '/'}
              element={
                <Navigate to={`${process.env.PUBLIC_URL}/dashboard`} />
              }
            />
          </>
        ) : (
          ""
        )}
        <Route path={"/"} element={<PrivateRoute />}> 
          <Route path={`/*`} element={<LayoutRoutes />} />
        </Route>
        {authRoutes.map(({ path, Component }, i) => (
          <Route path={path} element={Component} key={i} />
        ))}
        <Route path={`${process.env.PUBLIC_URL}/login`} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterData;
