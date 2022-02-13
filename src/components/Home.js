import React from 'react';
import { Layout } from 'antd';
import { HeaderPage } from './HeaderPage';

const { Content } = Layout;

export const Home = ({ collapsed, toggle }) => {
  return (
    <Layout className="site-layout">
      <HeaderPage collapsed={collapsed} toggle={toggle} />
      <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <h1>Home</h1>
      </Content>
    </Layout>
  );
};
