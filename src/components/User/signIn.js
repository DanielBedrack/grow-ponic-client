import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container'; // Removed "/esm" from the import path
import { Button, Form } from 'react-bootstrap';
import { loginUser } from '../services/userService';
import { FireBaseConfig } from '../../firebase/config';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';

export default function SignIn() {
  const [inputs, setInputs] = useState({});
  const [userError, setUserError] = useState(false);
  const [userSuccess, setUserSuccess] = useState(false);

  const navigate = useNavigate();

  const submitUserLogin = async () => {
    console.log(inputs);
    try {
      const res = await loginUser(inputs);
      if (res.token) {
        Cookies.set('authorization', res.token);
        Cookies.set('user', res.user.email);
        setUserError(false);
        setUserSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setUserSuccess(false);
      setUserError(true);
    }
  };
  FireBaseConfig();

  const user = useSelector((state) => state.userReducer);
  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    console.log(user);

    try {
      await user.google();

      Cookies.set('user', user.currentUser.displayName, { expires: 7 });
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  const signInWithFacebook = async (event) => {
    event.preventDefault();
    try {
      await user.facebook();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Form onSubmit={submitUserLogin}>
      <div className="d-flex">
        <Container className="justify-content-center align-items-center d-grid">
          <GoogleLoginButton
            style={{ width: '250px' }}
            onClick={handleGoogleSignIn}
          />

          <FacebookLoginButton
            className="mt-3 mb-5 "
            style={{ width: '250px' }}
            onClick={signInWithFacebook}
          />
        </Container>
      </div>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          required
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          required
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
      </Form.Group>
      <div className="mb-3">
        <Button type="submit">Sign In</Button>
      </div>
      <div className="mb-3">
        New customer? <Link to="/register">Create your account</Link>
      </div>
      <div className="mb-3">
        Forgot Password? <Link to="/forget-password">Reset Password</Link>
      </div>
    </Form>
  );
}
