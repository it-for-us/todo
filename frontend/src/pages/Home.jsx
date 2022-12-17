import React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import { color, Container } from "@mui/system";
import {
  Box,
  CardContent,
  Typography,
  Button,
  FormLabel,
  FormGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
export default function Home() {
  const navigate = useNavigate();
  const [userSticykNote, setUserStickyNote] = useState([
    {
      workSpaceName: "testSpace",
      boardName: "testBoard",
    },
  ]);
  console.log(userSticykNote);
  const [errorWorkSpaceName, setErrorWorkSpaceName] = useState("");
  const [errorBoardName, setErrorBoardName] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (inputRegister) => {
    console.log(inputRegister);
    setUserStickyNote([inputRegister]);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <Container
      sx={{
        color: "white",
        mt: 8,
      }}
    >
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
              onSubmit={handleSubmit(onSubmit)}
            >
              {errors.workSpaceName && (
                <p style={{ color: "red" }}>Please try a valid name </p>
              )}
              {errorWorkSpaceName}
              <TextField
                margin="normal"
                name="workSpaceName"
                id="workspacename"
                label="WorkSpace Name"
                required
                color="warning"
                fullWidth
                {...register("workSpaceName", {
                  required: true,
                  minLength: 4,
                  maxLength: 15,
                  pattern: {
                    value: /^(?=)(?=).{4,15}$/,
                  },
                })}
                autoFocus
              />

              {errors.workSpaceName && (
                <p style={{ color: "red" }}>Please enter a valid name </p>
              )}
              {errorBoardName}
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
                name="Board_name"
                id="Board_name"
                {...register("boardName", {
                  required: true,
                  pattern: {
                    value: /^()()().{8,15}$/,
                  },
                })}
              />
              <Button
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
    </Container>
  );
}
