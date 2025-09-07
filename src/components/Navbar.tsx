import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-yellow-400" />
            <span className="text-xl font-bold text-yellow-400">Big Boss</span>
            <span className="text-sm text-gray-300 hidden sm:inline">Men's Wear</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-yellow-400 bg-gray-900' 
                  : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/shop') 
                  ? 'text-yellow-400 bg-gray-900' 
                  : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-900'
              }`}
            >
              Shop
            </Link>
            {user && (
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/admin') 
                    ? 'text-yellow-400 bg-gray-900' 
                    : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-900'
                }`}
              >
                Admin Panel
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm text-gray-300 hidden sm:inline">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 px-4 py-2 bg-yellow-400 text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-700">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
              isActive('/') 
                ? 'text-yellow-400 bg-gray-900' 
                : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-900'
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
              isActive('/shop') 
                ? 'text-yellow-400 bg-gray-900' 
                : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-900'
            }`}
          >
            Shop
          </Link>
          {user && (
            <Link
              to="/admin"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/admin') 
                  ? 'text-yellow-400 bg-gray-900' 
                  : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-900'
              }`}
            >
              Admin Panel
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}