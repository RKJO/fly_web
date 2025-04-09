import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaPlay, 
  FaPause, 
  FaEye, 
  FaEyeSlash, 
  FaLayerGroup, 
  FaHashtag, 
  FaTachometerAlt,
  FaArrowLeft,
  FaCog,
  FaChartLine,
  FaRoute,
  FaTag
} from 'react-icons/fa';

const SidebarContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1000;
  overflow-y: auto;

  @media (max-width: 767px) {
    transform: translateX(${props => props.isVisible ? '0' : '-100%'});
    transition: transform 0.3s ease;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--accent);
    border-radius: 10px;
  }
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
  text-decoration: none;
  font-size: 1.1rem;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--accent);
  }
`;

const Section = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: var(--text);
  font-size: 1.2rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ControlButton = styled(motion.button)`
  background: ${props => props.active ? 'var(--accent)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? 'var(--primary)' : 'var(--text)'};
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  width: 100%;
  margin-bottom: 8px;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.active ? 'var(--accent)' : 'rgba(255, 255, 255, 0.2)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

const ControlLabel = styled.span`
  font-size: 14px;
  color: var(--text);
  margin-left: 8px;
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Slider = styled.input`
  width: 100%;
  margin: 8px 0;
`;

const SliderContainer = styled.div`
  width: 100%;
  padding: 8px 0;
`;

const SliderLabel = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  color: var(--text);
`;

const VisualizationSidebar = ({ 
  isPlaying, 
  onPlayPause, 
  showPath, 
  onTogglePath,
  showPanels,
  onTogglePanels,
  showLabels,
  onToggleLabels,
  speed,
  onSpeedChange,
  distance,
  onDistanceChange,
  isVisible
}) => {
  return (
    <SidebarContainer
      initial={false}
      animate={{ x: isVisible ? 0 : -300 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <BackButton to="/">
        <FaArrowLeft /> Wróć do strony głównej
      </BackButton>

      <Section>
        <SectionTitle>
          <FaCog /> Kontrola
        </SectionTitle>
        <ControlButton
          onClick={onPlayPause}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          active={isPlaying}
          data-testid="play-pause-button"
        >
          {isPlaying ? '⏸' : '▶'}
        </ControlButton>
      </Section>

      <Section>
        <SectionTitle>
          <FaLayerGroup /> Widoczność
        </SectionTitle>
        <ControlButton
          onClick={onTogglePath}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          active={showPath}
          className={showPath ? 'active' : ''}
          data-testid="toggle-path-button"
        >
          <FaRoute />
        </ControlButton>
        <ControlButton
          onClick={onTogglePanels}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          active={showPanels}
          className={showPanels ? 'active' : ''}
          data-testid="toggle-panels-button"
        >
          <FaLayerGroup />
        </ControlButton>
        <ControlButton
          onClick={onToggleLabels}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          active={showLabels}
          className={showLabels ? 'active' : ''}
          data-testid="toggle-labels-button"
        >
          <FaTag />
        </ControlButton>
      </Section>

      <Section>
        <SectionTitle>
          <FaTachometerAlt /> Ustawienia
        </SectionTitle>
        <div>
          <label>Prędkość</label>
          <Slider
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            data-testid="speed-slider"
          />
        </div>
        <div>
          <label>Odległość</label>
          <Slider
            type="range"
            min="50"
            max="500"
            step="10"
            value={distance}
            onChange={(e) => onDistanceChange(parseInt(e.target.value))}
            data-testid="distance-slider"
          />
        </div>
      </Section>
    </SidebarContainer>
  );
};

export default VisualizationSidebar; 