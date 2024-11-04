// app/captain/Home.tsx

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { getCurrentUser } from '../../lib/services/mockDataTournify';
import { useRouter, useNavigation } from 'expo-router';

export default function CaptainHome() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    async function checkCaptain() {
      const user = await getCurrentUser();
      if (user.rol !== 'Capitan') {
        // Si el usuario no es capitán, redirigir al inicio
        router.replace('/');
      } else {
        navigation.setOptions({
          headerShown: false,
        });
      }
    }
    checkCaptain();
  }, []);

  const handleNavigateToTournaments = () => {
    router.push('/captain/Tournaments');
  };

  const handleNavigateToTeam = () => {
    router.push('/captain/team');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel del Capitán</Text>
      <Pressable style={styles.button} onPress={handleNavigateToTournaments}>
        <Text style={styles.buttonText}>Ver Torneos Disponibles</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleNavigateToTeam}>
        <Text style={styles.buttonText}>Gestionar Mi Equipo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1A1A1D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    width: '80%',
  },
  buttonText: {
    color: '#1A1A1D',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
