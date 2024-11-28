import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import {
  getMatchesByTournament,
  getStandingsByTournament,
  getTopScorersByTournament,
  Tournament,
  Match,
  Team,
  Player,
  getTournamentById,
} from "../lib/services/common";
import { SoccerBall } from "phosphor-react-native";
import MatchCard from "../components/MatchCard";
import StandingsTable from "../components/StandingsTable";
import TopScorers from "../components/TopScorers";

export default function Detail() {
  const { id } = useLocalSearchParams();
  const [tournament, setTournament] = useState<Tournament | undefined>(
    undefined,
  );
  const [matches, setMatches] = useState<Match[]>([]);
  const [standings, setStandings] = useState<Team[]>([]);
  const [topScorers, setTopScorers] = useState<Player[]>([]);

  useEffect(() => {
    async function fetchData() {
      const tournamentData = await getTournamentById(id as string);
      setTournament(tournamentData);

      if (tournamentData) {
        const matchesData = await getMatchesByTournament(id as string);
        setMatches(matchesData);

        const standingsData = await getStandingsByTournament(id as string);
        setStandings(standingsData);

        const topScorersData = await getTopScorersByTournament(
          gameslug as string,
        );
        setTopScorers(topScorersData);
      }
    }
    fetchData();
  }, [id]);

  if (!tournament) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Torneo no encontrado.</Text>
        <Link style={styles.backLink} href={"/"}>
          Volver atrás
        </Link>
      </View>
    );
  }

  // Separar partidos pendientes y finalizados
  const pendingMatches = matches.filter(
    (match) => match.status === "Pendiente",
  );
  const finishedMatches = matches.filter(
    (match) => match.status === "Finalizado",
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Información del torneo */}
        <View style={styles.header}>
          <SoccerBall size={40} color="#ffffff" weight="fill" />
          <Text style={styles.title}>{tournament.name}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Ubicación:</Text>
            <Text style={styles.detailText}>{tournament.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.detailText}>{tournament.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Clasificación:</Text>
            <Text style={styles.detailText}>{tournament.classification}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Organizador:</Text>
            <Text style={styles.detailText}>{tournament.organizer}</Text>
          </View>
        </View>

        {/* Tabla de posiciones */}
        <Text style={styles.sectionTitle}>Tabla de Posiciones</Text>
        <StandingsTable standings={standings} />

        {/* Máximos goleadores */}
        <Text style={styles.sectionTitle}>Máximos Goleadores</Text>
        <TopScorers topScorers={topScorers} />

        {/* Partidos Pendientes */}
        <Text style={styles.sectionTitle}>Partidos Pendientes</Text>
        {pendingMatches.length > 0 ? (
          <View style={styles.matchesContainer}>
            {pendingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </View>
        ) : (
          <Text style={styles.noMatchesText}>No hay partidos pendientes.</Text>
        )}

        {/* Partidos Finalizados */}
        <Text style={styles.sectionTitle}>Partidos Finalizados</Text>
        {finishedMatches.length > 0 ? (
          <View style={styles.matchesContainer}>
            {finishedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </View>
        ) : (
          <Text style={styles.noMatchesText}>No hay partidos finalizados.</Text>
        )}
        <Link style={styles.backLink} href={"/"}>
          Volver atrás
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1D",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 12,
    flexShrink: 1,
  },
  detailsContainer: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  label: {
    color: "#B0B0B0",
    fontSize: 16,
    fontWeight: "600",
    width: 130,
  },
  detailText: {
    color: "#FFFFFF",
    fontSize: 16,
    flexShrink: 1,
  },
  sectionTitle: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
  },
  matchesContainer: {
    marginBottom: 24,
  },
  noMatchesText: {
    color: "#B0B0B0",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  },
  backLink: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    marginTop: 24,
    textDecorationLine: "underline",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A1D",
  },
  loadingText: {
    color: "#ffffff", // Texto blanco
    fontSize: 18,
  },
});
