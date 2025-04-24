import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaLayerGroup,
  FaTachometerAlt,
  FaArrowLeft,
  FaCog,
  FaRoute,
  FaTag,
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
    transform: translateX(${props => (props.isVisible ? '0' : '-100%')});
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
  background: ${props => (props.active ? 'var(--accent)' : 'rgba(255, 255, 255, 0.1)')};
  color: ${props => (props.active ? 'var(--primary)' : 'var(--text)')};
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
    background: ${props => (props.active ? 'var(--accent)' : 'rgba(255, 255, 255, 0.2)')};
  }

  &:active {
    transform: translateY(0);
  }
`;

const Slider = styled.input`
  width: 100%;
  margin: 8px 0;
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
  isVisible,
}) => {
  return (
    <SidebarContainer
      initial={false}
      animate={{ x: isVisible ? 0 : -300 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      isVisible={isVisible}
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
          aria-label={isPlaying ? 'Pauza' : 'Odtwarzaj'}
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
          aria-label={showPath ? 'Ukryj ścieżkę' : 'Pokaż ścieżkę'}
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
          aria-label={showPanels ? 'Ukryj panele' : 'Pokaż panele'}
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
          aria-label={showLabels ? 'Ukryj etykiety' : 'Pokaż etykiety'}
        >
          <FaTag />
        </ControlButton>
      </Section>

      <Section>
        <SectionTitle>
          <FaTachometerAlt /> Ustawienia
        </SectionTitle>
        <div>
          <label htmlFor="speed-slider">Prędkość</label>
          <Slider
            id="speed-slider"
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={speed}
            onChange={e => onSpeedChange(parseFloat(e.target.value))}
            data-testid="speed-slider"
            aria-valuemin="0.1"
            aria-valuemax="5"
            aria-valuenow={speed}
          />
        </div>
        <div>
          <label htmlFor="distance-slider">Odległość</label>
          <Slider
            id="distance-slider"
            type="range"
            min="50"
            max="500"
            step="10"
            value={distance}
            onChange={e => onDistanceChange(parseInt(e.target.value))}
            data-testid="distance-slider"
            aria-valuemin="50"
            aria-valuemax="500"
            aria-valuenow={distance}
          />
        </div>
      </Section>
    </SidebarContainer>
  );
};

VisualizationSidebar.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  showPath: PropTypes.bool.isRequired,
  onTogglePath: PropTypes.func.isRequired,
  showPanels: PropTypes.bool.isRequired,
  onTogglePanels: PropTypes.func.isRequired,
  showLabels: PropTypes.bool.isRequired,
  onToggleLabels: PropTypes.func.isRequired,
  speed: PropTypes.number.isRequired,
  onSpeedChange: PropTypes.func.isRequired,
  distance: PropTypes.number.isRequired,
  onDistanceChange: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default VisualizationSidebar;
