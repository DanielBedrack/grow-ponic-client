import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPlants } from '../../reducers-redux/tracking/plantReducer';

function PlantList({ cycleId }) {
  const [selectedPlant, setSelectedPlant] = useState(null); // Corrected variable name
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.trackingService);
  const { plants } = useSelector((state) => state.plants);

  console.log(plants);

  useEffect(() => {
    dispatch(fetchPlants(cycleId));
  }, [dispatch, cycleId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  //   const handleCycleClick = (plantId) => {
  //     selectedPlant(plantId);
  //     dispatch(fetchPlants(plantId)); // Pass cycleId instead of selectedCycle
  //     navigate('/plants');
  //   };

  return (
    <Container>
      <Row>
        {plants ? plants.plants.map((plant) => (
          <Col key={plant._id} xs={12} sm={6} md={4} lg={3}>
            <Button
              variant="primary"
              className="mb-2"
            >
              {plant ? plant.name : 'Not Captured'}
            </Button>
          </Col>
        )) :
        'NOT FOUND'}
      </Row>
    </Container>
  );
}

export default PlantList;
