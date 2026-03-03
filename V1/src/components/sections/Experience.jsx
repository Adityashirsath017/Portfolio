import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const Experience = () => {
    return (
        <section id="experience" className="w-full min-h-screen py-20 relative z-10">
            <div className="container mx-auto px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-lg md:text-xl text-brand-cyan tracking-wider mb-2 uppercase">What I have done</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white text-glow">Professional Experience</h2>
                </motion.div>

                <VerticalTimeline lineColor={"rgba(0, 255, 255, 0.3)"}>

                    <VerticalTimelineElement
                        contentStyle={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            color: '#fff',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(0, 255, 255, 0.2)',
                            borderRadius: '16px'
                        }}
                        contentArrowStyle={{ borderRight: '7px solid rgba(0, 255, 255, 0.2)' }}
                        date="June 2025 – Present"
                        iconStyle={{ background: '#050510', color: '#00ffff', boxShadow: '0 0 20px #00ffff' }}
                        icon={<Briefcase />}
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-white tracking-wide">Core Developer <span className="text-brand-cyan">(Founding Team)</span></h3>
                            <h4 className="text-brand-purple mt-1 text-lg font-semibold cursor-pointer hover:text-white transition-colors">
                                Fixmate Hub
                            </h4>
                        </div>
                        <ul className="mt-5 list-disc ml-5 space-y-2 text-gray-300">
                            <li>Direct involvement in core <span className="text-white font-medium">Leadership & system design decisions</span>.</li>
                            <li>Successfully architected and built the <span className="text-white font-medium">website, admin dashboard, user & mate mobile apps</span> from scratch.</li>
                            <li>Developed a highly scalable backend utilizing <span className="text-brand-cyan">Firebase (Realtime DB, Firestore, Storage)</span>.</li>
                            <li>Engineered mission-critical features including a robust <span className="text-brand-purple">booking engine, location services, and payment integrations</span>.</li>
                        </ul>
                    </VerticalTimelineElement>

                </VerticalTimeline>
            </div>
        </section>
    );
};

export default Experience;
