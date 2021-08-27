import {
  Accordion,
  Button,
  Card,
  Col,
  Row,
  useAccordionToggle,
  AccordionContext,
} from "react-bootstrap";
import { useExplanations } from "@/lib/swr-hooks";
import { useContext, useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight, FaCircle } from "react-icons/fa";
import axios from "axios";
import { WizardContext } from "pages/wizard";
import InfoPopup from "@/components/infoPopup";
import Spinner from "react-bootstrap/Spinner";

const ContextAwareToggle = (props) => {
  const currentEventKey = useContext(AccordionContext);
  const { selectedCategory } = props;

  const decoratedOnClick = useAccordionToggle(
    props.eventKey,
    () => props.callback && props.callback(props.eventKey)
  );
  let categoryLetter = "A";
  let color = "#008000";

  switch (selectedCategory) {
    case "A":
      categoryLetter = "A";
      color = "#008000";
      break;
    case "B":
      categoryLetter = "B";
      color = "#8CC63F";
      break;
    case "C":
      categoryLetter = "C";
      color = "#ffd500";
      break;
  }

  const isCurrentEventKey = currentEventKey === props.eventKey;

  return (
    <div onClick={decoratedOnClick}>
      {isCurrentEventKey ? <FaChevronDown /> : <FaChevronRight />}{" "}
      {props.children}
      <p
        className="float-right rounded-0 py-2 px-4 m-0"
        style={{ backgroundColor: `${color}`, color: "white" }}
      >
        KEUZE GEMAAKT &nbsp;&nbsp;
        <strong style={{ fontSize: 21 }}>{categoryLetter}</strong>
      </p>
      <style jsx>{`
        .btn-group {
          float: right;
          width: 205px;
        }

        .number {
          background-color: #8cc63f !important;
          border-color: #8cc63f !important;
          color: black;
          font-weight: bold;
        }

        .chosen {
          background-color: #272c63 !important;
          border-color: #272c63 !important;
          color: white;
          font-weight: bold;
        }

        .not-chosen {
          background-color: #a7a7a7 !important;
          border-color: #a7a7a7 !important;
          color: white;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

function StepAccordionResults(props) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("#8CC63F");
  const [info, setInfo] = useState({ title: "", text: "" });
  const [scores, setScores] = useState(
    <Spinner animation="border" role="status" />
  );
  const { stepForm, categoryAns } = useContext(WizardContext);
  const htmlRegex = new RegExp("<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)</\0>");
  const selectCategory = (n, c) => {
    setCount(n);
    setColor(c);
  };
  const isHTML = (str) => {
    var a = document.createElement("div");
    a.innerHTML = str;

    for (var c = a.childNodes, i = c.length; i--; ) {
      if (c[i].nodeType == 1) return true;
    }

    return false;
  };
  const renderExp = (val, exp) => {
    if (val[exp] == "<i>Gelijk aan klasse A</i>") {
      return "text_a";
    } else if (val[exp] == "<i>Gelijk aan klasse B</i>") {
      return "text_b";
    } else if (val[exp] == "<i>Gelijk aan klasse C</i>") {
      return "text_c";
    } else return exp;
  };

  const [open, setOpen] = useState(false);

  const handlePopup = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInfoPopup = (data) => {
    setInfo(data);
    setOpen(true);
  };

  return (
    <div>
      <Accordion className="first-border">
        {props.subcategories.length > 0 &&
          props.subcategories.map((subcategory, index) => {
            const res = stepForm[props.type].filter(
              (val) => val.subID === subcategory.id
            );
            const exp = res[0]?.exp
              ? res[0]?.exp
              : getType(categoryAns[props.type]);
            const ans = res[0]?.ans ? res[0]?.ans : categoryAns[props.type];
            const [explanation, setExplanation] = useState([]);
            const [loading, setLoading] = useState(true);

            useEffect(() => {
              async function getData() {
                const response = await axios.get(
                  `/api/get-explanation-fields-via-subcategory?id=${subcategory.id}&exp=${exp}`
                );
                setData((prev) => [
                  ...prev,
                  {
                    type: props.type,
                    title: subcategory.name,
                    subId: subcategory.id,
                    klass: ans,
                    exp: response.data,
                  },
                ]);
                setExplanation(response.data);
                setLoading(false);

                return null;
              }

              getData();
            }, []);

            const getScores = async (cat, id) => {
              try {
                const response = await axios.get("api/get-subcategory-scores", {
                  params: { scoreClass: cat, subcategoryID: id },
                });
                if (response.status === 200) {
                  setScores(
                    <Row className="scores-wrapper">
                      <Col lg={6}>
                        <p className={"score-subtitle"}>WELL feature</p>

                        {response.data[0].well_scoreA === "-" ||
                        response.data[0].well_scoreB === "-" ||
                        response.data[0].well_scoreC === "-" ? (
                          <div className={"grey-box"}>
                            {cat === "A"
                              ? response.data[0].well_scoreA
                              : cat === "B"
                              ? response.data[0].well_scoreB
                              : response.data[0].well_scoreC}
                          </div>
                        ) : (
                          <div className={"blue-box"}>
                            {cat === "A"
                              ? response.data[0].well_scoreA
                              : cat === "B"
                              ? response.data[0].well_scoreB
                              : response.data[0].well_scoreC}
                          </div>
                        )}
                      </Col>
                      <Col lg={6}>
                        <p className={"score-subtitle"}>BREEAM-NL credit</p>
                        {response.data[0].breeam_scoreA === "-" ||
                        response.data[0].breeam_scoreB === "-" ||
                        response.data[0].breeam_scoreC === "-" ? (
                          <div className={"grey-box"}>
                            {cat === "A"
                              ? response.data[0].breeam_scoreA
                              : cat === "B"
                              ? response.data[0].breeam_scoreB
                              : response.data[0].breeam_scoreC}
                          </div>
                        ) : (
                          <div className={"blue-box"}>
                            {cat === "A"
                              ? response.data[0].breeam_scoreA
                              : cat === "B"
                              ? response.data[0].breeam_scoreB
                              : response.data[0].breeam_scoreC}
                          </div>
                        )}
                      </Col>
                    </Row>
                  );
                }
              } catch (err) {
                console.log(err);
              }
            };
            if (loading) return <div key={index}></div>;
            return (
              <Card key={index}>
                <Card.Header className="py-4">
                  <ContextAwareToggle
                    eventKey={subcategory.id}
                    selectedCategory={ans}
                  >
                    <span
                      onClick={() => getScores(ans, subcategory.id)}
                      className={"theme-text"}
                    >
                      {subcategory.name}
                    </span>
                  </ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey={subcategory.id}>
                  <Card.Body>
                    <Row className={"class-descriptions"}>
                      <Col xs={6}>
                        {ans === "A" && (
                          <div className={`class-a `}>
                            <div className={"title"}>Klasse A - VOLDOENDE</div>
                            {explanation.map((val, id) => (
                              <span key={id} className="d-flex">
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: val[renderExp(val, exp)],
                                  }}
                                ></p>
                              </span>
                            ))}
                          </div>
                        )}
                        {ans === "B" && (
                          <div className={`class-b`}>
                            <div className={"title"}>Klasse B - VOLDOENDE</div>
                            {explanation.map((val, id) => (
                              <span key={id} className="d-flex">
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: val[renderExp(val, exp)],
                                  }}
                                ></p>
                              </span>
                            ))}
                          </div>
                        )}
                        {ans === "C" && (
                          <div className={`class-c overlay-c`}>
                            <div className={"title"}>Klasse C - VOLDOENDE</div>
                            {explanation.map((val, id) => (
                              <span key={id} className="d-flex">
                                {/* {val[exp] && (
                                  <span className='mt-2'>
                                    <FaCircle/>
                                  </span>
                                )} */}
                                {/* { isHTML(val[exp])?
                              <p dangerouslySetInnerHTML={{__html:val[exp]}}></p>:
                              <p>{val[exp]}</p>
                              } */}
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: val[renderExp(val, exp)],
                                  }}
                                ></p>
                              </span>
                            ))}
                          </div>
                        )}
                      </Col>
                      <Col xs={6}>
                        {/* <p className={"box-title"}>
                          Effect binnenmilieu-eisen op productiviteit & ziekteverzuim <span onClick={()=>handleInfoPopup({title:"Effect binnenmilieu-eisen op productiviteit & ziekteverzuim",text:"In het referentiedocument wordt gesproken over een productiviteitsboost (indien voor het klasse A niveau gekozen wordt) van 4% veroorzaakt door decombinatiemaatregel: basisventilatie systeem met klasse A capaciteit plus aanvullend ook (voldoende) spuiventilatie mogelijkheden."})} className='green-info'>i</span>
                        </p> */}
                        {/* <Row> */}
                        {/* <Col xs={2}>
                            
                            <div className={"box-gray"}>+</div>
                           
                            <div className={"box-gray box-margin"}>0</div>
                          </Col> */}
                        {/* <Col xs={10}>
                            <p className={"result-description"}>
                              In het referentiedocument wordt gesproken over een productiviteitsboost (indien voor het klasse A niveau gekozen wordt) van 4% veroorzaakt door de
                              combinatiemaatregel: basisventilatie systeem met klasse A capaciteit plus aanvullend ook (voldoende) spuiventilatie mogelijkheden.
                            </p>
                          </Col> */}
                        {/* </Row> */}
                        <br />
                        <p className={"box-title"}>
                          Link binnenmilieu-eisen met WELL en BREEAM-NL{" "}
                          <span
                            onClick={() =>
                              handleInfoPopup({
                                title:
                                  "Link binnenmilieu-eisen met WELL en BREEAM-NL",
                                text: "In het referentiedocument wordt gesproken over een productiviteitsboost (indien voor het klasse A niveau gekozen wordt) van 4% veroorzaakt door decombinatiemaatregel: basisventilatie systeem met klasse A capaciteit plus aanvullend ook (voldoende) spuiventilatie mogelijkheden.",
                              })
                            }
                            className="green-info"
                          >
                            i
                          </span>
                        </p>
                        <Row className="well-breea">
                          <Col xs={12}>
                            <p className={"result-description"}>
                              De keuze voor deze klasse draagt bij aan het
                              behalen van de volgende WELL feature en BREEAM
                              credit.
                            </p>
                          </Col>
                        </Row>
                        {scores}
                        {/* {getScores(ans, subcategory.id)} */}
                      </Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
      </Accordion>

      <InfoPopup show={open} handleClose={handleClose}>
        <p className={"box-title"}>{info.title}</p>
        <p className={"result-description"}>
          De relevante WELL features zijn gebaseerd op WELL V2 2020 Q2. Zie{" "}
          <a style={{ color: "#009fdf" }} href="http://www.wellcertified.com">
            www.wellcertified.com
          </a>{" "}
          voor meer informatie.
        </p>
        <p>
          De relevante BREEAM credits zijn gebaseerd op het schema
          ‘Nieuwbouw2020’ versie 1.0. Zie{" "}
          <a style={{ color: "#009fdf" }} href="http://www.bream.nl">
            www.breeam.nl
          </a>{" "}
          voor meer informatie.{" "}
        </p>
      </InfoPopup>
      <style jsx>{`
        .box-margin {
          margin-top: 10px;
        }
        .box-gray {
          background-color: #a7a7a7;
          width: 60px;
          // height: 41px;
          padding: 10px;
          text-align: center;
          vertical-align: middle;
          font-size: 24px;
          font-weight: bold;
        }

        .box-green {
          background-color: #008000;
          width: 60px;
          color: white;
          // height: 41px;
          padding: 10px;
          text-align: center;
          vertical-align: middle;
          font-size: 24px;
          font-weight: bold;
        }

        .box-title {
          margin-bottom: 5px;
          font-weight: bold;
          color: #272c63;
          font-size: 20px;
        }

        .box-subtitle {
          margin-bottom: 5px;
          font-weight: bold;
          color: #009fdf;
          font-size: 15px;
        }

        .result-description {
          font-size: 13px;
        }

        .title {
          font-weight: bold;
          color: white;
          margin-bottom: 20px;
        }

        .class-description {
          color: black;
          margin-top: 5px;
          margin-bottom: 5px;
        }

        .class-c .title {
          padding: 10px;
          width: 100%;
          color: white;
          font-weight: 600;
          font-size: 18px;
          background-color: #ffd500;
          // #EF7D00;
        }

        .class-b .title {
          padding: 10px;
          width: 100%;
          color: white;
          font-weight: 600;
          font-size: 18px;
          background-color: #8cc63f;
        }

        .class-a .title {
          padding: 10px;
          width: 100%;
          color: white;
          font-weight: 600;
          font-size: 18px;
          background-color: #008000;
        }

        .explanations {
          margin-top: 15px;
          margin-bottom: 15px;
        }

        .selected {
          filter: saturate(0.3);
          color: lightgray;
        }

        span {
          font-size: 7px;
          vertical-align: middle;
          margin-right: 10px;
        }

        .overlay-a .selected {
          filter: grayscale(40%);
        }
        .green-info {
          padding: 3px 7px;
          border-radius: 20px;
          background-color: #00a651;
          color: white;
          font-size: 9px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default StepAccordionResults;

const getType = (val) => {
  switch (val) {
    case "A":
      return "text_a";
    case "B":
      return "text_b";
    case "C":
      return "text_c";
  }
};
