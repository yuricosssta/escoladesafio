"use client";

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { logout } from '@/lib/redux/slices/authSlice';
import { usePathname, useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';
import { FunctionComponent } from 'react';
import { cn } from '@/lib/utils';
import { UserNav } from './UserNav';
import React from 'react';
import { CheckCircle, AlertTriangle, Download, Database, Lock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import LogoBloco from './LogoBloco';

interface MenuItem {
  name: string;
  href?: string;
  onClick?: () => void;
  openInNewTab?: boolean;
}

export const Navbar: FunctionComponent = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const menuItems: MenuItem[] = [
    { name: "Inicial", href: "/posts" },
    { name: "Criar Post", href: "/posts/new" },
    { name: "Configurações", href: "/dashboard" },
    // { name: "Sair", onClick: handleLogout },
  ];

  return (
    // <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-[#8B4513] selection:text-white">
      <nav  className="fixed w-full bg-white/80 backdrop-blur-md border-b border-stone-200 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <LogoBloco />

          {/* Botão de Login */}
          <button
            type="button"
            className="md:flex items-center gap-2 bg-stone-900 hover:bg-stone-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm"
          >
            <Lock size={14} />
            Área de Membros
          </button>
        </div>
      </nav>
     //</div>
  );
};