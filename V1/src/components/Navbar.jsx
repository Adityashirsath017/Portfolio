import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { id: 'hero', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'skills', title: 'Skills' },
    { id: 'certifications', title: 'Certifications' },
    { id: 'contact', title: 'Contact' },
];

const Navbar = () => {
    const [active, setActive] = useState('Home');
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full flex items-center py-4 px-6 md:px-16 z-50 transition-all duration-300 ${scrolled ? 'glass-card !border-x-0 !border-t-0 !rounded-none py-3' : 'bg-transparent'
                }`}
        >
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                <a
                    href="#hero"
                    className="flex items-center gap-2"
                    onClick={() => {
                        setActive('Home');
                        window.scrollTo(0, 0);
                    }}
                >
                    <span className="text-white text-xl md:text-2xl font-bold cursor-pointer text-glow">
                        Aditya<span className="text-brand-cyan">.dev</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <ul className="list-none hidden sm:flex flex-row gap-8">
                    {navLinks.map((nav) => (
                        <li
                            key={nav.id}
                            className={`${active === nav.title ? 'text-brand-cyan' : 'text-gray-400'
                                } hover:text-white text-[16px] font-medium cursor-pointer transition-colors duration-200`}
                            onClick={() => setActive(nav.title)}
                        >
                            <a href={`#${nav.id}`}>{nav.title}</a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Nav */}
                <div className="sm:hidden flex flex-1 justify-end items-center">
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setToggle(!toggle)}
                    >
                        {toggle ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    <div
                        className={`${!toggle ? 'hidden' : 'flex'
                            } p-6 glass-card absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 flex-col gap-4 shadow-2xl`}
                    >
                        <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                            {navLinks.map((nav) => (
                                <li
                                    key={nav.id}
                                    className={`font-medium cursor-pointer text-[16px] ${active === nav.title ? 'text-brand-cyan' : 'text-gray-300'
                                        }`}
                                    onClick={() => {
                                        setToggle(!toggle);
                                        setActive(nav.title);
                                    }}
                                >
                                    <a href={`#${nav.id}`}>{nav.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
