
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { getCurrentUser, getTournaments, Tournament } from '../../lib/services/mockDataTournify';
import { useRouter } from 'expo-router';

export default function AdminHome() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const user = await getCurrentUser();
      if (user.rol !== 'Admin') {
        router.replace('/');
        return;
      }

      // Obtener los torneos que el admin puede gestionar
      const allTournaments = await getTournaments();
      // Suponiendo que el admin puede gestionar todos los torneos
      // Si no, filtrar los torneos por algún criterio
      setTournaments(allTournaments);
    }
    fetchData();
  }, []);

  const handleSelectTournament = (slug: string) => {
    router.push(`/admin/tournament/${slug}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel del Administrador</Text>
      <Text style={styles.subtitle}>Seleccione un torneo para gestionar:</Text>
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => handleSelectTournament(item.slug)}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.tournamentName}>{item.name}</Text>
              <Text style={styles.tournamentDate}>{item.date}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilos aquí
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1A1A1D',
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 12,
  },
  tournamentName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tournamentDate: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
