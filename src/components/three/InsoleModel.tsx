"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

export const InsoleModel = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <spotLight
        position={[-10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Stylized placeholder for an insole */}
        <mesh ref={meshRef} castShadow receiveShadow>
          <boxGeometry args={[4, 0.5, 1.5]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
        
        {/* Sub-layer for "exploded view" effect placeholder */}
        <mesh position={[0, -0.6, 0]}>
          <boxGeometry args={[3.8, 0.2, 1.3]} />
          <meshStandardMaterial color="#2563eb" transparent opacity={0.6} roughness={0.4} />
        </mesh>
      </Float>

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={15}
        blur={2.5}
        far={4.5}
        color="#111827"
      />
    </group>
  );
};
