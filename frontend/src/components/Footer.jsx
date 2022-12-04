import React from "react";
import { BrowseRouter } from "react-router-dom";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
const Footer = () => {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">IT4US</h6>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <a href="#!" className=" fw-bold mb-4">
                HOME
              </a>
            </MDBCol>
            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <a href="#!" className=" fw-bold mb-4">
                PRIVACY POLICY
              </a>
            </MDBCol>
            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <a href="#!" className=" fw-bold mb-4">
                CONTACT
              </a>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="twitter" />
            </a>

            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>
        <p>
          {" "}
          © 2022 Copyright:
          <a className="text-reset fw-bold" href="https://it4us.org/">
            IT4US
          </a>
        </p>
      </div>
    </MDBFooter>
  );
};

export default Footer;
