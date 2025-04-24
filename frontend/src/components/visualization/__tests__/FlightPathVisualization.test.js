import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlightPathVisualization from '../FlightPathVisualization';

// Mock dla Three.js
jest.mock('three', () => {
  const mockThree = jest.requireActual('three');
  return {
    ...mockThree,
    Scene: jest.fn().mockImplementation(() => ({
      background: null,
      add: jest.fn(),
      traverse: jest.fn(),
    })),
    PerspectiveCamera: jest.fn().mockImplementation(() => ({
      position: { set: jest.fn() },
      lookAt: jest.fn(),
      aspect: 1,
      updateProjectionMatrix: jest.fn(),
    })),
    WebGLRenderer: jest.fn().mockImplementation(() => ({
      setSize: jest.fn(),
      shadowMap: { enabled: true, type: 'PCFSoftShadowMap' },
      domElement: document.createElement('div'),
      render: jest.fn(),
      dispose: jest.fn(),
    })),
    Color: jest.fn(),
    AmbientLight: jest.fn().mockImplementation(() => ({
      position: { set: jest.fn() },
    })),
    SpotLight: jest.fn().mockImplementation(() => ({
      position: { set: jest.fn() },
      angle: 0,
      penumbra: 0,
      castShadow: false,
    })),
    DirectionalLight: jest.fn().mockImplementation(() => ({
      position: { set: jest.fn() },
    })),
    MeshStandardMaterial: jest.fn().mockImplementation(() => ({})),
    MeshPhysicalMaterial: jest.fn().mockImplementation(() => ({})),
    Group: jest.fn().mockImplementation(() => ({
      add: jest.fn(),
      visible: true,
      children: [],
    })),
    RingGeometry: jest.fn(),
    TorusGeometry: jest.fn(),
    CylinderGeometry: jest.fn(),
    BoxGeometry: jest.fn(),
    SphereGeometry: jest.fn(),
    PlaneGeometry: jest.fn(),
    BufferGeometry: jest.fn().mockImplementation(() => ({
      setFromPoints: jest.fn(),
      setAttribute: jest.fn(),
    })),
    Float32BufferAttribute: jest.fn(),
    LineBasicMaterial: jest.fn(),
    Line: jest.fn().mockImplementation(() => ({
      visible: true,
    })),
    Mesh: jest.fn().mockImplementation(() => ({
      position: { copy: jest.fn(), set: jest.fn() },
      rotation: { set: jest.fn() },
      castShadow: false,
      receiveShadow: false,
      visible: true,
    })),
    Vector3: jest.fn().mockImplementation((x, y, z) => ({ x, y, z })),
    CanvasTexture: jest.fn(),
    MeshBasicMaterial: jest.fn(),
  };
});

// Mock dla OrbitControls
jest.mock('three/examples/jsm/controls/OrbitControls', () => {
  return jest.fn().mockImplementation(() => ({
    enableDamping: true,
    dampingFactor: 0.05,
    screenSpacePanning: false,
    minDistance: 5,
    maxDistance: 20,
    maxPolarAngle: Math.PI / 2,
    minPolarAngle: 0,
    update: jest.fn(),
  }));
});

// Mock dla requestAnimationFrame
global.requestAnimationFrame = jest.fn(callback => setTimeout(callback, 0));
global.cancelAnimationFrame = jest.fn();

// Mock dla canvas
jest.mock('jest-canvas-mock');

