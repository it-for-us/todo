import React from "react";
import { Popover, Typography } from "@mui/material";

export default function ValidPassword() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        color='red'
      >
        Please enter a valid password
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>
          <div className="error-password">
            <p>Passwords must contain one of each </p>
            <p>● Uppercase letters: (A-Z)</p>
            <p>● Lowercase letters: (a-z)</p>
            <p>● Numbers: 0-9 </p>
            <p>● Symbols ~`!@#$%^&*()_-+= </p>
            <p>Passwords can be 8-15 characters long</p>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
