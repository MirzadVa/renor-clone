import { Container } from "react-bootstrap";
import React, { useContext } from "react";
import { WizardContext } from "../../pages/wizard";
import checkForm from "helpers/checkForm";

const Pagination = (props) => {
  const { step, setStep, form, createAlert, stepsDone, categoryAns, stepForm } =
    useContext(WizardContext);

  const checkThema = () => {
    if (
      categoryAns?.Lucht === "" ||
      categoryAns?.Klimaat === "" ||
      categoryAns?.Lucht === "" ||
      categoryAns?.Licht === "" ||
      categoryAns?.Geluid === ""
    ) {
      return false
    }
    return true
  }

  const formCheck = (step) => {
    if (checkForm(form)) {
      if(!checkThema()){
        return createAlert("Selecteer eerst de thema's voordat u verder kan naar de volgende stap.");
      }
      setStep(step);
    } else {
      createAlert("Vul alle verplichte velden in voordat u verder kan gaan.");
    }
  };
  return (
    <div>
      <h2 className={"orange-text"}>
        Programma van Eisen Gezonde Kantoren 2021
      </h2>
      {/* <h2 className={"orange-text"}>Gezonde Kantoren 2021</h2> */}
      <br />
      <span className={"menu-title"}>Stappen</span>
      <br />
      <div className={"step-pagination mt-4"}>
        <div className={"category selected"} onClick={() => setStep(1)}>
          <span
            className={`${
              stepsDone.formStep ||
              step == 1 ||
              (form.Projectnaam !== "" &&
                form.Projectnummer !== "" &&
                form.Klant !== "" &&
                form.Naam !== "")
                ? "dot"
                : "dot-result"
            }`}
          />
          <span className={`text ${step == 1 ? "active" : step}`}>
            Projectgegevens
          </span>
        </div>
        <div className={"category"} onClick={() => formCheck(2)}>
          <span
            className={`${
              stepsDone.themaStep ||
              step == 2 ||
              (categoryAns.Lucht !== "" &&
                categoryAns.Klimaat !== "" &&
                categoryAns.Licht !== "" &&
                categoryAns.Geluid !== "")
                ? "dot"
                : "dot-result"
            }`}
          />
          <span className={`text ${step == 2 ? "active" : step}`}>Thema's</span>
        </div>
        <div className={"subcategory"} onClick={() => formCheck(3)}>
          <span
            className={
              stepsDone.luchStep || step === 3 || stepForm.Lucht.length !== 0
                ? "dot active-dot"
                : "dot"
            }
          />
          <span className={`text ${step == 3 ? "active" : step}`}>Lucht</span>
        </div>
        <div className={"subcategory"} onClick={() => formCheck(4)}>
          <span
            className={
              stepsDone.klimaatStep ||
              step === 4 ||
              stepForm.Klimaat.length !== 0
                ? "dot active-dot"
                : "dot"
            }
          />
          <span className={`text ${step == 4 ? "active" : step}`}>Klimaat</span>
        </div>
        <div className={"subcategory"} onClick={() => formCheck(5)}>
          <span
            className={
              stepsDone.lichtStep || step === 5 || stepForm.Licht.length !== 0
                ? "dot active-dot"
                : "dot"
            }
          />
          <span className={`text ${step == 5 ? "active" : step}`}>Licht</span>
        </div>
        <div className={"subcategory"} onClick={() => formCheck(6)}>
          <span
            className={
              stepsDone.geluidStep || step === 6 || stepForm.Geluid.length !== 0
                ? "dot active-dot"
                : "dot"
            }
          />
          <span className={`text ${step == 6 ? "active" : step}`}>Geluid</span>
        </div>
        <div className={"category"} onClick={() => formCheck(7)}>
          <span
            className={`${
              stepsDone.kwaliteitsborgingStep || step == 7
                ? "dot"
                : "dot-result"
            }`}
          />
          <span className={`text ${step == 7 ? "active" : step}`}>
            Kwaliteitsborging
          </span>
        </div>
        <div className={"category unselected"} onClick={() => formCheck(8)}>
          <span className={`${step == 8 ? "dot" : "dot-result"}`} />
          <span className={`text ${step == 8 ? "active" : step}`}>
            Resultaten
          </span>
        </div>
      </div>
      <style jsx>{`
        .title {
          line-height: 1;
          width: 100%;
          font-weight: bold;
          font-size: 19px;
        }

        .subtitle {
          line-height: 1px;
          font-size: 20px;
        }

        .small {
          font-size: 13px;
        }

        .btn {
          margin-top: 10px;
        }

        .btn-label {
          margin-right: 5px;
          float: left;
          margin-left: 3px;
        }

        .btn-text {
          float: left;
        }

        .menu-title {
          font-size: 26px;
          margin-top: 20pt;
          margin-bottom: 20pt;
          color: #272c63;
          font-weight: bold;
        }

        .category {
          height: 30px;
          color: black;
          margin-top: 7px;
          margin-bottom: 7px;
          cursor: pointer;
        }

        .subcategory {
          margin-top: 7px;
          height: 30px;
          color: black;
          margin-bottom: 7px;
          cursor: pointer;
        }

        .selected a {
          height: 20px;
          font-weight: bold;
          color: black !important;
        }

        .subcategory .dot {
          margin-left: 20px;
          box-shadow: 0px 3px 6px #00000029;
          opacity: 1;
          width: 15px;
          height: 15px;
          border: 2px solid #ffffff;
          background: #d8d8d4 0% 0% no-repeat padding-box;
        }
        .subcategory .active-dot {
          background: #209bd7 0% 0% no-repeat padding-box;
        }

        .dot {
          margin-bottom: -3px;
          margin-right: 5px;
          width: 20px;
          height: 20px;
          min-width: 20px;
          min-height: 20px;
          border-radius: 50%;
          background: #c8d419 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 6px #00000029;
          border: 2px solid #ffffff;
          opacity: 1;
          display: inline-block;
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
        }

        .text.active {
          font-weight: bold;
        }

        svg {
          margin-right: 10px;
        }

        .step-pagination {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};
export default Pagination;
