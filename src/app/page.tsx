import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";
import { BiometricMap } from "@/components/BiometricMap";
import { FitQuiz } from "@/components/FitQuiz";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <BentoGrid />
      <BiometricMap />
      
      {/* "Fit" Discovery Call to Action Section */}
      <section id="discovery" className="py-32 bg-accent text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight tracking-tight text-white">
            Find Your <br /> <span>Perfect Fusion.</span>
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto font-medium">
            Take our 60-second biomechanical quiz and discover which Insolv
            technology is engineered for your journey.
          </p>
          
          <FitQuiz />
        </div>
      </section>
    </div>
  );
}
