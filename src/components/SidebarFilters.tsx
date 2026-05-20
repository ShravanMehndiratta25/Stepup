import React from 'react';

interface SidebarFiltersProps {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = ['All', 'Everyday', 'Sport', 'Work', 'Cushion'];

export default function SidebarFilters({ selected, onSelect }: SidebarFiltersProps) {
  return (
    <aside className="w-48 flex flex-col gap-2 border border-[#111827]/10 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Categories</h2>
      <ul className="space-y-1">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => onSelect(cat)}
              className={`w-full text-left px-2 py-1 rounded hover:bg-[#2563EB]/10 transition-colors ${
                selected === cat ? 'bg-[#2563EB]/20 font-bold' : ''
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
