import { Accordion, Button, Card, Col, Row, useAccordionToggle, AccordionContext } from "react-bootstrap"
import { useExplanations } from "@/lib/swr-hooks"
import { useContext, useState } from "react"
import { FaChevronDown, FaChevronRight, FaCircle } from "react-icons/fa"

const ContextAwareToggle = (props) => {
  const currentEventKey = useContext(AccordionContext)

  const decoratedOnClick = useAccordionToggle(props.eventKey, () => props.callback && props.callback(props.eventKey))
  let categoryLetter = "B"
  switch (props.selectedCategory) {
    case 1:
      categoryLetter = "A"
      break
    case 2:
      categoryLetter = "B"
      break
    case 3:
      categoryLetter = "C"
      break
  }

  const isCurrentEventKey = currentEventKey === props.eventKey

  return (
    <div onClick={decoratedOnClick}>
      {isCurrentEventKey ? <FaChevronDown /> : <FaChevronRight />} <span className={"theme-text"}>{props.children}</span>
      {props.eventKey == 2 ? (
        <div className='btn-group d-flex align-items-center m-0' role='group'>
          <button type='button' className='btn btn-secondary not-chosen m-0'>
            KEUZE NIET GEMAAKT
          </button>
        </div>
      ) : (
        <div className='btn-group d-flex align-items-center m-0' role='group'>
          <button type='button' className='btn btn-secondary chosen m-0'>
            KEUZE GEMAAKT
          </button>
          <button type='button' className='btn btn-secondary number m-0'>
            {categoryLetter}
          </button>
        </div>
      )}
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
  )
}

function StepAccordion(props) {
  const [count, setCount] = useState(0)

  const selectCategory = (n) => {
    setCount(n)
  }

  return (
    <div>
      <Accordion className={props.class}>
        {props.subcategories.map((subcategory) => {
          const { explanations, isLoading } = useExplanations(subcategory.id)
          if (isLoading) return <></>
          return (
            <Card >
              <Card.Header>
                <ContextAwareToggle eventKey={subcategory.id} selectedCategory={count}>
                  {subcategory.name}
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey={subcategory.id}>
                <Card.Body>
                  {/*{subcategory.description}*/}
                  <Row className={"class-descriptions"}>
                    <Col xs={4}>
                      <div className={`class-c overlay-c cursor `} onClick={() => selectCategory(3)}>
                        <div className={`${count == 3 ? "title" : "selected-c"}`}>Klasse C - VOLDOENDE</div>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className={`class-b overlay-b cursor`} onClick={() => selectCategory(2)}>
                        <div className={` ${count == 2 ? "title" : "selected-b"}`}>Klasse B - GOED</div>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className={`class-a overlay-a cursor`} onClick={() => selectCategory(1)}>
                        <div className={` ${count == 1 ? "title" : "selected-a"}`}> {count}Klasse A - ZEER GOED</div>
                      </div>
                    </Col>
                  </Row>

                  {explanations.map((explanation) => (
                    <Row>
                      <Col xs={4}>
                        <div className={`explanations overlay-c cursor ${count == 3 ? "selected" : ""}`} onClick={() => selectCategory(3)}>
                          <span>
                            <FaCircle />
                          </span>
                          {/* <div dangerouslySetInnerHTML={{ __html: `${explanation.text_c}` }}></div> */}
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className={`explanations overlay-b cursor ${count == 2 ? "selected" : ""}`} onClick={() => selectCategory(2)}>
                          <span>
                            <FaCircle />
                          </span>
                          {/* <div dangerouslySetInnerHTML={{ __html: `<h1>hello world</h1>` }}></div> */}
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className={`explanations overlay-a cursor ${count == 1 ? "selected" : ""}`} onClick={() => selectCategory(1)}>
                          <span>
                            <FaCircle />
                          </span>
                          {/* <div dangerouslySetInnerHTML={{ __html: `<h1>hello world</h1>` }}></div> */}
                        </div>
                      </Col>
                    </Row>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          )
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

        .class-c .title {
          padding: 5px;
          width: 100%;
          background-color: #ef7d00;
        }

        .class-b .title {
          padding: 5px;
          width: 100%;
          background-color: #ffd500;
        }

        .class-a .title {
          padding: 5px;
          width: 100%;
          background-color: #c8d419;
        }

        .explanations {
          margin-top: 15px;
          margin-bottom: 15px;
        }

        .selected {
          filter: saturate(0.3);
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
        .selected-a {
          background-color: #7fd2a8;
          padding: 5px;
          width: 100%;
        }
        .selected-b {
          background-color: #c5e29f;
          padding: 5px;
          width: 100%;
        }
        .selected-c {
          background-color: #ffea7f;
          padding: 5px;
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default StepAccordion

function createMarkup(data) {
  return { __html: data }
}
