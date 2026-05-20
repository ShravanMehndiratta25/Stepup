"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";

export const CheckoutDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, totalPrice, removeFromCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);

    // Simulate Stripe payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Call Supabase Edge Function for each item or aggregate (simulated)
    const { error } = await supabase.functions.invoke("handle-checkout-success", {
      body: { productIds: cartItems.map(i => i.id) },
    });

    setIsProcessing(false);
    if (!error) {
      setSuccess(true);
      setTimeout(() => {
        setIsCartOpen(false);
        setSuccess(false);
      }, 3000);
    }
  };

  return (
    <Dialog.Root open={isCartOpen} onOpenChange={setIsCartOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100]" />
        <Dialog.Content className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-gray-200 p-6 z-[101] shadow-2xl flex flex-col focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
            <Dialog.Title className="text-xl font-heading font-bold tracking-tight text-gray-900">
              Quick Loadout
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-gray-900" />
              </button>
            </Dialog.Close>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 text-gray-600 font-medium">
              <p>Your loadout is empty.</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-transparent rounded-2xl p-4 border border-gray-200 flex items-center gap-4 group">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                      ) : (
                        <div className="w-8 h-12 bg-accent/20 rounded-full rotate-12" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-gray-900 text-sm mb-0.5">{item.name}</h4>
                      <p className="text-accent font-mono text-xs font-medium">₹{item.price.toLocaleString('en-IN')} x {item.quantity || 1}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-auto border-t border-gray-200 pt-6 space-y-4">
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-mono text-gray-900 font-bold">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                
                <Link 
                  href="/cart" 
                  onClick={() => setIsCartOpen(false)}
                  className="block text-center text-accent text-sm font-bold hover:underline mb-2"
                >
                  View Full Cart Page
                </Link>

                {success ? (
                  <div className="w-full bg-green-50 border border-green-200 text-green-700 py-4 rounded-2xl text-center font-bold tracking-wide mt-4">
                    Deployment Initiated
                  </div>
                ) : (
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full bg-[#2563EB] text-white py-4 rounded-2xl font-bold tracking-wide mt-2 hover:shadow-lg shadow-md shadow-blue-600/20 disabled:opacity-70 flex justify-center items-center h-[56px] transition-all"
                  >
                    {isProcessing ? "Processing..." : "Confirm & Pay"}
                  </button>
                )}
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
