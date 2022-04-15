import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  CarOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const { Sider } = Layout;

export const SiderMenu = ({ collapsed }) => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="sm"
        collapsedWidth="0"
      >
        <div className="logo">
          Bus Soft
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          {currentUser.rol === "ADMIN_ROLE" && (
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/users">Usuarios</Link>
            </Menu.Item>
          )}
          {(currentUser.rol === "ADMIN_ROLE" ||
            currentUser.rol === "COORDINATOR_ROLE") && (
              <Menu.Item key="3" icon={<CarOutlined />}>
                <Link to="/bus-routes">Rutas de Buses</Link>
              </Menu.Item>
            )}
          {(currentUser.rol === "USER_ROLE" ||
            currentUser.rol === "ADMIN_ROLE" ||
            currentUser.rol === "COORDINATOR_ROLE") && (
              <Menu.Item key="4" icon={<StarOutlined />}>
                <Link to="/my-favorite-routes">Rutas Favoritas</Link>
              </Menu.Item>
            )}
        </Menu>
      </Sider>
    </>
  );
};
