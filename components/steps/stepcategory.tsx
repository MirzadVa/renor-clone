import { Button, Col, Row } from "react-bootstrap"
import Wrapper from "@/components/steps/wrapper"
import StepHeader from "@/components/stepheader"
import { useSubcategoriesViaCategory } from "@/lib/swr-hooks"
import StepAccordion from "@/components/steps/accordion"
import StepAccordionResults from "@/components/steps/accordionResults"
import { FaList } from "react-icons/fa"

const StepCategory = (props) => {
  const { isLoading, subcategories } = useSubcategoriesViaCategory("4")

  if (isLoading) {
    return <></>
  }

  return (
    <Wrapper {...props}>
      <StepHeader {...props} title={"Resultaten"} intro={" "} />

      <Row>
        <Col xs={9}>
          <p className={"intro-text"}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
            et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
            rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <Button variant={"primary"} className='btnclass' style={{ padding: "3px", marginBottom: "7px", marginRight: "10px" }}>
            Maak dit PvE definitief
          </Button>
          <Button
            variant={"primary"}
            className='btnclass'
            style={{
              padding: "3px",
              marginBottom: "7px",
              marginRight: "10px",
              backgroundColor: "#A7A7A7!important",
              borderColor: "#A7A7A7!important",
            }}
          >
            Downloaden PDF
          </Button>
        </Col>
        <Col xs={3}>
          <p className={"tips-title"}>Vragen of tips?</p>
          <p className={"intro-text"}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
          </p>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <p className={"note"}>Dit PvE kan je terugvinden bij Mijn PvE’s de hoofdpagina.</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h3 className={""}>Resultaat per categorie</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className={"buttons"}>
            <Button variant={"success activated"} className='btnclass'>
              <span className={"circle"}>1</span>
              <span className={"btn-text"}>Lucht</span>
            </Button>
            <Button variant={"success unactivated"} className='btnclass'>
              <span className={"circle disabled-circle"}>2</span>
              <span className={"btn-text"}>Klimaat</span>
            </Button>
            <Button variant={"success unactivated"} className='btnclass'>
              <span className={"circle disabled-circle"}>3</span>
              <span className={"btn-text"}>Licht</span>
            </Button>
            <Button variant={"success unactivated"} className='btnclass'>
              <span className={"circle disabled-circle"}>4</span>
              <span className={"btn-text"}>Geluid</span>
            </Button>
            <Button variant={"success unactivated"} className='btnclass'>
              <span className={"circle disabled-circle"}>5</span>
              <span className={"btn-text"}>Kwaliteit</span>
            </Button>
          </div>
        </Col>
      </Row>

      <StepAccordionResults subcategories={subcategories} />

      <div>Current Step: {props.currentStep}</div>
      <div>Total Steps: {props.totalSteps}</div>

      <Button onClick={() => props.previousStep()} variant={"secondary"} className='btnclass'>
        Back
      </Button>
      <Button onClick={() => props.nextStep()} variant={"success"} className='btnclass'>
        Next
      </Button>

      <style jsx>{`
        .activated {
          background-color: #209bd7;
        }

        .disabled-circle {
          border-color: #dadada !important;
          background-color: #dadada !important;
          color: #a7a7a7 !important;
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
          font-size: 13px;
        }

        .tips-title {
          color: #164291;
          font-size: 17px;
          font-weight: bold;
        }
      `}</style>
    </Wrapper>
  )
}

export default StepCategory
