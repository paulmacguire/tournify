import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { getCurrentUser, User } from '../lib/services/mockDataTournify';
import Main from '../components/Main';

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser.rol === 'Admin') {
        // Navegar al punto de entrada del administrador
        router.replace('/admin');
      } else if (currentUser.rol === 'Capitan') {
        // Navegar al punto de entrada del capitán
        router.replace('/captain');
      }
      // Si es 'Usuario', no hacemos nada y se queda en esta pantalla
    }
    fetchUser();
  }, []);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#ffffff" />
      </View>
    );
  }

  // Renderizar la pantalla principal para usuarios generales
  return <Main />;
}
