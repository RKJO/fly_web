import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: #00ff87;
  color: #1e3c72;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 255, 135, 0.3);
  }
`;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Title>Indoor Skydiving Visualization</Title>
      <Subtitle>
        Experience the thrill of indoor skydiving through our interactive 3D visualization.
        Perfect for understanding flight paths and training sequences.
      </Subtitle>
      <Button onClick={() => navigate('/visualization')}>
        Launch Visualization
      </Button>
    </HomeContainer>
  );
};

export default HomePage; 