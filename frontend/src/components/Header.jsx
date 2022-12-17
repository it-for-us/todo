import React, { useState } from "react";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Logo from "../Logo.png";
import { Collapse } from "@mui/material";
export default function Header() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box className="header" component="header">
      <Box
        expanded
        sx={{
          display: { xs: "flex", lg: "none" },
          ml: "auto",
          alignContent: "center",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
        onClick={handleClick}
      >
        <img src={Logo} height="75" alt="LOGO" loading="lazy" />
        <Collapse in={open}>
          <Box>
            <Link href="/#" variant="subtitle2" underline="none" color="white">
              Home
            </Link>
          </Box>
          <Box>
            <Link
              href="/about"
              variant="subtitle2"
              underline="none"
              color="white"
            >
              About
            </Link>
          </Box>
          <Box>
            <Link
              href="/contact"
              variant="subtitle2"
              underline="none"
              color="white"
            >
              Contact
            </Link>
          </Box>
        </Collapse>
      </Box>
      <Box
        className="logo"
        href="/"
        sx={{ display: { xs: "none", lg: "block" } }}
      >
        {/* Logo will be here */}

        <Link href="/">
          <img src={Logo} height="75" alt="LOGO" loading="lazy" />
        </Link>

        <Link
          href="/about"
          sx={{ position: "absolute", right: 100 }}
          variant="subtitle2"
          underline="none"
          color="white"
          fontSize="large"
        >
          About
        </Link>
        <Link
          sx={{ position: "fixed", right: 10 }}
          href="/contact"
          variant="subtitle2"
          underline="none"
          color="white"
          fontSize="large"
        >
          Contact
        </Link>
      </Box>

      {/* Navbar start from here */}
    </Box>
  );
}
