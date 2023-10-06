import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { fetchCycles } from '../../reducers-redux/tracking/cycleReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CycleList from './CyclesList';

function SystemList({ systems }) {
  const [selectedSystem, setSelectedSystem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSystemClick = (systemId) => {
    setSelectedSystem(systemId);
    console.log(`SystemId: ${systemId}`);
    navigate(`/cycles/${systemId}`);
    return <CycleList systemId={systemId} />;
  };
  useEffect(() => {
    if (selectedSystem) {
      dispatch(fetchCycles(selectedSystem));
    }
  }, [dispatch, selectedSystem]);

  return (
    <Container>
      <h2>System Information</h2>
      <Row>
        {systems.map((system) => (
          <Col key={system._id} xs={12} sm={6} md={4} lg={3}>
            {' '}
            {/* Adjust the column size based on your design */}
            <Button
              variant="primary"
              className="mb-2" // Add margin between buttons for spacing
              onClick={() => handleSystemClick(system._id)}
            >
              {system.name}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SystemList;
