import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FlightPathVisualization from './components/visualization/FlightPathVisualization';
import GlobalStyle from './styles/global';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: 'Montserrat', "Helvetica", Arial, sans-serif;
  position: relative;
`;

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualization" element={<FlightPathVisualization />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
