import React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import { Container } from "@mui/system";
import { Box, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const errorMessage =
    "Workspace and Board names can contain letters (a-z),numbers(0-9),and an underline(_) and it can have 4-15 characters long. It canstart only letter or number";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [userSticykNote, setUserStickyNote] = useState([
    {
      workSpaceName: "testSpace",
      boardName: "testBoard",
    },
  ]);
  console.log(userSticykNote);
  console.log(errors.workSpaceName?.message);

  return (
    <Container
      sx={{
        color: "white",
        mt: 8,
      }}
    >
      <div sx={{ right: "0", bottom: "0" }}>
        {errors.workSpaceName?.message || errors.boardName?.message
          ? errorMessage
          : ""}
      </div>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        Welcome DART
      </Typography>
      <Card
        sx={{
          bgcolor: "rgba(175,149,213,255)",
          borderRadius: "16px",
          width: "50%",
          margin: "auto",
          mt: 2,
        }}
      >
        <CardContent
          sx={{
            textAlign: "center",
          }}
        >
          <Typography sx={{ width: "75%", margin: "auto" }}>
            Firstly create a workspace and a board than start add your post-it
          </Typography>

          <Container component="main" maxWidth="xs">
            <Box
              component="form"
              textAlign="center"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
            >
              <TextField
                sx={{
                  bgcolor: "white",
                  borderRadius: "16px",
                  borderTopColor: "red",
                  color: "white",
                }}
                margin="normal"
                name="workSpaceName"
                id="workspacename"
                label="WorkSpace Name"
                required
                color="warning"
                fullWidth
                {...register("workSpaceName", {
                  required: "Please try a valid name",
                  minLength: { value: 4, message: "true" },
                })}
                autoFocus
              />
              <p>{errors.boardName?.message ? "true" : "No error"}</p>
              <TextField
                sx={{
                  bgcolor: "white",
                  borderRadius: "16px",
                  borderTopColor: "red",
                  color: "white",
                }}
                filled-basic
                margin="normal"
                required
                fullWidth
                name="BoardName"
                id="boardName"
                {...register("boardName", {
                  required: "Board name needs 4 character",
                  minLength: {
                    value: 4,
                    message: "true",
                  },
                })}
              />
              <Button
                onClick={() => {
                  if (
                    errors.workSpaceName?.message ||
                    errors.boardName?.message
                  ) {
                  }
                }}
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#b498ce" }}
              >
                Create
              </Button>
            </Box>
          </Container>
        </CardContent>
      </Card>

      <div>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open modal
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Workspace and Board names can contain letters (a-z),numbers(0-9),
              and an underline(_) and it can have 4-15 characters long. It can
              start only letter or number
            </Typography>
          </Box>
        </Modal>
      </div>
    </Container>
  );
}
