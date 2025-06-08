import React, { useState } from "react";
import {
  Typography,
  List,
  Row,
  Col,
  Image,
  Button,
  Space,
  Modal,
  Divider,
  message,
} from "antd";
import { QRCode } from "antd";

const { Title, Paragraph } = Typography;

const drinks = [
  {
    name: "Mojito",
    price: 8,
    alcoholContent: 13,
    description:
      "Un cocktail rinfrescante cubano a base di rum bianco, lime, zucchero di canna, menta fresca e soda. Perfetto per le giornate estive.",
  },
  {
    name: "Negroni",
    price: 12,
    alcoholContent: 24,
    description:
      "Classico italiano composto da gin, vermut rosso e bitter Campari. Dal gusto forte e amaro, ideale come aperitivo.",
  },
  {
    name: "Martini",
    price: 10,
    alcoholContent: 28,
    description:
      "Un'icona dell'eleganza: gin e vermut dry mescolati e serviti con oliva o scorza di limone. Secco e deciso.",
  },
  {
    name: "Spritz",
    price: 5,
    alcoholContent: 8,
    description:
      "Aperitivo leggero e frizzante a base di Aperol o Campari, prosecco e soda. Originario del Veneto, molto popolare in Italia.",
  },
  {
    name: "Gin Tonic",
    price: 8,
    alcoholContent: 14,
    description:
      "Semplice ma intramontabile, composto da gin e acqua tonica. Fresco, aromatico, con note amarognole.",
  },
  {
    name: "Whiskey Sour",
    price: 10,
    alcoholContent: 18,
    description:
      "Un mix equilibrato di whiskey, succo di limone fresco e zucchero. Talvolta arricchito con albume d’uovo per una texture vellutata.",
  },
];

function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [carrello, setCarrello] = useState([]);
  const [ordini, setOrdini] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [visibleQRs, setVisibleQRs] = useState({});
  const [ticketModalVisible, setTicketModalVisible] = useState(false);

  const handleBuy = (drink) => {
    setSelectedDrink(drink);
    setModalVisible(true);
  };

  const modificaQuantita = (delta) => {
    setCarrello((prev) => {
      const index = prev.findIndex((item) => item.name === selectedDrink.name);
      if (index !== -1) {
        const newCart = [...prev];
        const newQuantity = newCart[index].quantity + delta;
        if (newQuantity <= 0) newCart.splice(index, 1);
        else newCart[index].quantity = newQuantity;
        return newCart;
      } else if (delta > 0) {
        return [...prev, { ...selectedDrink, quantity: 1 }];
      }
      return prev;
    });
  };

  const totale = carrello.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const getQuantitaSelezionata = () => {
    const drink = carrello.find((item) => item.name === selectedDrink?.name);
    return drink?.quantity || 0;
  };

  const confermaAcquisto = () => {
    if (carrello.length === 0) {
      message.warning("Il carrello è vuoto.");
      return;
    }
    const ordiniConQuantità = carrello.flatMap((item) =>
      Array(item.quantity).fill({
        name: item.name,
        price: item.price,
      }),
    );
    setOrdini((prev) => [...prev, ...ordiniConQuantità]);
    setCarrello([]);
    setModalVisible(false);
    message.success("Acquisto effettuato con successo!");
  };

  const generaQR = (index) => {
    const randomCode = `drink-ticket-${index}-${Math.random().toString(36).substr(2, 9)}`;
    setVisibleQRs((prev) => ({ ...prev, [index]: randomCode }));
  };

  return (
    <>
      <Title>Drink</Title>
      <Paragraph>
        Ecco il Menù dei nostri Drink, scegli il tuo preferito!
      </Paragraph>

      <Row gutter={24}>
        <Col xs={24} md={12}>
          <List
            header={<strong>Lista dei Drink</strong>}
            bordered
            dataSource={drinks}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#4b0082" }}
                    onClick={() => handleBuy(item)}
                  >
                    Ordina
                  </Button>,
                ]}
              >
                <Space direction="vertical" size={0}>
                  <div style={{ fontWeight: "bold" }}>{item.name}</div>
                  <div style={{ color: "#4b0082" }}>Prezzo: €{item.price}</div>
                  <div>Gradazione: {item.alcoholContent}%</div>
                  <div>{item.description}</div>
                </Space>
              </List.Item>
            )}
          />
        </Col>
        <Col xs={24} md={12}>
          <Image
            width="100%"
            src="./foto11.png"
            alt="Drink"
            style={{ borderRadius: 8 }}
          />
        </Col>
      </Row>

      <Modal
        open={modalVisible}
        title={selectedDrink?.name}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Paragraph>{selectedDrink?.description}</Paragraph>
        <Paragraph>Prezzo: €{selectedDrink?.price}</Paragraph>
        <Paragraph>Gradazione: {selectedDrink?.alcoholContent}%</Paragraph>
        <Paragraph>Quantità selezionata: {getQuantitaSelezionata()}</Paragraph>
        <Space style={{ marginBottom: 20 }}>
          <Button onClick={() => modificaQuantita(-1)}>-</Button>
          <Button onClick={() => modificaQuantita(1)}>+</Button>
        </Space>
        <Divider />
        <Paragraph>
          <strong>Totale:</strong> €{totale}
        </Paragraph>
        <Button
          type="primary"
          style={{ backgroundColor: "#4b0082", color: "white" }}
          onClick={confermaAcquisto}
        >
          Acquista
        </Button>
      </Modal>

      <Divider />
      <Button
        type="primary"
        style={{ backgroundColor: "#4b0082", marginBottom: 16 }}
        onClick={() => setTicketModalVisible(true)}
      >
        Mostra i miei ticket
      </Button>

      <Modal
        open={ticketModalVisible}
        title="I miei Ticket"
        footer={null}
        onCancel={() => setTicketModalVisible(false)}
      >
        <List
          bordered
          dataSource={ordini}
          renderItem={(item, index) => (
            <List.Item>
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    {item.name} - €{item.price}
                  </span>
                  {!visibleQRs[index] && (
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#4b0082", color: "white" }}
                      onClick={() => generaQR(index)}
                    >
                      Usa Ticket
                    </Button>
                  )}
                </div>
                {visibleQRs[index] && (
                  <div style={{ marginTop: 10 }}>
                    <QRCode value={visibleQRs[index]} />
                    <div style={{ marginTop: 8 }}>
                      <Button
                        type="default"
                        style={{ backgroundColor: "#4b0082", color: "white" }}
                        onClick={() => {
                          const updated = { ...visibleQRs };
                          delete updated[index];
                          setVisibleQRs(updated);
                        }}
                      >
                        Chiudi QR
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
}

export default Home;
