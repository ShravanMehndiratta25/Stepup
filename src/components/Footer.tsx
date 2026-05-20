import React from "react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-20 border-t border-gray-200 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <img 
                src="/stepup-logo.svg" 
                alt="StepUp Logo" 
                className="h-8 w-auto transition-transform duration-500 group-hover:scale-105" 
              />
              <span 
                className="text-xl font-normal tracking-tight text-[#111827]" 
                style={{ fontFamily: '"Helvetica", "Arial", sans-serif' }}
              >
                StepUp
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Performance technology meets daily luxury. Redefining human
              motion through advanced biomechanical engineering.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-6 text-sm uppercase tracking-widest text-accent">
              Product
            </h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="#technology" className="hover:text-accent transition-colors">Technology</Link></li>
              <li><Link href="#pro" className="hover:text-accent transition-colors">Apex Pro</Link></li>
              <li><Link href="#lite" className="hover:text-accent transition-colors">Aero Lite</Link></li>
              <li><Link href="#recovery" className="hover:text-accent transition-colors">Recovery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-6 text-sm uppercase tracking-widest text-accent">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/science" className="hover:text-accent transition-colors">Science</Link></li>
              <li><Link href="/press" className="hover:text-accent transition-colors">Press</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-6 text-sm uppercase tracking-widest text-accent">
              Newsletter
            </h4>
            <p className="text-gray-500 text-sm mb-4">
              Join the evolution of performance.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2 text-sm w-full focus:outline-none focus:border-accent text-gray-900 transition-colors"
              />
              <button className="bg-accent text-white px-6 py-2 rounded-2xl text-sm font-bold shadow-sm hover:shadow-md transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 gap-4">
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-medium">
            © 2026 StepUp BIOMETRICS LABS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-gray-400 text-[10px] uppercase tracking-widest font-medium">
            <Link href="/privacy" className="hover:text-accent">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
