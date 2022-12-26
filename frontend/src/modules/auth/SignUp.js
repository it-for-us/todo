import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import axios from "axios";

export default function Register() {
  const [errorUserName, setErrorUserName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  console.log(userData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (inputRegister) => {
    console.log(inputRegister);

    axios
      .post(`https://lb4-service.onrender.com/users/signup`, {
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        username: "test",
        email: "test9@email.com",
        password: "123456798",
        role: "test",
      })
      .then((response) => {
        console.log(response.data);
      })
      .then((err) => {
        console.log(err);
      });

    if (userData[0].userName === inputRegister.userName) {
      setErrorUserName(
        <p style={{ color: "red" }}>
          This name already exist.Please try another name.
        </p>
      );
    } else {
      if (inputRegister.password !== inputRegister.passwordConfirm) {
        setErrorPasswordConfirm(
          <p style={{ color: "red", textAlign: "center" }}>
            Password not matched
          </p>
        );
      } else if (userData[0].email === inputRegister.email) {
        setErrorEmail(
          <p style={{ color: "red" }}>
            This email already exist.Please
            {<Link to={"/login"}>login</Link>} or try another one.
          </p>
        );
        setErrorUserName("");
      } else {
        setUserData([inputRegister]);
        setTimeout(() => {
          navigate("/login");
        }, 300);
      }
    }
  };
  return (
    <div className="register-page ">
      <Form className="d-grid" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign up for your account</h2>
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Control
            type="text"
            placeholder="Username"
            {...register("userName", {
              required: false,
              minLength: 4,
              maxLength: 15,
              pattern: {
                value: /^(?=)(?=).{4,15}$/,
              },
            })}
          />
          {errors.userName && (
            <p style={{ color: "red" }}>Please enter a valid username </p>
          )}
          {errorUserName}
        </Form.Group>
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
          {errorEmail}
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
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicconfirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            {...register("passwordConfirm", {
              required: true,
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
              },
            })}
          />
          {errorPasswordConfirm}
          {errors.passwordConfirm && (
            <p style={{ color: "red" }}>Please enter a valid password</p>
          )}
        </Form.Group>
        <Form.Text className="text-muted">
          By signing up, you confirm that you've read and accepted our
          <Link>Terms of Service</Link> and
          <Link to={"/privacypolicy"}>Privacy Policy</Link> .
        </Form.Text>

        <Button className="register-btn mb-5 mt-3" type="submit">
          Continue
        </Button>
        <p className="already-account">
          Already have an account?<Link to={"/login"}> Log In</Link>
        </p>
      </Form>
    </div>
  );
}
