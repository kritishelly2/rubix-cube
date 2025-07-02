import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { motion } from 'framer-motion';
import Cube3D from '@/components/rubiks/Cube3D';
import CubeControls from '@/components/rubiks/CubeControls';
import useCubeState from '@/hooks/useCubeState';

function App() {
  const { cubeState, applyMove, scramble, solve, history } = useCubeState();

  return (
    <>
      <Helmet>
        <title>3D Rubik's Cube Solver</title>
        <meta name="description" content="An interactive 3D Rubik's Cube solver built with React and Three.js." />
      </Helmet>
      
      <div className="min-h-screen w-full flex flex-col items-center justify-center text-foreground p-4 overflow-hidden">
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-wider">Rubik's Cube Solver</h1>
          <p className="text-muted-foreground mt-2">Interact with the cube and watch the magic happen!</p>
        </motion.header>

        <div className="w-full h-[50vh] md:h-[60vh]">
          <Cube3D cubeState={cubeState} />
        </div>

        <CubeControls applyMove={applyMove} scramble={scramble} solve={solve} />
      </div>
      <Toaster />
    </>
  );
}

export default App;