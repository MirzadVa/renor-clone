import React, { useState, useEffect } from "react";
import axios from "axios";
// import encode from 'base64-arraybuffer'
import Form from "../components/steps/form";
import StepGeluid from "../components/steps/stepgeluid";
import StepLucht from "../components/steps/steplucht";
import StepKlimaat from "../components/steps/stepklimaat";
import StepLicht from "../components/steps/steplicht";
import StepKwaliteit from "../components/steps/stepkwaliteit";
import StepResultaten from "../components/steps/stepresultaten";
import Accordion from "../components/accordion";
import StepThemas from "../components/steps/stepthemas";
import { Button, Tab, Nav, Row, Col, Alert } from "react-bootstrap";
import {
  FaExclamationTriangle,
  FaRedo,
  FaSignInAlt,
  FaWpforms,
} from "react-icons/fa";
import Link from "next/link";
import Footer from "../components/footer";
import Popup from "../components/popup";
import ThirdTab from "../components/third-tab";
import getToken from "helpers/getToken";
import getUserId from "helpers/getUserID";
import { useRouter, withRouter } from "next/router";
import getEditMode from "helpers/getEditMode";
import getProjectId from "helpers/getProjectId";
import SweetAlert from "react-bootstrap-sweetalert";

/**
 * A basic demonstration of how to use the step wizard
 */

export const WizardContext = React.createContext();
const Provider = WizardContext.Provider;

