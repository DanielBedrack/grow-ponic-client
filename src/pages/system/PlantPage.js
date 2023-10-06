import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PlantList from '../../components/system/PlantList';

const PlantPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state) => state.trackingService
  );
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  //console.log(data.cycles);

  useEffect(() => {
    // Fetch data when the component mounts
    // dispatch(fetchCycles(userInfo.email));
  }, [dispatch, userInfo]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleAddButtonClick = () => {
    navigate('/create-cycle');
  };

  return (
    <div>
      <h3>plants Information</h3>
      <PlantList />

      {/* {data.cycles.map((cycle) => (
        <div key={cycle.systemID}>
          <p>Is Active: {cycle.isActive ? 'Yes' : 'No'}</p>
          <p>pH: {cycle.pH}</p>
          <p>EC: {cycle.EC}</p>
          <p>PPM: {cycle.PPM}</p>
          <p>Water Temperature: {cycle.waterTemp} °C</p>
          <p>Outside Temperature: {cycle.outsideTemp} °C</p>
          <p>Planting Halls in Use: {cycle.plantingHallsInUse}</p>
        </div> */}
      {/* ))} */}
    </div>
  );
};

export default PlantPage;
