"use client";

import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { AppDispatch } from '@/lib/redux/store';
import { logout, selectIsAuthenticated, selectCurrentUser } from '@/lib/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

export const UserNav = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    // Redireciona para a página de login após o logout
    router.push('/auth/login');
  };

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated && user ? (
        <>
          <span className="text-sm text-gray-600">
            Olá, <Link href="/profile" className="font-bold hover:underline">{user.email}</Link>
          </span>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
          >
            Sair
          </button>
        </>
      ) : (
        <Link 
          href="/auth/login" 
          className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
        >
          Login
        </Link>
      )}
    </div>
  );
};