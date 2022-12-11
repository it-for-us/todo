import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const theme = createTheme();

export default function Register() {
  const [userData, setUserData] = useState([
    {
      userName: "test",
      email: "test@gmail.com",
      password: "",
      passwordConfirm: "",
    },
  ]);

  console.log(userData);
  const [errorUserName, setErrorUserName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (inputRegister) => {
    console.log(inputRegister);

    if (userData[0].userName === inputRegister.userName) {
      setErrorUserName(
        <p style={{ color: "red" }}>
          This name already exist.Please try another name.
        </p>
      );
    } else {
      if (inputRegister.password !== inputRegister.passwordConfirm) {
        setErrorPasswordConfirm(<p>Password not matched</p>);
      } else if (userData[0].email === inputRegister.email) {
        setErrorEmail(
          <p style={{ color: "red" }}>
            This email already exist.Please
            {<Link to={"/"}>login</Link>}
            try another one.
          </p>
        );
      } else {
        setUserData([inputRegister]);
        setTimeout(() => {
          navigate("/");
        }, 300);
      }
    }
  };

  return (
    <div className="register">
      {/* <NavPages /> */}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "white" }} component="h1" variant="h5">
              Create new Account
            </Typography>

            <Grid item sx={{ m: 1, color: "white" }}>
              Already Registered?
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginLeft: "3px",
                }}
                to="/"
                variant="body2"
              >
                Login
              </Link>
            </Grid>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {errors.userName && (
                    <p style={{ color: "red" }}>
                      Please enter a valid username{" "}
                    </p>
                  )}
                  {errorUserName}
                  <TextField
                    autoComplete="given-name"
                    name="userName"
                    fullWidth
                    id="username"
                    label="USERNAME"
                    autoFocus
                    color="warning"
                    {...register("userName", {
                      required: false,
                      // minLength: 4,
                      // maxLength: 15,
                      // pattern: {
                      //   value: /^(?=)(?=).{4,15}$/,
                      // },
                    })}
                  />
                </Grid>

                <Grid item xs={12}>
                  {errors.email && (
                    <p style={{ color: "red" }}>
                      Please enter a valid email address
                    </p>
                  )}
                  {errorEmail}
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="EMAIL"
                    name="email"
                    autoComplete="email"
                    color="warning"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,15}$/i,
                      },
                    })}
                  />
                </Grid>
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
                    label="PASSWORD"
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
                SEND
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
