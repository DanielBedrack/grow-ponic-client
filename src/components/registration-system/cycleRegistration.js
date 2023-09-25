// CycleRegistration.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addCycle } from '../../reducers-redux/tracking/systemReducer';
import axios from 'axios';

function CycleRegistration() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    isActive: true,
    pH: '',
    EC: '',
    PPM: '',
    waterTemp: '',
    outsideTemp: '',
    plantingHallsInUse: '',
    // Add other cycle data properties here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Create a new cycle object using the form data
    const newCycle = {
      isActive: true,
      pH: formData.pH,
      EC: formData.EC,
      PPM: formData.PPM,
      waterTemp: formData.waterTemp,
      outsideTemp: formData.outsideTemp,
      plantingHallsInUse: formData.plantingHallsInUse,
      // Add other cycle data properties here
    };

    // Dispatch the addCycle action to add the new cycle to your Redux store
    // You will need to provide the systemId along with the cycle data
    dispatch(addCycle({ cycle: newCycle }));

    // Reset the form after submission
    // setFormData({
    //   isActive: true,
    //   pH: '',
    //   EC: '',
    //   PPM: '',
    //   waterTemp: '',
    //   outsideTemp: '',
    //   plantingHallsInUse: '',
    //   // Reset other form fields here
    // });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Add Cycle</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="pH">
              <Form.Label>pH</Form.Label>
              <Form.Control
                type="number"
                name="pH"
                value={formData.pH}
                onChange={(e) => handleChange(e)}
                placeholder="Enter pH"
              />
            </Form.Group>

            <Form.Group controlId="EC">
              <Form.Label>EC</Form.Label>
              <Form.Control
                type="number"
                name="EC"
                value={formData.EC}
                onChange={(e) => handleChange(e)}
                placeholder="Enter EC"
              />
            </Form.Group>

            <Form.Group controlId="PPM">
              <Form.Label>PPM</Form.Label>
              <Form.Control
                type="number"
                name="PPM"
                value={formData.PPM}
                onChange={(e) => handleChange(e)}
                placeholder="Enter PPM"
              />
            </Form.Group>

            <Form.Group controlId="waterTemp">
              <Form.Label>Water Temperature</Form.Label>
              <Form.Control
                type="number"
                name="waterTemp"
                value={formData.waterTemp}
                onChange={(e) => handleChange(e)}
                placeholder="Enter water temperature"
              />
            </Form.Group>

            <Form.Group controlId="outsideTemp">
              <Form.Label>Outside Temperature</Form.Label>
              <Form.Control
                type="number"
                name="outsideTemp"
                value={formData.outsideTemp}
                onChange={(e) => handleChange(e)}
                placeholder="Enter outside temperature"
              />
            </Form.Group>

            <Form.Group controlId="plantingHallsInUse">
              <Form.Label>Planting Halls In Use</Form.Label>
              <Form.Control
                type="number"
                name="plantingHallsInUse"
                value={formData.plantingHallsInUse}
                onChange={(e) => handleChange(e)}
                placeholder="Enter planting halls in use"
              />
            </Form.Group>

            {/* Add other cycle data form fields as needed */}

            <Button variant="primary" type="submit">
              Add Cycle
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CycleRegistration;
