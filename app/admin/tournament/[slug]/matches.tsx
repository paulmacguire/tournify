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
  // const { tournamentId } = useTournament();

  useEffect(() => {
    
    async function fetchData() {
      try {
        const tournamentData = await getTournament("3");
        const { data, status } = tournamentData;
        console.log("Tournament data dd:", data);
  
        if (status === 200) {
          const teams = data[0].Teams; // Equipos del torneo
          console.log("Teams dd:", teams);
  
          // Mapeamos los partidos y asignamos los nombres de los equipos
          const enhancedMatches =
            data[0].Matches && data[0].Matches.length > 0
              ? data[0].Matches.map((match) => {
                  const team1 =
                    teams && teams.length > 0
                      ? teams.find((team) => team.id === match.team1) || "No encontrado"
                      : "No equipos disponibles"; // Mensaje si no hay equipos
  
                  const team2 =
                    teams && teams.length > 0
                      ? teams.find((team) => team.id === match.team2) || "No encontrado"
                      : "No equipos disponibles"; // Mensaje si no hay equipos
  
                  return {
                    ...match,
                    name1: team1,
                    name2: team2,
                  };
                })
              : []; // Si no hay matches, se retorna un array vacío
  
          setTeams(teams);
          // setMatches(enhancedMatches); // Si tienes una variable de estado para los partidos, usa esta línea
        }
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    }
  
    fetchData();
  }, [user?.id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Partidos</Text>
      <Link href={`/admin/tournament/${user?.id}/matches/new`} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Crear Nuevo Partido</Text>
        </Pressable>
      </Link>

      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/admin/tournament/${user?.id}/matches/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.matchText}>
                {item.name1} vs {item.name2}
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
