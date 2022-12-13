import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const theme = createTheme();

export default function Login() {
  const userData = {
    email: "test@gmail.com",
    password: "1234",
  };
  const [errorMesage, setErrorMesage] = useState();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setInputData({ email: data.get("email"), password: data.get("password") });
    if (
      userData.email === inputData.email &&
      userData.password === inputData.password
    ) {
      //navigate('/home')
      console.log("login successful");
    } else if (userData.email !== inputData.email) {
      setErrorMesage(
        <p style={{ color: "red" }}>
          Your email not registered or incorrect, Please try again.
        </p>
      );
    } else if (userData.password !== inputData.password) {
      setErrorMesage(
        <p style={{ color: "red" }}>
          Your password false! Please try again or click Forgot Password.
        </p>
      );
    }
  };
  return (
    <div className="main">
      <img
        src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=739&q=80"
        alt=""
      />
      <div className="login">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "white",
              }}
            >
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box
                component="form"
                textAlign="center"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="EMAIL ADDRESSE"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="PASSWORD"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {errorMesage}
                <Typography
                  sx={{ textAlign: "center", pt: 2, fontSize: "12px" }}
                  component="h1"
                >
                  <Link
                    to={"/forgotpassword"}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  sx={{ mt: 2, mb: 2, pl: 5, pr: 5 }}
                >
                  Login
                </Button>
                <Typography
                  sx={{
                    textAlign: "center",
                    borderTop: "1px solid white",
                    pt: 2,
                    fontSize: "12px",
                  }}
                  component="h1"
                >
                  New Account
                </Typography>

                <Button
                  onClick={() => navigate("/register")}
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2, mb: 2, pl: 5, pr: 5 }}
                >
                  Sing Up
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}
