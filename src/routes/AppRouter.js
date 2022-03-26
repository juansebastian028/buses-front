import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BasicLayout } from "../layout";
import { BusRoute } from "../pages/BusRoute";
import { BusRoutes } from "../pages/BusRoutes";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Users } from "../pages/Users";
import { MyAccount } from "../pages/MyAccount";
import { MyFavoriteRoutes } from "../pages/MyFavoriteRoutes";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./ProtectedRoute";
export const AppRouter = () => {
  const { currentUser, isLogged } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <BasicLayout>
              <Home />
            </BasicLayout>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={isLogged && currentUser.rol === "ADMIN_ROLE"}
            >
              <BasicLayout>
                <Users />
              </BasicLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bus-routes"
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={
                isLogged &&
                (currentUser.rol === "ADMIN_ROLE" || currentUser.rol === "COORDINATOR_ROLE")
              }
            >
              <BasicLayout>
                <BusRoutes />
              </BasicLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bus-route/:id"
          exact
          element={
            <BasicLayout>
              <BusRoute />
            </BasicLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/my-account"
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={
                isLogged &&
                (currentUser.rol === "ADMIN_ROLE" || currentUser.rol === "COORDINATOR_ROLE")
              }
            >
              <BasicLayout>
                <MyAccount />
              </BasicLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-favorite-routes"
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={
                isLogged &&
                (currentUser.rol === "USER_ROLE" || currentUser.rol === "ADMIN_ROLE" || currentUser.rol === "COORDINATOR_ROLE")
              }
            >
              <BasicLayout>
                <MyFavoriteRoutes />
              </BasicLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
