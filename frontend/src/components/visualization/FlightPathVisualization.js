import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import VisualizationSidebar from './VisualizationSidebar';
import { motion } from 'framer-motion';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

// Styled components
const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: var(--primary);
`;

const VisualizationContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
`;

const ToggleSidebarButton = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  left: ${props => (props.isVisible ? '260px' : '20px')};
  z-index: 1001;
  background: var(--accent);
  color: var(--primary);
  border: none;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  font-size: 20px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

// Constants
const PATH_RADIUS = 3.5;
const PATH_HEIGHT = 2;
const NUM_PANELS = 12;

// Utility functions
const createPathPoints = (numPoints = 100, distance = 1) => {
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = (i / numPoints) * Math.PI * 4;
    const x = Math.cos(t) * PATH_RADIUS * distance;
    const z = Math.sin(t) * PATH_RADIUS * distance;
    const y = Math.sin(t * 0.5) * PATH_HEIGHT;
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
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
  const [showPath, setShowPath] = useState(true);
  const [showPanelNumbers, setShowPanelNumbers] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [distance, setDistance] = useState(1);
  const [showLabels, setShowLabels] = useState(true);

  // Initialize scene
  useEffect(() => {
    const currentMountRef = mountRef.current;
    if (!currentMountRef) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      currentMountRef.clientWidth / currentMountRef.clientHeight,
      0.1,
      1000
    );
    camera.position.set(12, 6, 12);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(currentMountRef.clientWidth, currentMountRef.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    currentMountRef.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 8;
    controls.maxDistance = 30;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = 0;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Lights setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const topLight = new THREE.SpotLight(0xffffff, 2);
    topLight.position.set(0, 10, 0);
    topLight.angle = Math.PI / 3;
    topLight.penumbra = 0.5;
    topLight.castShadow = true;
    topLight.shadow.bias = -0.001;
    topLight.shadow.mapSize.width = 2048;
    topLight.shadow.mapSize.height = 2048;
    scene.add(topLight);

    const sideLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    sideLight1.position.set(10, 0, 0);
    sideLight1.castShadow = true;
    scene.add(sideLight1);

    const sideLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    sideLight2.position.set(-10, 0, 0);
    sideLight2.castShadow = true;
    scene.add(sideLight2);

    // Materials
    const metalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xcccccc,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0
    });

    const floorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x888888,
      metalness: 0.9,
      roughness: 0.3,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1
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
      const y = (i - gridDivisions / 2) * cellSize;
      const lineGeometry = new THREE.BufferGeometry();
      const vertices = [];

      for (let x = -gridSize / 2; x <= gridSize / 2; x += cellSize / 10) {
        if (Math.sqrt(x * x + y * y) <= 4.2) {
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
      const x = (i - gridDivisions / 2) * cellSize;
      const lineGeometry = new THREE.BufferGeometry();
      const vertices = [];

      for (let y = -gridSize / 2; y <= gridSize / 2; y += cellSize / 10) {
        if (Math.sqrt(x * x + y * y) <= 4.2) {
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
    const bottomRingGeometry = new THREE.TorusGeometry(4.3, 0.08, 16, 12);
    const bottomRing = new THREE.Mesh(bottomRingGeometry, metalMaterial);
    bottomRing.position.y = -3;
    bottomRing.rotation.x = Math.PI / 2;
    bottomRing.castShadow = true;
    floorGroup.add(bottomRing);

    scene.add(floorGroup);

    // Create upper structure group
    const upperStructureGroup = new THREE.Group();
    upperStructureGroupRef.current = upperStructureGroup;

    // Vertical supports
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const supportGeometry = new THREE.CylinderGeometry(0.05, 0.05, 6, 8);
      const support = new THREE.Mesh(supportGeometry, metalMaterial);
      support.position.set(
        Math.cos(angle) * 4.3,
        0,
        Math.sin(angle) * 4.3
      );
      support.castShadow = true;
      upperStructureGroup.add(support);
    }

    // Door frame
    const doorFrameGeometry = new THREE.BoxGeometry(0.8, 2, 0.1);
    const doorFrame = new THREE.Mesh(doorFrameGeometry, metalMaterial);
    doorFrame.position.set(4.3, -2, 0);
    doorFrame.rotation.y = Math.PI / 2;
    doorFrame.castShadow = true;
    upperStructureGroup.add(doorFrame);

    // Glass panels
    const glassGeometry = new THREE.CylinderGeometry(4.2, 4.2, 6, 32, 1, true);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0,
      transmission: 0.95,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    });
    const glassTunnel = new THREE.Mesh(glassGeometry, glassMaterial);
    glassTunnel.position.y = 0;
    upperStructureGroup.add(glassTunnel);

    // Upper ring
    const upperRingGeometry = new THREE.TorusGeometry(4.3, 0.08, 16, 12);
    const upperRing = new THREE.Mesh(upperRingGeometry, metalMaterial);
    upperRing.position.y = 3;
    upperRing.rotation.x = Math.PI / 2;
    upperRing.castShadow = true;
    upperStructureGroup.add(upperRing);

    scene.add(upperStructureGroup);

    // Flight path
    const pathPoints = createPathPoints(100, distance);
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
      emissiveIntensity: 0.5,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.copy(pathPoints[0]);
    scene.add(sphere);

    // Save references
    pathRef.current = {
      points: pathPoints,
      sphere: sphere,
      path: path,
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
      if (currentMountRef && cameraRef.current && rendererRef.current) {
        const width = currentMountRef.clientWidth;
        const height = currentMountRef.clientHeight;

        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (sceneRef.current) {
        while (sceneRef.current.children.length > 0) {
          const object = sceneRef.current.children[0];
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
          sceneRef.current.remove(object);
        }
      }
      if (currentMountRef && currentMountRef.contains(rendererRef.current.domElement)) {
        currentMountRef.removeChild(rendererRef.current.domElement);
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
    const animate = currentTime => {
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

    const t = (animationProgress * points.length) % 1;
    sphere.position.x = point1.x + (point2.x - point1.x) * t;
    sphere.position.y = point1.y + (point2.y - point1.y) * t;
    sphere.position.z = point1.z + (point2.z - point1.z) * t;
  }, [animationProgress]);

  // Update upper structure visibility
  useEffect(() => {
    if (upperStructureGroupRef.current) {
      upperStructureGroupRef.current.visible = showLabels;
    }
  }, [showLabels]);

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

  // Update path and structure when distance changes
  useEffect(() => {
    if (!pathRef.current || !upperStructureGroupRef.current || !floorGroupRef.current) return;

    // Update path
    const newPoints = createPathPoints(100, distance);
    pathRef.current.points = newPoints;
    pathRef.current.path.geometry.setFromPoints(newPoints);
    pathRef.current.path.geometry.attributes.position.needsUpdate = true;

    // Update structure scale
    upperStructureGroupRef.current.scale.set(distance, distance, distance);
    floorGroupRef.current.scale.set(distance, distance, distance);
  }, [distance]);

  // Update labels visibility
  useEffect(() => {
    if (upperStructureGroupRef.current) {
      upperStructureGroupRef.current.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.BoxGeometry) {
          child.visible = showLabels;
        }
      });
    }
  }, [showLabels]);

  // Update path and panels when distance changes
  useEffect(() => {
    if (!sceneRef.current || !pathRef.current) return;

    const scene = sceneRef.current;
    const path = pathRef.current;

    // Cleanup previous geometry
    if (path.geometry) {
      path.geometry.dispose();
    }

    // Create new path points
    const points = createPathPoints(100, distance);
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 100, 0.1, 8, false);
    path.geometry = geometry;

    // Update panels
    if (showPanelNumbers) {
      const panels = scene.children.filter(child => child.name === 'panel');
      panels.forEach(panel => {
        scene.remove(panel);
      });

      for (let i = 0; i < NUM_PANELS; i++) {
        const t = (i / NUM_PANELS) * Math.PI * 4;
        const point = curve.getPoint(t / (Math.PI * 4));
        const tangent = curve.getTangent(t / (Math.PI * 4));

        const panelGeometry = new THREE.PlaneGeometry(0.5, 0.5);
        const panelMaterial = new THREE.MeshBasicMaterial({
          color: 0x000000,
          side: THREE.DoubleSide,
        });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panel.position.copy(point);
        panel.lookAt(point.clone().add(tangent));
        panel.name = 'panel';
        scene.add(panel);
      }
    }
  }, [distance, showPanelNumbers]);

  return (
    <PageWrapper>
      <ToggleSidebarButton
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        isVisible={isSidebarVisible}
      >
        {isSidebarVisible ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
      </ToggleSidebarButton>
      <VisualizationSidebar
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        showPath={showPath}
        onTogglePath={() => setShowPath(!showPath)}
        showPanels={showPanelNumbers}
        onTogglePanels={() => setShowPanelNumbers(!showPanelNumbers)}
        showLabels={showLabels}
        onToggleLabels={() => setShowLabels(!showLabels)}
        speed={animationSpeed}
        onSpeedChange={setAnimationSpeed}
        distance={distance}
        onDistanceChange={setDistance}
        isVisible={isSidebarVisible}
      />
      <VisualizationContainer ref={mountRef} />
    </PageWrapper>
  );
};

export default FlightPathVisualization;
