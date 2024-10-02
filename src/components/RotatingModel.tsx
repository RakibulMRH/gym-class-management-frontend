import React, { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Extend the THREE namespace with PlaneGeometry
extend({ PlaneGeometry: THREE.PlaneGeometry });

function Model(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF('/models/gym_equipment.glb'); // Update the path to your model
  const ref = useRef<THREE.Object3D>();

  useFrame(() => { /* Rotate the model
    if (ref.current) {
      ref.current.rotation.y += 0.01;*/
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
  return (
    <Canvas shadows camera={{ position: [6, 5, 10], fov: 50 }}> {/* Adjust camera position to zoom out */}
      <ambientLight intensity={0.5} /> {/* General ambient light */}
      <hemisphereLight intensity={0.15} groundColor='black' /> {/* Soft light from above and below */}
      <spotLight
        position={[0, 10, 0]} // Position the spotlight above the model
        angle={0.3} // Angle of the spotlight
        penumbra={1} // Softness of the spotlight edges
        intensity={2} // Brightness of the spotlight
        castShadow // Enable shadow casting
        shadow-mapSize-width={1024} // Shadow map resolution
        shadow-mapSize-height={1024} // Shadow map resolution
      />
      <pointLight position={[10, 10, 10]} /> {/* Additional point light */}
      <pointLight intensity={100} /> {/* Another point light with high intensity */}
      <Model scale={[0.5, 0.5, 0.5]} /> {/* Render the 3D model */}
      <OrbitControls 
      enableZoom = {false} 
      enablePan = {false}
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      /> {/* Enable orbit controls for the camera */}
      {/* Add a ground plane to visualize shadows */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10]} /> {/* Ground plane geometry */}
        <shadowMaterial opacity={0.5} /> {/* Material to receive shadows */}
      </mesh>
    </Canvas>
  );
}