import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useAuthContext } from "./AuthContext";
import Loading from "../../components/Loading";
export default function Login() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (inputLogin) => {
    setLoading(<Loading />);
    try {
      const response = await axios.post(
        `https://lb4-service.onrender.com/users/login`,
        {
          email: inputLogin.email,
          password: inputLogin.password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", JSON.stringify(token));

      setTimeout(() => {
        setTimeout(() => {
          setIsAuthenticated(token);
          navigate("/");
        }, 1000);
        setLoading(null);
        setMessage(<p style={{ color: "yellowgreen" }}>Login successful</p>);
      }, 2000);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        setTimeout(() => {
          setLoading(null);
          setMessage(
            <p style={{ color: "red" }}>
              {error.response.data.error.message} Please try again or
              <Link style={{ marginLeft: "2px" }} to={"/forgotpassword"}>
                Forgot Password
              </Link>
            </p>
          );
        }, 1000);
      }
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
          {loading}
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
