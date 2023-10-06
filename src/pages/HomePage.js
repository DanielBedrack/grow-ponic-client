import React, { useEffect } from 'react';
import Home from '../components/home/Home.js';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
const HomePage = () => {
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { data, isLoading, error } = useSelector((state) => state.dataService);

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/');
    }
  }, [userInfo, navigate]);
  return (
    <div>
      <Home />
      {/* <PlantList />
      <DiseaseList />
      <SystemList /> */}
    </div>
  );
};

export default HomePage;
