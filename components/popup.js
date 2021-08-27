import React from "react"
import { Modal } from "react-bootstrap"

function Popup({ show, handleClose, children }) {
  return (
    <div>
      <>
        <Modal show={show} onHide={handleClose} size='xl' aria-labelledby='example-modal-sizes-title-lg' style={{ padding: "0px 50px" }}>
          <Modal.Body style={{ height: "750px", borderRadius: 0 }} className='my-4 px-3'>
            {children}
          </Modal.Body>
        </Modal>
      </>
      <style jsx>{``}</style>
    </div>
  )
}

export default Popup
