import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register as rdxRegister, registerReset } from './_redux/auth-slice';
import frame from '../../assets/images/Frame.png';
import logo from '../../assets/images/Group.png';
import { useSignupMutation } from '../../app/services/auth-api';

export default function Register() {
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error: registerError, status } = useSelector((state) => state.auth);

  const [signup, { isLoading: _loading, isError, isSuccess, error }] =
    useSignupMutation();

  useEffect(() => {
    return () => {
      dispatch(registerReset());
    };
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (inputRegister) => {
    console.log(inputRegister);
    const inputUserName = inputRegister.userName;
    const inputUserEmail = inputRegister.email;
    const inputUserPassword = inputRegister.password;
    const inputUserConfirmPassword = inputRegister.passwordConfirm;
    const user = {
      username: inputUserName,
      email: inputUserEmail,
      password: inputUserPassword,
      role: 'user',
    };
    // dispatch(rdxRegister(user));
    await signup(user);

    // if (inputUserPassword !== inputUserConfirmPassword) {
    //   setErrorConfirmPassword(
    //     <p style={{ color: 'red', textAlign: 'center' }}>Password not matched</p>
    //   );
    // } else if (status === 'register/succeeded') {
    //   navigate('/login');
    // }
  };

  if (isSuccess) {
    console.log('success');
    return navigate('/login');
  }

  return (
    <div className="register-page ">
      <img className="frame" src={frame} alt="frame" />
      <img className="logo" src={logo} alt="logo" />
      {registerError && <p style={{ color: 'red' }}>{registerError?.message}</p>}

      <Form className="d-grid" onSubmit={handleSubmit(onSubmit)}>
        {isError && (
          <p style={{ color: 'red' }}>{error?.data?.error?.message || 'Error'}</p>
        )}
        {isSuccess && <p style={{ color: 'green' }}>Register success</p>}
        <h2>Sign up for your account</h2>
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Control
            type="text"
            placeholder="Username"
            {...register('userName', {
              required: true,
              minLength: 4,
              maxLength: 15,
              pattern: {
                value: /^(?=)(?=).{4,15}$/,
              },
            })}
          />
          {errors.userName && (
            <p style={{ color: 'red' }}>Please enter a valid username </p>
          )}
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="formBasicconfirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            {...register('passwordConfirm', {
              required: true,
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
              },
            })}
          />
          {errorConfirmPassword}
          {errors.passwordConfirm && (
            <p style={{ color: 'red' }}>Please enter a valid password</p>
          )}
        </Form.Group>
        <Form.Text className="text-muted">
          By signing up, you confirm that you've read and accepted our
          <Link>Terms of Service</Link> and
          <Link to={'/privacypolicy'}>Privacy Policy</Link> .
        </Form.Text>

        <Button className="register-btn mb-5 mt-3" type="submit">
          Continue
          {_loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </Button>
        <p className="already-account">
          Already have an account?<Link to={'/login'}> Log In</Link>
        </p>
      </Form>
    </div>
  );
}
