import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VisualizationSidebar from '../VisualizationSidebar';

describe('VisualizationSidebar', () => {
  const mockProps = {
    isPlaying: false,
    showPath: true,
    showPanels: true,
    showLabels: true,
    speed: 1,
    distance: 100,
    onPlayPause: jest.fn(),
    onTogglePath: jest.fn(),
    onTogglePanels: jest.fn(),
    onToggleLabels: jest.fn(),
    onSpeedChange: jest.fn(),
    onDistanceChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all control sections', () => {
    render(<VisualizationSidebar {...mockProps} />);
    
    expect(screen.getByTestId('play-pause-button')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-path-button')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-panels-button')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-labels-button')).toBeInTheDocument();
    expect(screen.getByTestId('speed-slider')).toBeInTheDocument();
    expect(screen.getByTestId('distance-slider')).toBeInTheDocument();
  });

  it('handles play/pause button click', () => {
    render(<VisualizationSidebar {...mockProps} />);
    fireEvent.click(screen.getByTestId('play-pause-button'));
    expect(mockProps.onPlayPause).toHaveBeenCalled();
  });

  it('handles path visibility toggle', () => {
    render(<VisualizationSidebar {...mockProps} />);
    fireEvent.click(screen.getByTestId('toggle-path-button'));
    expect(mockProps.onTogglePath).toHaveBeenCalled();
  });

  it('handles panels visibility toggle', () => {
    render(<VisualizationSidebar {...mockProps} />);
    fireEvent.click(screen.getByTestId('toggle-panels-button'));
    expect(mockProps.onTogglePanels).toHaveBeenCalled();
  });

  it('handles labels visibility toggle', () => {
    render(<VisualizationSidebar {...mockProps} />);
    fireEvent.click(screen.getByTestId('toggle-labels-button'));
    expect(mockProps.onToggleLabels).toHaveBeenCalled();
  });

  it('handles speed slider change', () => {
    render(<VisualizationSidebar {...mockProps} />);
    const speedSlider = screen.getByTestId('speed-slider');
    fireEvent.change(speedSlider, { target: { value: '2.0' } });
    expect(mockProps.onSpeedChange).toHaveBeenCalledWith(2.0);
  });

  it('handles distance slider change', () => {
    render(<VisualizationSidebar {...mockProps} />);
    const distanceSlider = screen.getByTestId('distance-slider');
    fireEvent.change(distanceSlider, { target: { value: '200' } });
    expect(mockProps.onDistanceChange).toHaveBeenCalledWith(200);
  });

  it('displays correct button states based on props', () => {
    render(<VisualizationSidebar {...mockProps} />);
    
    const playPauseButton = screen.getByTestId('play-pause-button');
    const pathButton = screen.getByTestId('toggle-path-button');
    const panelsButton = screen.getByTestId('toggle-panels-button');
    const labelsButton = screen.getByTestId('toggle-labels-button');

    expect(playPauseButton).toHaveTextContent('▶');
    expect(pathButton).toHaveClass('active');
    expect(panelsButton).toHaveClass('active');
    expect(labelsButton).toHaveClass('active');
  });
}); 