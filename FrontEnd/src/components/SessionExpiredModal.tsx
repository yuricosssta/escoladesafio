"use client";

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { selectSessionExpired, logout } from '@/lib/redux/slices/authSlice';

export const SessionExpiredModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isSessionExpired = useSelector(selectSessionExpired);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Se o modal não estiver visível, não faz nada
    if (!isSessionExpired) {
      setCountdown(5); // Reseta o timer para a próxima vez
      return;
    }

    // Se a contagem chegar a zero, desloga o usuário
    if (countdown <= 0) {
      dispatch(logout());
      return;
    }

    // Inicia o timer de 1 segundo
    const timerId = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    // Limpa o timer
    return () => clearTimeout(timerId);

  }, [isSessionExpired, countdown, dispatch]);

  // Se a sessão não expirou, não renderiza nada
  if (!isSessionExpired) {
    return null;
  }

  // Renderiza o Modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-4">Sessão Expirada</h2>
        <p className="text-gray-700 mb-6">
          Sua sessão expirou. Você será desconectado em <span className="font-bold">{countdown}</span> segundos...
        </p>
        <button
          onClick={() => dispatch(logout())}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Desconectar Agora
        </button>
      </div>
    </div>
  );
};