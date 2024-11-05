// app/captain/index.tsx

import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getCurrentUser } from '../../lib/services/mockDataTournify';

export default function CaptainIndex() {
  const router = useRouter();

  useEffect(() => {
    async function checkCaptain() {
      const user = await getCurrentUser();
      if (user.rol !== 'Capitan') {
        // Si el usuario no es capitán, redirigir al inicio
        router.replace('/');
      } else {
        // Navegar al panel principal del capitán
        router.replace('/captain/Home');
      }
    }
    checkCaptain();
  }, []);

  return null;
}
