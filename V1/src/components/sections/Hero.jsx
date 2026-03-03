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

const Hero = () => {
    const titles = ["AI/ML Developer", "Full Stack Developer", "Computer Vision Engineer"];
    const currentTitle = useTypewriter(titles);

    return (
        <section id="hero" className="w-full h-screen relative flex items-center justify-center">
            {/* 3D Canvas Context */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <AvatarPlaceholder />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            {/* Texts Context */}
            <div className="relative z-10 container mx-auto px-6 md:px-16 flex flex-col items-center justify-center text-center mt-20 pointer-events-none">

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="glass-card px-8 py-10 md:py-16 rounded-3xl pointer-events-auto"
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
                        className="text-xl md:text-3xl font-semibold text-brand-cyan h-[40px] mb-8"
                    >
                        <span>{currentTitle}</span>
                        <span className="animate-pulse">|</span>
                    </motion.div>

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

            </div>
        </section>
    );
};

export default Hero;
