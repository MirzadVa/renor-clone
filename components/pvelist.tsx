import H2 from "./elements/h2";
import React, { useState } from "react";
import P from "./elements/p";
import {
  Accordion,
  Button,
  Card,
  Col,
  Row,
  Form,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { useBaseData } from "../lib/swr-hooks";
import Image from "next/image";
import { FaEye, FaFilePdf, FaSignOutAlt } from "react-icons/fa";
import MyPdf from "@/components/MyPdf";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import getUserID from "helpers/getUserID";

export default function PveList({ numOfLicenses, projects, setProjects }) {
  const router = useRouter();
  const [formattedData, setFormatedData] = useState([]);
  // const {setForm} = useContext(WizardContext)
  const [form, setForm] = useState();
  const [generateButton, setGenerateButton] = useState(true);

  let button;
  let today = new Date().toISOString().substr(0, 10);
  if (numOfLicenses <= projects.length) {
    button = (
      <Button
        className="px-5 py-2 btnclass greyBtn"
        style={{ fontSize: 19, fontWeight: 600 }}
      >
        MAAK EEN NIEUW PvE
      </Button>
    );
  } else {
    button = (
      <Button
        className="px-5 py-2 btnclass"
        style={{
          fontSize: 19,
          fontWeight: 600,
          marginTop: projects.length === 0 ? "40px" : "0px",
        }}
        variant={"primary"}
        href={"/wizard"}
      >
        MAAK EEN NIEUW PvE
      </Button>
    );
  }
  const handleRequestPdf = (stepForm, id) => {
    try {
      axios
        .get(`/api/generate-pdf`, { params: { stepForm, categoryAns } })
        .then((res) => {
          if (res.status === 200) {
            setFormatedData(res.data);
            setProjects(id);
            axios.post('/api/pdf-counter', {projectId: id, userId: parseInt(getUserID())})
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const goToWizard = (elem) => {
    localStorage.setItem("editMode", "true");
    localStorage.setItem("projectId", elem.id);
    router.push("/wizard");
  };
  return (
    <>
      <div className={"login-form-wrapper-2 pve-list"}>
        <Row className={"title"}>
          <Col xs={4}>
            <p className={"login-title"}>Mijn PvE’s</p>
          </Col>
          <Col xs={8}>
            <p className={"license-list"}>SALDO: {numOfLicenses}</p>
          </Col>
        </Row>

        {/* from here */}
        <Row>
          <Col xs={12}>
            <Table style={{ position: "relative" }}>
              <thead>
                <tr>
                  <th className={"column-title"}>Projectnaam</th>
                  <th className={"column-title"}>Gebouwnaam</th>
                  <th className={"column-title"}>Acties</th>
                </tr>
              </thead>
              {projects.length > 0 ? (
                <tbody>
                  {projects.map((elem) => (
                    <tr>
                      <td className={"table-td"}>
                        <span
                          className="project-name"
                          onClick={() => goToWizard(elem)}
                          style={{
                            fontSize: elem.projectnaam.length > 25 ? '10px' : null
                          }}
                        >
                          {elem.projectnaam}
                        </span>
                      </td>
                      <td className={"table-td project-gebu"}>{elem.gebouwnaam}</td>

                      <td className={"table-td"}>
                        <Button
                          className={"btn-menu2 btns"}
                          variant={"info"}
                          style={{ marginBottom: "7px" }}
                          onClick={() => goToWizard(elem)}
                        >
                          <div className='button-container'>
                            <span className={"btn-label mt-na1"}>
                              <FaEye />
                              &nbsp;
                            </span>
                            <span className={"btn-text text-btn"}>BEKIJKEN</span>
                          </div>
                        </Button>
                      </td>
                      {elem.locked ? (
                        <td className={"table-td"}>
                          {!elem.pdfGenerated ? (
                            <Button
                              className={"btn-menu2 btn-green btns ml-2"}
                              variant={"primary"}
                              style={{ marginBottom: "7px" }}
                              onClick={() => {
                                handleRequestPdf(
                                  JSON.parse(unescape(elem.category)),
                                  elem.id
                                );
                              }}
                            >
                              <div className='button-container'>
                                <span className={"btn-label mt-na1"}>
                                  <FaFilePdf />
                                  &nbsp;
                                </span>
                                <span className={"btn-text text-btn"}>
                                  GENEREER EEN PDF
                                </span>
                              </div>
                            </Button>
                          ) : (
                            formattedData.length > 0 ? (
                            <PDFDownloadLink
                              document={
                                <MyPdf
                                  today={today}
                                  categoriesData={formattedData}
                                  formData={{
                                    Bedrijf: elem.bedrijf,
                                    Email: elem.email,
                                    Gebouwnaam: elem.gebouwnaam,
                                    Klant: elem.klant,
                                    Naam: elem.naam,
                                    Nummer: elem.nummer,
                                    Plaats: elem.plaats,
                                    Postcode: elem.postcode,
                                    Projectnaam: elem.projectnaam,
                                    Projectnummer: elem.projectnummer,
                                    Straatnaam: elem.straatnaam,
                                    Telefoonnummer: elem.telefoonnummer,
                                  }}
                                  files={""}
                                />
                              }
                              fileName={`PvEopmaat_GezondeKantoren_${
                                elem.projectnaam ? elem.projectnaam : "null"
                              }_${
                                elem.projectnummer ? elem.projectnummer : "null"
                              }_${today}.pdf`}
                            >
                              {({ blob, url, loading, error }) => (
                                <Button
                                  className={"btn-menu2 btn-green btns ml-2"}
                                  variant={"primary"}
                                  style={{ marginBottom: "7px" }}
                                >
                                  <div className="d-flex justify-content-around">
                                    <span className={"btn-label mt-na1"}>
                                      <FaFilePdf />
                                      &nbsp;
                                    </span>
                                    <span className={"btn-text"}>
                                      {loading
                                        ? "EVEN GEDULD A.U.B."
                                        : "DOWNLOAD DE PDF"}
                                    </span>
                                  </div>
                                </Button>
                              )}
                            </PDFDownloadLink> ) : null
                          )}
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              ) : (
                <div className={"no-projects-wrapper"}>
                  <p>
                    U heeft nog geen PvE’s aangemaakt. Nadat u een PvE maakt,
                    wordt deze hier zichtbaar. Nieuw saldo kan aangevraagd
                    worden via
                    <a href="https://www.tvvlconnect.nl" className="anchor">
                      {" "}
                      www.tvvlconnect.nl.
                    </a>
                  </p>
                </div>
              )}
            </Table>
          </Col>
        </Row>
        {/* <Row>
          <Col xs={12} className='d-flex justify-content-between'>
            <div className='d-flex flex-column justify-content-between'>
              <p className={"column-title"}>Projectnaam</p>
              <p>PvE voor GBS</p>
              <p>PvE voor GBS</p>
              <p>PvE voor GBS</p>
            </div>
            <div className='d-flex flex-column justify-content-between'>
              <p className={"column-title"}>Gebouwnaam</p>
              <p>Kantoor</p>
              <p>Kantoor</p>
              <p>Kantoor</p>
            </div>
            <div className='d-flex flex-column justify-content-between'>
              <p className={"column-title"}>
                <strong>Acties</strong>
              </p>
              <div>
                <Button className={"btn-menu2 btns"} variant={"info"} style={{ marginBottom: "7px" }}>
                  <div className='d-flex justify-content-around'>
                    <span className={"btn-label mt-na1"}>
                      <FaEye />
                      &nbsp;
                    </span>
                    <span className={"btn-text"}>BEKIJKEN</span>
                  </div>
                </Button>
                &nbsp;
                <Button className={"btn-menu2 btn-green btns ml-2"} variant={"primary"} style={{ marginBottom: "7px" }}>
                  <div className='d-flex justify-content-around'>
                    <span className={"btn-label mt-na1"}>
                      <FaFilePdf />
                      &nbsp;
                    </span>
                    <span className={"btn-text"}>DOWNLOAD</span>
                  </div>
                </Button>
              </div>
              <div className='mt-2'>
                <Button className={"btn-menu2 btns"} variant={"info"} style={{ marginBottom: "7px" }}>
                  <div className='d-flex justify-content-around'>
                    <span className={"btn-label mt-na1"}>
                      <FaEye />
                      &nbsp;
                    </span>
                    <span className={"btn-text"}>BEKIJKEN</span>
                  </div>
                </Button>
                &nbsp;
                <Button className={"btn-menu2 btn-green btns ml-2 "} variant={"primary"} style={{ marginBottom: "7px" }}>
                  <div className='d-flex justify-content-around'>
                    <span className={"btn-label mt-na1"}>
                      <FaFilePdf />
                      &nbsp;
                    </span>
                    <span className={"btn-text"}>DOWNLOAD</span>
                  </div>
                </Button>
              </div>
              <div className='mt-2'>
                <Button className={"btn-menu2 btns "} variant={"info"} style={{ marginBottom: "7px" }}>
                  <div className='d-flex justify-content-around'>
                    <span className={"btn-label mt-na1"}>
                      <FaEye />
                      &nbsp;
                    </span>
                    <span className={"btn-text"}>BEKIJKEN</span>
                  </div>
                </Button>
                &nbsp;
                <Button className={"btn-menu2 btn-green btns ml-2 "} variant={"primary"} style={{ marginBottom: "7px" }}>
                  <div className='d-flex justify-content-around'>
                    <span className={"btn-label mt-na1"}>
                      <FaFilePdf />
                      &nbsp;
                    </span>
                    <span className={"btn-text"}>DOWNLOAD</span>
                  </div>
                </Button>
              </div>
            </div>
          </Col>
        </Row> */}

        <Row>
          <Col xs={12} className={"text-center next-page-link mt-5"}>
            {numOfLicenses <= projects.length && (
              <p>U heeft onvoldoende saldo om een nieuw PvE aan te maken.</p>
            )}
            {/* style={{width: "246px", borderRadius: "4px", marginTop:"25px"}} */}
            {button}
          </Col>
        </Row>
      </div>

      <style jsx>{`
        .mt-na1 {
          margin-top: -1px;
        }
        .column-title {
          color: #009fdf;
          font-weight: bold;
          border: none;
        }

        .subtitle {
          font-size: 13px;
          margin-top: 25px;
          margin-bottom: 0;
        }

        .subtitle-link {
          font-size: 13px;
          color: #009fdf;
        }

        .login-title {
          font-weight: bold;
          color: #164291;
          font-size: 30px;
        }

        .title {
          padding-top: 10px;
          padding-bottom: 10px;
        }

        .form-img {
          float: right;
        }

        .license-list {
          color: #164291;
          font-weight: bold;
          text-align: right;
          line-height: 50pt;
        }
        .next-page-link {
          margin-top: 25px;
        }
        .btns {
          padding: 5px;
        }
        .table-td {
          border: none;
        }
      `}</style>
    </>
  );
}
const categoryAns = {
  Lucht: "B",
  Klimaat: "A",
  Licht: "C",
  Geluid: "A",
  Kwaliteit: "A",
};
