import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";

export default function Header() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showUserName, setShowUserName] = useState(false);
  const Username = "UserName";
  {
    /* It's for only for testing. After Register&Login completed, 
    Username came from 'prop' */
  }
  return (
    <MDBNavbar
      expand="lg"
      bgColor="light"
      className="text-center text-lg-start text-muted "
    >
      <MDBContainer fluid>
        <MDBNavbarBrand className="" href="/">
          {/* Logo will be here */}
          <img src="/" height="30" alt="LOGO" loading="lazy" />
        </MDBNavbarBrand>
        {/* Navbar start from here */}
        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavbar(!showNavbar)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        {/* This line for navbar. You can see an example as below; */}

        <MDBCollapse navbar show={showNavbar}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            {/* <MDBNavbarItem>
              <MDBNavbarLink
                active
                aria-current="page"
                href="#"
                className="fw-bold mb-4"
              >
                HOME
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink
                active
                aria-current="page"
                href="#"
                className="fw-bold mb-4"
              >
                ABOUT
              </MDBNavbarLink>
            </MDBNavbarItem> */}
          </MDBNavbarNav>
          <p className="fw-bold" href="#">
            {Username}
          </p>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
