import React, { Suspense } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { useAuthContext } from './AuthContext';
import Loading from '../../components/Loading';
import { login } from './_redux/auth-slice';

export default function Login() {
  // const navigate = useNavigate();
  // const { setIsAuthenticated } = useAuthContext();

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { isLoading } = authState;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (inputLogin) => {
    dispatch(login({ email: inputLogin.email, password: inputLogin.password }));
  };

  // if (isAuth) {
  //   navigate('/');
  // }

  return (
    <Suspense fallback={<Loading />}>
      <div className="login-page ">
        <Form className="d-grid" onSubmit={handleSubmit(onSubmit)}>
          <h2>Log in to DART</h2>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,15}$/i,
                },
              })}
            />
            {errors.email && (
              <p style={{ color: 'red' }}>Please enter a valid email address</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              {...register('password', {
                required: true,
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
                },
              })}
            />
            {errors.password && (
              <p style={{ color: 'red' }}>Please enter a valid password</p>
            )}
          </Form.Group>

          <Button variant="success" className=" mb-5 mt-3" type="submit">
            Login
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
          </Button>
          <p className="signup-account">
            Can't log in?<Link to={'/signup'}> • Sign up for an account</Link>
          </p>
        </Form>
        <h3>Privacy Policy • Terms of Service</h3>
      </div>
    </Suspense>
  );
}
