import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './App.css';
import React from 'react';
import HomePage from './pages/HomePage';
import SystemPage from './pages/system/SystemPage';
import SystemRegistrationForm from './components/registration-system/SystemRegistrationForm';
import UserSigninPage from './pages/user/UserSigninPage';
import CycleRegistration from './components/registration-system/cycleRegistration';
import UserRegisterPage from './pages/user/UserRegisterPage';
import PlantData from './pages/Data/PlantDataPage';
import Navbar from './components/shared/navbar';
import DiseasesData from './pages/Data/DiseaseData';
import SystemsData from './pages/Data/SystemsData';
import CyclePage from './pages/system/CyclePage';
import PlantPage from './pages/system/PlantPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="d-flex flex-column side-allpage">
          <Navbar />
          <main>
            <Container className="mt-3">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/system" element={<SystemPage />} />
                <Route path="/signin" element={<UserSigninPage />} />
                <Route path="/register" element={<UserRegisterPage />} />
                <Route path="/plants-data" element={<PlantData />} />
                <Route path="/diseases-data" element={<DiseasesData />} />
                <Route path="/systems-data" element={<SystemsData />} />
                <Route
                  path="/create-system"
                  element={<SystemRegistrationForm />}
                />
                <Route path="/create-cycle" element={<CycleRegistration />} />
                <Route path="/cycles/:systemId" element={<CyclePage />} />
                <Route path="/plants" element={<PlantPage />} />
              </Routes>
            </Container>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
