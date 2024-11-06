import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import {
  getTournamentBySlug,
  Tournament,
  getCurrentUser,
  User,
} from "../../../../lib/services/mockDataTournify";
import useUserStore from "@/stores/useUserStore";

export default function AdminTournamentPanel() {
  const { slug } = useLocalSearchParams();
  const [tournament, setTournament] = useState<Tournament | undefined>();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    async function fetchData() {
      const torneo = await getTournamentBySlug(slug as string);
      setTournament(torneo);
    }
    fetchData();
  }, [slug]);

  if (!tournament) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Torneo no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Torneos de {user?.name}</Text>
      <Text style={styles.tournamentName}>{tournament.name}</Text>

      <Link href={`/admin/tournament/${slug}/registrations`} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Gestionar Inscripciones</Text>
        </Pressable>
      </Link>

      <Link href={`/admin/tournament/${slug}/matches`} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Gestionar Partidos</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1A1A1D",
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 16,
  },
  tournamentName: {
    color: "#FFFFFF",
    fontSize: 20,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#2C2C2E",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
