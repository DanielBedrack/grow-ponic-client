import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracking } from '../../reducers-redux/tracking/trackingReducer';

const SystemPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state) => state.trackingSerivce
  );
  console.log(data);
  useEffect(() => {
    dispatch(fetchTracking());
  }, [dispatch]);

  console.log(data.systems.name);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>System Information</h2>
      <p>Name: {data.systems.name}</p>
      <p>Location: {data.systems.location}</p>
      <p>Planting Halls Overall: {data.systems.plantingHallsOverall}</p>
      <p>Sunlight: {data.systems.sunLight} hours</p>
      <p>Water Tank: {data.systems.waterTank} liters</p>

      <h3>Cycle Information</h3>
      <p>Is Active: {data.cycles.isActive ? 'Yes' : 'No'}</p>
      <p>pH: {data.cycles.pH}</p>
      <p>EC: {data.cycles.EC}</p>
      <p>PPM: {data.cycles.PPM}</p>
      <p>Water Temperature: {data.cycles.waterTemp} °C</p>
      <p>Outside Temperature: {data.cycles.outsideTemp} °C</p>
      <p>Planting Halls in Use: {data.cycles.plantingHallsInUse}</p>

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
      <p>Temperature: {data.averages.temp} °C</p>
    </div>
  );
};

export default SystemPage;
