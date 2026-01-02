//FrontEnd/src/providers/AuthProvider.tsx
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/lib/redux/slices/authSlice";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Tenta pegar o token salvo no navegador
    const token = localStorage.getItem("token");
    
    if (token) {
      // Se existir, restaura o estado do Redux imediatamente
      dispatch(setAuthState({ token }));
    }
  }, [dispatch]);

  return <>{children}</>;
}