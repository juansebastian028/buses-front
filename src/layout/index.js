import React, { useState } from 'react';
import { Layout } from 'antd';
import { HeaderPage } from '../components/HeaderPage';
import { SiderMenu } from '../components/SiderMenu';

const { Content } = Layout;

export const BasicLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderMenu collapsed={collapsed} />
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
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
