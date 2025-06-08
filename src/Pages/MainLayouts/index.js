import { Layout, Menu, Typography, Button, message, Grid } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

function MainLayout({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();

  const handleLogout = () => {
    message.info("Sei stato disconnesso.");
    localStorage.removeItem("isAuthenticated");
    onLogout();
    navigate("/login");
  };

  const currentKey =
    location.pathname === "/" ? "/" : location.pathname.toLowerCase();

  const lightPurple = "#b19cd9";
  const darkPurple = "#4b0082";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          backgroundColor: darkPurple,
        }}
      >
        {/* LOGO + Disconet */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexDirection: screens.xs ? "column" : "row",
            textAlign: screens.xs ? "center" : "left",
          }}
        >
          <div style={{ filter: "drop-shadow(0 0 6px white)" }}>
            <img src="/foto8.png" alt="Logo" style={{ height: 60 }} />
          </div>
          <Title
            level={3}
            style={{
              color: "white",
              margin: 0,
              cursor: "default",
              fontSize: screens.xs ? 20 : 32,
              textAlign: screens.xs ? "center" : "left",
            }}
            className="disconet-title"
          >
            Disconet
          </Title>
        </div>

        {/* MENU + LOGOUT */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[currentKey]}
            onClick={({ key }) => navigate(key)}
            items={[
              { key: "/", label: "Home" },
              { key: "/drink", label: "Drink" },
              { key: "/chat", label: "Chat" },
              { key: "/profilo", label: "Profilo" },
              { key: "/party", label: "Party" },
            ]}
            style={{
              backgroundColor: "transparent",
            }}
            className="custom-menu"
          />

          <Button
            type="primary"
            danger
            onClick={handleLogout}
            className="custom-logout"
            style={{ backgroundColor: "black", color: "white" }}
          >
            Logout
          </Button>
        </div>

        {/* GLOW e STILI */}
        <style>{`
          .disconet-title:hover {
            text-shadow:
              0 0 8px rgba(255, 255, 255, 0.8),
              0 0 15px rgba(255, 255, 255, 0.6),
              0 0 20px rgba(255, 255, 255, 0.4);
          }

          .custom-menu .ant-menu-item {
            color: ${lightPurple} !important;
            transition: color 0.3s ease;
            margin-right: 6px;
          }

          .custom-menu .ant-menu-item-selected {
            color: white !important;
            font-weight: 600;
            text-shadow:
              0 0 8px rgba(255, 255, 255, 0.8),
              0 0 15px rgba(255, 255, 255, 0.6),
              0 0 20px rgba(255, 255, 255, 0.4);
            background-color: transparent !important;
          }

          .custom-menu .ant-menu-item:hover {
            color: #d6caff !important;
            background-color: transparent !important;
          }

          .custom-logout {
            background-color: ${darkPurple};
            border-color: ${darkPurple};
            color: white;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: none;
          }

          .custom-logout:hover,
          .custom-logout:focus {
            background-color: ${darkPurple};
            color: white;
            text-shadow:
              0 0 8px rgba(255, 255, 255, 0.8),
              0 0 15px rgba(255, 255, 255, 0.6),
              0 0 20px rgba(255, 255, 255, 0.4);
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
          }
        `}</style>
      </Header>

      <Content style={{ padding: "50px" }}>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Disconet ©2025 gruppo 7: Colliva, Sassone, Savino ❤
      </Footer>
    </Layout>
  );
}

export default MainLayout;
