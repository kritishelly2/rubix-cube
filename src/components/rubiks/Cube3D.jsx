import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

const CUBIE_SIZE = 1;
const CUBIE_SPACING = 0.08;
const CUBE_DIMENSION = 3;

const colorMap = {
  W: '#FFFFFF', // White
  Y: '#FFD700', // Yellow
  B: '#0000FF', // Blue
  G: '#008000', // Green
  R: '#FF0000', // Red
  O: '#FFA500', // Orange
  X: '#1A1A1A', // Black (internal)
};

const Cubie = ({ position, colors }) => {
  return (
    <motion.group position={position}>
      <Box args={[CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE]}>
        <meshStandardMaterial attach="material-0" color={colorMap[colors.R]} />
        <meshStandardMaterial attach="material-1" color={colorMap[colors.L]} />
        <meshStandardMaterial attach="material-2" color={colorMap[colors.U]} />
        <meshStandardMaterial attach="material-3" color={colorMap[colors.D]} />
        <meshStandardMaterial attach="material-4" color={colorMap[colors.F]} />
        <meshStandardMaterial attach="material-5" color={colorMap[colors.B]} />
      </Box>
    </motion.group>
  );
};

const Cube3D = ({ cubeState }) => {
  const offset = (CUBE_DIMENSION - 1) / 2;

  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 35 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      
      <group>
        {cubeState.map((cubie, index) => {
          const x = (cubie.x - offset) * (CUBIE_SIZE + CUBIE_SPACING);
          const y = (cubie.y - offset) * (CUBIE_SIZE + CUBIE_SPACING);
          const z = (cubie.z - offset) * (CUBIE_SIZE + CUBIE_SPACING);
          
          return <Cubie key={index} position={[x, y, z]} colors={cubie.colors} />;
        })}
      </group>
      
      <OrbitControls enablePan={false} minDistance={5} maxDistance={20} />
    </Canvas>
  );
};

export default Cube3D;