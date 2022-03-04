import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BasicLayout } from '../layout';
import { BusRoute } from '../pages/BusRoute';
import { BusRoutes } from '../pages/BusRoutes';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Users } from '../pages/Users';
import { MyAccount } from '../pages/MyAccount';
import { MyFavoriteRoutes } from '../pages/MyFavoriteRoutes';
export const AppRouter = () => {
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
          exact
          element={
            <BasicLayout>
              <Users />
            </BasicLayout>
          }
        />
        <Route
          path="/bus-routes"
          exact
          element={
            <BasicLayout>
              <BusRoutes />
            </BasicLayout>
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
        <Route
          path="/login"
          exact
          element={
              <Login />
          }
        />
        <Route
          path="/my-account"
          exact
          element={
            <BasicLayout>
              <MyAccount />
            </BasicLayout>
          }
        />
        <Route
          path="/my-favorite-routes"
          exact
          element={
            <BasicLayout>
              <MyFavoriteRoutes />
            </BasicLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
