import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import './styles/global.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FlightPathVisualization from './components/visualization/FlightPathVisualization';
import About from './components/sections/About';
import Pricing from './components/sections/Pricing';
import KidsZone from './components/sections/KidsZone';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';
import Featured from './components/sections/Featured';
import PricingPage from './components/sections/PricingPage';
import styled from 'styled-components';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--primary);
`;

const FeaturedSection = styled.section`
  background: var(--primary);
  padding: 0;
  margin: 0;
  overflow: hidden;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }
`;

const HomePage = () => {
  const options = {
    smooth: true,
    multiplier: 1,
    class: 'is-revealed',
  };

  return (
    <LocomotiveScrollProvider
      options={options}
      containerRef={React.useRef()}
    >
      <PageWrapper data-scroll-container>
        <Navigation />
        <Hero />
        <About />
        <Pricing />
        <KidsZone />
        <Blog />
        <Contact />
      </PageWrapper>
    </LocomotiveScrollProvider>
  );
};

const BlogPage = () => {
  return (
    <PageWrapper>
      <Navigation />
      <Blog fullPage />
    </PageWrapper>
  );
};

const KidsZonePage = () => {
  const options = {
    smooth: true,
    multiplier: 1,
    class: 'is-revealed',
  };

  return (
    <LocomotiveScrollProvider
      options={options}
      containerRef={React.useRef()}
    >
      <PageWrapper data-scroll-container>
        <Navigation />
        <KidsZone fullPage />
      </PageWrapper>
    </LocomotiveScrollProvider>
  );
};

const VisualizationPage = () => {
  return (
    <div className="visualization-page">
      <Navigation />
      <FlightPathVisualization />
    </div>
  );
};

const PricingPageWrapper = () => {
  return (
    <PageWrapper>
      <Navigation />
      <PricingPage />
    </PageWrapper>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visualization" element={<VisualizationPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/kids" element={<KidsZonePage />} />
        <Route path="/pricing" element={<PricingPageWrapper />} />
      </Routes>
    </Router>
  );
};

export default App;
