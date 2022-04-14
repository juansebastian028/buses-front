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
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { currentUser, isLogged } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
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
              isAllowed={!!isLogged && currentUser.rol === "ADMIN_ROLE"}
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
              isAllowed={
                !!isLogged &&
                (currentUser.rol === "ADMIN_ROLE" ||
                  currentUser.rol === "COORDINATOR_ROLE")
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
          element={
            <BasicLayout>
              <BusRoute />
            </BasicLayout>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute isAllowed={!!isLogged}>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/my-account"
          element={
            <ProtectedRoute
              isAllowed={
                !!isLogged &&
                (currentUser.rol === "ADMIN_ROLE" ||
                  currentUser.rol === "COORDINATOR_ROLE")
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
              isAllowed={
                !!isLogged &&
                (currentUser.rol === "USER_ROLE" ||
                  currentUser.rol === "ADMIN_ROLE" ||
                  currentUser.rol === "COORDINATOR_ROLE")
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
