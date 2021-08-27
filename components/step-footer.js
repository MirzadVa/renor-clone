import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";

function StepFooter() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <div
            style={{
              marginTop: "200pt",
              marginLeft: 70,
              display: "flex",
              justifyContent: "center",
            }}>
            <Image src={"/logos.png"} width='306' height='45' unoptimized={true} />
          </div>
        </Col>
        <Col xs={12} md={6} className={"side"}></Col>
        <Col xs={12} md={6}>
          <p style={{ marginBottom: "-25px", fontSize: "12px", float: "right" }}>
            Deze webapplicatie is ontwikkeld door <a href={"https://renor.nl"}>Renor</a> in samenwerking met TVVL
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default StepFooter;
