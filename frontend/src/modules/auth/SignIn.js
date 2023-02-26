import React, { Suspense } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
// import { login } from './_redux/auth-slice';
import frame from "../../assets/images/Frame (1).png";
import logo from "../../assets/images/Group.png";
import { useLoginMutation } from "../../app/services/auth-api";

export default function Login() {
  const navigate = useNavigate();
  // const authState = useSelector((state) => state.auth);
  // const { error } = authState;

  const [login, { isError, error, isLoading: _loading, isSuccess }] =
    useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (inputLogin) => {
    // dispatch(login({ email: inputLogin.email, password: inputLogin.password }));
    const user = {
      email: inputLogin.email,
      password: inputLogin.password,
    };
    await login(user);
  };

  console.log(error);

  if (isSuccess) {
    console.log("success");
    return navigate("/boards");
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="login-page ">
        <img className="frame" src={frame} alt="frame" />
        <img className="logo" src={logo} alt="logo" />

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
            {isError && (
              <Alert className="text-center mt-2 " variant="danger">
                {error.data?.error?.message || "Something went wrong"}!
              </Alert>
            )}
            {errors.password && (
              <p style={{ color: "red" }}>Please enter a valid password</p>
            )}
          </Form.Group>

          <Button variant="success" className=" mb-5 mt-3" type="submit">
            Login
            {_loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
          </Button>
          <p className="signup-account">
            Can't log in?<Link to={"/signup"}> • Sign up for an account</Link>
          </p>
        </Form>
        <h3>Privacy Policy • Terms of Service</h3>
      </div>
    </Suspense>
  );
}
