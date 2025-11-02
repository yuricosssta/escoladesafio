"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthState } from './slices/authSlice';
import { fetchUserProfile } from './slices/userSlice';
import { AppDispatch, RootState } from './store';

export function AuthInitializer() {
  // const dispatch = useDispatch();

  const dispatch = useDispatch<AppDispatch>();
  const { profile, status, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Este código só roda no navegador
    const token = localStorage.getItem('token');
    if (token) {
      // dispatch(setAuthState({ token, isAuthenticated: true }));
      dispatch(setAuthState({ token }));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // if (status === 'loading') {
  //   return <div>Carregando perfil...</div>;
  // }

  // if (status === 'failed') {
  //   return <div className="text-red-500">Erro ao carregar perfil: {error}</div>;
  // }

  // if (!profile) {
  //   return <div>Nenhum perfil encontrado.</div>;
  // }

  return null; // Este componente não renderiza nada na tela
}