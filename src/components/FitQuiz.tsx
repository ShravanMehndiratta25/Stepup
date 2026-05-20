"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

const steps = [
  {
    id: "activity",
    title: "Primary Activity",
    options: [
      { label: "Running", value: "running" },
      { label: "Walking/Lifestyle", value: "walking" },
      { label: "High Impact (Court/Gym)", value: "impact" },
    ],
  },
  {
    id: "pain_point",
    title: "Where do you feel discomfort?",
    options: [
      { label: "Heel", value: "heel" },
      { label: "Arch", value: "arch" },
      { label: "Ball of Foot", value: "ball" },
    ],
  },
];

export const FitQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const { addToCart } = useCart();

  const handleSelect = async (optionValue: string) => {
    const currentStepData = steps[currentStep];
    const newAnswers = { ...answers, [currentStepData.id]: optionValue };
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finished Quiz - Calculate
      setLoading(true);
      setCurrentStep(currentStep + 1); // move to loading/result state
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("pain_point", newAnswers.pain_point)
        .limit(1)
        .single();

      if (!error && data) {
        setResult(data);
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 p-8 max-w-xl mx-auto min-h-[300px] flex items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {currentStep < steps.length && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full text-center"
          >
            <span className="text-accent tracking-widest text-xs uppercase mb-2 block font-medium">
              Step {currentStep + 1} of {steps.length}
            </span>
            <h3 className="text-2xl font-heading font-bold mb-8 tracking-tight text-gray-900">{steps[currentStep].title}</h3>
            <div className="flex flex-col gap-3">
              {steps[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="w-full text-left px-6 py-4 rounded-2xl border border-gray-200 hover:border-accent hover:bg-accent/5 text-gray-800 font-medium transition-all outline-none"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === steps.length && loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 border-4 border-gray-200 border-t-accent rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-bold">Analyzing Biometrics...</p>
          </motion.div>
        )}

        {currentStep === steps.length && !loading && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <span className="text-accent tracking-widest text-xs uppercase mb-2 block font-medium">
              Optimal Match
            </span>
            <h3 className="text-4xl font-heading font-bold text-gray-900 mb-2 tracking-tight">{result.name}</h3>
            <p className="text-gray-500 mb-6 font-medium">{result.tagline}</p>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
              {result.description}
            </p>
            
            <button
              onClick={() => addToCart({
                id: result.id,
                name: result.name,
                price: Number(result.price),
                image: result.main_image_url
              })}
              className="bg-accent text-white px-10 py-4 rounded-2xl font-bold tracking-wide hover:shadow-lg transition-all shadow-md shadow-accent/20"
            >
              Add to Cart - ₹{Number(result.price).toLocaleString('en-IN')}
            </button>
          </motion.div>
        )}

        {currentStep === steps.length && !loading && !result && (
          <motion.div key="error" className="text-center">
            <p className="text-gray-600 font-medium">Could not determine physical match. Please try again.</p>
            <button onClick={() => setCurrentStep(0)} className="mt-4 text-accent font-bold">Restart</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
