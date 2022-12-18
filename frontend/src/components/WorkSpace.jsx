import React, { useState } from "react";
import { CgAttachment } from "react-icons/cg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(236, 222, 222, 0.637)",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

export default function WorkSpace({ workSpace, setWorkSpace }) {
  const [workSpace, setWorkSpace] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMesaage] = useState("");
  const navigate = useNavigate();
  const createWorkSpace = () => {
    handleOpen();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (inputWorkSpace) => {
    const workSpaceName = workSpace.map((el) => {
      return el.workSpaceName.toLowerCase();
    });

    if (workSpaceName.includes(inputWorkSpace.workSpaceName.toLowerCase())) {
      setMesaage(
        <p style={{ color: "red", margin: "0" }}>
          You have a workspace with this name please give it another name
        </p>
      );
    } else {
      setWorkSpace([
        ...workSpace,
        {
          workSpaceName: inputWorkSpace.workSpaceName,
          boardsName: [{ boardName: inputWorkSpace.boardName }],
        },
      ]);
      setMesaage("");
      handleClose();
      reset();
    }
  };

  return (
    <>
      <h2 style={{ color: "white" }}>Welcome TODO</h2>
      <div className="work-space">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center",
                borderRadius: "10px",
                padding: "1rem",
                color: "white",
              }}
            >
              <Box
                component="form"
                // onSubmit={handleSubmit}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{
                  borderRadius: "20px",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    pt: 2,
                    fontSize: "16px",
                    color: "black",
                  }}
                  component="h1"
                >
                  Create a Workspace and a Board than start add your POST-IT
                </Typography>
                {errors.workSpaceName && (
                  <p style={{ color: "red", margin: "0" }}>
                    Please enter a valid Workspace name
                  </p>
                )}
                {message}
                <TextField
                  margin="normal"
                  autoComplete="given-name"
                  name="workSpaceName"
                  required
                  fullWidth
                  id="workSpaceName"
                  label="WORKSPACE NAME"
                  autoFocus
                  color="primary"
                  {...register("workSpaceName", {
                    required: true,
                    pattern: {
                      value: /^(?=)(?=).{4,15}$/,
                    },
                  })}
                />

                {errors.boardName && (
                  <p style={{ color: "red", margin: "0" }}>
                    Please enter a valid boardname
                  </p>
                )}
                <TextField
                  margin="normal"
                  autoComplete="given-name"
                  name="boardName"
                  required
                  fullWidth
                  id="boardName"
                  label="BOARD NAME"
                  color="primary"
                  {...register("boardName", {
                    required: true,
                    pattern: {
                      value: /^(?=)(?=).{4,15}$/,
                    },
                  })}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2, mb: 2, pl: 5, pr: 5 }}
                >
                  CREATE
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>

        {workSpace.map((el, i) => (
          <div
            onClick={() => navigate("/dashboard", { state: { el } })}
            key={i}
            style={{
              background: i % 2 === 1 ? "#ebb328" : "green",
              cursor: "pointer",
            }}
            // style={{ background: randomBackground() }}
            className="work-space-card"
          >
            <CgAttachment style={{ fontSize: "1.5rem" }} />
            <h3>{el.workSpaceName}</h3>
          </div>
        ))}
        <div
          onClick={createWorkSpace}
          style={{ background: "#5C17CF" }}
          className="work-space-card"
        >
          <h3>Create</h3>
        </div>
      </div>
    </>
  );
}
