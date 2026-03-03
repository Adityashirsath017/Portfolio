import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SkillsSolarSystem from '../canvas/SkillsSolarSystem';

const Skills = () => {
    return (
        <section id="skills" className="w-full min-h-screen py-20 relative z-10">
            <div className="container mx-auto px-6 md:px-16 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-0 md:mb-12 pointer-events-none"
                >
                    <p className="text-lg md:text-xl text-brand-purple tracking-wider mb-2 uppercase">My Arsenal</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white text-glow">Technical Skills</h2>
                </motion.div>

                {/* 3D Solar System Canvas */}
                <div className="w-full h-[60vh] md:h-[70vh] relative cursor-move">
                    <Canvas camera={{ position: [0, 4, 10], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <SkillsSolarSystem />
                        <OrbitControls enableZoom={false} autoRotate={false} />
                    </Canvas>

                    <div className="absolute bottom-0 w-full text-center pointer-events-none pb-4">
                        <p className="text-gray-400 text-sm animate-pulse">Drag to rotate the solar system</p>
                    </div>
                </div>

                {/* Textual summary mapping */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl z-10 relative">
                    <div className="glass-card p-6 hover:border-brand-cyan/50 transition-colors duration-300">
                        <h3 className="text-xl font-bold text-brand-cyan mb-4">Languages & Core</h3>
                        <p className="text-gray-300 mb-3"><strong className="text-white tracking-widest text-xs uppercase block mb-1">Languages</strong>Python, JavaScript, React, Java, C++, SQL, VB.Net</p>
                        <p className="text-gray-300"><strong className="text-white tracking-widest text-xs uppercase block mb-1">Coursework</strong>Data Science, Computer Network, Software Engineering, DBMS</p>
                    </div>
                    <div className="glass-card p-6 hover:border-brand-purple/50 transition-colors duration-300">
                        <h3 className="text-xl font-bold text-brand-purple mb-4">Frameworks & APIs</h3>
                        <p className="text-gray-300 mb-3"><strong className="text-white tracking-widest text-xs uppercase block mb-1">Frameworks</strong>ReactJS, Flask, OpenCV, Node.js (Basics), XGBoost, YOLO</p>
                        <p className="text-gray-300"><strong className="text-white tracking-widest text-xs uppercase block mb-1">Other</strong>REST APIs, Authentication, Payment Flows</p>
                    </div>
                    <div className="glass-card p-6 hover:border-brand-cyan/50 transition-colors duration-300">
                        <h3 className="text-xl font-bold text-brand-cyan mb-4">Tools & Databases</h3>
                        <p className="text-gray-300 mb-3"><strong className="text-white tracking-widest text-xs uppercase block mb-1">Databases</strong>Firebase, Firestore, MongoDB, MySQL</p>
                        <p className="text-gray-300"><strong className="text-white tracking-widest text-xs uppercase block mb-1">Dev Tools</strong>VS Code, PyCharm, Android Studio, MongoDB Atlas, Git</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Skills;
