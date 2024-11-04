// app/admin/index.tsx

import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getCurrentUser } from '../../lib/services/mockDataTournify';

export default function AdminIndex() {
  const router = useRouter();

  useEffect(() => {
    async function checkAdmin() {
      const user = await getCurrentUser();
      if (user.rol !== 'Admin') {
        // Si el usuario no es admin, redirigir al inicio
        router.replace('/');
      } else {
        // Navegar al panel principal del administrador
        router.replace('/admin/Home');
      }
    }
    checkAdmin();
  }, []);

  return null;
}
