"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGLTF, OrbitControls, Environment, ContactShadows, Center, Bounds } from "@react-three/drei";
import * as THREE from "three";

export function Model(props: any) {
  // Pre-load the model
  const { scene } = useGLTF("/models/insole.glb");
  return <primitive object={scene} {...props} />;
}

export const InsoleExperience = () => {
  const [autoRotate, setAutoRotate] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle interaction to pause rotation
  const handleInteractionStart = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAutoRotate(false);
  };

  // Resume rotation after 3 seconds of inactivity
  const handleInteractionEnd = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setAutoRotate(true);
    }, 3000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Studio Environment Preset */}
      <Environment preset="studio" />

      {/* Orbit Controls for Interaction */}
      <OrbitControls
        makeDefault
        autoRotate={autoRotate}
        autoRotateSpeed={2.5}
        enablePan={false}
        enableZoom={true}
        minDistance={2}
        maxDistance={10}
        onStart={handleInteractionStart}
        onEnd={handleInteractionEnd}
      />

      {/* Center and scale the model */}
      <Bounds fit clip observe margin={1.2}>
        <Center>
          <Model scale={1} />
        </Center>
      </Bounds>

      {/* Contact Shadow to ground the model on the light background */}
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={15}
        blur={2.5}
        far={4.5}
        color="#111827"
      />
    </>
  );
};

// Preload the model so it caches early
useGLTF.preload("/models/insole.glb");
