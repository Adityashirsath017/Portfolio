import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Trail } from '@react-three/drei';

const OrbitingPlanet = () => {
    const planetRef = useRef();
    const groupRef = useRef();

    useFrame((state, delta) => {
        // Rotate the group to orbit the planet around the center
        groupRef.current.rotation.y += delta * 0.8;
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        // Rotate the planet itself
        planetRef.current.rotation.y += delta;
    });

    return (
        <group ref={groupRef}>
            <Trail width={5} length={8} color="#00ffff" attenuation={(t) => t * t}>
                <group position={[2.5, 0, 0]}>
                    {/* Main Planet */}
                    <Sphere ref={planetRef} args={[0.5, 32, 32]}>
                        <MeshDistortMaterial
                            color="#3b82f6"
                            emissive="#3b82f6"
                            emissiveIntensity={0.5}
                            distort={0.2}
                            speed={2}
                        />
                    </Sphere>

                    {/* Orbiting Moon */}
                    <group position={[0.8, 0.4, 0]}>
                        <Sphere args={[0.1, 16, 16]}>
                            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
                        </Sphere>
                    </group>
                </group>
            </Trail>
        </group>
    );
};

export default OrbitingPlanet;
