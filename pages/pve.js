import Head from "next/head";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getToken from '../helpers/getToken'
import getUserID from "../helpers/getUserID";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import PveList from "../components/pvelist";
import IntroPve from "../components/intropve";
import Accordion from "../components/accordion";
import Footer from "../components/footer";
import { useRouter } from "next/router"
import apiRequest from '../helpers/apiRequest'
import {
  FaSignInAlt,
} from "react-icons/fa";
import { createFalse } from "typescript";

const accordion = [
  {
    key: "1",
    title: "Thema's",
    body: (
      <>
        <p>
          In het Programma van Eisen staan de volgende 4 binnenmilieu-thema’s
          centraal:
        </p>
        <ul>
          <li> lucht (binnenluchtkwaliteit)</li>
          <li> klimaat (thermisch binnenklimaat);</li>
          <li> licht (& uitzicht);</li>
          <li> geluid.</li>
        </ul>
        <p>
          In dit PvE worden de aspecten energieprestatie en materiaalgebruik
          buiten beschouwing gelaten. Aanvullende eisen op deze aspecten zijn
          veelal wettelijk vastgelegd (energieprestatie) of dienen apart te
          worden vastgelegd bij de start van een project. In algemene zin hebben
          de eisen op deze twee aspecten een beperkte invloed op het wel of niet
          kunnen halen van de kwaliteitsniveaus zoals vastgelegd in dit PvE.
        </p>
      </>
    ),
  },
  {
    key: "2",
    title: "Ambitieprofielen",
    body: (
      <>
        <p>
          Voor ieder thema geldt dat er met drie ambitieniveaus gewerkt wordt:
        </p>
        <ul>
          <li> klasse C (voldoende)</li>
          <li> klasse B (goed)</li>
          <li> klasse A (zeer goed)</li>
        </ul>
        <p>
          Aan ieder ambitieniveau zijn eigen (prestatie)eisen gekoppeld. Klasse
          C is hierbij het basisniveau; vaak gebaseerd op geldende wet- en
          regelgeving, zoals vastgelegd in het Bouwbesluit 2012 (specifiek de
          nieuwbouw-eisen zoals die sinds 2012 gelden). De eisen zijn zo
          geformuleerd dat alle eisen die bij C staan ook voor B en A gelden,
          tenzij daar een zwaardere eis is opgenomen. Indien de eisen gelijk
          zijn is dat tekstueel aangegeven.
        </p>
      </>
    ),
  },
  {
    key: "3",
    title: "Kwaliteitsborging",
    body: (
      <>
        <p>
          Het stellen van eisen biedt nog geen garantie dat de gestelde
          binnenmilieu prestaties na ingebruikname werkelijk behaald worden.
          Tijdens het ontwerptraject, bij oplevering en na ingebruikname zal
          periodiek (steekproefsgewijs) getoetst dienen te worden of aan de
          belangrijkste eisen voldaan wordt.
        </p>
        <p>
          In de PvE tool is het daarom mogelijk om ook ambitieniveau voor
          kwaliteitsborging vast te leggen (klasse A, B of C). Het gekozen
          niveau voor kwaliteitsborging kan afwijken van de het kwaliteitsniveau
          van de binnenmilieu-eisen; wanneer er bijvoorbeeld bij een monument
          gekozen wordt om de klasse C eisen te hanteren kunnen deze conform de
          klasse A eisen voor kwaliteitsborging gecontroleerd worden.
        </p>
        <p>Meer informatie over kwaliteitsborging vindt u in de publicatie.</p>
      </>
    ),
  },
  {
    key: "4",
    title: "Waar en wanneer van de eisen",
    body: (
      <>
        <p>
          Bij de prestatie-eisen dient het volgende in acht te worden genomen:
        </p>
        <ul>
          <li>
            {" "}
            De eisen gelden enkel tijdens gebruikstijd: voor kantoren betekent
            dit in de regel op weekdagen tussen 8:00 en 18:00.
          </li>
          <li>
            {" "}
            Binnen de gebruikstijd dient voor ten minste 95% van de gebruikstijd
            aan de eis te worden voldaan.
          </li>
          <li>
            Daar waar variabele eisen geformuleerd worden geldt dat er vanuit
            gegaan mag worden dat er nooit in 100% van de ruimte gelijktijdig
            een maximum capaciteitsvraag is.
          </li>
          <li>
            De eisen gelden specifiek voor ruimten die gebruikt worden voor
            kantoorwerk of werkzaamheden vergelijkbaar met kantoorwerk. De eisen
            gelden daarbij alleen als de bewuste ruimte ook wordt gebruikt als
            bedoeld.
          </li>
          <li>
            Voor overige ruimten als gangen, atria’s, serre’s en dergelijke kan
            men minder strenge eisen aanhouden. Tenzij er sprake is van
            kantoorwerkplekken die geregeld langer dan 1 uur aansluitend
            gebruikt worden. In dit geval gelden de eisen zoals in dit PvE
            gepresenteerd.
          </li>
        </ul>
        <p>
          Meer informatie over het waar en wanneer van de eisen vindt u in de
          publicatie.
        </p>
      </>
    ),
  },
  {
    key: "5",
    title: "Gebruik van PvE op maat",
    body: (
      <>
        <p>
          Het PvE werkt als een menukaart. Als opdrachtgever of bouwteam lid
          bepaalt u zelf welke eisen er gelden voor uw project. Dit doet u door
          de volgende stappen te doorlopen.
        </p>
        <p>
          Als eerste bepaalt u per thema apart welk ambitieniveau geschikt is. 
          U kiest hierbij voor één ambitieniveau per thema. Onderling kunnen de ambitieniveaus tussen de 
          thema’s wel verschillen (bv. Lucht klasse B niveau en Geluid klasse A niveau).
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
  const router = useRouter()
  const [numOfLicenses, setNumOfLicenses] = useState(0)
  const [projects, setProjects] = useState([])

  const fetchLicenses = async () => {
    try{
      const response = await apiRequest({
        method: 'get',
        url: 'v2/pve/licenses'
      })
      if(response.status === 200){
        if(response.data.length > 0){
          let licence = 0
          response.data.map(elem => {
            licence += elem.amount
          })
          setNumOfLicenses(licence)
        }else{
          setNumOfLicenses(licence)
        }
      }
    }catch(err){
      console.log(err)
    }
  }
  const getProjects = async () => {
    let userId = getUserID()
    try{
      const response = await axios.get(`/api/get-projects`, {params: {userId}})
      if(response.status === 200){
        setProjects(response.data.map(elem => {
          return {...elem, pdfGenerated: false}
        }))
      }
    }catch(err){
      console.log(err)
    }
    
  }
  const compileProjects = (id) => {
    let projs = [...projects]
    projs.forEach(elem => {
      if(elem.id === id){
        elem.pdfGenerated = true
      }
    })
    setProjects([...projs])
  }

  useEffect(() => {
    if(getToken() === null){
      return router.push('/login')
    }
    fetchLicenses()
    getProjects()
    localStorage.removeItem('editMode')
    localStorage.removeItem('projectId')
  }, [])

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("email");
    router.push('/login')
    //location.reload();
  };

  return (
    <div
      style={{
        backgroundImage: `url(/Beeldmerk_Binnenklimaattechniek_10-2019@2x.png)`,
        backgroundSize: 750,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "1200px 600px",
        position: 'relative'
      }}
    >
       <Button
              className={" btn-menu2 btn-purple btn-small logout-btn"}
              style={{ minWidth: "125px", height: 40 }}
              onClick={() => logOut()}
            >
              <div className="d-flex align-items-center justify-content-around">
                <span
                  className={"btn-label"}
                  style={{ fontSize: 20, marginTop: "-4px" }}
                >
                  <FaSignInAlt />
                  &nbsp;
                </span>
                <span
                  className={"btn-text font-weight-bold"}
                  style={{ fontSize: 13 }}
                >
                  UITLOGGEN
                </span>
              </div>
            </Button>
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
      <div className={"top-image"}></div>
      <Container
        className={"container-home"}
        style={{ backgroundColor: "transparent" }}
      >
        <div className={"home-wrapper"}>
          <Row>
            <Col xs={12} md={12} lg={12} xl={6} className={"side"}>
              <IntroPve />
            </Col>
            <Col xs={12} md={12} lg={12} xl={6} className={"side"}>
              <PveList numOfLicenses={numOfLicenses} projects={projects} setProjects={compileProjects}/>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col xs={12} md={6} className={"side"}>
              <div className={"intro-text-wrapper"}>
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
        `}</style>
      </Container>
      <Footer />
    </div>
  );
}
