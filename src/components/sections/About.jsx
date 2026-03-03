import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import OrbitingPlanet from '../canvas/OrbitingPlanet';
import { Mail, MapPin, Code2 } from 'lucide-react';

const AboutCard = () => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
    const smoothX = useSpring(x, springConfig);
    const smoothY = useSpring(y, springConfig);

    const rotateX = useTransform(smoothY, [-100, 100], [15, -15]);
    const rotateY = useTransform(smoothX, [-100, 100], [-15, 15]);

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

                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    Hello there! I'm Aditya Nandu Shirsath, a passionate software engineer and AI developer with a love for creating beautiful, intelligent applications. With expertise in modern web technologies and machine learning architectures, I enjoy bringing complex ideas to life through elegant code.
                </p>

                <p className="text-lg text-gray-300 leading-relaxed">
                    From developing real-time computer vision systems using YOLOv11 to building scalable full-stack platforms like Fixmate Hub, I thrive on solving complex problems. When I'm not coding, I'm exploring new AI models, refining my 3D web development skills, and pushing the boundaries of what's possible with technology.
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

            <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between relative z-10 perspective-1000 gap-12">

                {/* Avatar Image on the Left */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-5/12 flex justify-center items-center pointer-events-none relative mb-12 md:mb-0"
                >
                    <div className="absolute inset-0 bg-brand-cyan/20 blur-[100px] rounded-full"></div>
                    <img
                        src="/avatar2.png"
                        alt="Aditya Avatar 2"
                        className="w-full max-w-[400px] h-auto object-contain relative z-10 filter drop-shadow-[0_0_30px_rgba(129,140,248,0.5)] fade-bottom"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/avatar.png"; // Fallback to original if avatar2 is missing
                        }}
                    />
                </motion.div>

                {/* Card on the Right */}
                <div className="w-full md:w-7/12 flex justify-end">
                    <AboutCard />
                </div>

            </div>

        </section>
    );
};

export default About;
