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
  getTournament,
  Match,
  Team,
  Tournament,
  getTeamById,
} from "../../../../lib/services/common";
import useUserStore from "@/stores/useUserStore";
// import { useTournament } from './../../tournamentContext';

export default function AdminMatches() {
  const { user } = useUserStore();
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const { id } = useLocalSearchParams();
  
  useEffect(() => {
    async function fetchData() {
      try {
        const tournamentData = await getTournament(id);
        const { data, status } = tournamentData;
        console.log("Tournament data:", data);
  
        if (status === 200) {
          const enhancedMatches = data.Matches.map((match: Match) => {
            // Buscar el equipo correspondiente a team1 y team2
            const team1 = data.Teams.find((team: Team) => team.id === match.team1);
            const team2 = data.Teams.find((team: Team) => team.id === match.team2);
  
            // Retornar el partido con los nombres de los equipos añadidos
            return {
              ...match,
              name1: team1?.name || "Equipo no encontrado",
              name2: team2?.name || "Equipo no encontrado",
            };
          });
  
          // Actualizar el estado con los equipos y los partidos
          setTeams(data.Teams);
          setMatches(enhancedMatches);
        }
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    }
  
    fetchData();
  }, [id]); // Agrega dependencias si las necesitas
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Partidos</Text>
      <Link href={`/admin/tournament/${id}/matches/new`} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Crear Nuevo Partido</Text>
        </Pressable>
      </Link>

      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/admin/tournament/${id}/matches/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.matchText}>
                {item.name1} vs {item.name2}
              </Text>
              <Text style={styles.matchText}>Fecha: {item.date}</Text>
              <Text style={styles.matchText}>Hora: {item.time}</Text>
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
