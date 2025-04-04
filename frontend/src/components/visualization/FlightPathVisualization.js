import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  FaPlay, 
  FaPause, 
  FaEye, 
  FaEyeSlash, 
  FaLayerGroup, 
  FaHashtag, 
  FaTachometerAlt,
  FaMousePointer,
  FaHandPaper,
  FaSearchPlus,
  FaArrowLeft
} from 'react-icons/fa';

// Styled components
const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #f5f5f5;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
`;

const NavTitle = styled.h1`
  margin: 0;
  font-size: 20px;
  color: #1a237e;
  font-weight: 600;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1a237e;
  text-decoration: none;
  font-weight: 500;
  margin-right: 20px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(26, 35, 126, 0.1);
  }
`;

const ControlPanel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  padding: 20px;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  z-index: 100;
  width: 260px;
  max-width: 90%;
  height: calc(100vh - 64px - 120px);
  display: flex;
  flex-direction: column;
  gap: 30px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  overflow-y: auto;
  margin-top: 104px;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const ControlButton = styled.button`
  background: #1a237e;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &:hover {
    background: #283593;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }

  &.active {
    background: #4CAF50;
  }
`;

const ControlSection = styled.div`
  margin-bottom: 20px;
  
  h3 {
    margin: 0 0 10px 0;
    color: #000;
    font-size: 16px;
  }
  
  p {
    margin: 0 0 5px 0;
    color: #000;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const SpeedSlider = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  
  input[type="range"] {
    width: 100%;
    height: 5px;
    background: #e0e0e0;
    border-radius: 5px;
    outline: none;
    -webkit-appearance: none;
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 15px;
      height: 15px;
      background: #1a237e;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  
  .speed-value {
    text-align: center;
    font-weight: 500;
    color: #000;
  }
`;

const VisualizationContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
`;

// Constants
const TUNNEL_RADIUS = 4.2;
const TUNNEL_HEIGHT = 6;
const PATH_RADIUS = 3.5;
const PATH_HEIGHT = 2;
const NUM_PANELS = 12;

// Utility functions
const createPathPoints = (numPoints = 100) => {
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = (i / numPoints) * Math.PI * 4;
    const x = Math.cos(t) * PATH_RADIUS;
    const z = Math.sin(t) * PATH_RADIUS;
    const y = Math.sin(t * 0.5) * PATH_HEIGHT;
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
};

const createPanelNumber = (index, isFirstPanel) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 256;
  context.fillStyle = isFirstPanel ? '#ff0000' : '#000000';
  context.font = 'Bold 120px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(index + 1, 128, 128);

  const numberTexture = new THREE.CanvasTexture(canvas);
  const numberMaterial = new THREE.MeshBasicMaterial({
    map: numberTexture,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
  });

  const numberGeometry = new THREE.PlaneGeometry(1, 1);
  const number = new THREE.Mesh(numberGeometry, numberMaterial);
  
  const panelCenterAngle = ((index + 0.5) / NUM_PANELS) * Math.PI * 2;
  number.position.set(
    Math.cos(panelCenterAngle) * (TUNNEL_RADIUS - 0.1),
    0,
    Math.sin(panelCenterAngle) * (TUNNEL_RADIUS - 0.1)
  );
  number.rotation.y = panelCenterAngle + Math.PI / 2;
  
  return number;
};

const FlightPathVisualization = () => {
  // Refs
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const pathRef = useRef(null);
  const animationRef = useRef(null);
  const floorGroupRef = useRef(null);
  const upperStructureGroupRef = useRef(null);

  // State
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(0.2);
  const [showUpperStructure, setShowUpperStructure] = useState(true);
  const [showPath, setShowPath] = useState(true);
  const [showPanelNumbers, setShowPanelNumbers] = useState(false);

  // Initialize scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.02,
      1000
    );
    camera.position.set(8, 2, 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = 0;
    controlsRef.current = controls;

    // Lights setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const topLight = new THREE.SpotLight(0xffffff, 1.5);
    topLight.position.set(0, 4, 0);
    topLight.angle = Math.PI / 3;
    topLight.penumbra = 0.5;
    topLight.castShadow = true;
    scene.add(topLight);

    const sideLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
    sideLight1.position.set(5, 0, 0);
    scene.add(sideLight1);

    const sideLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    sideLight2.position.set(-5, 0, 0);
    scene.add(sideLight2);

    // Materials
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.9,
      roughness: 0.2,
    });

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.9,
      roughness: 0.3,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
      roughness: 0.05,
      metalness: 0,
      transmission: 0.98,
      thickness: 0.5,
      envMapIntensity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
    });

    // Create floor group
    const floorGroup = new THREE.Group();
    floorGroupRef.current = floorGroup;
    
    // Floor ring
    const floorRingGeometry = new THREE.RingGeometry(3.8, 4.2, 12, 1);
    const floorRing = new THREE.Mesh(floorRingGeometry, floorMaterial);
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.y = -3;
    floorRing.receiveShadow = true;
    floorGroup.add(floorRing);

    // Floor grid
    const gridSize = 8.4;
    const cellSize = 0.1;
    const gridDivisions = Math.floor(gridSize / cellSize);
    
    // Horizontal grid lines
    for (let i = 0; i <= gridDivisions; i++) {
      const y = (i - gridDivisions/2) * cellSize;
      const lineGeometry = new THREE.BufferGeometry();
      const vertices = [];
      
      for (let x = -gridSize/2; x <= gridSize/2; x += cellSize/10) {
        if (Math.sqrt(x*x + y*y) <= 4.2) {
          vertices.push(x, y, 0);
        }
      }
      
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      const line = new THREE.Line(
        lineGeometry,
        new THREE.LineBasicMaterial({ color: 0x666666, linewidth: 1 })
      );
      line.rotation.x = -Math.PI / 2;
      line.position.y = -3;
      floorGroup.add(line);
    }

    // Vertical grid lines
    for (let i = 0; i <= gridDivisions; i++) {
      const x = (i - gridDivisions/2) * cellSize;
      const lineGeometry = new THREE.BufferGeometry();
      const vertices = [];
      
      for (let y = -gridSize/2; y <= gridSize/2; y += cellSize/10) {
        if (Math.sqrt(x*x + y*y) <= 4.2) {
          vertices.push(x, y, 0);
        }
      }
      
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      const line = new THREE.Line(
        lineGeometry,
        new THREE.LineBasicMaterial({ color: 0x666666, linewidth: 1 })
      );
      line.rotation.x = -Math.PI / 2;
      line.position.y = -3;
      floorGroup.add(line);
    }

    // Bottom ring
    const bottomRingGeometry = new THREE.TorusGeometry(4.3, 0.15, 16, 12);
    const bottomRing = new THREE.Mesh(bottomRingGeometry, metalMaterial);
    bottomRing.position.y = -3;
    bottomRing.rotation.x = Math.PI / 2;
    bottomRing.castShadow = true;
    floorGroup.add(bottomRing);

    scene.add(floorGroup);

    // Create upper structure group
    const upperStructureGroup = new THREE.Group();
    upperStructureGroupRef.current = upperStructureGroup;

    // Top ring
    const topRingGeometry = new THREE.TorusGeometry(4.3, 0.15, 16, 12);
    const topRing = new THREE.Mesh(topRingGeometry, metalMaterial);
    topRing.position.y = 3;
    topRing.rotation.x = Math.PI / 2;
    topRing.castShadow = true;
    upperStructureGroup.add(topRing);

    // Tunnel
    const tunnelGeometry = new THREE.CylinderGeometry(4.2, 4.2, 6, 12, 1, true);
    const tunnel = new THREE.Mesh(tunnelGeometry, glassMaterial);
    tunnel.castShadow = true;
    upperStructureGroup.add(tunnel);

    // Panels and pillars
    for (let i = 0; i < NUM_PANELS; i++) {
      const angle = (i / NUM_PANELS) * Math.PI * 2;
      
      // Pillar
      const pillarGeometry = new THREE.BoxGeometry(0.05, 6, 0.05);
      const pillarMaterial = i === 0 ? new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.80,
        roughness: 0.2,
      }) : metalMaterial;
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.x = Math.cos(angle) * 4.2;
      pillar.position.z = Math.sin(angle) * 4.2;
      pillar.castShadow = true;
      upperStructureGroup.add(pillar);

      // Panel number
      const number = createPanelNumber(i, i === 0);
      number.visible = showPanelNumbers;
      upperStructureGroup.add(number);

      // Door frame for first panel
      if (i === 0) {
        const doorFrameGroup = new THREE.Group();
        
        // Left pillar
        const leftPillar = new THREE.Mesh(
          new THREE.BoxGeometry(0.05, 3.2, 0.05),
          new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            metalness: 0.80,
            roughness: 0.2,
          })
        );
        leftPillar.position.set(0, -1.2, 0);
        doorFrameGroup.add(leftPillar);

        // Right pillar
        const rightPillar = new THREE.Mesh(
          new THREE.BoxGeometry(0.05, 3.2, 0.05),
          new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            metalness: 0.80,
            roughness: 0.2,
          })
        );
        rightPillar.position.set(1.8, -1.2, 0);
        doorFrameGroup.add(rightPillar);

        // Top beam
        const topBeam = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 0.05, 0.05),
          new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            metalness: 0.80,
            roughness: 0.2,
          })
        );
        topBeam.position.set(0.9, 0.38, 0);
        doorFrameGroup.add(topBeam);

        // Position door frame
        const panel1Angle = (0 / NUM_PANELS) * Math.PI * 2;
        doorFrameGroup.position.set(
          Math.cos(panel1Angle) * 4.1 - 0.4,
          0,
          Math.sin(panel1Angle) * 4.1 + 1.9
        );
        doorFrameGroup.rotation.y = panel1Angle + Math.PI / 2 + (-15 * Math.PI / 180);
        upperStructureGroup.add(doorFrameGroup);
      }
    }

    scene.add(upperStructureGroup);

    // Flight path
    const pathPoints = createPathPoints();
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const pathMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });
    const path = new THREE.Line(pathGeometry, pathMaterial);
    scene.add(path);

    // Animation sphere
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0xff0000,
      emissiveIntensity: 0.5
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.copy(pathPoints[0]);
    scene.add(sphere);

    // Save references
    pathRef.current = {
      points: pathPoints,
      sphere: sphere,
      path: path
    };

    // Render loop
    const render = () => {
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.render(scene, cameraRef.current);
      }
      
      requestAnimationFrame(render);
    };

    render();

    // Handle resize
    const handleResize = () => {
      if (mountRef.current && cameraRef.current && rendererRef.current) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Update path visibility
  useEffect(() => {
    if (pathRef.current && pathRef.current.path) {
      pathRef.current.path.visible = showPath;
    }
  }, [showPath]);

  // Animation loop
  useEffect(() => {
    if (!pathRef.current) return;
    
    let lastTime = performance.now();
    const animate = (currentTime) => {
      if (!isPlaying) return;
      
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      setAnimationProgress(prev => {
        const newProgress = (prev + animationSpeed * deltaTime) % 1;
        return newProgress;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (isPlaying) {
      animate(lastTime);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animationSpeed]);

  // Update sphere position
  useEffect(() => {
    if (!pathRef.current || !pathRef.current.sphere || !pathRef.current.points) return;

    const { sphere, points } = pathRef.current;
    if (!points || points.length === 0) return;

    const index = Math.floor(animationProgress * (points.length - 1));
    const nextIndex = (index + 1) % points.length;
    
    const point1 = points[index];
    const point2 = points[nextIndex];
    
    if (!point1 || !point2) return;

    const t = animationProgress * points.length % 1;
    sphere.position.x = point1.x + (point2.x - point1.x) * t;
    sphere.position.y = point1.y + (point2.y - point1.y) * t;
    sphere.position.z = point1.z + (point2.z - point1.z) * t;
  }, [animationProgress]);

  // Update upper structure visibility
  useEffect(() => {
    if (upperStructureGroupRef.current) {
      upperStructureGroupRef.current.visible = showUpperStructure;
    }
  }, [showUpperStructure]);

  // Update panel numbers visibility
  useEffect(() => {
    if (upperStructureGroupRef.current) {
      upperStructureGroupRef.current.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.PlaneGeometry) {
          child.visible = showPanelNumbers;
        }
      });
    }
  }, [showPanelNumbers]);

  return (
    <PageWrapper>
      <Navbar>
        <BackButton to="/">
          <FaArrowLeft /> Powrót
        </BackButton>
        <NavTitle>Wizualizacja ścieżki lotu</NavTitle>
      </Navbar>
      <ControlPanel>
        <ControlSection>
          <h3>Sterowanie</h3>
          <ControlButton onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <FaPause /> : <FaPlay />}
            {isPlaying ? 'Stop' : 'Start'}
          </ControlButton>
          <ControlButton onClick={() => setShowPath(!showPath)}>
            {showPath ? <FaEyeSlash /> : <FaEye />}
            {showPath ? 'Ukryj ścieżkę' : 'Pokaż ścieżkę'}
          </ControlButton>
          <ControlButton 
            onClick={() => setShowUpperStructure(!showUpperStructure)}
            className={showUpperStructure ? 'active' : ''}
          >
            <FaLayerGroup />
            {showUpperStructure ? 'Ukryj górną strukturę' : 'Pokaż górną strukturę'}
          </ControlButton>
          <ControlButton 
            onClick={() => setShowPanelNumbers(!showPanelNumbers)}
            className={showPanelNumbers ? 'active' : ''}
          >
            <FaHashtag />
            {showPanelNumbers ? 'Ukryj numery paneli' : 'Pokaż numery paneli'}
          </ControlButton>
        </ControlSection>
        <ControlSection>
          <h3>Prędkość animacji</h3>
          <SpeedSlider>
            <div className="speed-value"><FaTachometerAlt /> Prędkość: {(animationSpeed * 5).toFixed(1)}x</div>
            <input
              type="range"
              min="0.1"
              max="0.4"
              step="0.05"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
            />
          </SpeedSlider>
        </ControlSection>
        <ControlSection style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
          <h3>Sterowanie kamerą</h3>
          <p><FaMousePointer /> Lewy przycisk myszy: Obrót kamery</p>
          <p><FaHandPaper /> Prawy przycisk myszy: Przesunięcie</p>
          <p><FaSearchPlus /> Scroll: Przybliżenie/oddalenie</p>
        </ControlSection>
      </ControlPanel>
      <VisualizationContainer ref={mountRef} />
    </PageWrapper>
  );
};

export default FlightPathVisualization; 