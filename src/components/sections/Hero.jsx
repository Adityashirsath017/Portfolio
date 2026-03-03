import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AvatarPlaceholder from '../canvas/AvatarPlaceholder';

// Simple Typewriter Hook
const useTypewriter = (words) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        if (subIndex === words[index].length + 1 && !reverse) {
            const timeout = setTimeout(() => setReverse(true), 2000);
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 50 : 100, parseInt(Math.random() * 150)));

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words]);

    return words[index].substring(0, subIndex);
};

// Separate component strictly for the Typewriter effect to prevent React from re-rendering the Hero + Canvas repeatedly
const TypewriterText = ({ words }) => {
    const currentTitle = useTypewriter(words);
    return <span>{currentTitle}</span>;
};

const Hero = () => {
    const titles = ["AI/ML Developer", "Full Stack Developer", "Computer Vision Engineer"];

    return (
        <section id="hero" className="w-full h-screen relative flex items-center justify-center">
            {/* 3D Canvas Context (Moved back to right) */}
            <div className="absolute inset-y-0 right-0 w-full md:w-1/2 z-0 hidden md:block">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <AvatarPlaceholder />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            {/* Texts Context (Moved left again, Avatar isolated to right) */}
            <div className="relative z-10 container mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-center md:justify-start h-full mt-20 md:mt-0 pointer-events-none">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-transparent border border-white/5 shadow-[0_0_40px_rgba(0,255,255,0.05)] px-8 py-10 md:py-16 rounded-3xl pointer-events-auto md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
                >
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-lg md:text-2xl text-gray-300 font-medium tracking-wider mb-2"
                    >
                        Hi, I'm
                    </motion.p>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-4xl md:text-7xl font-bold text-white mb-6 text-glow"
                    >
                        Aditya Shirsath
                    </motion.h1>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="text-xl md:text-3xl font-semibold text-brand-cyan h-[40px] mb-4"
                    >
                        <TypewriterText words={titles} />
                        <span className="animate-pulse ml-1 text-brand-cyan">|</span>
                    </motion.div>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="text-gray-300 text-base md:text-lg max-w-md mb-8 leading-relaxed"
                    >
                        I'm a passionate AI & Full Stack Developer who thrives on combining intelligent machine learning models with stunning, immersive web experiences.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.a
                        href="#about"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-bold text-lg shadow-[0_0_20px_rgba(129,140,248,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.7)] transition-shadow duration-300 cursor-none"
                    >
                        Explore My Universe
                        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </motion.a>
                </motion.div>

                {/* Avatar image dynamically placed in flex for mobile, absolute for desktop */}
                <div className="md:absolute right-0 md:right-[5%] top-1/2 md:-translate-y-1/2 w-full md:w-[40%] h-[50vh] md:h-[80%] flex items-center justify-center z-20 pointer-events-none mt-8 md:mt-0">
                    <img src={`${import.meta.env.BASE_URL}avatar.png`} alt="Aditya Avatar" className="w-auto h-full object-contain filter drop-shadow-[0_0_30px_rgba(0,255,255,0.8)] fade-bottom" />
                </div>

            </div>
        </section>
    );
};

export default Hero;
