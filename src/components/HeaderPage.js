import React from 'react';
import { Link, } from 'react-router-dom';
import { Layout, Avatar, Row, Col, Dropdown, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import MyAccount from '../pages/MyAccount';

const { Header } = Layout;

export const HeaderPage = ({ collapsed, toggle }) => {
  const menu = (
    <Menu>
      <Menu.Item key={1}>
        <Link to="/my-account">Mi cuenta</Link>
      </Menu.Item>
      <Menu.Item key={2} danger>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Row justify="space-around">
        <Col xs={{ span: 8 }} lg={{ span: 2 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              style: { color: '#fff', fontSize: '1rem', margin: '1rem' },
              className: 'trigger',
              onClick: toggle,
            }
          )}
        </Col>
        <Col
          span={2}
          xs={{ span: 8, offset: 8 }}
          lg={{ span: 2, offset: 18 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <div onClick={(e) => e.preventDefault()}>
              <Avatar
                style={{
                  cursor: 'pointer',
                }}
                size="large"
                gap={4}
                icon={<UserOutlined />}
              />
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};
