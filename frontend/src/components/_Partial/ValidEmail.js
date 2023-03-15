import React from "react";
import { Popover, Typography } from "@mui/material";

export default function ValidEmail() {
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
      >
        Please enter a valid email
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
          {" "}
          <div className="error-username">
            <p>● Username can be 4-15 characters lang</p>
            <p>● Username can only start with a letter (a-z)</p>
            <p>● Username can contain numbers 0-9</p>
            <p>● Username can only use the special character</p>
            <p> '_'(underline) and cannot use more than one</p>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
