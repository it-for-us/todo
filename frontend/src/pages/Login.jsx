import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState ,useContext} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import UserContext from "../contexts/UserContext.jsx";
const theme = createTheme();

export default function Login() {
  const { userData } = useContext(UserContext);

  console.log(userData);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (inputLogin) => {

    if (userData[0].email !== inputLogin.email) {
      setErrorEmail(
        <p style={{ color: "red" }}>
          Email not matched
        </p>
      );
    } 
    else if (inputLogin.password !== userData[0].password) {
        setErrorPassword(
          <p style={{ color: "red", textAlign: "center" }}>
            Password not matched
          </p>
        )
    }  else {
        setTimeout(() => {
          navigate("/");
        }, 300);
    }
    }
  
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
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="EMAIL ADDRESSE"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  {...register('email',
                  {required:"Required field",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,15}$/i,
                    message:"Invalid email address"
                  },
                })}
                  error={!!errors?.email}
                  helperText={errors?.email ? errors.email.message : null}
                />
                {/* {errors.email && (
                    <p style={{ color: "red" }}>
                      Please enter a valid email address
                    </p>
                  )} */}
                  {errorEmail}
                </Grid>
                <Grid item xs={12}>
                  
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="PASSWORD"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register('password',
                  {required:"Required field",
                  pattern: {
                    value: /^()()().{8,15}$/,
                    message:"Invalid password "
                  },
                })}
                error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
                />
                {/* {errors.password && (
                    <p style={{ color: "red" }}>
                      Please enter a valid password
                    </p>
                  )} */}
                  {errorPassword}
                  </Grid>
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
