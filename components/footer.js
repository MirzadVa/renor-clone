import Link from "next/link";
import StepFooter from "./step-footer";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";

export default function Footer() {
  return (
    <div style={{ backgroundColor: "transparent"}}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }} className='bg'>
        <Container fluid className='bg footer-container'>
          <Row className='bg'>
            <Col xs={12}>
              <div
                style={{
                  marginTop: "50pt",
                  marginLeft: 70,
                  display: "flex",
                  justifyContent: "center",
                }}>
                <Image src={"/logos.png"} width='306' height='45' />
              </div>
            </Col>
            <Col xs={12} md={6} className={"side"}></Col>
            <Col xs={12} md={6}>
              <p style={{ fontSize: "12px", float: "right", marginBottom: 5, color: "#A7A7A7" }}>
                Deze webapplicatie is ontwikkeld door <a href={"https://renor.nl"} style={{color: '#009FDF'}}>Renor</a> in samenwerking met TVVL
              </p>
            </Col>
          </Row>
        </Container>
        <div className={"footer-line-blue"}></div>
        <div className={"footer-line-orange"}></div>
      </div>
      <style jsx>{`
        .bg {
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
}
