import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getTournaments } from "../lib/services/mockDataTournify";
import { SoccerBall } from "phosphor-react-native";

interface Tournament {
  nombre: string;
  fecha: string;
  ubicacion: string;
  estado: string;
  rol: string;
  clasificacion: string;
  description: string;
  slug: string;
  image: string;
  organizador: string;
}

export default function Detail() {
  const { gameslug } = useLocalSearchParams();
  const [tournament, setTournament] = useState<Tournament | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchTournament() {
      const tournaments = await getTournaments();
      const tournamentData = tournaments.find((t) => t.slug === gameslug);
      setTournament(tournamentData);
    }
    fetchTournament();
  }, [gameslug]);

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <SoccerBall size={40} color="#ffffff" weight="fill" />
          <Text style={styles.title}>{tournament.nombre}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Ubicación:</Text>
            <Text style={styles.detailText}>{tournament.ubicacion}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.detailText}>{tournament.fecha}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Clasificación:</Text>
            <Text style={styles.detailText}>{tournament.clasificacion}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Organizador:</Text>
            <Text style={styles.detailText}>{tournament.organizador}</Text>
          </View>
        </View>
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
    backgroundColor: "#000000", // Fondo negro
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#ffffff", // Texto blanco
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
    flexShrink: 1,
  },
  detailsContainer: {
    backgroundColor: "#000000", // Mismo color que el fondo
    borderRadius: 10,
    padding: 20,
    width: "100%",
    borderColor: "#ffffff",
    borderWidth: 1,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  label: {
    color: "#ffffff", // Texto blanco
    fontSize: 18,
    fontWeight: "600",
    width: 130,
  },
  detailText: {
    color: "#ffffff", // Texto blanco
    fontSize: 18,
    flexShrink: 1,
  },
  backLink: {
    color: "#ffffff", // Texto blanco
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  loadingText: {
    color: "#ffffff", // Texto blanco
    fontSize: 18,
  },
});
