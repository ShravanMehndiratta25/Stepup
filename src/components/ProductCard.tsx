import Image from 'next/image';
import { Product } from '@/types/supabase';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some((i) => i.id === product.id);

  return (
    <div className="border border-[#111827]/10 p-4 hover:border-[#2563EB] transition-colors flex flex-col items-center group">
      {product.main_image_url ? (
        <div className="relative w-full h-48 mb-3 overflow-hidden rounded-xl">
          <Image
            src={product.main_image_url}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-200 mb-3 rounded-xl" />
      )}
      <h2 className="font-montserrat font-bold text-lg mb-1 text-center">{product.name}</h2>
      <p className="text-base mb-3 font-semibold">₹{Number(product.price).toLocaleString('en-IN')}</p>
      <button
        onClick={() =>
          addToCart({ 
            id: product.id, 
            name: product.name, 
            price: Number(product.price),
            image: product.main_image_url || undefined
          })
        }
        className="bg-[#2563EB] text-white rounded-full px-6 py-2 hover:bg-[#1e4bb8] transition-all transform hover:scale-105"
      >
        {isInCart ? 'Added to Cart' : 'Quick Add'}
      </button>
    </div>
  );
}
