import React from "react";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ isAllowed, children }) => {
  return isAllowed ? <Navigate replace to={"/"} /> : children;
};
