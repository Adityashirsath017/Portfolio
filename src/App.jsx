import React from 'react';
import { Canvas } from '@react-three/fiber';
import CustomCursor from './components/CustomCursor';
import Starfield from './components/canvas/Starfield';
import Navbar from './components/Navbar';
import { Hero, About, Experience, Projects, Skills, Certifications, Contact } from './components/sections';

function App() {
  return (
    <div className="relative w-full overflow-hidden bg-space-black text-white selection:bg-brand-purple/30 selection:text-brand-cyan font-sans cursor-none">
      <CustomCursor />
      <Navbar />

      {/* 3D Background - fixed to viewport */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Starfield />
        </Canvas>
      </div>

      {/* Main Content Sections */}
      <div className="relative z-10 w-full">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </div>
    </div>
  );
}

export default App;
