import React, { useContext } from "react";
import { Accordion, Card, AccordionContext, useAccordionToggle } from "react-bootstrap";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const ContextAwareToggle = props => {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(props.eventKey, () => props.callback && props.callback(props.eventKey));

  const isCurrentEventKey = currentEventKey === props.eventKey;

  return (
    <div onClick={decoratedOnClick} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
      <span>{isCurrentEventKey ? <FaChevronDown /> : <FaChevronRight />} </span>
      <span style={{ color: "#009FDF", fontWeight: 650, fontSize: 20, marginLeft: 20 }}>{props.children}</span>
      <style jsx>{`
        .btn-group {
          float: right;
          width: 205px;
        }

        .number {
          background-color: #ffd500 !important;
          border-color: #ffd500 !important;
          color: black;
          font-weight: bold;
        }

        .chosen {
          background-color: #209bd7 !important;
          border-color: #209bd7 !important;
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

export default ({ data }) => {
  return (
    <div>
      <Accordion defaultActiveKey='0'>
        {data &&
          data.map((v, index) => (
            <Card key={index}>
              <Card.Header>
                <ContextAwareToggle eventKey={v.key}>{v.title}</ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey={v.key}>
                <Card.Body>{v.body}</Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
      </Accordion>
    </div>
  );
};
