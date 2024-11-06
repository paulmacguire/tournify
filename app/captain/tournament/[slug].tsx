// app/captain/tournament/[slug].tsx

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  getTournamentBySlug,
  Tournament,
  registerTeamToTournament,
  getTeamById,
  getTeamRegistrationsByTournament,
} from "../../../lib/services/mockDataTournify";
import useUserStore from "@/stores/useUserStore";

export default function CaptainTournamentDetail() {
  const { slug } = useLocalSearchParams();
  const [tournament, setTournament] = useState<Tournament | undefined>();
  const [registrationStatus, setRegistrationStatus] = useState<
    "No Registrado" | "Pendiente" | "Aceptado" | "Rechazado"
  >("No Registrado");
  const { user, setUser } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const torneo = await getTournamentBySlug(slug as string);
      setTournament(torneo);

      // Obtener el equipo del capitán
      const team = await getTeamById("team1"); // Suponemos que el capitán tiene el equipo 'team1'

      // Verificar si el equipo ya está inscrito
      const registrations = await getTeamRegistrationsByTournament(
        slug as string,
      );
      const teamRegistration = registrations.find(
        (reg) => reg.teamId === team?.id,
      );

      if (teamRegistration) {
        setRegistrationStatus(teamRegistration.status);
      }
    }
    fetchData();
  }, [slug]);

  const handleRegistration = async () => {
    if (!user) return;

    // Suponemos que el equipo del capitán es 'team1'
    const teamId = "team1";

    await registerTeamToTournament(teamId, slug as string);
    setRegistrationStatus("Pendiente");
    Alert.alert(
      "Inscripción enviada",
      "Tu solicitud de inscripción está pendiente de aprobación.",
    );
  };

  if (!tournament) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Torneo no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tournament.name}</Text>
      <Text style={styles.detail}>Ubicación: {tournament.location}</Text>
      <Text style={styles.detail}>Fecha: {tournament.date}</Text>
      <Text style={styles.detail}>Descripción: {tournament.description}</Text>

      {registrationStatus === "No Registrado" && (
        <Pressable style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>Inscribirse</Text>
        </Pressable>
      )}

      {registrationStatus === "Pendiente" && (
        <Text style={styles.pendingText}>
          Tu inscripción está pendiente de aprobación.
        </Text>
      )}

      {registrationStatus === "Aceptado" && (
        <Text style={styles.acceptedText}>
          ¡Tu equipo está inscrito en este torneo!
        </Text>
      )}

      {registrationStatus === "Rechazado" && (
        <Text style={styles.rejectedText}>
          Tu inscripción ha sido rechazada.
        </Text>
      )}
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
  detail: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: "#1A1A1D",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  pendingText: {
    color: "#FFD700",
    fontSize: 16,
    marginTop: 24,
  },
  acceptedText: {
    color: "#00FF00",
    fontSize: 16,
    marginTop: 24,
  },
  rejectedText: {
    color: "#FF0000",
    fontSize: 16,
    marginTop: 24,
  },
});
