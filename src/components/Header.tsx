"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "../store/cardStore";
import { useState, useEffect } from "react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const totalItems = useCartStore((state) => state.getTotalItems());

  // Prevent hydration mismatch for cart count 
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-gray-900/80 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-primary hover:text-blue-600 dark:text-blue-400 dark:hover:text-white transition-colors">
              Logo
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden sm:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 pl-10 pr-4 py-2 text-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Right Side - Cart and Profile */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Profile */}
            <button
              className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors"
              title="Profile"
            >
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
