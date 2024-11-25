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
  const [noTeamExist, setNoTeamExist] = useState(false);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const response = await getTeamByCaptainId(user?.id as string);
        const { data, status } = response;
        console.log("Respuesta del servidor:", data, status);
        if (status === 200) {
          console.log("Equipo encontrado:", data);
          setTeam(data); 
        } else if (status === 201) {
          console.log("No se encontró equipo o el usuario no es capitán.");
          setNoTeamExist(true);
          setTeam(undefined);
        }
      } catch (error) {
        console.error("Error al obtener el equipo del capitán:", error);
        setTeam(undefined); 
      }
    }

    if (user?.id) {
      fetchTeam();
    }
  }, [user?.id]);

  useEffect(() => {
    async function fetchUsersByPlayerRole() {
      if (!team) return; 
      const users = await getUsersByPlayerRole();
      const teamPlayerUserIds = new Set(
        team.Players.map((player) => player.userId),
      );
      const filteredUsers = users.filter(
        (user: any) => !teamPlayerUserIds.has(user.id),
      );

      setUsers(filteredUsers);
    }

    fetchUsersByPlayerRole();
  }, [team]); 

  const handleAddPlayer = async (userName: string, userToInviteId: string) => {
    await addPlayerToTeam(team?.id as string, userToInviteId as string);
    Alert.alert("Jugador agregado", `${userName} ha sido agregado al equipo.`);
    const updatedResponse = await getTeamByCaptainId(user?.id as string);
    setTeam(updatedResponse.data); // Actualiza con solo `data`
  };

  const handleRemovePlayer = async (
    userName: string,
    userToRemoveId: string,
  ) => {
    await removePlayerFromTeam(team?.id as string, userToRemoveId as string);
    Alert.alert("Jugador eliminado", `${userName} ha sido eliminado del equipo.`);
    const updatedResponse = await getTeamByCaptainId(user?.id as string);
    setTeam(updatedResponse.data); // Actualiza con solo `data`
  };

  if (!team && !noTeamExist) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando equipo...</Text>
      </View>
    );
  }

  if (noTeamExist) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No tienes equipo aún</Text>
        <Text style={styles.title}>😔</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {team && (
        <>
          <Text style={styles.title}>Equipo: {team.name}</Text>

          <Text style={styles.subtitle}>Jugadores del equipo</Text>
          <FlatList
            data={team.Players}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.playerItem}>
                <Text style={styles.playerName}>
                  {item.name ? item.name : 'Nombre no disponible'}
                </Text>

                {item.id !== team.captainId && (
                  <Pressable
                    onPress={() => handleRemovePlayer(item.name, item.id.toString())}
                  >
                    <Text style={styles.removeButton}>Eliminar</Text>
                  </Pressable>
                )}
              </View>
            )}
          />

          <Text style={styles.subtitle}>Jugadores disponibles para inscribir</Text>
          <FlatList
            data={users.filter((user) => user.id !== team.captainId)}  
            keyExtractor={(item) => item.id.toString()}  
            renderItem={({ item }) => (
              <View style={styles.playerItem}>
                <Text style={styles.playerName}>{item.name}</Text>
                <Pressable onPress={() => handleAddPlayer(item.name, item.id)}>
                  <Text style={styles.addButton}>Invitar</Text>
                </Pressable>
              </View>
            )}
          />
        </>
      )}
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
