"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";

const PAIN_POINTS = [
  { id: "heel", label: "Impact Zone", x: "50%", y: "82%", description: "A direct-injection gel layer absorbs shock to reduce daily fatigue." },
  { id: "arch", label: "Stabilization Core", x: "60%", y: "58%", description: "Dynamic arch support prevents overpronation and aligns the kinetic chain." },
  { id: "ball", label: "Propulsion Pad", x: "45%", y: "32%", description: "Responsive foam returns energy during toe-off for effortless forward motion." },
];

export const BiometricMap = () => {
  const [selectedPoint, setSelectedPoint] = useState<typeof PAIN_POINTS[0] | null>(null);

  return (
    <section id="performance" className="py-32 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* SVG Foot Diagram */}
          <div className="relative max-w-sm mx-auto w-full flex items-center justify-center">
            <img 
              src="/foot.png" 
              alt="Foot Anatomy" 
              className="w-full h-auto object-contain drop-shadow-sm border border-[#111827]/10 rounded-3xl p-4 bg-white/50 backdrop-blur-sm"
            />

            {/* Interactive Points */}
            {PAIN_POINTS.map((point) => (
              <button
                key={point.id}
                onClick={() => setSelectedPoint(point)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                style={{ left: point.x, top: point.y }}
              >
                {/* Pulsating Hotspot */}
                <div className="relative flex items-center justify-center w-6 h-6">
                  <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" />
                  <div className={`relative w-3 h-3 rounded-full border-2 transition-all duration-300 shadow-sm ${
                    selectedPoint?.id === point.id ? "bg-accent border-white scale-125" : "bg-white border-accent"
                  }`} />
                </div>
                
                {/* Floating Tooltip Card */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 w-48 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 translate-x-2 group-hover:translate-x-0">
                  <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-100 text-left">
                    <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-1">{point.label}</h4>
                    <p className="text-[10px] text-gray-600 leading-tight font-medium">{point.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Point Details */}
          <div>
            <span className="text-accent tracking-widest uppercase text-xs mb-4 block font-medium">
              Biometric Analysis
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight tracking-tight text-gray-900">
              Targeted <br /> <span className="text-gray-300 italic">Neutralization.</span>
            </h2>
            
            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                {selectedPoint ? (
                  <motion.div
                    key={selectedPoint.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100"
                  >
                    <h3 className="text-2xl font-heading font-bold mb-4 text-accent tracking-tight">{selectedPoint.label}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                      {selectedPoint.description} StepUp utilizes aerospace-grade material density mapping to provide exact support right where your anatomy demands it.
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Biometric Match</span>
                      <span className="text-sm font-bold text-accent">98.4%</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-center"
                  >
                    <p className="text-gray-400 uppercase tracking-widest font-bold">
                      Select a pain point on the map <br /> to see diagnostic data
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
