import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCycles } from '../../reducers-redux/tracking/cycleReducer';
import PlantList from './PlantList';

function CycleList() {
  const { systemId } = useParams(); 
  const [selectedCycle, setSelectedCycle] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, error } = useSelector(
    (state) => state.trackingService
  );
  const { cycles } = useSelector((state) => state.cycle);

  console.log(cycles.cycles);

  const handleCycleClick = (cycleId) => {
    setSelectedCycle(cycleId);
    console.log(`cycleId: ${cycleId}`);
    navigate('/plants');
    return <PlantList cycleId={cycleId} />;
  };

  useEffect(() => {
    console.log(systemId);
    dispatch(fetchCycles(systemId));
  }, [dispatch, systemId, selectedCycle]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Row>
        {cycles.cycles.map((cycle) => (
          <Col key={cycle._id} xs={12} sm={6} md={4} lg={3}>
            <Button
              variant="primary"
              className="mb-2"
              onClick={() => handleCycleClick(cycle._id)}
            >
              {cycle.isActive ? 'Active' : 'Not Active'}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CycleList;
