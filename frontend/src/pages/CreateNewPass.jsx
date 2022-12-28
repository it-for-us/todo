import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

const theme = createTheme();

export default function CreateNewPass() {
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");

  const { userData, setUserData } = useContext(UserContext);

  console.log(userData);

  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state.inputEmail;
  console.log(userEmail);
  console.log(userData);

  // const userInfo = userData.find((el) => el.email === userEmail.email);
  // console.log(userInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (inputNewPassword) => {
    console.log(inputNewPassword);
    if (inputNewPassword.password !== inputNewPassword.passwordConfirm) {
      setErrorPasswordConfirm(
        <p style={{ color: "red" }}>Password not matched</p>
      );
    } else {
      setErrorPasswordConfirm(
        <p style={{ color: "yellowgreen" }}>Password successfully changed</p>
      );
      userData[0].password = inputNewPassword.password;
      userData[0].passwordConfirm = inputNewPassword.passwordConfirm;
      setUserData(userData);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };
  return (
    <div className="create-new-passs">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "6vh 0",
              textAlign: "center",
            }}
          >
            <Typography sx={{ color: "white" }} component="h3" variant="h5">
              <h3>Create new </h3>
              <h3>Password</h3>
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {errors.password && (
                    <p style={{ color: "red" }}>
                      Please enter a valid password
                    </p>
                  )}

                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="NEW PASSWORD"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    color="warning"
                    {...register("password", {
                      required: true,
                      pattern: {
                        // value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
                        value: /^()()().{8,15}$/,
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  {errorPasswordConfirm}
                  {errors.passwordConfirm && (
                    <p style={{ color: "red" }}>
                      Please enter a valid password
                    </p>
                  )}
                  <TextField
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="CONFIRM PASSWORD"
                    type="password"
                    id="passwordconfirm"
                    autoComplete="new-password"
                    color="warning"
                    {...register("passwordConfirm", {
                      required: true,
                      pattern: {
                        // value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
                        value: /^()()().{8,15}$/,
                      },
                    })}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
              >
                SEND & LOGIN
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
