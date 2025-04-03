import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styled from 'styled-components';

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
`;

const NavBar = styled.nav`
  width: 100%;
  height: 60px;
  background: #1a1a1a;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`;

const VisualizationContainer = styled.div`
  width: 100%;
  height: calc(100vh - 260px);
  background: #ffffff;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ControlsPanel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 10;
`;

const DescriptionPanel = styled.div`
  width: 100%;
  height: 200px;
  background: #ffffff;
  border-top: 1px solid #e0e0e0;
  padding: 20px;
  display: flex;
  gap: 20px;
`;

const DescriptionSection = styled.div`
  flex: 1;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 8px;
  
  h3 {
    margin: 0 0 10px 0;
    color: #333;
  }
  
  p {
    margin: 0;
    color: #666;
    line-height: 1.5;
  }
`;

const FlightPathVisualization = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const pathRef = useRef(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    // Inicjalizacja sceny
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Białe tło
    sceneRef.current = scene;

    // Kamera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(8, 2, 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Kontrolki
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI;
    controlsRef.current = controls;

    // Światła
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const topLight = new THREE.SpotLight(0xffffff, 1.5);
    topLight.position.set(0, 4, 0);
    topLight.angle = Math.PI / 3;
    topLight.penumbra = 0.5;
    topLight.castShadow = true;
    scene.add(topLight);

    // Dodatkowe światła dla lepszego oświetlenia
    const sideLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
    sideLight1.position.set(5, 0, 0);
    scene.add(sideLight1);

    const sideLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    sideLight2.position.set(-5, 0, 0);
    scene.add(sideLight2);

    // Podstawa tunelu (metalowa kratka)
    const floorGroup = new THREE.Group();
    
    // Zewnętrzny pierścień podłogi
    const floorRingGeometry = new THREE.RingGeometry(3.8, 4.2, 12, 1);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.9,
      roughness: 0.3,
    });

    const floorRing = new THREE.Mesh(floorRingGeometry, floorMaterial);
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.y = -3;
    floorRing.receiveShadow = true;
    floorGroup.add(floorRing);

    // Siatka podłogowa 10x10cm
    const gridSize = 8.4; // Średnica tunelu
    const cellSize = 0.1; // 10cm
    const gridDivisions = Math.floor(gridSize / cellSize);
    
    // Linie poziome
    for (let i = 0; i <= gridDivisions; i++) {
      const y = (i - gridDivisions/2) * cellSize;
      const lineGeometry = new THREE.BufferGeometry();
      const vertices = [];
      
      // Sprawdzamy, czy punkt jest wewnątrz okręgu o promieniu 4.2m
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

    // Linie pionowe
    for (let i = 0; i <= gridDivisions; i++) {
      const x = (i - gridDivisions/2) * cellSize;
      const lineGeometry = new THREE.BufferGeometry();
      const vertices = [];
      
      // Sprawdzamy, czy punkt jest wewnątrz okręgu o promieniu 4.2m
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

    scene.add(floorGroup);

    // Metalowe wykończenie góry
    const topRingGeometry = new THREE.TorusGeometry(4.3, 0.15, 16, 12);
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.9,
      roughness: 0.2,
    });
    const topRing = new THREE.Mesh(topRingGeometry, metalMaterial);
    topRing.position.y = 3;
    topRing.rotation.x = Math.PI / 2;
    topRing.castShadow = true;
    scene.add(topRing);

    // Metalowe wykończenie dołu
    const bottomRing = new THREE.Mesh(topRingGeometry, metalMaterial);
    bottomRing.position.y = -3;
    bottomRing.rotation.x = Math.PI / 2;
    bottomRing.castShadow = true;
    scene.add(bottomRing);

    // Szklane ściany tunelu
    const tunnelGeometry = new THREE.CylinderGeometry(4.2, 4.2, 6, 12, 1, true);
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
    const tunnel = new THREE.Mesh(tunnelGeometry, glassMaterial);
    tunnel.castShadow = true;
    scene.add(tunnel);

    // Dodanie pionowych elementów i paneli ściennych
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const pillarGeometry = new THREE.BoxGeometry(0.05, 6, 0.05);
      const pillarMaterial = i === 0 ? new THREE.MeshStandardMaterial({
        color: 0xff0000, // Czerwony kolor dla panelu 1
        metalness: 0.80,
        roughness: 0.2,
      }) : metalMaterial;
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.x = Math.cos(angle) * 4.2;
      pillar.position.z = Math.sin(angle) * 4.2;
      pillar.castShadow = true;
      scene.add(pillar);

      // Dodanie numerów paneli
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 256;
      context.fillStyle = i === 0 ? '#ff0000' : '#000000'; // Czerwony kolor dla panelu 1
      context.font = 'Bold 120px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(i + 1, 128, 128);

      const numberTexture = new THREE.CanvasTexture(canvas);
      const numberMaterial = new THREE.MeshBasicMaterial({
        map: numberTexture,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });

      const numberGeometry = new THREE.PlaneGeometry(1, 1);
      const number = new THREE.Mesh(numberGeometry, numberMaterial);
      
      const panelCenterAngle = ((i + 0.5) / 12) * Math.PI * 2;
      number.position.set(
        Math.cos(panelCenterAngle) * 4.1,
        0,
        Math.sin(panelCenterAngle) * 4.1
      );
      number.rotation.y = panelCenterAngle + Math.PI / 2;
      scene.add(number);

      // Dodanie ramy drzwi między pierwszym a drugim elementem
      if (i === 0) {
        const doorFrameGroup = new THREE.Group();
        
        // Lewy słup
        const leftPillar = new THREE.Mesh(
          new THREE.BoxGeometry(0.05, 3, 0.05),
          pillarMaterial
        );
        leftPillar.position.set(0, -1.5, 0);
        doorFrameGroup.add(leftPillar);

        // Prawy słup
        const rightPillar = new THREE.Mesh(
          new THREE.BoxGeometry(0.05, 3, 0.05),
          pillarMaterial
        );
        rightPillar.position.set(2, -1.5, 0);
        doorFrameGroup.add(rightPillar);

        // Górna belka
        const topBeam = new THREE.Mesh(
          new THREE.BoxGeometry(2, 0.05, 0.05),
          pillarMaterial
        );
        topBeam.position.set(1, 0, 0);
        doorFrameGroup.add(topBeam);

        // Pozycjonowanie całej ramy
        const panel1Angle = (0 / 12) * Math.PI * 2;
        doorFrameGroup.position.set(
          Math.cos(panel1Angle) * 4.1 - 0.4,
          0,
          Math.sin(panel1Angle) * 4.1 + 2.02
        );
        doorFrameGroup.rotation.y = panel1Angle + Math.PI / 2 + (-15 * Math.PI / 180);
        scene.add(doorFrameGroup);
      }
    }

    // Dodanie oznaczeń kierunków
    const directions = [
      { text: 'N', position: new THREE.Vector3(0, 0, -4.3) },
      { text: 'S', position: new THREE.Vector3(0, 0, 4.3) },
      { text: 'E', position: new THREE.Vector3(4.3, 0, 0) },
      { text: 'W', position: new THREE.Vector3(-4.3, 0, 0) }
    ];

    directions.forEach(dir => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 256;
      context.fillStyle = '#000000';
      context.font = 'Bold 80px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(dir.text, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });

      const geometry = new THREE.PlaneGeometry(1, 1);
      const direction = new THREE.Mesh(geometry, material);
      
      // Ustawiamy pozycję i obrót w zależności od kierunku
      direction.position.copy(dir.position);
      direction.position.y = 2; // Wyżej niż drzwi
      
      // Obracamy w kierunku środka tunelu
      direction.lookAt(0, 2, 0);
      scene.add(direction);
    });

    // Dodanie trasy lotu
    const pathPoints = [];
    const numPoints = 100;
    const radius = 3.5;
    const height = 2;
    
    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 4;
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius;
      const y = Math.sin(t * 0.5) * height;
      pathPoints.push(new THREE.Vector3(x, y, z));
    }
    
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const pathMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });
    const path = new THREE.Line(pathGeometry, pathMaterial);
    scene.add(path);
    pathRef.current = path;

    // Renderowanie
    const render = () => {
      // Aktualizacja kontrolek
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Renderowanie
      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.render(scene, cameraRef.current);
      }
      
      requestAnimationFrame(render);
    };

    render();

    // Obsługa zmiany rozmiaru
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

  // Animacja trasy lotu
  useEffect(() => {
    if (!pathRef.current) return;
    
    const pathPoints = pathRef.current.geometry.attributes.position.array;
    const numPoints = pathPoints.length / 3;
    
    const animate = () => {
      if (!isPlaying) return;
      
      setAnimationProgress(prev => {
        const newProgress = (prev + 0.005) % 1;
        return newProgress;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <PageWrapper>
      <NavBar>
        <h1>Made4Fly - Dynamic 2-Way Visualization</h1>
      </NavBar>
      <MainContent>
        <VisualizationContainer ref={mountRef}>
          <ControlsPanel>
            <div>Lewy przycisk myszy: Obrót</div>
            <div>Prawy przycisk myszy: Przesunięcie</div>
            <div>Scroll: Przybliżenie</div>
          </ControlsPanel>
        </VisualizationContainer>
      </MainContent>
      <DescriptionPanel>
        <DescriptionSection>
          <h3>Informacje o tunelu</h3>
          <p>Tunel Flyspot: średnica 4.2m, wysokość 6m, 12-ścienny. Podłoga wyposażona w siatkę 10x10cm dla lepszej orientacji.</p>
        </DescriptionSection>
        <DescriptionSection>
          <h3>Sterowanie</h3>
          <p>Możesz obracać, przesuwać i przybliżać widok za pomocą myszy.</p>
          <button 
            onClick={togglePlayPause}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              background: isPlaying ? '#ff4444' : '#44ff44',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isPlaying ? 'Pauza' : 'Odtwórz'}
          </button>
        </DescriptionSection>
        <DescriptionSection>
          <h3>Dynamic 2-Way</h3>
          <p>Wizualizacja trasy dla kategorii Dynamic 2-Way. Czerwona linia pokazuje trasę lotu.</p>
        </DescriptionSection>
      </DescriptionPanel>
    </PageWrapper>
  );
};

export default FlightPathVisualization; 