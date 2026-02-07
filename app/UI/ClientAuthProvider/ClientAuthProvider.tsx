'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

export function ClientAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Инициализируем авторизацию при загрузке
    useAuthStore.getState().initializeAuth();
  }, []);

  return <>{children}</>;
}
