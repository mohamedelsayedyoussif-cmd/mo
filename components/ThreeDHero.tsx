
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const House = () => {
  return (
    <group position={[0, -1, 0]}>
      {/* Main Body */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 2.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[3, 1.5, 4]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.5, 1.51]}>
        <planeGeometry args={[0.6, 1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

const Tool = ({ position, color, type }: { position: [number, number, number], color: string, type: 'box' | 'sphere' | 'torus' }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01;
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.002;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {type === 'box' && <boxGeometry args={[0.4, 0.4, 0.4]} />}
      {type === 'sphere' && <sphereGeometry args={[0.2, 32, 32]} />}
      {type === 'torus' && <torusGeometry args={[0.2, 0.1, 16, 100]} />}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export const ThreeDHero = () => {
  return (
    <div className="w-full h-[400px] lg:h-[600px]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 5, 10]} fov={40} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <House />
          </Float>
          
          <Tool position={[-3, 2, 2]} color="#10b981" type="torus" />
          <Tool position={[3, 3, -2]} color="#f97316" type="box" />
          <Tool position={[-2, 4, -3]} color="#1e40af" type="sphere" />
          
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};