describe('FlightPathVisualization', () => {
  beforeEach(() => {
    // Resetowanie mocków przed każdym testem
    jest.clearAllMocks();

    // Mock dla getContext
    const mockContext = {
      fillStyle: '',
      font: '',
      textAlign: '',
      textBaseline: '',
      fillText: jest.fn(),
    };

    // Mock dla createElement
    const originalCreateElement = document.createElement;
    document.createElement = jest.fn(tagName => {
      if (tagName === 'canvas') {
        const canvas = originalCreateElement.call(document, tagName);
        canvas.getContext = jest.fn(() => mockContext);
        return canvas;
      }
      return originalCreateElement.call(document, tagName);
    });

    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  test('renderuje się poprawnie', () => {
    render(<FlightPathVisualization />);

    // Sprawdzenie, czy główne elementy są renderowane
    expect(screen.getByText('Wizualizacja ścieżki lotu')).toBeInTheDocument();
    expect(screen.getByText('Powrót')).toBeInTheDocument();
    expect(screen.getByText('Sterowanie')).toBeInTheDocument();
    expect(screen.getByText('Prędkość animacji')).toBeInTheDocument();
    expect(screen.getByText('Sterowanie kamerą')).toBeInTheDocument();
  });

  test('przyciski sterowania działają poprawnie', () => {
    render(<FlightPathVisualization />);

    // Sprawdzenie przycisku Start/Stop
    const playButton = screen.getByText('Start');
    expect(playButton).toBeInTheDocument();

    fireEvent.click(playButton);
    expect(screen.getByText('Stop')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Stop'));
    expect(screen.getByText('Start')).toBeInTheDocument();

    // Sprawdzenie przycisku Pokaż/Ukryj ścieżkę
    const pathButton = screen.getByText('Pokaż ścieżkę');
    expect(pathButton).toBeInTheDocument();

    fireEvent.click(pathButton);
    expect(screen.getByText('Ukryj ścieżkę')).toBeInTheDocument();

    // Sprawdzenie przycisku Pokaż/Ukryj górną strukturę
    const structureButton = screen.getByText('Pokaż górną strukturę');
    expect(structureButton).toBeInTheDocument();

    fireEvent.click(structureButton);
    expect(screen.getByText('Ukryj górną strukturę')).toBeInTheDocument();

    // Sprawdzenie przycisku Pokaż/Ukryj numery paneli
    const numbersButton = screen.getByText('Pokaż numery paneli');
    expect(numbersButton).toBeInTheDocument();

    fireEvent.click(numbersButton);
    expect(screen.getByText('Ukryj numery paneli')).toBeInTheDocument();
  });

  test('suwak prędkości działa poprawnie', () => {
    render(<FlightPathVisualization />);

    const speedSlider = screen.getByRole('slider');
    expect(speedSlider).toBeInTheDocument();

    // Sprawdzenie wartości początkowej
    expect(screen.getByText(/Prędkość: 1.0x/)).toBeInTheDocument();

    // Zmiana wartości suwaka
    fireEvent.change(speedSlider, { target: { value: '0.3' } });
    expect(screen.getByText(/Prędkość: 1.5x/)).toBeInTheDocument();

    fireEvent.change(speedSlider, { target: { value: '0.4' } });
    expect(screen.getByText(/Prędkość: 2.0x/)).toBeInTheDocument();
  });

  test('przycisk powrotu przekierowuje do strony głównej', () => {
    render(<FlightPathVisualization />);

    const backButton = screen.getByText('Powrót');
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/');
  });

  test('komponent czyści zasoby przy odmontowaniu', () => {
    const { unmount } = render(<FlightPathVisualization />);

    // Symulacja odmontowania komponentu
    unmount();

    // Sprawdzenie, czy cancelAnimationFrame został wywołany
    expect(global.cancelAnimationFrame).toHaveBeenCalled();
  });

  it('renders visualization container', () => {
    render(<FlightPathVisualization />);
    expect(screen.getByTestId('visualization-container')).toBeInTheDocument();
  });

  it('renders sidebar toggle button', () => {
    render(<FlightPathVisualization />);
    expect(screen.getByTestId('sidebar-toggle')).toBeInTheDocument();
  });

  it('toggles sidebar visibility on button click', () => {
    render(<FlightPathVisualization />);
    const toggleButton = screen.getByTestId('sidebar-toggle');
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('visualization-sidebar')).toHaveStyle({
      transform: 'translateX(0px)',
    });
  });

  it('renders sidebar with controls', () => {
    render(<FlightPathVisualization />);
    expect(screen.getByText('Kontrola')).toBeInTheDocument();
    expect(screen.getByText('Widoczność')).toBeInTheDocument();
    expect(screen.getByText('Ustawienia')).toBeInTheDocument();
  });
});
