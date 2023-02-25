import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createWorkspace } from "../_redux/workspace-slice";

export default function MainLayoutNavCreateBtn() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmitWorkSpace = (inputWorkSpace) => {
    console.log(inputWorkSpace);
    dispatch(
      createWorkspace({
        name: inputWorkSpace.workspace,
        description: inputWorkSpace.description,
        createdAt: new Date().toISOString(),
      })
    );
    reset();
    handleClose();
  };

  return (
    <div className="create-btn">
      <div aria-describedby={id} variant="contained" onClick={handleClick}>
        Create
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Create Board</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
                display: "flex",
                flexDirection: "column",

                alignItems: "center",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Board title"
                variant="outlined"
                size="small"
              />
              <Button variant="contained">Create</Button>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Create Workspace</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitWorkSpace)}
              sx={{
                "& > :not(style)": { m: 1, width: "20ch" },
                display: "flex",
                flexDirection: "column",

                alignItems: "center",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Workspace title"
                variant="outlined"
                size="small"
                {...register("workspace", {
                  required: true,
                  pattern: {
                    value: /^(?=)(?=).{4,15}$/,
                  },
                })}
              />

              <Textarea
                color="primary"
                minRows={2}
                placeholder="Description "
                variant="solid"
                {...register("description", {
                  required: true,
                  pattern: {
                    value: /^(?=)(?=).{4,15}$/,
                  },
                })}
              />

              {errors.workspace && (
                <p style={{ color: "red", margin: "0", fontSize: "12px" }}>
                  Please enter a valid Workspace name
                </p>
              )}
              <Button type="submit" variant="contained">
                Create
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Popover>
    </div>
  );
}
