import React from 'react';
import PlantList from '../components/data/PlantList';
import DiseaseList from '../components/data/diseasesList';
import SystemList from '../components/data/systemsList';
const HomePage = () => {
  return (
    <div>
      <PlantList />
      <DiseaseList />
      <SystemList />
    </div>
  );
};

export default HomePage;
