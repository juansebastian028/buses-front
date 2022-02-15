import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { Home } from '../components/Home';
import { SiderMenu } from '../components/SiderMenu';
import { Users } from '../components/Users';
export const AppRouter = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);

  return (
      <BrowserRouter>
        <Layout style={{minHeight: '100vh'}}>
          <SiderMenu collapsed={collapsed}  />
          <Routes>
            <Route
              path="/"
              element={<Home collapsed={collapsed} toggle={toggle} />}
            />
            <Route
              path="users"
              element={<Users collapsed={collapsed} toggle={toggle} />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
  );
};
