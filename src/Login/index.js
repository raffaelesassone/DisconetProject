import { Button, Divider, Form, Input, Space, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    message.success("Login effettuato");
    onLogin();
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to bottom right, #2a064d, #8e44ad, #5c3d99, #6dd5ed)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        overflow: "hidden",
        position: "relative",
        padding: "40px",
      }}
    >
      <style>
        {`
          @keyframes gradientBG {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }

          .ant-form-item-required::before {
            color: #4b0082 !important;
          }

          .disco-dot {
            position: absolute;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            background-color: rgba(255, 255, 255, 0.3);
            animation: blink 1.5s infinite ease-in-out alternate;
          }

          @keyframes blink {
            0% { opacity: 0.2; transform: scale(1); }
            100% { opacity: 1; transform: scale(1.5); }
          }
        `}
      </style>

      {[...Array(40)].map((_, i) => (
        <span
          key={i}
          className="disco-dot"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      <Space direction="horizontal" size={100} style={{ zIndex: 2 }}>
        <div style={{ display: "flex", justifyContent: "left" }}>
          <img
            src="/foto8.png"
            alt="Logo"
            style={{ width: 500, marginBottom: 24 }}
          />
        </div>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            padding: 32,
            borderRadius: 16,
          }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Form className="loginForm" onFinish={handleLogin}>
              <Typography.Title
                style={{
                  fontSize: "28px",
                  color: "white",
                  textShadow: "0 0 12px #4b0082, 0 0 20px #4b0082",
                  marginLeft: "18px",
                }}
              >
                Connettiti alla Festa
              </Typography.Title>

              <Form.Item
                colon={false}
                label={<span style={{ color: "white" }}>Username: </span>}
                name="username"
                rules={[{ required: true, message: "Inserisci l'username" }]}
              >
                <Input placeholder="email" />
              </Form.Item>

              <Form.Item
                colon={false}
                label={<span style={{ color: "white" }}>Password: </span>}
                name="password"
                rules={[{ required: true, message: "Inserisci la password" }]}
              >
                <Input.Password placeholder="password" />
              </Form.Item>

              <Button
                htmlType="submit"
                block
                style={{
                  backgroundColor: "#4b0082",
                  borderColor: "#4b0082",
                  color: "white",
                }}
              >
                Login
              </Button>

              <Typography.Paragraph
                style={{
                  marginTop: "40px",
                  color: "white",
                  marginLeft: "103px",
                }}
              >
                o registrati{" "}
                <a
                  href="/register"
                  style={{ color: "#4b0082", textDecoration: "underline" }}
                >
                  qui
                </a>
              </Typography.Paragraph>
            </Form>
          </Space>
        </div>
      </Space>
    </div>
  );
}

export default LoginPage;
