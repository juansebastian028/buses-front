import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BasicLayout } from '../layout';
import { BusRoutes } from '../pages/BusRoutes';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Users } from '../pages/Users';
import { MyAccount } from '../pages/MyAccount';
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
      </Routes>
    </BrowserRouter>
  );
};
