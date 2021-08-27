import { useCategory } from "@/lib/swr-hooks";
import React, { useContext } from "react";
import { WizardContext } from "../pages/wizard";

const StepHeader = (props) => {
  const { nextStep, step, previousStep } = useContext(WizardContext);
  // console.log(props)

  //static category lading from props
  if (props.intro !== undefined) {
    return (
      <>
        <div>
          <div className="d-flex align-items-center">
            {step !== 7 && (
              <div
                className={`circle ${
                  step - 1 == 0 || step == 8 ? "d-none" : ""
                }`}
              >
                <span>{step - 2}</span>
              </div>
            )}
            <span className={`title ${step - 1 == 0 || step == 8 ? "" : ""}`}>
              {props.title}
            </span>
          </div>
          <p className={"intro"}>{props.intro}</p>
        </div>
        <style jsx>
          {`
            .title {
              color: #272c63;
              font-size: 35px;
              font-weight: bold;
              vertical-align: sub;
            }
            .intro {
              font-size: 18px;
              margin-top: 30px;
              font-family: "PT Sans";
            }

            .pointer {
              cursor: pointer;
            }
          `}
        </style>
      </>
    );
  } else {
    //dynamic category loading from db
    const { category, isLoading } = useCategory(props.categoryId);
    // console.log(category, "another")
    if (isLoading) {
      return <></>;
    } else {
      return (
        <>
          <div style={{ alignItems: "center" }}>
            {step !== 7 && (
              <div className="circle" style={{ marginTop: 4 }}>
                <span>{step - 2}</span>
              </div>
            )}
            <span className={"title"}>{category?.name}</span>
            <p className={"intro"}>{category?.intro}</p>
          </div>
          <style jsx>
            {`
              .title {
                color: #272c63;
                font-size: 35px;
                font-weight: bold;
                vertical-align: top;
              }
              .intro {
                font-size: 18px;
                margin-top: 30px;
                margin-bottom: 5px;
                font-family: "PT Sans";
              }
            `}
          </style>
        </>
      );
    }
  }
};

export default StepHeader;
