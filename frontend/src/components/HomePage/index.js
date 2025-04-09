import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../Navigation';
import Hero from '../Hero';
import About from '../sections/About';
import Pricing from '../sections/Pricing';
import KidsZone from '../sections/KidsZone';
import Blog from '../sections/Blog';
import Contact from '../sections/Contact';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--primary);
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <Navigation />
      <Hero />
      <About />
      <Pricing />
      <KidsZone />
      <Blog />
      <Contact />
    </HomeContainer>
  );
};

export default HomePage; 