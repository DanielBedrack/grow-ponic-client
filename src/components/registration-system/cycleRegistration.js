// CycleRegistration.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addCycle } from '../../reducers-redux/tracking/systemReducer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CycleRegistration = ({ systemId }) => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const [formData, setFormData] = useState({
    isActive: true,
    pH: '',
    EC: '',
    PPM: '',
    waterTemp: '',
    outsideTemp: '',
    plantingHallsInUse: '',
    systemId: systemId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Send the cycle data to the server to create a new cycle
      const response = await axios.post(
        `tracking/cycles/create-cycle/${systemId}`, // Replace with the actual backend route
        formData
      );
        console.log(`Response: ${response}`)
      if (response.status === 200) {
        // Cycle creation successful, you can perform any necessary actions
        console.log('Cycle creation successful');
        const cycleId = response.data.cycle._id;

        // Dispatch the addCycle action to add the new cycle to your Redux store
        dispatch(addCycle({ cycleId, cycle: formData }));

        // // Reset the form after submission
        // setFormData({
        //   isActive: false,
        //   pH: '',
        //   EC: '',
        //   PPM: '',
        //   waterTemp: '',
        //   outsideTemp: '',
        //   plantingHallsInUse: '',
        //   systemId: '',
        // });
        //navigate('/systems')
      } else {
        // Cycle creation failed, handle errors if needed
        console.error('Cycle creation failed');
      }
    } catch (error) {
      // Handle any network or server errors
      console.error('Error during cycle creation', error);
    }
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

