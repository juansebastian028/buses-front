import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

export const HeaderPage = ({ collapsed, toggle }) => {
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        style: { color: '#fff', fontSize: '1rem', margin: '1rem' },
        className: 'trigger',
        onClick: toggle,
      })}
    </Header>
  );
};