const Wizard = () => {
  const router = useRouter();

  const [alert, setAlert] = useState(null);
  const [resetAlert, setResetAlert] = useState(null);
  const [locked, setLocked] = useState(false);
  const [editMode, setEditMode] = useState(getEditMode());
  const [stepsDone, setStepsDone] = useState({
    formStep: false,
    themaStep: false,
    luchStep: false,
    klimaatStep: false,
    lichtStep: false,
    geluidStep: false,
    kwaliteitsborgingStep: false,
  });

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loadingDocument, setLoadingDocument] = useState(false);
  const [categoryAns, setCategoryAns] = useState({
    ...category,
  });
  const [form, setForm] = useState({
    ...wizardForm,
  });
  const [stepForm, setStepForm] = useState({
    ...wizardStepForm,
  });
  const [files, setFiles] = useState("");

  const getSingleProject = async () => {
    try {
      const response = await axios.get(`/api/get-sngle-project`, {
        params: { id: localStorage.getItem("projectId") },
      });
      if (response.status === 200) {
        if (response.data[0].locked) {
          setLocked(true);
        }
        setForm({
          Bedrijf: response.data[0].bedrijf,
          Email: response.data[0].email,
          Gebouwnaam: response.data[0].gebouwnaam,
          Klant: response.data[0].klant,
          Naam: response.data[0].naam,
          Nummer: response.data[0].nummer,
          Plaats: response.data[0].plaats,
          Postcode: response.data[0].postcode,
          Projectnaam: response.data[0].projectnaam,
          Projectnummer: response.data[0].projectnummer,
          Straatnaam: response.data[0].straatnaam,
          Telefoonnummer: response.data[0].telefoonnummer,
        });
        setFiles(response.data[0].imageURL);
        setStepForm(JSON.parse(unescape(response.data[0].category)));
        if (response.data[0].themas === null) {
          setCategoryAns(...category);
        } else {
          setCategoryAns(JSON.parse(unescape(response.data[0].themas)));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (getToken() === null) {
      router.push("/login");
    }
    if (editMode) {
      getSingleProject();
    }
  }, []);

  const lockProject = async () => {
    try {
      setLoadingDocument(true);
      const response = await axios.post(`/api/lock-project`, {
        projectId: getProjectId(),
        locked: true,
      });
      if (response.status === 200) {
        setLocked(true);
        setLoadingDocument(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveProject = async () => {
    try {
      let userId = parseInt(getUserId());
      const response = await axios.post(`/api/add-project`, {
        formData: form,
        steps: stepForm,
        userId,
        imageUrl: files,
      });
      if (response.status === 200) {
        console.log("project", response.data.insertId);
        localStorage.setItem("projectId", response.data.insertId);
        setEditMode(true)
      }
    } catch (err) {
      console.log(err);
    }
  };
  const editProject = async () => {
    setLoadingDocument(true);
    const response = await axios
      .post(`/api/edit-project`, {
        formData: form,
        steps: stepForm,
        projectId: getProjectId(),
        themas: categoryAns,
        imageUrl: files,
      })
      .then(() => {
        setLoadingDocument(false);
      });
  };

  const accordion1 = [
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
            worden vastgelegd bij de start van een project. In algemene zin
            hebben de eisen op deze twee aspecten een beperkte invloed op het
            wel of niet kunnen halen van de kwaliteitsniveaus zoals vastgelegd
            in dit PvE.
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
            <li className="classes-c"> klasse C (voldoende)</li>
            <li> klasse B (goed)</li>
            <li> klasse A (zeer goed)</li>
          </ul>
          <p>
            Aan ieder ambitieniveau zijn eigen (prestatie)eisen gekoppeld.
            Klasse C is hierbij het basisniveau; vaak gebaseerd op geldende wet-
            en regelgeving, zoals vastgelegd in het Bouwbesluit 2012 (specifiek
            de nieuwbouw-eisen zoals die sinds 2012 gelden). De eisen zijn zo
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
            niveau voor kwaliteitsborging kan afwijken van de het
            kwaliteitsniveau van de binnenmilieu-eisen; wanneer er bijvoorbeeld
            bij een monument gekozen wordt om de klasse C eisen te hanteren
            kunnen deze conform de klasse A eisen voor kwaliteitsborging
            gecontroleerd worden.
          </p>
          <p>
            Meer informatie over kwaliteitsborging vindt u in de publicatie.
          </p>
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
              Binnen de gebruikstijd dient voor ten minste 95% van de
              gebruikstijd aan de eis te worden voldaan.
            </li>
            <li>
              Daar waar variabele eisen geformuleerd worden geldt dat er vanuit
              gegaan mag worden dat er nooit in 100% van de ruimte gelijktijdig
              een maximum capaciteitsvraag is.
            </li>
            <li>
              De eisen gelden specifiek voor ruimten die gebruikt worden voor
              kantoorwerk of werkzaamheden vergelijkbaar met kantoorwerk. De
              eisen gelden daarbij alleen als de bewuste ruimte ook wordt
              gebruikt als bedoeld.
            </li>
            <li>
              Voor overige ruimten als gangen, atria’s, serre’s en dergelijke
              kan men minder strenge eisen aanhouden. Tenzij er sprake is van
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
  ];
  // const accordion2 = [
  //   {
  //     key: "1",
  //     title: "Gebruik van de tooling",
  //     body: (
  //       <>
  //         <p>
  //           Het PvE werkt als een menukaart. Als opdrachtgever of bouwteam lid
  //           bepaalt u zelf welke eisen er gelden voor uw project. Dit doet u
  //           door de volgende stappen te doorlopen.
  //         </p>
  //         <p>
  //           In eerste instantie bepaalt u per thema apart welk ambitieniveau
  //           geschikt is. U kiest hierbij voor één ambitieniveau per thema.
  //           Onderling kunnen de ambitieniveaus tussen de thema’s wel verschillen
  //           (bv. Lucht klasse B niveau en Geluid klasse A niveau).
  //         </p>
  //         <p>
  //           Zodra u dit gedaan heeft kunt u het PvE direct definitief maken, of
  //           er voor kiezen om het PvE per deelaspect te bekijken en de ambitie
  //           aan te passen waar nodig. In sommige gevallen zal het zo zijn dat
  //           het gekozen ambitieniveau niet voor ieder deelaspect in het thema
  //           haalbaar is. Zet in dat geval het ambitieniveau voor dit deelaspect
  //           op een afwijkende klasse niveau.
  //         </p>
  //         <p>
  //           Zodra u bovenstaande stappen heeft doorlopen kunt u het PvE
  //           definitief maken en direct als als PDF downloaden. Ook verschijnt uw
  //           maatwerk PvE onder ‘ Mijn PvE’s’, waar u het later altijd terug kunt
  //           vinden, bewerken en opnieuw een PDF kunt genereren.
  //         </p>
  //       </>
  //     ),
  //   },
  // ];
  const previousStep = () => {
    setStep(step - 1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const onChange = ({ target }, name) => {
    setForm({
      ...form,
      [name]: target.value,
    });
  };

  const onChangeStepForm = (index, name, subID, object) => {
    setStepForm((prev) => ({
      ...prev,
      [name]:
        prev[name].length > 0
          ? [
              ...prev[name].filter((val, indexes) => val.subID !== subID),
              object,
            ]
          : [...prev[name], object],
    }));
    // console.log(stepForm);
  };

  const handlePopup = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetWizard = async() => {
    setStepsDone(1)
    setCategoryAns({ ...category });
    setForm({ ...wizardForm });
    setStepForm({ ...wizardStepForm });
    try{ 
      const response = await  axios.post(`/api/reset-wizard`, {projectId: getProjectId()})
      if(response.status === 200){
        getSingleProject()
      }
    }catch(err){
      console.log(err)
    }    
  };
  const showResetAlert = () => {
    // locked ? 
     setResetAlert(
          <SweetAlert
            btnSize="md"
            confirmBtnText="OK"
            title="Weet u dat zeker?"
            closeOnClickOutside={true}
            onCancel={() => setResetAlert(null)}
            onConfirm={() => {
              setResetAlert(null);
              resetWizard();
            }}
          >
            Alle ingevulde gegevens worden gewist.
          </SweetAlert>
        )
      // : setResetAlert(
      //     <SweetAlert
      //       btnSize="md"
      //       showCancel
      //       cancelBtnText="Annuleer"
      //       confirmBtnText="Ja ik weet het zeker!"
      //       confirmBtnBsStyle="danger"
      //       title="Weet u dat zeker?"
      //       onConfirm={() => {
      //         setResetAlert(null);
      //         resetWizard();
      //       }}
      //       onCancel={() => setResetAlert(null)}
      //     >
      //       Alle gegevens worden gewijzigd.
      //     </SweetAlert>
      //   );
  };
  const createAlert = (msg) => {
    setAlert(
      <Alert variant={"danger"}>
        {msg}
      </Alert>
    );
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };
  const createSuccessAlert = () => {
    setAlert(
      <SweetAlert success onConfirm={() => setAlert(null)}>
        Project saved!
      </SweetAlert>
    );
  };

  const logOut = () => {
    localStorage.removeItem("token");
    location.reload();
  };
  return (
    <>
      <div className={"top-menu"}>
        <div className={"container"}>
          <div className={"menu-items"}>
            <Button
              className={" btn-green"}
              style={{ minWidth: "120px", height: 40 }}
            >
              <Link href="/pve">
                <div className="d-flex align-items-center justify-content-around">
                  <span
                    className={"btn-label"}
                    style={{ fontSize: 20, marginTop: "-4px" }}
                  >
                    <FaWpforms />
                    &nbsp;
                  </span>
                  <span
                    className={"btn-text font-weight-bold"}
                    style={{ fontSize: 13 }}
                  >
                    MIJN PVE'S
                  </span>
                </div>
              </Link>
            </Button>
            &nbsp;
            <Button
              className={" btn-yellow btn-small "}
              style={{ width: "105px", height: 40 }}
              onClick={handlePopup}
            >
              <div className=" d-flex align-items-center justify-content-around">
                <span
                  className={"btn-label"}
                  style={{ fontSize: 20, marginTop: "-6px" }}
                >
                  <FaExclamationTriangle />
                  &nbsp;
                </span>
                <span
                  className={"btn-text font-weight-bold"}
                  style={{ fontSize: 13 }}
                >
                  UITLEG
                </span>
              </div>
            </Button>
            &nbsp;
            <Button
              className={" btn-orange btn-small"}
              style={{ minWidth: "135px", height: 40 }}
              onClick={() => showResetAlert()}
            >
              <div className=" d-flex align-items-center justify-content-around">
                <span className={"btn-label"}>
                  <FaRedo />
                  &nbsp;
                </span>
                <span
                  className={" btn-text font-weight-bold"}
                  style={{ fontSize: 13 }}
                  //onClick={() => resetWizard()}
                >
                  RESET WIZARD
                </span>
              </div>
            </Button>
            &nbsp;
            <Button
              className={" btn-menu2 btn-purple btn-small "}
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
            &nbsp;
          </div>
        </div>
        {alert}
      </div>
      <div
        className="container m-0 p-0"
        style={{
          backgroundImage: `url(/Beeldmerk_Binnenklimaattechniek_10-2019@2x.png)`,
          backgroundSize: 750,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "-360px 430px",
          backgroundAttachment: "fixed",
        }}
      >
        {console.log("stepForm data is", stepForm)}
        <Provider
          value={{
            previousStep,
            nextStep,
            step,
            form,
            onChange,
            categoryAns,
            setCategoryAns,
            stepForm,
            setStepForm,
            onChangeStepForm,
            setStep,
            files,
            setFiles,
            createAlert,
            locked,
            setLocked,
            saveProject,
            editProject,
            editMode,
            stepsDone,
            setStepsDone,
            loadingDocument,
            setLoadingDocument,
            lockProject,
          }}
        >
          <div
            className={"jumbotron"}
            style={{ minHeight: "110vh", backgroundColor: "transparent" }}
          >
            {step === 1 ? (
              <Form />
            ) : step === 2 ? (
              <StepThemas />
            ) : step === 3 ? (
              <StepLucht />
            ) : step === 4 ? (
              <StepKlimaat />
            ) : step === 5 ? (
              <StepLicht />
            ) : step === 6 ? (
              <StepGeluid />
            ) : step === 7 ? (
              <StepKwaliteit />
            ) : (
              <StepResultaten />
            )}
          </div>
        </Provider>
        <Popup show={open} handleClose={handleClose}>
          <div className="close-icon">
            <i className="fa fa-times" onClick={handleClose}></i>
          </div>
          <div className="modal-body">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={12} md={2} style={{ paddingLeft: "20px" }}>
                  <div className="d-flex justify-content-end">
                    <h3 style={{ color: "#009FDF", fontWeight: "bold" }}>
                      Uitleg
                    </h3>
                  </div>
                  <Nav variant="pills" className="flex-column mt-4">
                    <Nav.Item>
                      <Nav.Link eventKey="first">
                        GEBRUIK VAN DE TOOLING
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">MEER INFORMATIE</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">
                        EFFECT BINNENMILIEU-EISEN
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col
                  sm={12}
                  md={10}
                  className="border-md-left border-sm-0 "
                  style={{ paddingRight: 60 }}
                >
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      {/* <Sonnet /> */}
                      <div className={"intro-text-wrapper"}>
                        <h4 className="header-text">Gebruik van de tooling</h4>
                        <>
                          <p>
                            Het PvE werkt als een menukaart. Als opdrachtgever
                            of bouwteam lid bepaalt u zelf welke eisen er gelden
                            voor uw project. Dit doet u door de volgende stappen
                            te doorlopen.
                          </p>
                          <p>
                            In eerste instantie bepaalt u per thema apart welk
                            ambitieniveau geschikt is. U kiest hierbij voor één
                            ambitieniveau per thema. Onderling kunnen de
                            ambitieniveaus tussen de thema’s wel verschillen
                            (bv. Lucht klasse B niveau en Geluid klasse A
                            niveau).
                          </p>
                          <p>
                            Zodra u dit gedaan heeft kunt u het PvE direct
                            definitief maken, of er voor kiezen om het PvE per
                            deelaspect te bekijken en de ambitie aan te passen
                            waar nodig. In sommige gevallen zal het zo zijn dat
                            het gekozen ambitieniveau niet voor ieder deelaspect
                            in het thema haalbaar is. Zet in dat geval het
                            ambitieniveau voor dit deelaspect op een afwijkende
                            klasse niveau.
                          </p>
                          <p>
                            Zodra u bovenstaande stappen heeft doorlopen kunt u
                            het PvE definitief maken en direct als PDF
                            downloaden. Ook verschijnt uw maatwerk PvE onder ‘
                            Mijn PvE’s’, waar u het later altijd terug kunt
                            vinden, bewerken en opnieuw een PDF kunt genereren.
                          </p>
                        </>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      {/* <Sonnet /> */}
                      <div className={"intro-text-wrapper"}>
                        <h4 className="header-text">Meer informatie</h4>
                        <Accordion data={accordion1} />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      {/* <Sonnet /> */}
                      <div className={"intro-text-wrapper"}>
                        <ThirdTab />
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </Popup>
        <Footer />
        {console.log("form data is, ", form)}
      </div>
      <style jsx>{`
        .top-menu {
          background-color: #009fdf;
          width: 100%;
          height: 70px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .menu-items {
          text-align: right;
          padding-top: 15px;
        }
        .close-icon {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          padding-bottom: 20px;
          padding-right: 20px;
        }
        .fa-times {
          margin-top: -10px;
          cursor: pointer;
        }
        .header-text {
          color: purple;
          font-weight: bolder;
          padding-bottom: 20px;
        }
      `}</style>
      {resetAlert}
    </>
  );
};

export default withRouter(Wizard);

const category = {
  Lucht: "",
  Klimaat: "",
  Licht: "",
  Geluid: "",
  Kwaliteit: "A",
};

const wizardForm = {
  Projectnaam: "",
  Projectnummer: "",
  Klant: "",
  Gebouwnaam: "",
  Straatnaam: "",
  Nummer: "",
  Postcode: "",
  Plaats: "",
  Naam: "",
  Bedrijf: "",
  Email: "",
  Telefoonnummer: "",
};

const wizardStepForm = {
  Lucht: [],
  Klimaat: [],
  Licht: [],
  Geluid: [],
  Kwaliteit: [],
};
