import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../reducers-redux/dataReducer';

const SystemsData = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.dataService);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>System List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Planting Halls</th>
            <th>Water Pump</th>
            <th>Air Pump</th>
            <th>Water Tank</th>
            <th>Maintenance</th>
            <th>Water Temperature Solutions</th>
          </tr>
        </thead>
        <tbody>
          {data.systems.map((system) => (
            <tr key={system.name}>
              <td>{system.name}</td>
              <td>{system.plantingHalls}</td>
              <td>{system.waterPump}</td>
              <td>{system.airPump}</td>
              <td>{system.waterTank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SystemsData;
