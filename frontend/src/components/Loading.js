import React from "react";
import Spinner from "react-bootstrap/Spinner";

export default function Loading() {
  return (
    <div style={{ textAlign: "center", marginTop: "2px" }}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
