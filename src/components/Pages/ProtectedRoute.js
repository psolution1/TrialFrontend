import React, { useEffect, useState } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Login from "../Login";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const [isLogined, setIsLogined] = useState(false);
  const isTokenPresent = () => {
    if (localStorage.getItem("token")) {
      return true;
    } else return false;
  };

  useEffect(() => {
    const tokenPresent = isTokenPresent();
    if (tokenPresent) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, []);
  //console.log(lo.path)
  // if (lo.login) {
  //   return <Routes>  <Route path={lo.path} element={lo.Commponent} /></Routes>;
  // } else {
  //   return <Navigate to="/" />;
  // }
};

export default ProtectedRoute;
