// app/captain/team.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import {
  getTeamByCaptainId,
  Team,
  addPlayerToTeam,
  removePlayerFromTeam,
} from "../../lib/services/common";
import useUserStore from "@/stores/useUserStore";

export default function CaptainTeam() {
  const [team, setTeam] = useState<Team | undefined>();
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const { user } = useUserStore();

  useEffect(() => {
    async function fetchTeam() {
      const teamData = await getTeamByCaptainId(user?.id as string);
      setTeam(teamData);
    }
    fetchTeam();
  }, []);

  const handleAddPlayer = async () => {
    if (!newPlayerName) {
      Alert.alert("Error", "Por favor, ingresa el nombre del jugador.");
      return;
    }

    await addPlayerToTeam(team?.id as string, user?.id as string);
    Alert.alert(
      "Jugador agregado",
      `${newPlayerName} ha sido agregado al equipo.`,
    );
    setNewPlayerName("");
    // Actualizar el equipo
    const updatedTeam = await getTeamByCaptainId(team!.captainId);
    setTeam(updatedTeam);
  };

  const handleRemovePlayer = async (playerName: string) => {
    await removePlayerFromTeam(team!.id, playerName);
    Alert.alert(
      "Jugador eliminado",
      `${playerName} ha sido eliminado del equipo.`,
    );
    // Actualizar el equipo
    const updatedTeam = await getTeamByCaptainId(team!.captainId);
    setTeam(updatedTeam);
  };

  if (!team) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando equipo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipo: {team.name}</Text>

      <Text style={styles.subtitle}>Jugadores</Text>
      <FlatList
        data={team.Players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.playerItem}>
            <Text style={styles.playerName}>{item.User.name}</Text>
            <Pressable onPress={() => handleRemovePlayer(item.User.name)}>
              <Text style={styles.removeButton}>Eliminar</Text>
            </Pressable>
          </View>
        )}
      />

      <Text style={styles.subtitle}>Agregar Jugador</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del jugador"
        placeholderTextColor="#B0B0B0"
        value={newPlayerName}
        onChangeText={setNewPlayerName}
      />
      <Pressable style={styles.button} onPress={handleAddPlayer}>
        <Text style={styles.buttonText}>Agregar Jugador</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilos aquí
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1A1A1D",
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 24,
    marginBottom: 12,
    fontWeight: "bold",
  },
  playerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2C2C2E",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  playerName: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  removeButton: {
    color: "#FF0000",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#2C2C2E",
    color: "#FFFFFF",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#1A1A1D",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
