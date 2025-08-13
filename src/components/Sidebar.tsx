'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { categories, brands } from '../data/mockData';
import { Filters } from '../type/index';

interface SidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  className?: string;
}

export default function Sidebar({ filters, onFiltersChange, className = '' }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.category, category]
      : filters.category.filter(c => c !== category);

    onFiltersChange({
      ...filters,
      category: newCategories,
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFiltersChange({
      ...filters,
      priceRange: [min, max],
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: [],
      priceRange: [0, 2000],
      searchQuery: filters.searchQuery,
    });
  };

  const SidebarContent = () => (
    <div className="space-y-8">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 px-2 py-1 rounded-md transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={(e) => handleCategoryChange(category, e.target.checked)}
                className="h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Price Range</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(parseInt(e.target.value) || 0, filters.priceRange[1])}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span className="text-gray-500 dark:text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(filters.priceRange[0], parseInt(e.target.value) || 2000)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Price Range Slider */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              title="Price Range"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(filters.priceRange[0], parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>$0</span>
              <span>$2000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Popular Brands</h4>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        title="Open Filters"
        className="lg:hidden fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 transition-colors"
      >
        <Filter className="h-6 w-6" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Filters"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <SidebarContent />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block ${className}`}>
        <div className="bg-blue-50 dark:bg-gray-900 rounded-lg shadow-sm border border-blue-100 dark:border-gray-700 p-6 sticky top-20">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
