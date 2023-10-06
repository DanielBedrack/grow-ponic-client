import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { addSystem } from '../../reducers-redux/tracking/systemReducer';
import CycleRegistration from './cycleRegistration';

function SystemRegistrationForm() {
  const navigate = useNavigate();
  //const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const [addCycle, setAddCycle] = useState(false);
  const [systemId, setSystemId] = useState(null);
  console.log(`Continue to add Cycle: ${addCycle}, SystemID: ${systemId}`)

  const [systemData, setSystemData] = useState({
    name: '',
    location: '',
    plantingHallsOverall: '',
    sunLight: '',
    waterTank: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSystemData({
      ...systemData,
      [name]: value,
    });
  };

  const handleAddValues = async (e) => {
    e.preventDefault();

    try {
      // Send the registration data to the server-side URL
      const response = await axios.post(
        'tracking/systems/create-system', // Updated route to match the backend
        systemData,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      if (response.status === 200) {
        //dispatch(addSystem(systemData))
        localStorage.setItem('systemData', JSON.stringify(systemData));
        // Set the systemId state to the system's ID
        setSystemId(response.data.savedSystem._id);
        setAddCycle(true)
        //navigate(`/create-cycle`);
      } else {
        // Registration failed, handle errors if needed
        console.error('System Registration failed');
      }
    } catch (error) {
      // Handle any network or server errors
      console.error('Error during registration', error);
    }
  };

  const handleNotNow = () => {
    // Redirect the user to the SystemPage
    navigate('/system');
  };
  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={systemData.name}
                onChange={handleChange}
                placeholder="Enter system name"
              />
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={systemData.location}
                onChange={handleChange}
                placeholder="Enter system location"
              />
            </Form.Group>

            <Form.Group controlId="plantingHallsOverall">
              <Form.Label>Planting Halls Overall</Form.Label>
              <Form.Control
                type="number"
                name="plantingHallsOverall"
                value={systemData.plantingHallsOverall}
                onChange={handleChange}
                placeholder="Enter planting halls overall"
              />
            </Form.Group>

            <Form.Group controlId="sunLight">
              <Form.Label>Sun Light</Form.Label>
              <Form.Control
                type="number"
                name="sunLight"
                value={systemData.sunLight}
                onChange={handleChange}
                placeholder="Enter sun light"
              />
            </Form.Group>

            <Form.Group controlId="waterTank">
              <Form.Label>Water Tank</Form.Label>
              <Form.Control
                type="number"
                name="waterTank"
                value={systemData.waterTank}
                onChange={handleChange}
                placeholder="Enter water tank"
              />
            </Form.Group>

            <Form.Group controlId="images">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                name="images"
                value={systemData.images}
                onChange={handleChange}
                multiple
                placeholder="Choose system images"
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddValues}>
              Add Values
            </Button>
            <Button variant="secondary" onClick={handleNotNow}>
              Not Now
            </Button>
          </Form>
          {addCycle && systemId && <CycleRegistration systemId={systemId} />}
        </Col>
      </Row>
    </Container>
  );
};

export default SystemRegistrationForm;
