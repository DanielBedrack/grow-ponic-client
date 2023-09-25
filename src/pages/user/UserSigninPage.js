import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import userReducer, { userSignin } from '../../reducers-redux/userReducer';
// import { getError } from '../Utils';
// import { Store } from '../Context/Store';
// import { Helmet } from 'react-helmet-async';
// import { toast } from 'react-toastify';
// import { USER_SIGNIN } from '../Actions';

const UserSigninPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  // Gets redirect uri if user was redirected
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/register';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { userData, isLoading, error } = useSelector((state) => state.user);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/users/signin', {
        email,
        password,
      });
      dispatch(userSignin);
      localStorage.setItem('userInfo', JSON.stringify(data));

      // If user was in different page, after signing in, automatacly redirect to page where he was, or to HomePage
      navigate(redirect || '/');
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    // When user get to this page, he is automatacly redirecting to "redirect" page.
    if (userData) {
      navigate(redirect);
    }
  }, [navigate, redirect, userData]);

  return (
    <Container className="small-container">
      <h1 className="my-3 title">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>

        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>

        <div className="mb-3">
          Forget Password? <Link to={`/forget-password`}>Reset Password</Link>
        </div>
      </Form>
    </Container>
  );
};

export default UserSigninPage;
