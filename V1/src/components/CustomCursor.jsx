import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a' ||
                target.closest('button') ||
                target.closest('a')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-screen"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    backgroundColor: isHovering ? 'var(--color-brand-cyan)' : 'var(--color-brand-purple)',
                    boxShadow: isHovering
                        ? '0 0 20px var(--color-brand-cyan), 0 0 40px var(--color-brand-cyan)'
                        : '0 0 10px var(--color-brand-purple), 0 0 20px var(--color-brand-purple)',
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{ type: 'spring', ...springConfig }}
            />
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998] bg-[radial-gradient(circle_800px_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(129,140,248,0.05),transparent_80%)]" />
        </>
    );
};

export default CustomCursor;
