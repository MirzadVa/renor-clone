import { Container, Row, Col } from "react-bootstrap"
import Image from "next/image"
import Footer from "../components/footer"
import Head from "next/head"

export default function Home() {
  return (
    <div onClick={() => window.open("/login")}>
      <Container className={"container-line"}>
        <div className={"top-line"}>
          <a href={"/"}>
            <div
              style={{
                paddingTop: "18pt",
              }}
            >
              <Image src={"/logo.png"} width='257' height='65' />
            </div>
          </a>
        </div>
      </Container>
      <hr />
      <Container className={"container-home"} className={"body-back"}>
        <div className={"home-wrapper text-center"} style={{ paddingTop: "230pt", paddingBottom: "200px" }}>
          <Row>
            <Col xs={12}>
              <h2 className={"orange-text"}>Programma van Eisen</h2>
              <h2 className={"orange-text"}>Gezonde Kantoren 2021</h2>
              <span className={"blue-text title"}>Deze webapplicatie is momenteel nog in ontwikkeling.</span>
              <br />
              <span className={"light-blue-text subtitle"}>Vragen of wil je meer informatie? Stuur en e-mail naar pvegezondekantoren@tvvl.nl</span>
              <p>Welkom bij PvE op maat. Deze webapplicatie is onderdeel van de publicatie PvE Gezonde Kantoren 2021, een uitgave van het Platform Gezond Binnenklimaat</p>
              <p>
                PvE op maat biedt u de mogelijkheid om een maatwerk PvE op te stellen, op basis van de eisen uit de publicatie Gezonde Kantoren. In dit PvE kiest u per deelaspect
                het gewenste ambitieniveau, op basis van de behoefte en mogelijkheden voor uw gebouw. Zo ontstaat er een maatwerk PvE, specifiek gericht op uw gebouw
              </p>
              <p>Log in met uw TVVL account om direct naar de webapplicatie Pve op maat te gaan</p>
            </Col>
          </Row>
        </div>
        <style jsx>{`
          .dev-note {
            text-align: right;
            color: #a7a7a7;
          }

          .top-space {
            height: 90pt;
          }

          .title {
            font: normal normal bold 30px/36px Mulish;
          }

          .subtitle {
            font: normal normal normal 28px/47px Jaldi;
          }
        `}</style>
      </Container>
      <Footer />
    </div>
  )
}
