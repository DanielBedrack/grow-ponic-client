import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../reducers-redux/dataReducer';

const DiseasesData = () => {
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
      <h2>Disease List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symptoms</th>
            <th>Solution (Organic)</th>
            <th>Solution (Biological)</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.diseases.map((disease) => (
            <tr key={disease.name}>
              <td>{disease.name}</td>
              <td>{disease.symptoms}</td>
              <td>
                <ul>
                  {disease.solution.organicSolution.map((solution, index) => (
                    <li key={index}>{solution}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {disease.solution.biologicalSolution.map(
                    (solution, index) => (
                      <li key={index}>{solution}</li>
                    )
                  )}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiseasesData;
