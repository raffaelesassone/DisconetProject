import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  List,
  Avatar,
  Card,
  Row,
  Col,
  Input,
  Empty,
  Button,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Search, TextArea } = Input;

const users = [
  { id: 1, name: "Rossix4", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 2, name: "Verdone", avatar: "https://i.pravatar.cc/150?img=8" },
  {
    id: 3,
    name: "FrancescaB",
    avatar: "https://i.pravatar.cc/150?img=10",
  },
];

// Utente fisso con cui scrivi
const fixedUser = {
  id: 99,
  name: "Bellinelli86",
  avatar: "/foto9.jpg", // sostituisci con il tuo URL o percorso immagine reale
};

function ChatGlobale() {
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([
    { userId: 1, text: "Ciao a tutti!" },
    { userId: 2, text: "Benvenuti nella chat globale!" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll automatico in fondo alla chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filtra utenti per ricerca (solo visualizzazione)
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [
      ...prev,
      { userId: fixedUser.id, text: inputValue },
    ]);
    setInputValue("");
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ color: "#722ed1", marginBottom: 12 }}>
        Chat Globale
      </Title>
      <Paragraph style={{ marginBottom: 24 }}>
        Chatta con tutti gli utenti presenti.
      </Paragraph>

      {/* Barra ricerca */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Search
            placeholder="Cerca un utente..."
            allowClear
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: 400 }}
            enterButton={<SearchOutlined style={{ color: "white" }} />}
            enterButtonProps={{
              style: {
                backgroundColor: "#722ed1", // viola
                borderColor: "#722ed1",
              },
            }}
          />
        </Col>
      </Row>

      {/* Utenti filtrati */}
      {searchTerm.trim() !== "" && (
        <div style={{ marginBottom: 24 }}>
          <Text strong>Utenti trovati:</Text>
          {filteredUsers.length === 0 ? (
            <Text type="secondary" style={{ marginLeft: 8 }}>
              Nessun utente trovato
            </Text>
          ) : (
            filteredUsers.map((u) => (
              <Button
                key={u.id}
                type="default"
                style={{
                  margin: "0 8px 8px 0",
                  pointerEvents: "none",
                  cursor: "default",
                  marginLeft: "10px",
                }}
                icon={<Avatar size="small" src={u.avatar} />}
              >
                {u.name}
              </Button>
            ))
          )}
        </div>
      )}

      {/* Lista messaggi */}
      <div
        style={{
          maxHeight: 300,
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: 12,
          borderRadius: 8,
          backgroundColor: "#fafafa",
          marginBottom: 16,
        }}
      >
        {messages.length === 0 ? (
          <Empty description="Nessun messaggio" />
        ) : (
          messages.map((msg, i) => {
            const user =
              msg.userId === fixedUser.id
                ? fixedUser
                : users.find((u) => u.id === msg.userId);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  marginBottom: 8,
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Avatar size={32} src={user?.avatar} />
                <div>
                  <Text strong style={{ color: "#722ed1" }}>
                    {user?.name}
                  </Text>
                  <div>{msg.text}</div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input messaggio */}
      <TextArea
        rows={3}
        placeholder="Scrivi un messaggio..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={(e) => {
          if (!e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        style={{ marginBottom: 12 }}
      />
      <Button
        type="primary"
        onClick={handleSend}
        style={{
          backgroundColor: "#4b0082",
          borderColor: "#4b0082",
          color: "white",
        }}
      >
        Invia
      </Button>
    </div>
  );
}

export default ChatGlobale;
