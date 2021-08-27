import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div style={{ zIndex: 500, position: "absolute", height: "100%", width: "90%" }}>
      <span style={{ left: "50%", top: "40%", transform: "translate(-60%, -60%)", position: "absolute" }}>
        <Spinner animation='border' variant='primary' />
      </span>
    </div>
  );
}

export default Loader;
