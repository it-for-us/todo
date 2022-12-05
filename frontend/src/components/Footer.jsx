import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
const Footer = () => {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      {/*Footer bg color changable from here*/}
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                {/*This place can be replaced with a logo*/}
                <a
                  href="https://www.it4us.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="mb-4"
                >
                  IT4US-ToDo
                </a>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <a href="/" className=" fw-bold mb-4">
                  HOME
                </a>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                {/*After Privacy Policy page created, we can change here (if needed)*/}
                <a href="/privacy_policy" className=" fw-bold mb-4">
                  PRIVACY POLICY
                </a>
              </MDBCol>
              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                {/*After Contact page created, we can change here (if needed)*/}
                <a href="/contact" className=" fw-bold mb-4">
                  CONTACT
                </a>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social media:</span>
          </div>
          {/*Social media links will be added (if we have)*/}
          <div>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="me-4 text-reset"
            >
              <MDBIcon fab icon="twitter" />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="me-4 text-reset"
            >
              <MDBIcon fab icon="linkedin" />
            </a>
            <a
              href="https://github.com/it-for-us"
              target="_blank"
              rel="noreferrer"
              className="me-4 text-reset"
            >
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>
        <p>
          © 2022 Copyright:
          <a
            className="text-reset fw-bold"
            href="https://www.it4us.org/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            IT4US
          </a>
        </p>
      </div>
    </MDBFooter>
  );
};

export default Footer;
