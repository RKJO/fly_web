import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import VisualizationPage from './components/VisualizationPage';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/visualization" element={<VisualizationPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
