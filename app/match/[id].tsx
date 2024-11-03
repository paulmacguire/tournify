// app/match/[id].tsx

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { getMatchById, Match, MatchEvent } from "../../lib/services/mockDataTournify";
import { SoccerBall } from "phosphor-react-native";

export default function MatchDetails() {
  const { id } = useLocalSearchParams();
  const [match, setMatch] = useState<Match | undefined>(undefined);

  useEffect(() => {
    async function fetchMatch() {
      const matchData = await getMatchById(id as string);
      setMatch(matchData);
    }
    fetchMatch();
  }, [id]);

  if (!match) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Partido no encontrado.</Text>
      </View>
    );
  }

  const isPending = match.estado === 'Pendiente';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SoccerBall size={40} color="#ffffff" weight="fill" />
        <Text style={styles.title}>{match.equipo1} vs {match.equipo2}</Text>
      </View>
      <Text style={styles.detailText}>Fecha: {match.fecha}</Text>
      <Text style={styles.detailText}>Hora: {match.hora}</Text>
      <Text style={styles.detailText}>
        Resultado: {isPending ? 'Por jugar' : match.resultado}
      </Text>

      {isPending ? (
        <Text style={styles.pendingText}>Este partido aún no se ha jugado.</Text>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Eventos del Partido</Text>
          {match.eventos && match.eventos.length > 0 ? (
            match.eventos.map((event, index) => (
              <EventItem key={index} event={event} />
            ))
          ) : (
            <Text style={styles.noEventsText}>No hay eventos registrados.</Text>
          )}
        </>
      )}

      <Link style={styles.backLink} href={`/${match.torneoSlug}`}>
        Volver al torneo
      </Link>
    </View>
  );
}

const EventItem: React.FC<{ event: MatchEvent }> = ({ event }) => {
  return (
    <View style={styles.eventItem}>
      <Text style={styles.eventText}>
        {event.minuto}' - {event.tipo} de {event.jugador} ({event.equipo})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... estilos existentes
  container: {
    flex: 1,
    backgroundColor: "#1A1A1D",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A1D",
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    marginLeft: 12,
  },
  detailText: {
    fontSize: 16,
    color: "#B0B0B0",
    marginBottom: 4,
  },
  pendingText: {
    color: "#FFD700",
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 24,
    marginBottom: 12,
  },
  noEventsText: {
    color: "#B0B0B0",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  },
  eventItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  eventText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  backLink: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    marginTop: 24,
    textDecorationLine: "underline",
  },
});
