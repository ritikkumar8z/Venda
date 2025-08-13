'use client';

import { useCartStore } from '@/store/cardStore';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } =
    useCartStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert('✅ Checkout successful! Thank you for shopping.');
      clearCart();
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <ShoppingBag size={28} className="text-blue-600 dark:text-blue-400" />
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
            <Image
              src="https://illustrations.popsy.co/gray/cart.svg"
              alt="Empty Cart"
              width={200}
              height={200}
              className="mx-auto mb-6"
            />
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Your cart is empty 🛒
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Back to Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 gap-4 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
                >
                  <div className="relative w-28 h-28 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <h2 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-3 gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        title="Decrease quantity"
                        className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 text-gray-900 dark:text-white font-medium min-w-[30px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        title="Increase quantity"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    title="Remove item"
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={clearCart}
                  className="text-red-600 dark:text-red-400 text-sm hover:underline"
                >
                  Clear Cart
                </button>
                <Link
                  href="/"
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  ← Back to Shopping
                </Link>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 h-fit sticky top-24 border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h3>
              <div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr className="my-3 border-gray-200 dark:border-gray-700" />
              <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white mb-6">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                disabled={isProcessing}
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition disabled:opacity-60"
              >
                {isProcessing ? 'Processing...' : 'Checkout'}
                {!isProcessing && <ArrowRight size={18} />}
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                By proceeding, you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
