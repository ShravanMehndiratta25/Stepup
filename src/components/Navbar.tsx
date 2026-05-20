"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <Container>
        <div
          className={`glass rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "shadow-md" : "bg-transparent border-transparent shadow-none"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {["Technology", "Products", "Performance", "Discovery"].map(
              (item) => (
                <Link
                  key={item}
                  href={item === "Products" ? "/products" : `/#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-600 hover:text-accent transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative group">
              <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-accent transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 px-6 md:hidden"
          >
            <div className="glass rounded-2xl p-6 flex flex-col gap-4 bg-white/95 shadow-lg">
              {["Technology", "Products", "Performance", "Discovery"].map(
                (item) => (
                  <Link
                    key={item}
                    href={item === "Products" ? "/products" : `/#${item.toLowerCase()}`}
                    className="text-lg font-medium py-2 border-b border-gray-100 last:border-0 text-gray-800 hover:text-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
