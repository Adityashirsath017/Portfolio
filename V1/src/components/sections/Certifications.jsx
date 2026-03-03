import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const certifications = [
    { title: "Microsoft Azure", issuer: "KasNet Technologies PVT" },
    { title: "Cyber Security", issuer: "WSCube Tech" },
    { title: "Data Science", issuer: "Infosys Springboard" },
    { title: "Python", issuer: "Infosys Springboard" },
];

const CertCard = ({ cert, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative p-[1px] rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-300"
        >
            {/* Holographic Iridescent Background Gradient */}
            <span className="absolute inset-0 bg-gradient-to-br from-[#ff0080] via-[#818cf8] to-[#00ffff] opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></span>
            <span className="absolute inset-0 bg-gradient-to-br from-[#ff0080] via-[#818cf8] to-[#00ffff] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></span>

            <div className="relative h-full bg-space-black/90 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center text-center z-10 border border-white/10 group-hover:border-transparent transition-colors">
                <Award className="w-16 h-16 text-brand-cyan mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]" />
                <h3 className="text-2xl font-bold text-white mb-2">{cert.title}</h3>
                <p className="text-brand-purple font-medium tracking-wide">{cert.issuer}</p>
            </div>
        </motion.div>
    );
};

const Certifications = () => {
    return (
        <section id="certifications" className="w-full min-h-screen py-20 relative z-10">
            <div className="container mx-auto px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-lg md:text-xl text-brand-cyan tracking-wider mb-2 uppercase">Achievements</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white text-glow">Certifications</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {certifications.map((cert, index) => (
                        <CertCard key={index} cert={cert} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
