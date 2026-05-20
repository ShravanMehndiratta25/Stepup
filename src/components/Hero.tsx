"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { InsoleExperience } from "./three/InsoleExperience";

export const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Minimalist Background Pattern (Optional) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] to-transparent pointer-events-none" />

      <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-accent tracking-widest uppercase text-xs mb-4 block font-medium"
          >
            Engineering for Speed
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-6xl md:text-8xl font-heading font-bold mb-6 leading-tight tracking-tight text-gray-900"
          >
            The Soul of <br />
            <span className="text-accent italic">Comfort.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-600 text-lg md:text-xl max-w-md mb-8 leading-relaxed font-medium"
          >
            Experience the future of biomechanical stabilization. Aerospace-grade
            materials meet daily luxury.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button className="bg-accent text-white px-10 py-4 rounded-2xl font-bold tracking-wide hover:shadow-lg transition-all shadow-md shadow-accent/20">
              Shop Apex Pro
            </button>
            <button className="bg-white text-gray-800 px-10 py-4 rounded-2xl font-bold tracking-wide shadow-sm border border-gray-200 hover:shadow-md transition-all">
              The Science
            </button>
          </motion.div>
        </motion.div>

        {/* Right 3D Model */}
        <motion.div
          style={{ opacity, scale }}
          className="relative h-[600px] lg:h-[800px] w-full cursor-grab active:cursor-grabbing"
        >
          <Canvas shadows dpr={[1, 2]} gl={{ alpha: true }}>
            <React.Suspense fallback={null}>
              <InsoleExperience />
            </React.Suspense>
          </Canvas>
          
          {/* Labeling lines placeholder */}
          <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[20%] left-[20%] flex items-center gap-4">
              <div className="w-2 h-2 bg-accent rounded-full shadow-sm" />
              <div className="h-px w-20 bg-gray-300" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Premium Foam</span>
            </div>
            <div className="absolute bottom-[30%] right-[20%] flex items-center gap-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">GEL Matrix</span>
              <div className="h-px w-20 bg-gray-300" />
              <div className="w-2 h-2 bg-accent rounded-full shadow-sm" />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
