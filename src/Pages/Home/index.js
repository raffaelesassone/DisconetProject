import React, { useState } from "react";
import { Typography, Row, Col, Button, Card, Tag, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

function Home() {
  const navigate = useNavigate();

  const initialEventi = [
    {
      title: "Gara di Limbo alla Sala Trap",
      image: "./foto7.jpeg",
      isPast: false,
      description:
        "Sfida i tuoi amici in una gara di limbo con DJ set dal vivo!",
      postiDisponibili: 25,
      orarioInizio: "22:00",
      chiusuraIscrizioni: "21:30",
      sala: "Sala Trap",
    },
    {
      title: "Silent Disco nel giardino urbano",
      image: "./foto6.jpg",
      isPast: false,
      description: "Tre canali musicali per ballare in cuffia sotto le stelle.",
      postiDisponibili: 50,
      orarioInizio: "23:00",
      chiusuraIscrizioni: "22:30",
      sala: "Giardino Esterno",
    },
    {
      title: "Notte Drag Queen – Show imperdibile",
      image: "./foto5.jpg",
      isPast: true,
      description:
        "Uno spettacolo esplosivo con le migliori Drag Queen della città.",
      postiDisponibili: 0,
      orarioInizio: "21:00",
      chiusuraIscrizioni: "20:30",
      sala: "Sala Grande",
    },
    {
      title: "Party 80s – Revival Edition",
      image: "./foto1.jpeg",
      isPast: true,
      description:
        "Tutti i successi anni '80 in una serata a tema con dress code!",
      postiDisponibili: 35,
      orarioInizio: "22:00",
      chiusuraIscrizioni: "19:00",
      sala: "Sala Retrò",
    },
  ];

  const [eventi, setEventi] = useState(initialEventi);
  const [partecipazioni, setPartecipazioni] = useState({});
  const [eventoSelezionato, setEventoSelezionato] = useState(null);

  const handlePartecipa = (index) => {
    setPartecipazioni((prev) => ({ ...prev, [index]: true }));
    setEventi((prevEventi) =>
      prevEventi.map((evento, i) =>
        i === index
          ? { ...evento, postiDisponibili: evento.postiDisponibili - 1 }
          : evento,
      ),
    );
  };

  const handleDisiscrizione = (index) => {
    setPartecipazioni((prev) => {
      const newPartecipazioni = { ...prev };
      delete newPartecipazioni[index];
      return newPartecipazioni;
    });

    setEventi((prevEventi) =>
      prevEventi.map((evento, i) =>
        i === index
          ? { ...evento, postiDisponibili: evento.postiDisponibili + 1 }
          : evento,
      ),
    );
  };

  const apriDettagliEvento = (evento, index) => {
    setEventoSelezionato({ ...evento, index });
  };

  const chiudiModal = () => {
    setEventoSelezionato(null);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ color: "#722ed1", marginBottom: "24px" }}>
        Scopri gli Eventi
      </Title>

      <Row gutter={[24, 24]}>
        {eventi.map((evento, index) => {
          const isPartecipato = partecipazioni[index];

          return (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable={!evento.isPast}
                style={{
                  opacity: evento.isPast ? 0.6 : 1,
                  filter: evento.isPast ? "grayscale(30%) blur(0.5px)" : "none",
                }}
                cover={
                  <div
                    style={{
                      height: 200,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      alt={evento.title}
                      src={evento.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {evento.isPast && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0, 0, 0, 0.3)",
                        }}
                      />
                    )}
                  </div>
                }
              >
                <Title level={5} style={{ marginBottom: 8 }}>
                  {evento.title}
                </Title>
                <Paragraph style={{ marginBottom: 4, fontSize: 13 }}>
                  {evento.description}
                </Paragraph>
                <Button
                  type="default"
                  block
                  style={{ marginTop: 12 }}
                  onClick={() => apriDettagliEvento(evento, index)}
                >
                  Vedi Dettagli
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Modal
        open={!!eventoSelezionato}
        onCancel={chiudiModal}
        footer={null}
        title={eventoSelezionato?.title}
      >
        {eventoSelezionato && (
          <div>
            <img
              src={eventoSelezionato.image}
              alt={eventoSelezionato.title}
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                marginBottom: 16,
              }}
            />
            <Paragraph>{eventoSelezionato.description}</Paragraph>
            <Text strong>Posti disponibili:</Text>{" "}
            <Text>{eventoSelezionato.postiDisponibili}</Text>
            <br />
            <Text strong>Inizio:</Text>{" "}
            <Text>{eventoSelezionato.orarioInizio}</Text>
            <br />
            <Text strong>Chiusura iscrizioni:</Text>{" "}
            <Text>{eventoSelezionato.chiusuraIscrizioni}</Text>
            <br />
            <Text strong>Sala:</Text> <Text>{eventoSelezionato.sala}</Text>
            <div style={{ marginTop: 16 }}>
              {eventoSelezionato.isPast ? (
                <>
                  <Tag color="red">Iscrizioni chiuse</Tag>
                  <Button disabled block style={{ marginTop: 8 }}>
                    Partecipa
                  </Button>
                </>
              ) : partecipazioni[eventoSelezionato.index] ? (
                <>
                  <Tag color="green">Sei in lista</Tag>
                  <Button
                    danger
                    block
                    style={{ marginTop: 8 }}
                    onClick={() => {
                      handleDisiscrizione(eventoSelezionato.index);
                      chiudiModal();
                    }}
                  >
                    Disiscriviti
                  </Button>
                </>
              ) : (
                <Button
                  type="primary"
                  block
                  style={{
                    marginTop: 12,
                    backgroundColor: "#4b0082",
                    color: "white",
                  }}
                  onClick={() => {
                    handlePartecipa(eventoSelezionato.index);
                    chiudiModal();
                  }}
                >
                  Partecipa
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Home;
