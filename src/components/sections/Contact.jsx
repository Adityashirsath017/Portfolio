import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Satellite from '../canvas/Satellite';
import { Mail, Phone, Rocket, Github, Linkedin, Instagram } from 'lucide-react';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [launched, setLaunched] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        formData.append("access_key", "88939ec5-fa98-4bc0-b782-95b9ceefb4ae"); // Replace this with Web3Forms Access Key

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                setLaunched(true);
                setForm({ name: '', email: '', message: '' });
                setTimeout(() => setLaunched(false), 4000);
            } else {
                console.error("Form submission error", data);
                alert("Something went wrong. Please check your Access Key.");
            }
        } catch (error) {
            console.error("Network error", error);
            alert("Failed to send message. Please try again later.");
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="w-full min-h-screen py-20 relative z-10 overflow-hidden">
            <div className="container mx-auto px-6 md:px-16 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-lg md:text-xl text-brand-purple tracking-wider mb-2 uppercase">Get In Touch</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white text-glow">Contact Me</h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 glass-card p-6 md:p-12 relative"
                    >
                        <h3 className="text-3xl font-bold text-white mb-6">Send a Message</h3>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <label className="flex flex-col">
                                <span className="text-white font-medium mb-2">Your Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="What's your name?"
                                    className="bg-black/30 py-4 px-6 text-white rounded-lg outline-none border border-white/10 focus:border-brand-cyan transition-colors"
                                />
                            </label>

                            <label className="flex flex-col">
                                <span className="text-white font-medium mb-2">Your Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="What's your email?"
                                    className="bg-black/30 py-4 px-6 text-white rounded-lg outline-none border border-white/10 focus:border-brand-cyan transition-colors"
                                />
                            </label>

                            <label className="flex flex-col">
                                <span className="text-white font-medium mb-2">Your Message</span>
                                <textarea
                                    rows="5"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="What do you want to say?"
                                    className="bg-black/30 py-4 px-6 text-white rounded-lg outline-none border border-white/10 focus:border-brand-cyan transition-colors resize-none"
                                />
                            </label>

                            <button
                                type="submit"
                                disabled={loading || launched}
                                className="bg-brand-purple hover:bg-brand-cyan py-4 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-brand-purple/50 flex items-center gap-2 group transition-all"
                            >
                                {loading ? 'Transmitting...' : launched ? 'Message Launched!' : 'Send Message'}
                                <Rocket className={`transition-transform duration-500 ${launched ? 'translate-x-32 -translate-y-32 opacity-0' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                            </button>
                        </form>
                    </motion.div>

                    {/* 3D Canvas Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 min-h-[250px] md:min-h-[400px] flex flex-col items-center justify-between"
                    >
                        <div className="w-full h-[300px] md:h-full relative pointer-events-auto cursor-move">
                            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                                <ambientLight intensity={0.5} />
                                <directionalLight position={[10, 10, 5]} intensity={1} />
                                <Satellite />
                                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                            </Canvas>
                        </div>

                        <div className="w-full glass-card p-4 md:p-6 mt-8 flex flex-col gap-4 overflow-hidden">
                            <div className="flex items-center gap-4 text-gray-300 w-full">
                                <Mail className="text-brand-cyan shrink-0" size={24} />
                                <span className="break-all text-sm md:text-base">adityashirsath017@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <Phone className="text-brand-cyan" size={24} />
                                <span>+91-9529469391</span>
                            </div>
                            <div className="flex gap-4 mt-2 pt-4 border-t border-white/10">
                                <a href="https://www.linkedin.com/in/aditya-shirsath-547141261/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-brand-purple/20 text-white hover:text-brand-purple transition-colors pointer-events-auto">
                                    <Linkedin size={24} />
                                </a>
                                <a href="https://github.com/Adityashirsath017" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-brand-cyan/20 text-white hover:text-brand-cyan transition-colors pointer-events-auto">
                                    <Github size={24} />
                                </a>
                                <a href="https://www.instagram.com/mr.adii.017/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-[#ff0080]/20 text-white hover:text-[#ff0080] transition-colors pointer-events-auto">
                                    <Instagram size={24} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
