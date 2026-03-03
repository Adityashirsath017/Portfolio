import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, ExternalLink } from 'lucide-react';

const certifications = [
    { title: "Industrial Training", issuer: "KasNet Technologies PVT", date: "August 8, 2022", image: "/azure-cert.png" },
    { title: "Data Analytics Job Simulation", issuer: "Deloitte", date: "January 5, 2026", image: "/deloitte-cert.png" },
    { title: "GenAI Powered Data Analytics", issuer: "TATA", date: "April 15, 2025", image: "/tata-cert.png" },
    { title: "Object Oriented Programming using Python", issuer: "Infosys Springboard", date: "March 25, 2025", image: "/python-cert.png" },
];

const CertCard = ({ cert, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => onClick(cert)}
            className="relative p-[1px] rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
            {/* Holographic Iridescent Background Gradient */}
            <span className="absolute inset-0 bg-gradient-to-br from-[#ff0080] via-[#818cf8] to-[#00ffff] opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></span>
            <span className="absolute inset-0 bg-gradient-to-br from-[#ff0080] via-[#818cf8] to-[#00ffff] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></span>

            <div className="relative h-full bg-space-black/90 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center text-center z-10 border border-white/10 group-hover:border-transparent transition-colors">
                <Award className="w-16 h-16 text-brand-cyan mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]" />
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{cert.title}</h3>
                <p className="text-brand-purple font-medium tracking-wide mb-1 opacity-90">{cert.issuer}</p>
                <p className="text-gray-400 text-sm mb-4">{cert.date}</p>
                <div className="mt-auto flex items-center gap-2 text-sm text-gray-400 group-hover:text-brand-cyan transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 group-hover:border-brand-cyan/30">
                    <span>View Certificate</span>
                    <ExternalLink size={16} />
                </div>
            </div>
        </motion.div>
    );
};

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);

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
                        <CertCard key={index} cert={cert} index={index} onClick={setSelectedCert} />
                    ))}
                </div>
            </div>

            {/* Modal for Certificate Preview */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-space-black/90 backdrop-blur-sm cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-5xl bg-space-black rounded-2xl border border-brand-cyan/30 shadow-[0_0_50px_rgba(0,255,255,0.15)] overflow-hidden flex flex-col cursor-auto cursor-none max-h-[90vh]"
                        >
                            <div className="flex justify-between items-center p-4 md:p-6 border-b border-white/10">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white">{selectedCert.title}</h3>
                                    <p className="text-brand-purple">
                                        {selectedCert.issuer} <span className="text-gray-500 mx-2">•</span> <span className="text-gray-400">{selectedCert.date}</span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedCert(null)}
                                    className="p-2 rounded-full bg-white/5 hover:bg-brand-purple/20 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="relative w-full p-4 md:p-8 flex items-center justify-center bg-black/50 overflow-auto">
                                <img
                                    src={`${import.meta.env.BASE_URL}${selectedCert.image.substring(1)}`}
                                    alt={`${selectedCert.title} Certificate`}
                                    className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded drop-shadow-2xl"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/800x600/050510/00ffff.png?text=Preview+Not+Available";
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certifications;
