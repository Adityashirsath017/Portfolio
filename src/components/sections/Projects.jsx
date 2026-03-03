import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
    {
        title: "AI Personality Detection App",
        description: "Detects user personality using advanced AI/ML models based on input parameters and behavioral traits.",
        tech: ["Python", "Machine Learning"],
        images: ["/projects/ai-personality-1.jpeg", "/projects/ai-personality-2.jpeg", "/projects/ai-personality-3.jpeg", "/projects/ai-personality-4.jpeg", "/projects/ai-personality-5.jpeg", "/projects/ai-personality-6.jpeg"]
    },
    {
        title: "Object Detection & Sign Language",
        description: "Real-time object & sign language detection using custom YOLOv11 models, deployed as a Web and Android App.",
        tech: ["Python", "YOLOv11", "OpenCV", "React"],
        images: ["/projects/object-detect-1.jpeg", "/projects/object-detect-2.jpeg", "/projects/object-detect-3.jpeg", "/projects/object-detect-4.jpeg"]
    },
    {
        title: "Home Services Booking WebApp",
        description: "Fixmate Hub full platform consisting of website, admin dashboard, user & mate mobile applications.",
        tech: ["React", "Firebase", "Firestore", "Flutter"],
        images: ["/projects/fixmate-1.png", "/projects/fixmate-2.png", "/projects/fixmate-3.png", "/projects/fixmate-4.png"]
    },
    {
        title: "Try-On Bot Automation",
        description: "An AI-powered virtual try-on automation bot that seamlessly overlays clothing on user images.",
        tech: ["Python", "AI/ML"],
        images: ["/projects/tryon-1.jpeg", "/projects/tryon-2.jpeg", "/projects/tryon-3.jpeg"]
    },
    {
        title: "Airfare Prediction System",
        description: "Multi-CSV pipeline machine learning model utilizing XGBoost to predict future airfare costs accurately.",
        tech: ["Python", "XGBoost", "React", "Flask"],
        images: ["/projects/airfare-1.png", "/projects/airfare-2.png", "/projects/airfare-3.png"]
    }
];

const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
    const smoothX = useSpring(x, springConfig);
    const smoothY = useSpring(y, springConfig);

    const rotateX = useTransform(smoothY, [-100, 100], [20, -20]);
    const rotateY = useTransform(smoothX, [-100, 100], [-20, 20]);

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
            className="relative w-full h-[450px] md:h-[500px] glass-card flex flex-col justify-between group cursor-pointer hover:border-brand-cyan/50 transition-colors duration-300 overflow-hidden"
        >
            {/* Project Thumbnail Image */}
            <div className="w-full h-[45%] overflow-hidden relative border-b border-white/5">
                <div className="absolute inset-0 bg-brand-cyan/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-300 z-10"></div>
                <img
                    src={`${import.meta.env.BASE_URL}${project.images[0].substring(1)}`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/600x400/050510/818cf8.png?text=${encodeURIComponent(project.title)}`;
                    }}
                />
            </div>

            {/* Project Content */}
            <div className="p-6 flex flex-col flex-1" style={{ transform: 'translateZ(60px)' }}>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 text-glow group-hover:text-brand-cyan transition-colors line-clamp-2">
                    {project.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                </p>
            </div>

            <div style={{ transform: 'translateZ(40px)' }} className="px-6 pb-6 mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((t, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-1 text-[10px] md:text-xs font-semibold rounded-full bg-brand-purple/20 text-brand-purple border border-brand-purple/30 group-hover:border-brand-cyan/30 group-hover:text-brand-cyan group-hover:bg-brand-cyan/20 transition-all duration-300 whitespace-nowrap"
                        >
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="px-2 py-1 text-[10px] md:text-xs font-semibold rounded-full bg-white/5 text-gray-400 border border-white/10">
                            +{project.tech.length - 3}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between pointer-events-auto">
                    <button className="flex w-full justify-center items-center gap-2 px-4 py-2 rounded-xl bg-brand-cyan/10 hover:bg-brand-cyan/30 text-brand-cyan transition-all duration-300 border border-brand-cyan/30 hover:border-brand-cyan group-hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]">
                        <ImageIcon size={18} />
                        <span className="text-sm font-semibold">View Screenshots</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openGallery = (project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        if (selectedProject) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
        }
    };

    const prevImage = (e) => {
        e.stopPropagation();
        if (selectedProject) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
        }
    };

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
                        <div key={index} onClick={() => openGallery(project)}>
                            <ProjectCard project={project} index={index} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Gallery Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-space-black/95 backdrop-blur-xl cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-6xl bg-space-black rounded-2xl border border-brand-cyan/30 shadow-[0_0_50px_rgba(0,255,255,0.15)] overflow-hidden flex flex-col cursor-auto cursor-none max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-4 md:p-6 border-b border-white/10 shrink-0">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                                        <ImageIcon className="text-brand-cyan" />
                                        {selectedProject.title}
                                    </h3>
                                    <p className="text-gray-400 mt-1 text-sm md:text-base">
                                        Screenshot {currentImageIndex + 1} of {selectedProject.images.length}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="p-2 rounded-full bg-white/5 hover:bg-brand-purple/50 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Image Container & Controls */}
                            <div className="relative flex-1 w-full bg-black/60 flex items-center justify-center p-4 min-h-[50vh] overflow-hidden group">
                                {/* Prev Button */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-black/50 text-white border border-white/10 hover:border-brand-cyan hover:bg-brand-cyan/20 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronLeft size={32} />
                                </button>

                                {/* Current Image */}
                                <motion.img
                                    key={currentImageIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    src={`${import.meta.env.BASE_URL}${selectedProject.images[currentImageIndex].substring(1)}`}
                                    alt={`${selectedProject.title} Screenshot ${currentImageIndex + 1}`}
                                    className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded-lg drop-shadow-2xl"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://placehold.co/1280x720/050510/818cf8.png?text=${encodeURIComponent(selectedProject.title)}+-+Image+${currentImageIndex + 1}+Not+Found`;
                                    }}
                                />

                                {/* Next Button */}
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-black/50 text-white border border-white/10 hover:border-brand-cyan hover:bg-brand-cyan/20 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronRight size={32} />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
