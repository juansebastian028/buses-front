import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

export const Home = ({ collapsed, toggle }) => {
  return (
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            style: { color: '#fff', fontSize: '1rem', margin: '1rem' },
            className: 'trigger',
            onClick: toggle,
          }
        )}
      </Header>
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
