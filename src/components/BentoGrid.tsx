"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Zap, Shield, Wind, Cpu } from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className,
  delay = 0,
}: {
  icon: any;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className={`glass-card p-8 rounded-2xl group hover:shadow-2xl transition-all duration-500 ${className}`}
  >
    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
      <Icon className="w-6 h-6 text-accent" />
    </div>
    <h3 className="text-xl font-heading font-bold mb-3 tracking-tight text-gray-900">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export const BentoGrid = () => {
  return (
    <section id="technology" className="py-32 relative">
      <Container>
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-bold mb-4 tracking-tight text-gray-900"
          >
            Built for <span className="text-accent italic">Everyday</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-500 max-w-lg mx-auto"
          >
            We don't just make insoles. We engineer performance interfaces that
            synchronize with your unique biomechanical data.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          <FeatureCard
            icon={Cpu}
            title="Biometric Sync"
            description="Real-time pressure mapping integrated with our proprietary foam density algorithm."
            className="md:col-span-2"
          />
          <FeatureCard
            icon={Zap}
            title="Energy Return"
            description="Carbon fiber chassis provides a 4% increase in propulsive efficiency."
            className="md:col-span-1"
            delay={0.1}
          />
          <FeatureCard
            icon={Wind}
            title="Aero-Vent"
            description="Advanced micro-perforations keep your kinetic chain cool under extreme pressure."
            className="md:col-span-1"
            delay={0.2}
          />
          <FeatureCard
            icon={Shield}
            title="Zero-Impact"
            description="High-density GEL matrix absorbs up to 90% of landing shock on impact."
            className="md:col-span-2"
            delay={0.3}
          />
        </div>
      </Container>
    </section>
  );
};
