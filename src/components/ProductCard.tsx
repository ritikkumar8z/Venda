'use client';

import { Star, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../type/index';
import { useCartStore } from '../store/cardStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-gray-300 dark:text-gray-600" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="h-4 w-4 text-gray-300 dark:text-gray-600" />
        );
      }
    }
    return stars;
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-white dark:bg-gray-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all duration-300">
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden bg-white dark:bg-gray-950">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 
                   (max-width: 1200px) 50vw, 
                   33vw"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col justify-between h-full">
          {/* Title & Category */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {product.category}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center">{renderStars(product.rating.rate)}</div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ${product.price}
            </span>
            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:block">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
