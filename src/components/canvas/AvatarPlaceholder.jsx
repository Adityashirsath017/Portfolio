import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Icosahedron, MeshDistortMaterial } from '@react-three/drei';

const AvatarPlaceholder = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        groupRef.current.rotation.y += delta * 0.5;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <group ref={groupRef}>
                {/* Core */}
                <Icosahedron args={[1, 2]} scale={1.2}>
                    <MeshDistortMaterial
                        color="#00ffff"
                        emissive="#00ffff"
                        emissiveIntensity={2}
                        distort={0.4}
                        speed={2}
                        wireframe
                    />
                </Icosahedron>

                {/* Inner Glowing Sphere */}
                <Sphere args={[0.9, 32, 32]}>
                    <meshStandardMaterial
                        color="#818cf8"
                        emissive="#818cf8"
                        emissiveIntensity={1}
                        transparent
                        opacity={0.8}
                    />
                </Sphere>

                {/* Orbiting Rings */}
                {[...Array(3)].map((_, i) => (
                    <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                        <torusGeometry args={[2 + i * 0.5, 0.02, 16, 100]} />
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
                    </mesh>
                ))}

                {/* Floating Particles Around Avatar */}
                {[...Array(20)].map((_, i) => (
                    <mesh
                        key={`particle-${i}`}
                        position={[
                            (Math.random() - 0.5) * 6,
                            (Math.random() - 0.5) * 6,
                            (Math.random() - 0.5) * 6
                        ]}
                    >
                        <sphereGeometry args={[0.03, 8, 8]} />
                        <meshBasicMaterial color="#00ffff" />
                    </mesh>
                ))}
            </group>
        </Float>
    );
};

export default AvatarPlaceholder;
