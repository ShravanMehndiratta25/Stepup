'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/supabase';
import SidebarFilters from '@/components/SidebarFilters';
import ProductCard from '@/components/ProductCard';
import Recommendations from '@/components/Recommendations';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Supabase fetch error:', error);
        return;
      }
      // Normalize sizes array
      const normalized = data.map((p) => ({
        ...p,
        sizes: Array.isArray(p.sizes) ? p.sizes.map(Number) : [],
      }));
      setProducts(normalized);
    }
    fetchProducts();
  }, []);

  const filteredProducts =
    filter === 'All'
      ? products
      : products.filter((p) => p.category?.toLowerCase() === filter.toLowerCase());

  return (
    <section className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans">
      {/* Header with faint foot watermark */}
      <header className="py-12 text-center shop-headline mt-24">
        <h1 className="text-5xl font-heading font-bold tracking-tight">
          StepUp Shop
        </h1>
      </header>

      <div className="container mx-auto flex gap-8 px-4">
        {/* Sidebar Filters */}
        <SidebarFilters selected={filter} onSelect={setFilter} />

        {/* Main Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* Recommendations Section */}
          <Recommendations />
        </div>
      </div>
    </section>
  );
}
