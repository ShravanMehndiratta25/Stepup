'use client';
import React from 'react';

// Placeholder data for recommendations – can be replaced with dynamic content later
const placeholderRecommendations = [
  { id: 'rec1', title: 'Top Picks for You', image: '/products/daily.png' },
  { id: 'rec2', title: 'Trending Now', image: '/products/active.png' },
  { id: 'rec3', title: 'New Arrivals', image: '/products/apex.png' },
];

export default function Recommendations() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-heading font-semibold mb-6">Explore Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderRecommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex flex-col items-center border border-[#111827]/10 rounded-lg p-4 bg-white/70 backdrop-blur-sm"
          >
            <img
              src={rec.image}
              alt={rec.title}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <span className="text-lg font-medium text-[#111827]">{rec.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
