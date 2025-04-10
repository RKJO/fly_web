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
import PricingPage from './pages/PricingPage';
import styled from 'styled-components';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--primary);
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
        <Featured />
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
