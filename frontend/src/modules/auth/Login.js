import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { useAuthContext } from "./AuthContext";
export default function Login() {
  const { userData } = useContext(UserContext);

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthContext();
  const userEmail = userData[0].email;
  const userPassword = userData[0].password;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (inputLogin) => {
    try {
      const response = await axios.post(
        `https://lb4-service.onrender.com/users/login`,
        {
          email: inputLogin.email,
          password: inputLogin.password,
        }
      );
      const token = response.data.token;
      setIsAuthenticated(token);
      localStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
      console.log({ error });
    }
    if (
      userEmail === inputLogin.email &&
      userPassword === inputLogin.password
    ) {
      setMessage(<p style={{ color: "yellowgreen" }}>Login successful</p>);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (userEmail !== inputLogin.email) {
      setMessage(
        <p style={{ color: "red" }}>
          Your email not registered or incorrect, Please try again.
        </p>
      );
    } else if (userPassword !== inputLogin.password) {
      setMessage(
        <p style={{ color: "red" }}>
          Password false!,please try again or click
          <Link to={"/forgotpassword"}>Forgot Password</Link>
        </p>
      );
    }
  };
  return (
    <div className="login-page ">
      <Form className="d-grid" onSubmit={handleSubmit(onSubmit)}>
        <h2>Log in to DART</h2>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,15}$/i,
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>Please enter a valid email address</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
              },
            })}
          />
          {errors.password && (
            <p style={{ color: "red" }}>Please enter a valid password</p>
          )}
          {message}
        </Form.Group>

        <Button variant="success" className=" mb-5 mt-3" type="submit">
          Login
        </Button>
        <p className="signup-account">
          Can't log in?<Link to={"/signup"}> • Sign up for an account</Link>
        </p>
      </Form>
      <h3>Privacy Policy • Terms of Service</h3>
    </div>
  );
}
