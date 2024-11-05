// app/captain/Tournaments.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Image } from 'react-native';
import { getTournaments, Tournament } from '../../lib/services/mockDataTournify';
import { Link } from 'expo-router';

export default function CaptainTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    async function fetchTournaments() {
      const data = await getTournaments();
      setTournaments(data);
    }
    fetchTournaments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Torneos Disponibles</Text>
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <Link href={`/captain/tournament/${item.slug}`} asChild>
            <Pressable style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.tournamentName}>{item.name}</Text>
                <Text style={styles.tournamentDate}>{item.date}</Text>
              </View>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
