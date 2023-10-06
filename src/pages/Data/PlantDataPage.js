import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../reducers-redux/dataReducer';

const PlantData = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.dataService);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  console.log(data.plants);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Plant List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>pH Range</th>
            <th>EC Range</th>
            <th>PPM Range</th>
            <th>Growth Time</th>
            <th>Min Sunlight</th>
            <th>Starters in Water</th>
            <th>Season</th>
            <th>Family</th>
            <th>Temperature Range</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.plants.map((plant) => (
            <tr key={plant.id}>
              <td>{plant.name}</td>
              <td>{`${plant.pH.min} - ${plant.pH.max}`}</td>
              <td>{`${plant.EC.min} - ${plant.EC.max}`}</td>
              <td>{`${plant.PPM.min} - ${plant.PPM.max}`}</td>
              <td>{`${plant.growthTime.min} - ${plant.growthTime.max}`}</td>
              <td>{plant.minSunlight}</td>
              <td>{`${plant.startersInWater.min} - ${plant.startersInWater.max}`}</td>
              <td>{plant.season}</td>
              <td>{plant.family}</td>
              <td>{`${plant.temp.min} - ${plant.temp.max} °C`}</td>
              <td>{plant.image}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlantData;
