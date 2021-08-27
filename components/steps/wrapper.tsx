import { Col, Row } from "react-bootstrap"
import Pagination from "@/components/steps/pagination"

const Wrapper = (props) => {
  return (
    <div>
      <Row>
        <Col xs={12} md={12} lg={12} xl={3} style={{ backgroundColor: "transparent" }}>
          <div className='side-pagination'>
            <Pagination {...props} />
          </div>
        </Col>
        <Col xs={12} md={12} lg={12} xl={9} className='wrapper'>
          <div>{props.children}</div>
        </Col>
      </Row>
      <style jsx>{`
        wrapper {
          height: 200px;
        }
      `}</style>
    </div>
  )
}

export default Wrapper
