'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: string; // Subject (user email)
  exp: number; // Expiration time
}

const Navbar = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('access_token');
    setUserEmail(null);
    router.push('/login');
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUserEmail(decodedToken.sub);
      } catch (error) {
        console.error('Invalid token:', error);
        handleLogout();
      }
    }
  }, [handleLogout]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              EventManager
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {userEmail ? (
              <>
                <span className="text-gray-700 hidden sm:block">Welcome, {userEmail}</span>
                <Link href="/" className="text-gray-700 hover:text-indigo-600 transition">
                  Events
                </Link>
                <Link href="/admin" className="text-gray-700 hover:text-indigo-600 transition">
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-indigo-600 transition">
                  Login
                </Link>
                <Link href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
