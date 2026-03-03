import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';

const Education = () => {
    return (
        <section id="education" className="w-full min-h-screen py-20 relative z-10">
            <div className="container mx-auto px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-lg md:text-xl text-brand-cyan tracking-wider mb-2 uppercase">My Journey</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white text-glow">Education</h2>
                </motion.div>

                <VerticalTimeline lineColor={"rgba(129, 140, 248, 0.3)"}>

                    <VerticalTimelineElement
                        contentStyle={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#fff',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px'
                        }}
                        contentArrowStyle={{ borderRight: '7px solid rgba(255, 255, 255, 0.1)' }}
                        date="2024 - Currently Pursuing"
                        iconStyle={{ background: '#050510', color: '#00ffff', boxShadow: '0 0 15px #00ffff' }}
                        icon={<GraduationCap />}
                    >
                        <h3 className="text-xl font-bold text-white">B.E. in Computer Science & AI (Machine Learning)</h3>
                        <h4 className="text-brand-purple mt-1 font-medium">VIT, Viva Institute of Technology, Mumbai</h4>
                        <ul className="mt-4 list-disc ml-5 space-y-2 text-gray-300">
                            <li>Specializing in AI and Machine Learning fundamentals.</li>
                            <li>Hands-on projects leveraging advanced deep learning.</li>
                        </ul>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        contentStyle={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#fff',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px'
                        }}
                        contentArrowStyle={{ borderRight: '7px solid rgba(255, 255, 255, 0.1)' }}
                        date="2023"
                        iconStyle={{ background: '#050510', color: '#818cf8', boxShadow: '0 0 15px #818cf8' }}
                        icon={<BookOpen />}
                    >
                        <h3 className="text-xl font-bold text-white">Diploma in Computer Technology</h3>
                        <h4 className="text-brand-purple mt-1 font-medium">PREC, Pravara Rural Engineering College, Loni</h4>
                        <p className="mt-2 text-brand-cyan font-bold">Passed with 75%</p>
                        <ul className="mt-4 list-disc ml-5 space-y-2 text-gray-300">
                            <li>Strong foundation in software engineering and algorithms.</li>
                            <li>Participated in state-level hackathons and technical symposiums.</li>
                        </ul>
                    </VerticalTimelineElement>

                </VerticalTimeline>
            </div>
        </section>
    );
};

export default Education;
