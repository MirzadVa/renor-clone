import Pagination from "@/components/steps/pagination";
import { Button, Col, Row, Alert } from "react-bootstrap";
import Wrapper from "@/components/steps/wrapper";
import Dropzone from "react-dropzone";
import StepHeader from "@/components/stepheader";
import React, { useContext, useState, useEffect } from "react";
import { WizardContext } from "../../pages/wizard";
import Image from "next/image";
import StepFooter from "../step-footer";
import getEditMode from "helpers/getEditMode";
import getProjectId from "helpers/getProjectId";

const Form = (props) => {
  const {
    nextStep,
    form,
    onChange,
    files,
    setFiles,
    locked,
    editMode,
    setStepsDone,
    stepsDone,
    saveProject,
    editProject,
    createAlert
  } = useContext(WizardContext);
  const [alert, setAlert] = useState(null);
  const [projectScript, setProjectScript] = useState([
    {
      name: "Projectnaam",
      type: "text",
      isInvalid: false,
      readOnly: editMode || locked ? true : false,
      required: true,
    },
    {
      name: "Projectnummer",
      type: "text",
      isInvalid: false,
      readOnly: editMode || locked ? true : false,
      required: true,
    },
    {
      name: "Klant",
      type: "text",
      isInvalid: false,
      readOnly: editMode || locked ? true : false,
      required: true,
    },
    {
      name: "Gebouwnaam",
      type: "text",
      readOnly: false,
      required: false,
    },
    {
      name: "Straatnaam",
      type: "text",
      readOnly: false,
      required: false,
    },
    {
      name: "Nummer",
      type: "text",
      readOnly: false,
      required: false,
    },
    {
      name: "Postcode",
      type: "text",
      readOnly: false,
      required: false,
    },
    {
      name: "Plaats",
      type: "text",
      readOnly: false,
      required: false,
    },
    {
      name: "Naam",
      type: "text",
      isInvalid: false,
      readOnly: editMode || locked ? true : false,
      required: true,
    },
    {
      name: "Bedrijf",
      type: "text",
      readOnly: false,
      required: false,
    },
    {
      name: "Email",
      type: "text",
      readOnly: false,
      required: false,
    },
    {
      name: "Telefoonnummer",
      type: "text",
      readOnly: false,
      required: false,
    },
  ]);

  const handleRemove = () => {
    const done = confirm("Weet je zeker dat je deze foto wilt verwijderen?");
    done ? setFiles("") : null;
  };

  const handleImage = (file: any) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      setFiles("" + e.target.result);
    };
    reader.readAsDataURL(file);
  };
  // const createAlert = (msg) => {
  //   setAlert(<Alert variant={"danger "}>{msg}</Alert>);
  //   setTimeout(() => {
  //     setAlert(null);
  //   }, 4000);
  // };
  const goToNext = () => {
    if (
      form["Projectnaam *"] !== "" &&
      form["Projectnummer *"] !== "" &&
      form["Klant *"] !== "" &&
      form["Naam *"] !== ""
    ) {
      if (getProjectId()) {
        editProject();
        nextStep();
      } else {
        saveProject();
        nextStep();
      }
    }
  };
  const formCheck = () => {
    let formSuccess = true
    const formValues = [...projectScript];
    formValues.map((elem, index) => {
      if (elem.required && form[`${elem.name}`] === "") {
        elem.isInvalid = true;
        formSuccess = false
      }
    });
    if(formSuccess){
      goToNext();
      setProjectScript([...formValues]);
    }else{
      createAlert("Vul alle verplichte velden in voordat u verder kan gaan.")
    }
  };

  const formHandler = (e, fieldName) => {
    const projScr = [...projectScript];
    projScr.map((elem) => {
      if (fieldName === elem.name) {
        elem.isInvalid = false;
      }
    });
    setProjectScript([...projScr]);
    onChange(e, fieldName);
  };

  useEffect(() => {
    const projScr = [...projectScript];
    if (locked) {
      projScr.map((elem) => {
        if (elem.required) {
          elem.readOnly = true;
        }
      });
      setProjectScript([...projScr]);
    }
  }, []);
  return (
    <>
      <Wrapper {...props}>
        {alert}
        <StepHeader
          {...props}
          title={"Projectgegevens"}
          intro={
            "Vul op deze pagina de algemene gegevens van uw project in. Indien u dit PvE gezamenlijk met het ontwerpteam of opdrachtgever invult, vul dan de gegevens van één van de teamleden in. De ingevulde gegevens zullen in het definitieve PvE worden opgenomen."
          }
        />
        <form>
          <Row>
            <Col xs={8} lg={12} xl={8}>
              <h3 className={"text-blue title"}>Projectgegevens</h3>
              <Row>
                {projectScript.map((field, index) => {
                  if (index < 2) {
                    return (
                      <Col xs={6} key={index}>
                        <div className="form-group">
                          <label>{field.name}*</label>
                          <input
                            type={field.type}
                            onChange={(e) => {
                              formHandler(e, field.name);
                              //editProject()
                            }}
                            value={form[field.name]}
                            className={
                              field.isInvalid
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            placeholder={field.name.replace(/\*/gi, " ")}
                            readOnly={field.readOnly}
                          />
                        </div>
                      </Col>
                    );
                  }
                })}
              </Row>
              <h3 className={"text-blue title"}>Objectgegevens</h3>
              <Row>
                {projectScript.map((field, index) => {
                  if (index > 1 && index < 8) {
                    return (
                      <Col xs={6} key={index}>
                        <div className="form-group">
                          <label>{field.name}{field.name === 'Klant' ? '*' : null}</label>
                          <input
                            type={field.type}
                            onChange={(e) => {
                              formHandler(e, field.name);
                              //editProject()
                            }}
                            value={form[field.name]}
                            className={
                              field.isInvalid
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            placeholder={field.name.replace(/\*/gi, " ")}
                            readOnly={field.readOnly}
                          />
                        </div>
                      </Col>
                    );
                  }
                })}
              </Row>
              <h3 className={"text-blue title"}>Opgesteld door</h3>
              <Row>
                {projectScript.map((field, index) => {
                  if (index > 7 && index < projectScript.length) {
                    return (
                      <Col xs={6} key={index}>
                        <div className="form-group">
                          <label>{field.name}{field.name === 'Naam' ? '*' : null}</label>
                          <input
                            type={field.type}
                            onChange={(e) => {
                              formHandler(e, field.name);
                              //editProject()
                            }}
                            value={form[field.name]}
                            className={
                              field.isInvalid
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            placeholder={field.name.replace(/\*/gi, " ")}
                            readOnly={field.readOnly}
                          />
                        </div>
                      </Col>
                    );
                  }
                })}
              </Row>
              <Row>
                {!files && (
                  <Col xs={12}>
                    <div className="form-group mt-1">
                      <label>Voeg een foto van het gebouw toe</label>
                      <Dropzone
                        onDrop={(acceptedFiles) => {
                          handleImage(acceptedFiles[0]);
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            style={{
                              cursor: "pointer",
                              flex: "1",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              borderWidth: "2px",
                              borderRadius: "2px",
                              borderColor: "#eeeeee",
                              borderStyle: "dashed",
                              backgroundColor: "#fafafa",
                              color: "#bdbdbd",
                              outline: "none",
                              transition: "border .24s ease-in-out",
                              padding: "50px 0px",
                            }}
                            {...getRootProps()}
                          >
                            <input
                              {...getInputProps()}
                              accept=".png, .jpg, .jpeg"
                            />
                            <i
                              style={{
                                fontSize: "50px",
                                paddingBottom: "5px",
                              }}
                              className="far fa-file-image"
                            ></i>
                            <p className="m-0">
                              <span>Sleep een foto of gebruik de </span>
                              <span
                                className="text-primary"
                                style={{ textDecoration: "underline" }}
                              >
                                browser
                              </span>
                            </p>
                          </div>
                        )}
                      </Dropzone>
                    </div>
                  </Col>
                )}
                <Col xs={12}>
                  {files && (
                    <div
                      style={{
                        position: "relative",
                        width: 700,
                        height: 400,
                        paddingTop: 10,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "2%",
                          height: "20px",
                          width: "20px",
                          borderRadius: "50%",
                          backgroundColor: "white",
                          top: "5%",
                          cursor: "pointer",
                        }}
                        onClick={handleRemove}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <i className="fa fa-times"></i>
                        </span>
                      </div>
                      <img
                        className="img-thumbnail"
                        src={files}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          verticalAlign: "middle",
                        }}
                      />
                    </div>
                  )}
                </Col>
              </Row>
              <Button
                onClick={() => {
                  formCheck();
                  setStepsDone({ ...stepsDone, formStep: true });
                }}
                variant={"primary"}
                className="button mt-5 py-2 btnclass"
                block
              >
                {" "}
                OPSLAAN EN DOOR NAAR CATEGORIEEN
              </Button>
              {/* () =>  */}
            </Col>
          </Row>
        </form>
        <style jsx>{`
          .title {
            margin-top: 20px;
            margin-bottom: 10px;
          }

          .button {
            width: 100%;
          }
        `}</style>
      </Wrapper>

      {/* <StepFooter /> */}
    </>
  );
};

export default Form;
