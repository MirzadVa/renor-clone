import {
  Accordion,
  Button,
  Card,
  Col,
  Row,
  useAccordionToggle,
  AccordionContext,
} from "react-bootstrap";
import Wrapper from "@/components/steps/wrapper";
import { useCategories } from "@/lib/swr-hooks";
import React, { useContext, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { WizardContext } from "../../pages/wizard";
import Image from "next/image";
import Loader from "../loader";
import StepFooter from "../step-footer";
import SweetAlert from "react-bootstrap-sweetalert";

const ContextAwareToggle = (props) => {
  const currentEventKey = useContext(AccordionContext);
  const { selectedCategory, text } = props;
  const decoratedOnClick = useAccordionToggle(
    props.eventKey,
    () => props.callback && props.callback(props.eventKey)
  );

  let categoryLetter;
  let color;

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
    default:
      (categoryLetter = "Geen selectie"), (color = "lightgray");
  }

  const isCurrentEventKey = currentEventKey === props.eventKey;

  return (
    <div
      onClick={decoratedOnClick}
      className="d-flex justify-content-between align-items-center pointer"
    >
      <div className="d-flex align-items-center ">
        {isCurrentEventKey ? <FaChevronDown /> : <FaChevronRight />}
        <div className={`ml-3 circle`}>
          <span>{props.keys + 1}</span>
        </div>
        <span className={"themas-text"}>{props.children}</span>
      </div>
      <p
        className="float-right rounded-0 py-2 px-4 mt-3"
        style={{ backgroundColor: `${color}`, color: "white" }}
      >
        {categoryLetter === "Geen selectie" ? " " : "KEUZE GEMAAKT"}{" "}
        &nbsp;&nbsp;<strong style={{ fontSize: 21 }}>{categoryLetter}</strong>
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
        focus-btn:focus {
          outline: none !important;
          box-shadow: none !important;
        }

        .pointer {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

const StepLucht = (props) => {
  // const {isLoading, subcategories} = useSubcategoriesViaCategory("6")
  const { isLoading, categories } = useCategories();
  const {
    categoryAns,
    setCategoryAns,
    nextStep,
    setStep,
    stepsDone,
    setStepsDone,
    editProject,
  } = useContext(WizardContext);

  const selectCategory = (n, c) => {
    setCategoryAns({
      ...categoryAns,
      [c]: n,
    });
  };
  const [alert, setAlert] = useState(null);

  const showAlert = () => {
    setAlert(
      <SweetAlert title="" onConfirm={() => setAlert(null)} btnSize="md">
        Selecteer eerst de thema's voordat u verder kan naar de volgende stap
      </SweetAlert>
    );
  };

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      <Wrapper {...props}>
        <div>
          <span
            style={{
              color: "#272C63",
              fontSize: 35,
              fontWeight: "bold",
              verticalAlign: "sub",
            }}
          >
            Thema's
          </span>
          <p style={{ fontSize: 18 }}>
            Als eerste stap voor het PvE van uw gebouw kiest u voor ieder thema
            een geschikt ambitieniveau. U kiest hierbij voor één ambitieniveau
            per thema. Onderling kunnen de ambitieniveaus tussen de thema’s wel
            verschillen (bv. Lucht klasse B niveau en Geluid klasse A niveau).
          </p>
          <p style={{ fontSize: 18 }}>
            Bij het selecteren van een ambitieniveau dient rekening te worden
            gehouden met onder meer de kenmerken en wensen van de (toekomstige)
            gebouwgebruikers, de lokale omgeving, eventuele bouwkundige
            beperkingen (in het geval van een renovatie) en het budget.
          </p>
        </div>

        <Accordion
          defaultActiveKey="5"
          style={{ marginTop: 40 }}
          className="first-border"
        >
          {categories &&
            categories.map((subcategory, indexes) => {
              if (isLoading) return <div key={indexes}></div>;
              return (
                <div key={indexes}>
                  {subcategory.name !== "Kwaliteitsborging" && (
                    <Card>
                      <Card.Header>
                        <ContextAwareToggle
                          eventKey={subcategory.id}
                          selectedCategory={categoryAns[subcategory.name]}
                          keys={indexes}
                        >
                          {subcategory.name}
                        </ContextAwareToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={subcategory.id}>
                        <Card.Body>
                          <Row className={"class-descriptions"}>
                            <Col xs={12}>
                              <div
                                className={`class-c overlay-c`}
                                onClick={() => {
                                  selectCategory("C", subcategory.name);
                                  //editProject()
                                }}
                              >
                                <div className="d-flex">
                                  <span
                                    className={`${
                                      categoryAns[subcategory.name] == "C"
                                        ? "dot"
                                        : "dot-result selected"
                                    }`}
                                  />
                                  <div className="ml-3">
                                    <div
                                      className={` ${
                                        categoryAns[subcategory.name] == "C"
                                          ? "title"
                                          : "selected-c"
                                      }`}
                                      style={{ width: 250 }}
                                    >
                                      Klasse C - VOLDOENDE
                                    </div>
                                    <p
                                      className={`mt-2 ${
                                        categoryAns[subcategory.name] == "C"
                                          ? ""
                                          : "selected"
                                      }`}
                                    >
                                      {subcategory.description_a}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col xs={12}>
                              <div
                                className={`class-b overlay-b mt-4 `}
                                onClick={() => {
                                  selectCategory("B", subcategory.name);
                                  //editProject()
                                }}
                              >
                                <div className="d-flex">
                                  <span
                                    className={`${
                                      categoryAns[subcategory.name] == "B"
                                        ? "dot"
                                        : "dot-result selected"
                                    }`}
                                  />
                                  <div className="ml-3">
                                    <div
                                      className={`${
                                        categoryAns[subcategory.name] == "B"
                                          ? "title"
                                          : "selected-b"
                                      }`}
                                      style={{ width: 250 }}
                                    >
                                      Klasse B - GOED
                                    </div>
                                    <p
                                      className={`mt-2 ${
                                        categoryAns[subcategory.name] == "B"
                                          ? ""
                                          : "selected"
                                      }`}
                                    >
                                      {subcategory.description_b}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col xs={12}>
                              <div
                                className={`class-a overlay-a mt-4 `}
                                onClick={() => {
                                  selectCategory("A", subcategory.name);
                                  //editProject()
                                }}
                              >
                                <div className="d-flex">
                                  <span
                                    className={`${
                                      categoryAns[subcategory.name] == "A"
                                        ? "dot"
                                        : "dot-result selected"
                                    }`}
                                  />
                                  <div className="ml-3">
                                    <div
                                      className={`${
                                        categoryAns[subcategory.name] == "A"
                                          ? "title"
                                          : "selected-a"
                                      }`}
                                      style={{ width: 250 }}
                                    >
                                      Klasse A - ZEER GOED
                                    </div>
                                    <p
                                      className={`mt-2 ${
                                        categoryAns[subcategory.name] == "A"
                                          ? ""
                                          : "selected"
                                      }`}
                                    >
                                      {subcategory.description_c}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  )}
                </div>
              );
            })}
        </Accordion>
        <style jsx>{`
          .title {
            font-weight: bold;
          }

          .class-description {
            color: black;
            margin-top: 5px;
            margin-bottom: 5px;
          }

          .class-c {
            cursor: pointer;
          }

          .class-b {
            cursor: pointer;
          }

          .class-a {
            cursor: pointer;
          }

          .class-c .title {
            padding: 10px;
            width: 100%;
            color: white;
            font-weight: 600;
            font-size: 18px;
            background-color: #ffd500;
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
            color: lightgray;
          }

          .explanations span {
            font-size: 7px;
            vertical-align: middle;
            margin-right: 10px;
          }

          .overlay-a .selected {
            filter: grayscale(40%);
          }
          .dot-result {
            margin-bottom: -3px;
            margin-right: 5px;
            width: 20px;
            height: 20px;
            min-width: 20px;
            min-height: 20px;
            border-radius: 50%;
            background: #d8d8d4 0% 0% no-repeat padding-box;
            box-shadow: 0px 3px 6px #00000029;
            border: 2px solid #ffffff;
            opacity: 1;
            display: inline-block;
            margin-top: 10px;
            background: #fff;
          }

          .dot {
            margin-bottom: -3px;
            margin-top: 10px;
            margin-right: 5px;
            width: 20px;
            height: 20px;
            min-width: 20px;
            min-height: 20px;
            border-radius: 50%;
            background: #272c63 0% 0% no-repeat padding-box;
            box-shadow: 0px 3px 6px #00000029;
            border: 2px solid #ffffff;
            opacity: 1;
            display: inline-block;
          }
          .tips-title {
            color: #009fdf;
            font-size: 17px;
            font-weight: bold;
          }
          .selected-a {
            background-color: #7fd2a8;
            padding: 10px;
            width: 100%;
            color: white;
            font-weight: 600;
            font-size: 18px;
          }
          .selected-b {
            background-color: #c5e29f;
            padding: 10px;
            width: 100%;
            color: white;
            font-weight: 600;
            font-size: 18px;
          }
          .selected-c {
            background-color: #ffea7f;
            padding: 10px;
            width: 100%;
            color: white;
            font-weight: 600;
            font-size: 18px;
          }
        `}</style>
        <Button
          onClick={() => {
            if (
              categoryAns?.Lucht === "" ||
              categoryAns?.Klimaat === "" ||
              categoryAns?.Lucht === "" ||
              categoryAns?.Licht === "" ||
              categoryAns?.Geluid === ""
            ) {
              showAlert();
            } else {
              editProject();
              nextStep();
              setStepsDone({ ...stepsDone, themaStep: true });
              // }
            }
          }}
          variant={"primary"}
          className="button mt-5 py-2 btnclass"
          block
        >
          EISEN BEKIJKEN EN WIJZIGEN
        </Button>
        <p className="text-center mt-3">
          of ga direct door naar{" "}
          <a href="#" className="tips-title" onClick={() => setStep(7)}>
            Kwaliteitsborging
          </a>
        </p>
      </Wrapper>
      {/* <StepFooter /> */}
      {alert}
    </>
  );
};

export default StepLucht;
