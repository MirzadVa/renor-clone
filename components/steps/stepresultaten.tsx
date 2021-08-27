import { Button, Col, Row } from "react-bootstrap";
import Wrapper from "@/components/steps/wrapper";
import loadable from "@loadable/component";
import StepHeader from "@/components/stepheader";
import StepAccordionResults from "@/components/steps/accordionResults";
import { FaFilePdf, FaLock } from "react-icons/fa";
import React, { useContext, useState, useEffect } from "react";
import { WizardContext } from "pages/wizard";
import axios from "axios";
import Loader from "../loader";
import Image from "next/image";
import StepFooter from "../step-footer";
import SweetAlert from "react-bootstrap-sweetalert";
// const MyPdf= loadable(() => import("@/components/MyPdf"))
import MyPdf from "@/components/MyPdf";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import getEditMode from "helpers/getEditMode";
import getProjectId from "helpers/getProjectId";
import getUserID from "helpers/getUserID";

// const { PDFViewer, PDFDownloadLink }= loadable(() => import("@react-pdf/renderer"))

const StepResultaten = (props) => {
  const {
    lockProject,
    loadingDocument,
    setLoadingDocument,
    previousStep,
    step,
    stepForm,
    categoryAns,
    form,
    files,
    locked,
    setLocked,
    saveProject,
    editProject,
    editMode,
  } = useContext(WizardContext);
  const [id, setID] = useState(1);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("Lucht");
  const [select, setSelect] = useState("1");
  const [formattedData, setFormattedData] = useState([]);
  const [reqSent, setReqSent] = useState(false);
  const [today, setToday] = useState(new Date().toISOString().substr(0, 10));
  const [alert, setAlert] = useState(null);
  const [color, setColor] = useState(false);
  const [finishedDocument, finishDocument] = useState(false);
  var pdfCategories = [];
  var pdfSubCategories = [];
  // const {isLoading, subcategories} = useSubcategoriesViaCategory(id)
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getApiData() {
      setLoading(true);
      const response = await axios.get(
        `/api/get-subcategories-via-category?id=${id}`
      );
      const data = await response.data;
      setLoading(false);
      setCategories(data);
      return null;
    }
    console.log("LOCKED", locked);
    getApiData();
  }, [id]);

  const idType = [
    { id: 1, type: "Lucht" },
    { id: 2, type: "Klimaat" },
    { id: 3, type: "Licht" },
    { id: 4, type: "Geluid" },
    { id: 5, type: "Kwaliteit" },
  ];

  const subCategoriesCall = (cat) => {
    let subCategories = [];
    cat.map((subCat) => {
      const result = stepForm[cat.type].filter(
        (val) => val.subID === subCat.id
      );
      const exp = result[0]?.exp
        ? result[0]?.exp
        : getType(categoryAns[cat.type]);
      const ans = result[0]?.ans ? result[0]?.ans : categoryAns[cat.type];
      axios
        .get(
          `/api/get-explanation-fields-via-subcategory?id=${subCat.id}&exp=${exp}`
        )
        .then((res) =>
          subCategories.push({ info: res.data, ans, exp, name: subCat.name })
        );
    });
    return subCategories;
  };

  const showAlert = () => {
    setAlert(
      <SweetAlert
        showCancel
        confirmBtnText="Ja ik weet het zeker!"
        cancelBtnText="Annuleer"
        confirmBtnBsStyle="danger"
        btnSize="md"
        title="Weet je het zeker?"
        onConfirm={() => {
          setAlert(null);
          lockProject();
        }}
        onCancel={() => setAlert(null)}
      >
        Deze gegevens kunnen hierna niet meer worden gewijzigd.
      </SweetAlert>
    );
  };

  const handleRequestPdf = async () => {
    setReqSent(true);
    setToday(new Date().toISOString().substr(0, 10));
    axios
      .get(`/api/generate-pdf`, { params: { stepForm, categoryAns } })
      .then((res) => {
        setFormattedData(res.data);
        axios.post('/api/pdf-counter', {projectId: getProjectId(), userId: parseInt(getUserID())})
      });
  };

  const handleDownloadPdf = () => {
    console.log("data to download is, ", formattedData);
    console.log("fomData to donwload is, ", form);
  };

  const handleChange = (id) => {
    setID(id);
    setCategories([]);
    setSelect("" + id);
    switch (+id) {
      case 1:
        setType("Lucht");
        break;
      case 2:
        setType("Klimaat");
        break;
      case 3:
        setType("Licht");
        break;
      case 4:
        setType("Geluid");
        break;
      case 5:
        setType("Kwaliteit");
        break;
    }
  };

  if (loading || loadingDocument) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <Wrapper {...props}>
        <StepHeader {...props} title={"Resultaten"} intro={" "} />
        <Row>
          <Col xs={8} className='resultaten-text'>
            <p className={"intro-text "}>
              Op deze pagina vindt u het PvE dat is samengesteld voor uw gebouw.
              U kunt het PvE inzien met de definitieve omschrijving en
              specificaties per eis. Ook kunt u het PvE definitief maken.
              Hiermee wordt het beschikbaar als PDF document zodat u het direct
              kunt gebruiken.{" "}
            </p>
          </Col>
          <Col xs={4}>
            <p className={"tips-title"}>Vragen of tips?</p>
            <p className={"intro-text"}>
              Heeft u vragen over de werking van de webapplicatie, of heeft u
              tips hoe het nog beter kan? Schroom niet een neem contact met ons
              op.{" "}
            </p>
            <p>
              Stuur een email naar:{" "}
              <a
                className="tips-email"
                href="mailto:pvegezondekantoren@tvvl.nl"
              >
                pvegezondekantoren@tvvl.nl
              </a>
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p className={"note"}>
              Dit PvE kunt u terugvinden bij{" "}
              <span className="tips-title">Mijn PvE’s</span> op de hoofdpagina.
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={8} className="lock-project-wrapper">
            <Row>
              <Col xs={12}>
                <span className={"resutate-title"}>
                  Project opslaan als PDF
                </span>
              </Col>
              <Col xs={12}>
                <p className={"resultate-intro"}>
                  Om een PDF te kunnen genereren worden de volgende gegevens
                  vastgelegd, dit kan hierna niet meer worden gewijzigd.
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <p className={"result-head"}>Projectnaam</p>
                <p className={"result-value"}>{form?.Projectnaam}</p>
              </Col>
              <Col xs={6}>
                <p className={"result-head"}>Projectnummer</p>
                <p className={"result-value"}>{form?.Projectnummer}</p>
              </Col>
              <Col xs={6}>
                <p className={"result-head"}>Klant</p>
                <p className={"result-value"}>{form?.Klant}</p>
              </Col>
              <Col xs={6}>
                <p className={"result-head"}>Naam</p>
                <p className={"result-value"}>{form?.Naam}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                {!locked ? (
                  <Button
                    onClick={() => showAlert()}
                    className={"btn-menu2 btn-big btnclass no-shadow-focus"}
                    variant={""}
                    style={{
                      width: "80%",
                      padding: "2px",
                      marginBottom: "10px",
                      color: "white",
                      backgroundColor: "#009FDF",
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <div className="d-flex justify-content-around align-items-baseline">
                      <span
                        className={"btn-label"}
                        style={{ fontSize: 22, color: "lightgray" }}
                      >
                        <FaLock color={"white"} />
                        &nbsp;
                      </span>
                      <span className={"btn-text "}>GEGEVENS VASTLEGGEN</span>
                    </div>
                  </Button>
                ) : (
                  <Button
                    className={"btn-menu2  btn-big btnclass no-shadow-focus"}
                    variant={""}
                    style={{
                      width: "80%",
                      padding: "2px",
                      marginBottom: "10px",
                      color: "white",
                      backgroundColor: "lightgray",
                    }}
                  >
                    <div className="d-flex justify-content-around align-items-baseline">
                      <span
                        className={"btn-label"}
                        style={{ fontSize: 22, color: "white" }}
                      >
                        <FaLock />
                        &nbsp;
                      </span>
                      <span className={"btn-text"}>GEGEVENS VASTLEGGEN</span>
                    </div>
                  </Button>
                )}
              </Col>
              <Col xs={6}>
                {formattedData.length > 0 ? (
                  <PDFDownloadLink
                    document={
                      <MyPdf
                        today={today}
                        categoriesData={formattedData}
                        formData={form}
                        files={files}
                      />
                    }
                    fileName={`PvEopmaat_GezondeKantoren_${
                      form.Projectnaam ? form.Projectnaam : "null"
                    }_${
                      form.Projectnummer ? form.Projectnummer : "null"
                    }_${today}.pdf`}
                  >
                    {({ blob, url, loading, error }) => (
                      <Button
                        onClick={() => handleDownloadPdf()}
                        className={
                          "btn-menu2 btn-big btnc lass no-shadow-focus downloadPDF"
                        }
                        style={{
                          width: "80%",
                          padding: "2px",
                          marginBottom: "10px",
                          color: "white",
                          backgroundColor: "#adc90c",
                        }}
                      >
                        <div>
                          <span
                            className={"btn-label"}
                            style={{
                              fontSize: 22,
                              color: "white",
                              marginRight: "8px",
                            }}
                          >
                            <FaFilePdf />
                            &nbsp;
                          </span>
                          <span className={"btn-text"}>
                            {loading ? (
                              <span className={"btn-text"}>
                                EVEN GEDULD A.U.B.
                              </span>
                            ) : (
                              <span className={"download-btn"}>
                                DOWNLOAD DE PDF {setColor(true)}
                              </span>
                            )}
                          </span>
                        </div>
                      </Button>
                    )}
                  </PDFDownloadLink>
                ) : (
                  <Button
                    className={
                      locked
                        ? "btn-menu2 btn-big btnclass no-shadow-focus btnDownload downloadPDF"
                        : "btn-menu2 btn-big btnclass no-shadow-focus btnDownload"
                    }
                    style={{
                      width: "80%",
                      padding: "2px",
                      marginBottom: "10px",
                      color: reqSent ? "white" : "white",
                      backgroundColor: "red",
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                    onClick={() => handleRequestPdf()}
                  >
                    <div>
                      <span
                        className={"btn-label"}
                        style={{ fontSize: 22, color: "white" }}
                      >
                        <FaFilePdf />
                        &nbsp;
                      </span>
                      <span className={"btn-text"}>GENEREER EEN PDF</span>
                    </div>
                  </Button>
                )}
                {/* {formattedData.length > 0 ? (
                      <PDFDownloadLink document={<MyPdf today={today} categoriesData={formattedData} formData={form} files={files}/> } fileName={`PvEopmaat_GezondeKantoren_${form.Klant?form.Klant:'null'}_${form.Gebouwnaam?form.Gebouwnaam:'null'}_${today}.pdf`}>
                      {({ blob, url, loading, error }) =>
                        <Button  
                        onClick={()=>handleDownloadPdf()} 
                        className={"btn-menu2 btn-big btnc lass no-shadow-focus downloadPDF"}
                        style={{width: "80%", padding: "2px", marginBottom: "10px",color: 'white',backgroundColor: "#adc90c"}}>
                          <div >
                            <span className={"btn-label"} style={{ fontSize: 22 ,color:'white',marginRight:'8px'}}><FaFilePdf/>&nbsp;</span>
                            <span className={"btn-text"}>
                              {loading ?  
                                <span className={"btn-text"}>EVEN GEDULD A.U.B.</span>  
                                : 
                                <span className={"download-btn"} >DOWNLOAD DE PDF {setColor(true)}</span>
                              }
                            </span>
                          </div>
                        </Button>
                    }
                    </PDFDownloadLink>
                    ) : (
                      <Button   
                        className={reqSent ? "btn-menu2 btn-big btnclass no-shadow-focus btnDownload downloadPDF" : "btn-menu2 btn-big btnclass no-shadow-focus btnDownload"}
                        style={{width: "80%", padding: "2px", marginBottom: "10px",color:reqSent?'white':'white',backgroundColor: 'red'}}>
                          <div >
                            <span className={"btn-label"} style={{ fontSize: 22 ,color:'white'}}><FaFilePdf/>&nbsp;</span>
                            <span className={"btn-text"}>
                            GENEREER EEN PDF
                            </span>
                          </div>
                        </Button>
                    )} */}
              </Col>
            </Row>
            {/* <p className={"intro-text"}>Op deze pagina vindt u het PvE dat is samengesteld voor uw gebouw. U kunt het PvE inzien met de definitieve omschrijving en specificaties per eis. Ook kunt u het PvE definitief maken. Hiermee wordt het beschikbaar als PDF document zodat u het direct kunt gebruiken. </p> */}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="d-flex my-5 font-awesome">
              <div>
                <h3 className={"category-result-title"}>
                  Bekijk de resultaten per thema
                </h3>
              </div>
              <select
                className="ml-5 custom-selects  px-2 select-options-1"
                value={select}
                onChange={(e) => handleChange(+e.target.value)}
              >
                <option className="select-options-1 " value="1">
                  {" "}
                  1 Lucht
                </option>
                <option className="select-options-1" value="2">
                  {" "}
                  2 Klimaat
                </option>
                <option className="select-options-1" value="3">
                  {" "}
                  3 Licht
                </option>
                <option className="select-options-1" value="4">
                  {" "}
                  4 Geluid
                </option>
                {/* <option className="select-options-1" value="5"> 5 Kwaletiet</option> */}
              </select>
            </div>
          </Col>
        </Row>

        {/* {console.log('categories are, ',categories)} */}
        {categories.length > 0 && (
          <StepAccordionResults type={type} subcategories={categories} />
        )}
        <div style={{ marginTop: 200 }}></div>
        <style jsx>{`
              .category-result-title {
                color:#272C63;
                font-weight: bold;
                font-size:35px;
              }
              .download-btn {
                color:white !important;
                text-decoration:none !important;
              }

              .activated {
                background-color: #209BD7;
              }

              .disabled-circle {
                border-color: #DADADA !important;
                background-color: #DADADA !important;
                color: #A7A7A7 !important;
              }

              .circle {
                font-weight: bold;
                height: 20px;
                background-color: white;
                border-color: white;
                color: #209bd7;
                width: 20px;
                font-size: 12px;
              }

              .buttons .btn {
                margin-right: 10px;
              }

              .buttons {
                margin-right: 5px;
              }

              .intro-text {
                font-size: 16px;
              }

              .tips-title {
                color: #009FDF;
                font-size: 17px;
                font-weight: bold;
              }
              .tips-email {
                color: #009FDF;
                font-size: 15px;
                font-weight: bold;
              }
              .custom-selects{
                width: 230px;
                background-color: #F0F0F0;
                color: #272C63;
                font-size: 24px;
                font-weight: bolder;
                padding: 10px !important;
                border: 0px;
                border: 0px;
              }
              .custom-selects:focus{
                border: 0px;
              }
              .custom-selects:active{
                border: 0px;
              }
              .custom-selects:hover{
                border: 0px;
              }
              .select-options-1{
                color: #272C63;
                font-size: 22px;
                font-weight: 600;
                padding: 10px !important;
                border: 0px;
              }
              .select-options-1:after{
                content: "1"
                color: #ffffff;
                background-color: #272C63;
                height: 20px;
                width: 20px;
                display: inline-block;
              }
              .select-options:focus .custom-selects{
                border: 0px;
              }
              .circles{
                border: 0.1em solid #272C63;
                border-radius: 100%;
                height: 40px;
                width: 40px;
                text-align: center;
                background-color: #272C63;
                display: inline-block;
                margin-right: 15px;
              }
            `}</style>
      </Wrapper>
      {/* <StepFooter /> */}
      {/* <PDFViewer width='100%' height='100%'>
        <MyPdf categoriesData={data.length>0?data:dummyData} formData={form}/>
        </PDFViewer> */}
      {alert}
    </>
  );
};

export default StepResultaten;
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
