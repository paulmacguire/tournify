import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import {
  getMatchesByTournament,
  Match,
  getTeamsByTournament,
  Team,
} from "../../../../lib/services/common";

export default function AdminMatches() {
  const { slug } = useLocalSearchParams();
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    async function fetchData() {
      const matchesData = await getMatchesByTournament(slug as string);
      setMatches(matchesData);

      const teamsData = await getTeamsByTournament(slug as string);
      setTeams(teamsData);
    }
    fetchData();
  }, [slug]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Partidos</Text>
      <Link href={`/admin/tournament/${slug}/matches/new`} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Crear Nuevo Partido</Text>
        </Pressable>
      </Link>

      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/admin/tournament/${slug}/matches/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.matchText}>
                {item.team1} vs {item.team2}
              </Text>
              <Text style={styles.matchText}>Fecha: {item.date}</Text>
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
    backgroundColor: "#1A1A1D",
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: "#1A1A1D",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#2C2C2E",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  matchText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
