import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html, Trail } from '@react-three/drei';

const skills = [
    { name: 'Python', color: '#ffeb3b', radius: 2, speed: 0.5 },
    { name: 'React', color: '#61dafb', radius: 2.5, speed: 0.4 },
    { name: 'JavaScript', color: '#f7df1e', radius: 3, speed: 0.35 },
    { name: 'Java', color: '#f89820', radius: 3.5, speed: 0.3 },
    { name: 'SQL / DBs', color: '#4479a1', radius: 4, speed: 0.25 },
    { name: 'AI / ML', color: '#00ffff', radius: 4.5, speed: 0.2 },
    { name: 'Node.js', color: '#339933', radius: 5, speed: 0.15 },
];

const SkillPlanet = ({ skill }) => {
    const ref = useRef();

    // Random starting angle
    const angle = useMemo(() => Math.random() * Math.PI * 2, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Orbit equation
        const currentAngle = angle + t * skill.speed;
        ref.current.position.x = Math.cos(currentAngle) * skill.radius;
        ref.current.position.z = Math.sin(currentAngle) * skill.radius;
    });

    return (
        <group ref={ref}>
            <Sphere args={[0.2, 16, 16]}>
                <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={0.5} />
            </Sphere>
            <Html distanceFactor={10} center>
                <div className="bg-space-black/80 backdrop-blur-sm px-2 py-1 rounded-md text-white font-bold text-sm border border-white/10 whitespace-nowrap">
                    {skill.name}
                </div>
            </Html>
        </group>
    );
};

const SkillsSolarSystem = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        // Slowly tilt the entire solar system over time for cool 3D perspective
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2 + 0.3;
        groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.1) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {/* Central "Skills" Sun */}
            <Sphere args={[0.8, 32, 32]}>
                <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={1.5} />
            </Sphere>
            <Html distanceFactor={10} center zIndexRange={[100, 0]}>
                <div className="text-white font-bold text-xl text-glow pointer-events-none">
                    SKILLS
                </div>
            </Html>

            {/* Orbit Rings and Planets */}
            {skills.map((skill, i) => (
                <group key={i}>
                    {/* Subtle visible ring */}
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[skill.radius - 0.02, skill.radius + 0.02, 64]} />
                        <meshBasicMaterial color="white" transparent opacity={0.05} side={2} />
                    </mesh>
                    <SkillPlanet skill={skill} />
                </group>
            ))}
        </group>
    );
};

export default SkillsSolarSystem;
