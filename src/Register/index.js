import {
  Button,
  Form,
  Input,
  Space,
  Typography,
  message,
  DatePicker,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function Register() {
  const navigate = useNavigate();

  const handleRegister = (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Le password non coincidono");
      return;
    }

    console.log("Registrazione:", values);
    message.success("Registrazione completata!");
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
            <Form onFinish={handleRegister} layout="vertical">
              <Typography.Title
                style={{
                  fontSize: "28px",
                  color: "white",
                  textShadow: "0 0 12px #4b0082, 0 0 20px #4b0082",
                  marginLeft: "18px",
                }}
              >
                Registrati alla Festa
              </Typography.Title>

              <Form.Item
                name="username"
                label={<span style={{ color: "white" }}>Username</span>}
                rules={[{ required: true, message: "Inserisci l'username" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label={<span style={{ color: "white" }}>Email</span>}
                rules={[{ required: true, message: "Inserisci l'email" }]}
              >
                <Input />
              </Form.Item>

              {/* Data di nascita */}
              <Form.Item
                name="birthDate"
                label={<span style={{ color: "white" }}>Data di nascita</span>}
                rules={[
                  { required: true, message: "Inserisci la data di nascita" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              {/* Sesso */}
              <Form.Item
                name="gender"
                label={<span style={{ color: "white" }}>Sesso</span>}
                rules={[{ required: true, message: "Seleziona il sesso" }]}
              >
                <Select placeholder="Seleziona il sesso">
                  <Option value="maschio">Maschio</Option>
                  <Option value="femmina">Femmina</Option>
                  <Option value="altro">Altro</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="password"
                label={<span style={{ color: "white" }}>Password</span>}
                rules={[{ required: true, message: "Inserisci la password" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label={
                  <span style={{ color: "white" }}>Conferma Password</span>
                }
                rules={[{ required: true, message: "Conferma la password" }]}
              >
                <Input.Password />
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
                Registrati
              </Button>

              <Typography.Paragraph
                style={{
                  marginTop: "40px",
                  color: "white",
                  marginLeft: "100px",
                }}
              >
                Hai già un account?{" "}
                <a
                  href="/"
                  style={{ color: "#4b0082", textDecoration: "underline" }}
                >
                  Accedi qui
                </a>
              </Typography.Paragraph>
            </Form>
          </Space>
        </div>
      </Space>
    </div>
  );
}

export default Register;
