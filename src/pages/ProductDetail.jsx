import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { getProduct } = useProducts();
  const product = id ? getProduct(id) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link
            to="/shop"
            className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/shop"
          className="inline-flex items-center text-gray-600 hover:text-yellow-600 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="aspect-w-1 aspect-h-1 h-96 lg:h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full mb-4">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <div className="text-4xl font-bold text-yellow-600 mb-6">
                  ₹{product.price.toLocaleString()}
                </div>
              </div>

              <div className="prose max-w-none mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="border-t pt-6 mb-8">
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Tag className="mr-2 h-4 w-4" />
                    <span>Category: {product.category}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Added: {new Date(product.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-yellow-400 text-black py-4 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                  Contact for Purchase
                </button>
                <button className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Add to Wishlist
                </button>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Product Features</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Premium quality materials</li>
                  <li>• Expert tailoring and craftsmanship</li>
                  <li>• Modern fit and styling</li>
                  <li>• Perfect for formal and business occasions</li>
                  <li>• Available in multiple sizes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
