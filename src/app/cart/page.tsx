"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function CartPage() {
  const { cartItems, removeFromCart, addToCart, totalPrice, totalItems } = useCart();

  const handleUpdateQuantity = (item: any, delta: number) => {
    if (item.quantity + delta <= 0) {
      removeFromCart(item.id);
    } else {
      addToCart({ ...item, quantity: 1 }); // addToCart logic in our context increments if exists
    }
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] pt-32 pb-20 text-[#111827]">
      <Container>
        <div className="flex items-center gap-4 mb-12">
          <Link href="/products" className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-accent transition-colors">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Shop
          </Link>
        </div>

        <h1 className="text-4xl font-heading font-bold mb-12 tracking-tight">Your Loadout</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-20 text-center flex flex-col items-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-8 h-8 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your loadout is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm">
              You haven't added any performance upgrades to your gear yet.
            </p>
            <Link 
              href="/products" 
              className="bg-[#2563EB] text-white px-8 py-4 rounded-2xl font-bold tracking-wide hover:shadow-lg transition-all"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-gray-200" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-heading font-bold mb-1">{item.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">Performance Insole Upgrade</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      <div className="flex items-center border border-gray-200 rounded-xl px-2 py-1">
                        <button 
                          onClick={() => removeFromCart(item.id)} // Simplified for now
                          className="p-1 hover:text-accent transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-mono font-bold">
                          {item.quantity || 1}
                        </span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="p-1 hover:text-accent transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right sm:text-right w-full sm:w-auto">
                    <p className="text-xl font-mono font-bold text-gray-900">
                      ₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      ₹{item.price.toLocaleString('en-IN')} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm sticky top-32">
                <h3 className="text-xl font-heading font-bold mb-6 tracking-tight">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="text-gray-900 font-mono">₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Shipping</span>
                    <span className="text-accent font-mono">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Tax</span>
                    <span className="text-gray-900 font-mono">₹0</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-mono font-bold text-accent">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-[#2563EB] text-white py-5 rounded-2xl font-bold tracking-wide hover:shadow-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                  Proceed to Checkout
                </button>
                
                <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-2">
                  Secure encrypted transaction 
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
