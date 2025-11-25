"use client";

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { selectSessionExpired, logout } from '@/lib/redux/slices/authSlice';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export const SessionExpiredModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isSessionExpired = useSelector(selectSessionExpired);
  const [countdown, setCountdown] = useState(5);

  // useEffect(() => {
  //   // Se o modal não estiver visível, não faz nada
  //   if (!isSessionExpired) {
  //     setCountdown(5); // Reseta o timer para a próxima vez
  //     return;
  //   }

  //   // Se a contagem chegar a zero, desloga o usuário
  //   if (countdown <= 0) {
  //     dispatch(logout());
  //     return;
  //   }

  //   // Inicia o timer de 1 segundo
  //   const timerId = setTimeout(() => {
  //     setCountdown(countdown - 1);
  //   }, 1000);

  //   // Limpa o timer
  //   return () => clearTimeout(timerId);

  // }, [isSessionExpired, countdown, dispatch]);

  // Se a sessão não expirou, não renderiza nada
  if (!isSessionExpired) {
    return null;
  }

  return (
    <div>
      <Dialog open={isSessionExpired} onClose={() => { }} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-none bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10 dark:bg-red-500/10">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                      Sua conexão expirou
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {/* Você será desconectado em <span className="font-bold">{countdown}</span> segundos... */}
                        Conecte-se para continuar utilizando o sistema.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700/25">
                <button
                  type="button"
                  onClick={() => dispatch(logout())}
                  className="inline-flex w-full justify-center rounded-none bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto dark:bg-red-500 dark:shadow-none dark:hover:bg-red-400"
                >
                  Fechar
                </button>
                {/* <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
                >
                  Cancel
                </button> */}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>

  );
};