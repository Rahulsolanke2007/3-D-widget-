import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw } from 'lucide-react'; // icons for play, pause and reset

const Interactive3DWidget = () => {
  // Refs to hold important instances
  const containerRef = useRef(null); // to reference the div where 3D scene will be rendered
  const sceneRef = useRef(null);     // store the THREE.Scene
  const rendererRef = useRef(null);  // store the THREE.Renderer
  const meshRef = useRef(null);      // store the mesh (geometry + material)
  const animationRef = useRef(null); // store the animation frame for cleanup later

  // UI-related state
  const [isPlaying, setIsPlaying] = useState(true);         // to toggle play/pause rotation
  const [rotationSpeed, setRotationSpeed] = useState(0.02); // rotation speed of the object
  const [mouse, setMouse] = useState({ x: 0, y: 0 });        // to track mouse position for interaction
  const [isHovering, setIsHovering] = useState(false);       // to detect hover state on canvas

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111); // dark background to highlight the torus
    sceneRef.current = scene;

    // Setup camera - perspective for 3D effect
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 4; // moved slightly away from origin so object is visible

    // Create renderer and configure resolution
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap pixel ratio for performance
    rendererRef.current = renderer;

    // Add lighting - ambient + directional
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4); // soft background light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // direct light from top-right
    directionalLight.position.set(2, 2, 5);
    scene.add(ambientLight, directionalLight);

    // Create geometry - used torus for better visible rotation
    const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
    const material = new THREE.MeshPhongMaterial({
      color: 0x4f46e5, // indigo
      shininess: 100  // gives it a shiny look under lighting
    });

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    // Resize the renderer based on container size
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize(); // call once initially
    containerRef.current.appendChild(renderer.domElement); // mount the canvas

    // Animation loop
    const animate = () => {
      if (!meshRef.current) return;

      // Rotate automatically if playing
      if (isPlaying) {
        meshRef.current.rotation.y += rotationSpeed;
      }

      // Mouse interaction: changes rotation based on cursor
      if (isHovering) {
        meshRef.current.rotation.x += (mouse.y * 0.5 - meshRef.current.rotation.x) * 0.1;
        meshRef.current.rotation.z += (mouse.x * 0.5 - meshRef.current.rotation.z) * 0.1;
      } else {
        // smoothly reset X and Z when not hovering
        meshRef.current.rotation.x += (0 - meshRef.current.rotation.x) * 0.05;
        meshRef.current.rotation.z += (0 - meshRef.current.rotation.z) * 0.05;
      }

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate); // keep looping
    };

    animate(); // start the animation loop
    window.addEventListener('resize', handleResize); // responsive canvas

    // Clean up on unmount
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      geometry.dispose(); // dispose memory
      material.dispose();
      renderer.dispose();
    };
  }, [isPlaying, rotationSpeed, mouse, isHovering]);

  // Track mouse position over canvas
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    setMouse({ x, y }); // normalize to -1 to 1
  };

  // Reset mesh rotation to default
  const resetRotation = () => {
    if (meshRef.current) {
      meshRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '56rem',
      margin: '0 auto',
      padding: '1rem',
      background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem' }}>
          Interactive 3D Widget
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          Move your mouse over the torus to interact
        </p>
      </div>

      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        backgroundColor: '#111827',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        marginBottom: '1rem'
      }}>
        {/* Canvas container where THREE.js scene is mounted */}
        <div
          ref={containerRef}
          style={{ width: '100%', height: '100%', cursor: 'pointer' }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />

        {/* UI label to show hover state */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          fontSize: '0.75rem'
        }}>
          {isHovering ? 'Interacting...' : 'Hover to interact'}
        </div>
      </div>

      {/* Controls: Speed slider and play/reset buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            width: '6rem'
          }}>
            Speed
          </label>
          <input
            type="range"
            min="0"
            max="0.05"
            step="0.005"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
            style={{
              flex: 1,
              height: '0.5rem',
              backgroundColor: '#e5e7eb',
              borderRadius: '0.5rem',
              appearance: 'none',
              cursor: 'pointer'
            }}
          />
          <span style={{ fontSize: '0.875rem', color: '#6b7280', width: '3rem' }}>
            {(rotationSpeed * 100).toFixed(0)}%
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#4f46e5',
              color: 'white',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <button
            onClick={resetRotation}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#6b7280',
              color: 'white',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interactive3DWidget;
