// app/captain/Tournaments.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { getTournaments, Tournament } from "../../lib/services/common";
import { Link } from "expo-router";

export default function CaptainTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const data = await getTournaments();
        setTournaments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTournaments();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando torneos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Torneos Disponibles</Text>
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.id.toString()} // Usar item.id para claves únicas
        renderItem={({ item }) => (
          <Link href={`/captain/tournament/${item.id}`} asChild>
            <Pressable style={styles.card}>
              {item.image ? (
                <Image
                  source={{ uri: item.image }} // Usar { uri: item.image } para imágenes remotas
                  style={styles.image}
                  resizeMode="cover"
                  onError={(error) => {
                    console.error("Error cargando la imagen:", error.nativeEvent.error);
                  }}
                />
              ) : null}
              <View style={styles.textContainer}>
                <Text style={styles.tournamentName}>{item.name}</Text>
                <Text style={styles.tournamentDate}>{item.date}</Text>
              </View>
            </Pressable>
          </Link>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1A1A1D",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    color: "#FFFFFF",
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 18,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 180,
  },
  textContainer: {
    padding: 12,
  },
  tournamentName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  tournamentDate: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  listContent: {
    paddingTop: 16,
  },
});
