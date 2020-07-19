import React from 'react';
import { Canvas } from 'react-three-fiber';
import './App.css';
import { World } from './components/canvas/World';
import { UIRoot } from './components/ui/UIRoot';
import { ThreeStats } from './ThreeStats';

function App() {
  return (
    <>
      <Canvas id='mainCanvas' pixelRatio={window.devicePixelRatio}>
        <World />
      </Canvas>
      <UIRoot/>
      {/* <ThreeStats /> */}
    </>
  );
}

export default App;
