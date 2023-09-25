import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function SystemPage() {
  // Fetch and store the system data here, or receive it as props
  const systemData = {
    name: 'System Name',
    location: 'System Location',
    // Add other system data properties here
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>System Details</h2>
          <p>Name: {systemData.name}</p>
          <p>Location: {systemData.location}</p>
          {/* Display other system data here */}
        </Col>
      </Row>
    </Container>
  );
}

export default SystemPage;
