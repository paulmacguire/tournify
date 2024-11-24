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
  getUsersByPlayerRole,
  User,
} from "../../lib/services/common";
import useUserStore from "@/stores/useUserStore";

export default function CaptainTeam() {
  const [team, setTeam] = useState<Team | undefined>();
  const [users, setUsers] = useState<User[]>([]);
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const { user } = useUserStore();

  useEffect(() => {
    async function fetchTeam() {
      console.log("Obteniendo equipo del capitán...");
      const teamData = await getTeamByCaptainId(user?.id as string);
      console.log("Este es el equipo del capitán aaaaa", teamData);
      setTeam(teamData);
      console.log("Este es el equipo del capitán", team);   
    }

    fetchTeam();
  }, [user?.id]); // Este efecto se ejecutará cuando `user?.id` cambie

  useEffect(() => {
    async function fetchUsersByPlayerRole() {
      console.log("Obteniendo usuarios por rol de jugador...", team);
      if (!team) return; // Espera a que `team` esté disponible

      const users = await getUsersByPlayerRole();

      // Obtén los userId de los players en el equipo
      const teamPlayerUserIds = new Set(
        team.Players.map((player) => player.userId),
      );

      // Filtra los usuarios cuyo id no está en `teamPlayerUserIds`
      const filteredUsers = users.filter(
        (user: any) => !teamPlayerUserIds.has(user.id),
      );

      setUsers(filteredUsers);
    }

    fetchUsersByPlayerRole();
  }, [team]); // Este efecto depende de `team`, por lo que se ejecutará después de que `team` esté disponible

  const handleAddPlayer = async (userName: string, userToInviteId: string) => {
    await addPlayerToTeam(team?.id as string, userToInviteId as string);
    Alert.alert("Jugador agregado", `${userName} ha sido agregado al equipo.`);
    // Actualizar el equipo
    const updatedTeam = await getTeamByCaptainId(user?.id as string);
    setTeam(updatedTeam);
  };

  const handleRemovePlayer = async (
    userName: string,
    userToRemoveId: string,
  ) => {
    await removePlayerFromTeam(team?.id as string, userToRemoveId as string);
    Alert.alert(
      "Jugador eliminado",
      `${userName} ha sido eliminado del equipo.`,
    );
    // Actualizar el equipo
    const updatedTeam = await getTeamByCaptainId(user?.id as string);
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

      <Text style={styles.subtitle}>Jugadores del equipo</Text>
      <FlatList
        data={team.Players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.playerItem}>
            <Text style={styles.playerName}>{item.User.name}</Text>
            <Pressable
              onPress={() => handleRemovePlayer(item.User.name, item.userId)}
            >
              <Text style={styles.removeButton}>Eliminar</Text>
            </Pressable>
          </View>
        )}
      />

      <Text style={styles.subtitle}>Jugadores disponibles para inscribir</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.playerItem}>
            <Text style={styles.playerName}>{item.name}</Text>
            <Pressable onPress={() => handleAddPlayer(item.name, item.id)}>
              <Text style={styles.addButton}>Invitar</Text>
            </Pressable>
          </View>
        )}
      />

      {/* <Text style={styles.subtitle}>Agregar Jugador</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del jugador"
        placeholderTextColor="#B0B0B0"
        value={newPlayerName}
        onChangeText={setNewPlayerName}
      />
      <Pressable style={styles.button} onPress={handleAddPlayer}>
        <Text style={styles.buttonText}>Agregar Jugador</Text>
      </Pressable> */}
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
    marginTop: 12,
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
  addButton: {
    color: "#00FF00",
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
