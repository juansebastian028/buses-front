import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Avatar, Row, Col, Dropdown, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, logout } from "../actions/auth";

const { Header } = Layout;

const clientId =
  "213212265011-0b7u593p6c765ddorrrdekocuuv1u4fd.apps.googleusercontent.com";

export const HeaderPage = ({ collapsed, toggle }) => {
  const { isLogged, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    dispatch(logout(navigate));
  };

  const handleGoogleLogin = (res) => {
    dispatch(googleLogin({ tokenId: res.tokenId }, navigate));
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  const menu = (
    <Menu>
      {(currentUser.rol === "ADMIN_ROLE" ||
        currentUser.rol === "COORDINATOR_ROLE") && (
        <Menu.Item key={1}>
          <Link to="/my-account">Mi cuenta</Link>
        </Menu.Item>
      )}
      {(currentUser.rol === "ADMIN_ROLE" ||
        currentUser.rol === "COORDINATOR_ROLE") && (
        <Menu.Item key={2} danger onClick={signOut}>
          Cerrar Sesión
        </Menu.Item>
      )}
      {!isLogged && (
        <Menu.Item key={3}>
          <GoogleLogin
            clientId={clientId}
            buttonText="Iniciar Sesión"
            onSuccess={handleGoogleLogin}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            style={{ marginTop: "100px" }}
            isSignedIn={true}
          />
        </Menu.Item>
      )}
      {currentUser.rol === "USER_ROLE" && (
        <Menu.Item key={4}>
          <GoogleLogout
            clientId={clientId}
            buttonText="Cerrar Sesión"
            onLogoutSuccess={signOut}
          />
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Row justify="space-around">
        <Col xs={{ span: 8 }} lg={{ span: 2 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              style: { color: "#fff", fontSize: "1rem", margin: "1rem" },
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Col>
        <Col
          span={2}
          xs={{ span: 8, offset: 8 }}
          lg={{ span: 2, offset: 18 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <div onClick={(e) => e.preventDefault()}>
              <Avatar
                style={{
                  cursor: "pointer",
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
