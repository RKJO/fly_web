import React from 'react';
import styled from 'styled-components';
import FlightPathVisualization from '../visualization/FlightPathVisualization';

const PageContainer = styled.div`
  min-height: 100vh;
  padding-top: 64px; // Account for navbar height
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

const VisualizationContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VisualizationPage = () => {
  return (
    <PageContainer>
      <VisualizationContainer>
        <FlightPathVisualization />
      </VisualizationContainer>
    </PageContainer>
  );
};

export default VisualizationPage;
