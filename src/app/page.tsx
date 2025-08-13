'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { mockProducts } from '../data/mockData';
import { Filters } from '../type/index';

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    category: [],
    priceRange: [0, 2000],
    searchQuery: '',
  });

  const [sortOption, setSortOption] = useState('featured');

  // Initialize filters from URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const priceParam = searchParams.get('price');
    const searchParam = searchParams.get('search');

    setFilters({
      category: categoryParam ? categoryParam.split(',') : [],
      priceRange: priceParam
        ? (priceParam.split('-').map(Number) as [number, number])
        : [0, 2000],
      searchQuery: searchParam || '',
    });
  }, [searchParams]);

  // Update URL on filter change
  const updateURL = (newFilters: Filters) => {
    const params = new URLSearchParams();

    if (newFilters.category.length > 0) {
      params.set('category', newFilters.category.join(','));
    }
    if (
      newFilters.priceRange[0] !== 0 ||
      newFilters.priceRange[1] !== 2000
    ) {
      params.set('price', `${newFilters.priceRange[0]}-${newFilters.priceRange[1]}`);
    }
    if (newFilters.searchQuery) {
      params.set('search', newFilters.searchQuery);
    }

    const paramString = params.toString();
    const url = paramString ? `/?${paramString}` : '/';
    router.push(url, { scroll: false });
  };

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleSearchChange = (query: string) => {
    const newFilters = { ...filters, searchQuery: query };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  // Filter + Sort logic
  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    if (filters.category.length > 0) {
      filtered = filtered.filter((product) =>
        filters.category.includes(product.category)
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Sorting
    switch (sortOption) {
      case 'low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return filtered;
  }, [filters, sortOption]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <Header
        searchQuery={filters.searchQuery}
        onSearchChange={handleSearchChange}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <Sidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            className="w-full lg:w-72"
          />

          {/* Main content */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {filters.searchQuery
                    ? `Search Results for "${filters.searchQuery}"`
                    : 'All Products'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {/* Sort options */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Sort Products"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Products grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="text-gray-400 dark:text-gray-600 text-6xl mb-4">
                  🔍
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters or search query to find what you’re
                  looking for.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
