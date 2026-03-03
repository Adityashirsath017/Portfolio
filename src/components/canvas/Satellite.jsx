import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Box, Cylinder } from '@react-three/drei';

const Satellite = () => {
    const satelliteRef = useRef();

    useFrame((state, delta) => {
        // Make the satellite orbit and rotate on its axis
        satelliteRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 1.5;
        satelliteRef.current.rotation.x += delta * 0.2;
        satelliteRef.current.rotation.y += delta * 0.3;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <group ref={satelliteRef} scale={0.8}>
                {/* Main Body */}
                <Box args={[1, 1, 2]}>
                    <meshStandardMaterial color="#818cf8" metalness={0.8} roughness={0.2} />
                </Box>

                {/* Solar Panel Left */}
                <Box args={[3, 0.1, 1]} position={[-2, 0, 0]}>
                    <meshStandardMaterial color="#00ffff" metalness={0.9} roughness={0.1} emissive="#00ffff" emissiveIntensity={0.2} />
                </Box>

                {/* Solar Panel Right */}
                <Box args={[3, 0.1, 1]} position={[2, 0, 0]}>
                    <meshStandardMaterial color="#00ffff" metalness={0.9} roughness={0.1} emissive="#00ffff" emissiveIntensity={0.2} />
                </Box>

                {/* Antenna Dish */}
                <group position={[0, 0, 1.2]}>
                    <Cylinder args={[0.5, 0.1, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]}>
                        <meshStandardMaterial color="#ffffff" />
                    </Cylinder>
                    {/* Signal Emitter */}
                    <Box args={[0.1, 0.1, 0.5]} position={[0, 0, 0.3]}>
                        <meshStandardMaterial color="#ff0080" emissive="#ff0080" emissiveIntensity={1} />
                    </Box>
                </group>
            </group>
        </Float>
    );
};

export default Satellite;
