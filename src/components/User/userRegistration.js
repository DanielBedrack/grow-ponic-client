import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; 
import { userRegister } from '../../reducers-redux/userReducer';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('trying to post a user: ' + formData.firstName);
      // Send the registration data to the server-side URL
      const response = await axios.post('/tracking/users/register', formData);

      // Handle the response from the server
      if (response.status === 200) {
        const responseData = response.data;
        console.log(responseData);
        // Check if the response contains a 'token' property

        // Registration successful, you can perform any necessary actions
        console.log('Registration successful');
        dispatch(userRegister(responseData));
        localStorage.setItem('userInfo', JSON.stringify(responseData));
        navigate(redirect || '/');
      } else {
        // Handle other status codes if needed
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      // Handle any network or server errors
      console.error('Error during registration', error);
    }
  };

  useEffect(() => {
    if (userData) {
      navigate(redirect);
    }
  }, [navigate, redirect, userData]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
      <div className="mb-3">
        Already have an account?{' '}
        <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
      </div>
    </Form>
  );
};

export default RegistrationForm;
