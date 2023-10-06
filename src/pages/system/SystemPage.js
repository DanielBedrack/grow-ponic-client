import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSystems, fetchCycles } from '../../reducers-redux/tracking/trackingReducer';
import AddButton from '../../components/shared/AddButton';
import { useNavigate } from 'react-router-dom';
import SystemList from '../../components/system/SystemList';

const SystemPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state) => state.trackingService
  );
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(data.systems)

  useEffect(() => {

    // Fetch data when the component mounts
    dispatch(fetchSystems(userInfo.email));
  }, [dispatch, userInfo]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleAddButtonClick = () => {
    navigate('/create-system');
  };
  const handleSystemClick = () => {

  }

  return (
    <div>
      <AddButton onClick={handleAddButtonClick} />
      <SystemList systems={data.systems}  />
      {/* <h2>System Information</h2>
      {data.systems.map((system) => (
        <div key={system._id}>
          <p>Name: {system.name}</p>
          <p>Location: {system.location}</p>
          <p>Planting Halls Overall: {system.plantingHallsOverall}</p>
          <p>Sunlight: {system.sunLight} hours</p>
          <p>Water Tank: {system.waterTank} liters</p>
        </div>
      ))} */}

      {/* <h3>Cycle Information</h3>
      {data.cycles.map((cycle) => (
        <div key={cycle.systemID}>
          <p>Is Active: {cycle.isActive ? 'Yes' : 'No'}</p>
          <p>pH: {cycle.pH}</p>
          <p>EC: {cycle.EC}</p>
          <p>PPM: {cycle.PPM}</p>
          <p>Water Temperature: {cycle.waterTemp} °C</p>
          <p>Outside Temperature: {cycle.outsideTemp} °C</p>
          <p>Planting Halls in Use: {cycle.plantingHallsInUse}</p>
        </div>
      ))}

      <h3>Plants</h3>
      <ul>
        {data.plants.map((plant) => (
          <li key={plant._id}>{plant.name}</li>
        ))}
      </ul>

      <h3>Averages</h3>
      <p>pH: {data.averages.pH}</p>
      <p>EC: {data.averages.EC}</p>
      <p>PPM: {data.averages.PPM}</p>
      <p>Temperature: {data.averages.temp} °C</p> */}
    </div>
  );
};

export default SystemPage;
