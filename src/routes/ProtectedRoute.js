import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ isAllowed, children }) => {
  return isAllowed ? children : <Navigate replace to={"/login"} />;
};
