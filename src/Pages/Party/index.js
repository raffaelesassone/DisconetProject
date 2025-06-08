import React, { useState } from "react";
import { Typography, Row, Col, Button, Card, QRCode, Tag, Space } from "antd";

const { Title, Paragraph, Text } = Typography;

function Party() {
  const initialParties = [
    {
      title: "Electro Jungle @ Sala Trap",
      image: "./foto3.jpg",
      description: "Un viaggio sonoro tra ritmi tribali e bassi elettronici.",
      price: "10€",
      data: "07 Giugno 2025",
      orarioInizio: "22:00",
      orarioFine: "03:00",
      etaMinima: 18,
      isPast: false,
    },
    {
      title: "Neon Night - Techno fino all'alba",
      image: "./foto4.jpg",
      description: "Dress code fluo, energia pura e laser show.",
      price: "15€",
      data: "08 Giugno 2025",
      orarioInizio: "23:30",
      orarioFine: "05:00",
      etaMinima: 21,
      isPast: false,
    },
    {
      title: "Back to 2000s",
      image: "./foto2.jpg",
      description: "Hits anni 2000, outfit a tema e nostalgia pura.",
      price: "12€",
      data: "01 Giugno 2025",
      orarioInizio: "21:30",
      orarioFine: "01:00",
      etaMinima: 16,
      isPast: true,
    },
  ];

  const [parties, setParties] = useState(initialParties);
  const [acquisti, setAcquisti] = useState([]);
  const [qrcodeVisible, setQrcodeVisible] = useState(null);

  const acquistaBiglietto = (index) => {
    const party = parties[index];
    setAcquisti((prev) => [...prev, { ...party, id: Date.now() }]);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ color: "#722ed1", marginBottom: "24px" }}>
        Serate & Party
      </Title>
      <Paragraph style={{ marginBottom: 24 }}>
        Acquista i biglietti per le serate in programma e mostra il tuo QR code
        all'ingresso.
      </Paragraph>

      <Row gutter={[24, 24]}>
        {parties.map((party, index) => {
          const isDisabled = party.isPast;
          const isAcquistato = acquisti.find((a) => a.title === party.title);

          return (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable={!isDisabled}
                style={{
                  opacity: isDisabled ? 0.6 : 1,
                  filter: isDisabled ? "grayscale(40%) blur(0.5px)" : "none",
                }}
                cover={
                  <div style={{ height: 200, overflow: "hidden" }}>
                    <img
                      alt={party.title}
                      src={party.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                }
              >
                <Title level={5}>{party.title}</Title>
                <Paragraph style={{ fontSize: 13 }}>
                  {party.description}
                </Paragraph>
                <Text strong>Data:</Text> <Text>{party.data}</Text>
                <br />
                <Text strong>Inizio:</Text> <Text>{party.orarioInizio}</Text>
                <br />
                <Text strong>Fine:</Text> <Text>{party.orarioFine}</Text>
                <br />
                <Text strong>Età minima:</Text> <Text>{party.etaMinima}+</Text>
                <br />
                <Text strong>Prezzo:</Text> <Text>{party.price}</Text>
                <div style={{ marginTop: 12 }}>
                  {isDisabled ? (
                    <>
                      <Tag color="red">Party Terminato</Tag>
                      <Button disabled style={{ width: "100%", marginTop: 8 }}>
                        Acquista
                      </Button>
                    </>
                  ) : isAcquistato ? (
                    <>
                      <Tag color="green">Biglietto Acquistato</Tag>
                      <Button
                        type="primary"
                        onClick={() =>
                          setQrcodeVisible(
                            qrcodeVisible === party.title ? null : party.title,
                          )
                        }
                        style={{
                          backgroundColor: "#722ed1",
                          borderColor: "#722ed1",
                          width: "100%",
                          marginTop: 8,
                        }}
                      >
                        {qrcodeVisible === party.title
                          ? "Chiudi QR"
                          : "Mostra Codice QR"}
                      </Button>
                      {qrcodeVisible === party.title && (
                        <div style={{ marginTop: 16, textAlign: "center" }}>
                          <QRCode
                            value={`Biglietto per ${party.title} - ${party.data} - Inizio: ${party.orarioInizio}`}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <Button
                      type="primary"
                      style={{
                        width: "100%",
                        marginTop: 12,
                        backgroundColor: "#4b0082",
                        color: "white",
                      }}
                      onClick={() => acquistaBiglietto(index)}
                    >
                      Acquista
                    </Button>
                  )}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Party;
