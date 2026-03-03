import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import OrbitingPlanet from '../canvas/OrbitingPlanet';
import { Mail, MapPin, Code2 } from 'lucide-react';

const AboutCard = () => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    const handleMouseMove = (event) => {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            className="relative w-full max-w-2xl mx-auto glass-card p-8 md:p-12 z-10 cursor-none"
        >
            <div style={{ transform: 'translateZ(50px)' }} className="flex flex-col gap-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white text-glow mb-4">
                    Discover <span className="text-brand-cyan">My Element</span>
                </h2>

                <p className="text-lg text-gray-300 leading-relaxed">
                    I am Aditya Nandu Shirsath, a passionate developer from Mumbai building AI-powered apps and scalable full-stack solutions. Eager to solve complex challenges with creative code and elegant logic.
                </p>

                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex items-center gap-4 text-gray-300">
                        <MapPin className="text-brand-purple" size={24} />
                        <span className="text-lg">Mumbai, Maharashtra</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                        <Mail className="text-brand-purple" size={24} />
                        <span className="text-lg">adityashirsath017@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                        <Code2 className="text-brand-purple" size={24} />
                        <span className="text-lg">AI/ML & Full-Stack</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const About = () => {
    return (
        <section id="about" className="w-full min-h-screen relative flex items-center justify-center py-20 overflow-hidden">

            {/* Background Planet Canvas */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <OrbitingPlanet />
                </Canvas>
            </div>

            <div className="container mx-auto px-6 md:px-16 flex items-center justify-center relative z-10 perspective-1000">
                <AboutCard />
            </div>

        </section>
    );
};

export default About;
