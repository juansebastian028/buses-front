import React from 'react';
import { Layout, Table } from 'antd';
import { HeaderPage } from './HeaderPage';

const { Content } = Layout;

export const Users = ({ collapsed, toggle }) => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

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
        <Table dataSource={dataSource} columns={columns} />
      </Content>
    </Layout>
  );
};
