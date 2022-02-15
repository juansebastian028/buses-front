import React from 'react';
import { Layout, Avatar, Row, Col, Dropdown, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined } from '@ant-design/icons';

const { Header } = Layout;

export const HeaderPage = ({ collapsed, toggle }) => {
  const menu = (
    <Menu>
      <Menu.Item danger>Cerrar sesión</Menu.Item>
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
          xs={{ span: 8, offset: 8 }} lg={{ span: 2, offset: 18 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          
        >
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <div onClick={(e) => e.preventDefault()}>
              <Avatar
                style={{ backgroundColor: '#f56a00', verticalAlign: 'middle', cursor: 'pointer' }}
                size="large"
                gap={4}

              >
                U
              </Avatar>
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};
