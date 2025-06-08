import "../../App.css";
import "antd/dist/reset.css";
import { useEffect, useRef, useState } from "react";
import { Avatar, Button, Card, Divider, Space, Typography } from "antd";

function App() {
  return (
    <div className="App-header">
      <Space direction="vertical">
        <Card
          title={
            <div
              style={{ display: "flex", alignItems: "center", color: "purple" }}
            >
              <img
                src="./foto10.png"
                alt="Logo"
                style={{
                  height: 12.5,
                  marginRight: 8,
                  alignItems: "center",
                }}
              />
              <Typography.Text style={{ alignItems: "center" }}>
                Bar sala Techno
              </Typography.Text>
            </div>
          }
          hoverable={true}
          style={{ width: 600 }}
          cover={
            <div
              style={{
                height: 120,
                width: "100%",
                textAlign: "center",
                background: "linear-gradient(to top, #6a4a86, #4b0082)",
                color: "white",
                fontSize: 25,
                paddingTop: 40,
              }}
            >
              BELLINELLI86
            </div>
          }
          extra={
            <Button type="primary" style={{ backgroundColor: "#4b0082" }}>
              Modifica
            </Button>
          }
        >
          <Card.Meta
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: -60,
              alignItems: "center",
            }}
            avatar={<Avatar size={150} src={"/foto9.jpg"} />}
            title={
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Marco Bellinelli
              </div>
            }
            description={
              <div style={{ textAlign: "center", marginTop: 8 }}>
                la mia tripla preferita? vodka, redbull e powerade
              </div>
            }
          ></Card.Meta>
          <div style={{ textAlign: "center", marginTop: 15 }}>
            marcobellinelli86@gmail.com <br /> 25/03/1986 <br /> Sesso: M
            <Divider />
            <div
              style={{
                textAlign: "center",
                fontSize: 18,
                marginTop: 20,
                fontWeight: "bold",
                color: "#4b0082",
              }}
            >
              STATISTICHE PERSONALI
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: 15,
                marginTop: 10,
              }}
            >
              numero drink acquistati: 40 <br />
              numero party: 46 <br />
              numero eventi: 31
            </div>
          </div>
        </Card>
      </Space>
    </div>
  );
}

export default App;
