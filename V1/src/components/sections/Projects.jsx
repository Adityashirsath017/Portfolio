import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
    {
        title: "AI Personality Detection App",
        description: "Detects user personality using advanced AI/ML models based on input parameters and behavioral traits.",
        tech: ["Python", "Machine Learning"],
    },
    {
        title: "Object Detection & Sign Language",
        description: "Real-time object & sign language detection using custom YOLOv11 models, deployed as a Web and Android App.",
        tech: ["Python", "YOLOv11", "OpenCV", "React"],
    },
    {
        title: "Home Services Booking App",
        description: "Fixmate Hub full platform consisting of website, admin dashboard, user & mate mobile applications.",
        tech: ["React", "Firebase", "Firestore", "Flutter"],
    },
    {
        title: "Try-On Bot Automation",
        description: "An AI-powered virtual try-on automation bot that seamlessly overlays clothing on user images.",
        tech: ["Python", "AI/ML"],
    },
    {
        title: "Airfare Prediction System",
        description: "Multi-CSV pipeline machine learning model utilizing XGBoost to predict future airfare costs accurately.",
        tech: ["Python", "XGBoost", "React", "Flask"],
    }
];

const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [20, -20]);
    const rotateY = useTransform(x, [-100, 100], [-20, 20]);

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
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            className="relative w-full h-[400px] glass-card p-6 flex flex-col justify-between group cursor-pointer hover:border-brand-cyan/50 transition-colors duration-300"
        >
            <div style={{ transform: 'translateZ(60px)' }}>
                <h3 className="text-2xl font-bold text-white mb-3 text-glow group-hover:text-brand-cyan transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {project.description}
                </p>
            </div>

            <div style={{ transform: 'translateZ(40px)' }} className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 text-xs font-semibold rounded-full bg-brand-purple/20 text-brand-purple border border-brand-purple/30 group-hover:border-brand-cyan/30 group-hover:text-brand-cyan group-hover:bg-brand-cyan/20 transition-all duration-300"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pointer-events-auto">
                    <button className="p-2 rounded-full bg-white/5 hover:bg-brand-cyan/20 text-white hover:text-brand-cyan transition-all duration-300">
                        <Github size={20} />
                    </button>
                    <button className="p-2 rounded-full bg-white/5 hover:bg-brand-purple/20 text-white hover:text-brand-purple transition-all duration-300">
                        <ExternalLink size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="w-full min-h-screen py-20 relative z-10 perspective-1000">
            <div className="container mx-auto px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-lg md:text-xl text-brand-purple tracking-wider mb-2 uppercase">My Work</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white text-glow">Cosmic Projects</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
