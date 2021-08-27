import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import IntroText from "../components/introtext";
import LoginForm from "../components/loginform";
import Image from "next/image";
import Accordion from "../components/accordion";
import Footer from "../components/footer";
import Head from "next/head";
import SweetAlert from "react-bootstrap-sweetalert";

const accordion = [
  {
    key: "1",
    // title: "Themas's",
    title: "Over het PvE",
    // body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    body: (
      <>
        <p>
          Een goed binnenmilieu in kantoren is belangrijk om een comfortabele,
          prestatieverhogende en gezonde werkomgeving te creëren. Om dit te
          behalen en behouden is het noodzakelijk dat bij nieuwbouw en
          renovatieprojecten vooraf eisen worden geformuleerd ten aanzien van de
          binnenmilieukwaliteit. Ontwerpers, installateurs en aannemers dienen
          hun plannen vervolgens te baseren op deze uitgangspunten.{" "}
        </p>
        <p>
          Om u hierbij te ondersteunen hebben TVVL en Binnenklimaat Nederland
          het PvE Gezonde Kantoren 2021 opgesteld. Het PvE Gezonde Kantoren is
          een update van de oorspronkelijke publicatie die in 2018 is uitgegeven
          vanuit het Platform Gezond Binnenklimaat.{" "}
        </p>
        <p>
          Met de publicatie wordt een handreiking gegeven aan partijen die
          kantoren willen realiseren die niet alleen energiezuinig zijn maar
          vooral ook gezond, comfortabel en productiviteit-bevorderend.
        </p>
        <p>
          Meer informatie over de publicatie en het document zelf vindt u op{" "}
        </p>
        <a
          style={{ color: "#009fdf", fontSize: "15px", fontWeight: "bold" }}
          href="http://www.pvegezondekantoren.nl"
        >
          www.pvegezondekantoren.nl
        </a>
      </>
    ),
  },
  {
    key: "2",
    // title: "Ambitieprofielen",
    title: "Over PvE op maat",
    // body: "Lorem ipsum dolor sit amet",
    body: (
      <>
        <p>
          Met PvE op maat kunt u zelf eenvoudig een PvE samenstellen op maat
          voor uw gebouw. De applicatie helpt u om voor ieder thema het juiste
          ambitieprofiel te kiezen en biedt de mogelijkheid om deze ambitie per
          deelaspect bij te stellen. Zo maakt u een eigen PvE op maat voor uw
          gebouw dat u naderhand eenvoudig kunt downloaden en gebruiken.
        </p>
        <p>
          PvE op maat werkt op basis van de publicatie ‘PvE Gezonde Kantoren
          2021’, versie v2021.1. De informatie over de thema’s, eisen en
          ambitieniveaus in deze applicatie komen overeen met de informatie in
          de publicatie. Mocht u toch verschillen opmerken dient de informatie
          uit de publicatie als leidend te worden gezien.
        </p>
        <p>
          Ervaart u problemen met inloggen of het gebruik van de applicatie,
          neem dan contact op via
        </p>
        <a
          style={{ color: "#009fdf", fontSize: "15px", fontWeight: "bold" }}
          href="mailto:pvegezondekantoren@tvvl.nl"
        >
          pvegezondekantoren@tvvl.nl
        </a>
        <br />
        <br />
        <p>
          Deze webapplicatie is ontwikkeld door Renor in samenwerking met TVVL.
        </p>
      </>
    ),
  },
  {
    key: "3",
    // title: "Kwaliteitsborging",
    title: "Gebruik van PvE op maat",
    // body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    body: (
      <>
        <p>
          Het PvE werkt als een menukaart. Als opdrachtgever of bouwteam lid
          bepaalt u zelf welke eisen er gelden voor uw project. Dit doet u door
          de volgende stappen te doorlopen.
        </p>
        <p>
          Als eerste bepaalt u per thema apart welk ambitieniveau geschikt is. U
          kiest hierbij voor één ambitieniveau per thema. Onderling kunnen de
          ambitieniveaus tussen de thema’s wel verschillen (bv. Lucht klasse B
          niveau en Geluid klasse A niveau).
        </p>
        <p>
          Zodra u dit gedaan heeft kunt u het PvE direct definitief maken, of er
          voor kiezen om het PvE per deelaspect te bekijken en de ambitie aan te
          passen waar nodig. In sommige gevallen zal het zo zijn dat het gekozen
          ambitieniveau niet voor ieder deelaspect in het thema haalbaar is. Zet
          in dat geval het ambitieniveau voor dit deelaspect op een afwijkende
          klasse niveau.
        </p>
        <p>
          Zodra u bovenstaande stappen heeft doorlopen kunt u het PvE definitief
          maken en direct als als PDF downloaden. Ook verschijnt uw maatwerk PvE
          onder ‘Mijn PvE’s’, waar u het later altijd terug kunt vinden,
          bewerken en opnieuw in PDF genereren.
        </p>
      </>
    ),
  },
];

export default function Home() {
  const [alert, setAlert] = useState(null);

  const setLoginAlert = (msg) => {
    setAlert(
      <SweetAlert
        title="Inloggen niet gelukt!"
        onConfirm={() => setAlert(null)}
      >
        <span>
          Er blijkt iets mis te zijn met de gebruikersnaam en/of wachtwoord,
          probeer het nog een keer. Of wijzig je wachtwoord via
          www.tvvlconnect.nl
        </span>
      </SweetAlert>
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(/Beeldmerk_Binnenklimaattechniek_10-2019@2x.png)`,
        backgroundSize: 800,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "1200px 550px",
      }}
    >
      {alert}
      <Container className={"container-line"}>
        <div className={"top-line"}>
          <a href={"/"}>
            <div
              style={{
                paddingTop: "18pt",
              }}
            >
              <Image src={"/logo.png"} width="257" height="65" />
            </div>
          </a>
        </div>
      </Container>
      <div className={"top-image"}></div>
      <Container className={"container-home"}>
        <div className={"home-wrapper"}>
          <Row>
            <Col xs={12} md={7} className={"side"}>
              <IntroText />
            </Col>
            <Col xs={12} md={5} className={"side"}>
              <LoginForm setLoginAlert={setLoginAlert} />
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col xs={12} md={6} className={"side"}>
              <div className={"intro-text-wrapper"}>
                <h3
                  className={"text-padding font-weight-bold"}
                  style={{ color: "#272C63", marginBottom: 20 }}
                >
                  Meer informatie
                </h3>
                <Accordion data={accordion} />
              </div>
            </Col>
          </Row>
        </div>
        <style jsx>{`
          .dev-note {
            text-align: right;
            color: #a7a7a7;
          }
          .tips-email {
            color: #009fdf;
            font-size: 15px;
            font-weight: bold;
          }
        `}</style>
      </Container>
      <Footer />
    </div>
  );
}
