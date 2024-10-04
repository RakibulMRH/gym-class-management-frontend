import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, SoftShadows } from '@react-three/drei';
import CanvasLoader from './CanvasLoader';
import * as THREE from 'three';

function Model(props: JSX.IntrinsicElements['group']) {
  const ref = useRef<THREE.Object3D>();
  const { scene } = useGLTF('/models/gym_equipment.glb');
  const [rotationSpeed, setRotationSpeed] = useState(0.1); // Initial high speed

  useFrame(() => {
    if (ref.current) {
      // Gradually decrease the rotation speed
      setRotationSpeed((prevSpeed) => Math.max(0.005, prevSpeed * 0.99));
      ref.current.rotation.y += rotationSpeed;
    }
  });

  // Enable shadow casting and receiving for the model
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={scene} ref={ref} {...props} />;
}

export default function RotatingModel() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: { matches: boolean }) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      shadows
      camera={{
        position: isMobile ? [3, 3, 5] : [6, 6, 10],  
        fov: 50,
      }}
    >
      <SoftShadows size={10} samples={30} focus={0.5} />
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.5} />
        <hemisphereLight intensity={0.15} groundColor='black' />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <pointLight position={[10, 10, 10]} />
        <pointLight intensity={100} />
        <Model scale={isMobile ? [0.3, 0.3, 0.3] : [0.5, 0.5, 0.5]} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 3}
          minPolarAngle={Math.PI / 3}
        />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <circleGeometry args={[5, 64]} />
          <shadowMaterial opacity={0.2} />
        </mesh>
      </Suspense>
    </Canvas>
  );
}