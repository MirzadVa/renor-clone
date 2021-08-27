import {
  Accordion,
  Button,
  Card,
  Col,
  Row,
  useAccordionToggle,
  AccordionContext,
} from "react-bootstrap";
import { useExplanations, useItems } from "@/lib/swr-hooks";
import { FaChevronDown, FaChevronRight, FaCircle } from "react-icons/fa";
import { WizardContext } from "../../pages/wizard";
import React, { useContext, useState } from "react";

const ContextAwareToggle = (props) => {
  const currentEventKey = useContext(AccordionContext);
  const { selectedCategory, text } = props;
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
    <div onClick={decoratedOnClick} style={{ curson: "pointer" }}>
      {isCurrentEventKey ? <FaChevronDown /> : <FaChevronRight />}{" "}
      <span className={"theme-text"}>{props.children}</span>
      {/* {props.eventKey == 2 ? (
        <p type='button' className='not-chosen rounded-0 float-right px-4' style={{ paddingTop: "12px", paddingBottom: "12px" }}>
          KEUZE NIET GEMAAKT
        </p>
      ) : ( */}
      <p
        type='button'
        className='float-right rounded-0 py-1 px-3 m-0'
        style={{ backgroundColor: `${color}`, color: "white" }}
      >
        KEUZE GEMAAKT &nbsp;&nbsp;
        <strong style={{ fontSize: 21 }}>{categoryLetter}</strong>
      </p>
      {/* // )} */}
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
      `}</style>
    </div>
  );
};

function StepAccordion(props) {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("#8CC63F");
  const {
    categoryAns,
    setCategoryAns,
    stepForm,
    setStepForm,
    onChangeStepForm,
    editProject
  } = useContext(WizardContext);
  const { Name, categoryID } = props;

  const selectCategory = (index, subID, ans, name) => {
    const exp = ans === "A" ? "text_a" : ans === "B" ? "text_b" : "text_c";
    onChangeStepForm(index, name, subID, {
      categoryID: +categoryID,
      ans,
      subID,
      exp,
    });
    // setCount(n);
    // setColor(c);
  };

  return (
    <div>
      <Accordion style={{ marginTop: 40 }} className={props.class}>
        {/* {console.log("subcategories are, ", props.subcategories)} */}
        {props.subcategories.map((subcategory, index) => {
          const { explanations, isLoading } = useExplanations(subcategory.id);
          const { items, isLoading: loading } = useItems(subcategory.id);
          // console.log(items, "items goes here");
          const data =
            stepForm[Name].length > 0
              ? stepForm[Name].filter((val) => val.subID === subcategory.id)
              : stepForm[Name];
          // console.log(data);
          if (isLoading) return <div key={index}></div>;
          return (
            <Card key={index}>
              <Card.Header className='py-3'>
                <ContextAwareToggle
                  eventKey={subcategory.id}
                  selectedCategory={getSelectedCategory(
                    data,
                    categoryAns[Name]
                  )}
                >
                  <span style={{cursor: 'pointer'}}>{subcategory.name}</span>
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey={subcategory.id}>
                <Card.Body>
                  {/*{subcategory.description}*/}
                  {/* {console.log("explantions are, ", explanations)} */}
                  <Row className={"class-descriptions"}>
                    <Col xs={4}>
                      <div
                        className={`class-c overlay-c cursor`}
                        onClick={() => {
                          selectCategory(index, subcategory.id, "C", Name)
                          //editProject()
                        }}
                      >
                        <div
                          className={` ${checkSelected(
                            data,
                            categoryAns[Name],
                            "C",
                            "selected-c"
                          )}`}
                        >
                          Klasse C - VOLDOENDE
                        </div>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div
                        className={`class-b overlay-b cursor`}
                        onClick={() => {
                          selectCategory(index, subcategory.id, "B", Name)
                         // editProject()
                        }}
                      >
                        <div
                          className={`${checkSelected(
                            data,
                            categoryAns[Name],
                            "B",
                            "selected-b"
                          )}`}
                        >
                          Klasse B - GOED
                        </div>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div
                        className={`class-a overlay-a cursor`}
                        onClick={() => {
                          selectCategory(index, subcategory.id, "A", Name)
                          //editProject()
                        }}
                      >
                        <div
                          className={`${checkSelected(
                            data,
                            categoryAns[Name],
                            "A",
                            "selected-a"
                          )}`}
                        >
                          Klasse A - ZEER GOED
                        </div>
                      </div>
                    </Col>
                  </Row>

                  {explanations.map((explanation, id) => (
                    <Row key={id}>
                      <Col xs={4}>
                        <div
                          className={`explanations overlay-c cursor ${checkSelectedPara(
                            data,
                            categoryAns[Name],
                            "C"
                          )}`}
                          onClick={() => {
                            selectCategory(index, subcategory.id, "C", Name)
                            //editProject()
                          }}
                        >
                          {/* <span className={"circle-bullet"} style={{border: '1px solid red'}}>
                            {explanation.text_c && <FaCircle />}
                          </span> */}
                          {/* {explanation.text_c} */}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: explanation.text_c,
                            }}
                          ></p>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div
                          className={`explanations overlay-b cursor ${checkSelectedPara(
                            data,
                            categoryAns[Name],
                            "B"
                          )}`}
                          onClick={() =>{
                            selectCategory(index, subcategory.id, "B", Name)
                            editProject()
                          }}
                        >
                          {/* <span className={"circle-bullet"}>
                            {explanation.text_c && <FaCircle />}
                          </span> */}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: explanation.text_b,
                            }}
                          ></p>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div
                          className={`explanations overlay-a cursor ${checkSelectedPara(
                            data,
                            categoryAns[Name],
                            "A"
                          )}`}
                          onClick={() => {
                            selectCategory(index, subcategory.id, "A", Name)
                            //editProject()
                          }}
                        >
                          {/* <span className={"circle-bullet"}>
                            {explanation.text_c && <FaCircle />}
                          </span> */}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: explanation.text_a,
                            }}
                          ></p>
                        </div>
                      </Col>
                    </Row>
                  ))}
                  <br />
                  <br />
                  <Row>
                    <Col xs={4}>
                      <p className='toel'>Toelichting</p>
                    </Col>
                    <Col xs={4}>
                      <p className='toel'>Toelichting</p>
                    </Col>
                    <Col xs={4}>
                      <p className='toel'>Toelichting</p>
                    </Col>
                  </Row>
                  {items?.map((item, id) => (
                    <Row key={id}>
                      <Col xs={4}>
                        <div
                          className={`explanations overlay-c cursor ${checkSelectedPara(
                            data,
                            categoryAns[Name],
                            "C"
                          )}`}
                          onClick={() => {
                            selectCategory(index, subcategory.id, "C", Name)
                            editProject()
                          }}
                        >
                          {/* <span className={"circle-bullet"}>
                            {item.text_c && <FaCircle />}
                          </span> */}
                          {/* {explanation.text_c} */}
                          <p
                            dangerouslySetInnerHTML={{ __html: item.text_c }}
                          ></p>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div
                          className={`explanations overlay-b cursor ${checkSelectedPara(
                            data,
                            categoryAns[Name],
                            "B"
                          )}`}
                          onClick={() => {
                            selectCategory(index, subcategory.id, "B", Name)
                            //editProject()
                          }}
                        >
                          {/* <span className={"circle-bullet"}>
                            {item.text_c && <FaCircle />}
                          </span> */}
                          <p
                            dangerouslySetInnerHTML={{ __html: item.text_b }}
                          ></p>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div
                          className={`explanations overlay-a cursor ${checkSelectedPara(
                            data,
                            categoryAns[Name],
                            "A"
                          )}`}
                          onClick={() => {
                            selectCategory(index, subcategory.id, "A", Name)
                            //editProject()
                          }}
                        >
                          {/* <span className={"circle-bullet"}>
                            {item.text_c && <FaCircle />}
                          </span> */}
                          <p
                            dangerouslySetInnerHTML={{ __html: item.text_a }}
                          ></p>
                        </div>
                      </Col>
                    </Row>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
      <style jsx>{`
        .circle-bullet {
          padding-top: 4px;
        }

        .title {
          font-weight: bold;
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
          display: flex;
        }

        .selected {
          // filter: saturate(0.2);
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
        .cursor {
          cursor: pointer;
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

        .toel {
          color: #525572;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 0px;
        }
      `}</style>
    </div>
  );
}

export default StepAccordion;

const checkSelected = (data, answers, ans, opt) => {
  if (data[0]?.ans === ans) {
    return "title";
  } else if (!data[0]?.ans && answers === ans) {
    return "title";
  } else {
    return opt;
  }
};

const checkSelectedPara = (data, answers, ans) => {
  if (data[0]?.ans === ans) {
    return "";
  } else if (!data[0]?.ans && answers === ans) {
    return "";
  } else {
    return "selected";
  }
};

const getSelectedCategory = (data, answers, ans) => {
  if (data[0]?.ans) {
    return data[0]?.ans;
  } else {
    return answers;
  }
};
