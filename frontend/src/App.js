import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const MainContent = () => {
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
      <main data-scroll-container>
        <Navigation />
        <Hero />
        <About />
        <Pricing />
        <KidsZone />
        <Blog />
        <Contact />
      </main>
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/visualization" element={<VisualizationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
