// app/admin/Home.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  getTournaments,
  Tournament,
} from "../../lib/services/common";
import { useRouter } from "expo-router";

import useUserStore from "@/stores/useUserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdminHome() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const router = useRouter();

  const { user } = useUserStore();

  useEffect(() => {
    async function fetchData() {
      if (user?.role !== "Admin") {
        router.replace("/");
        return;
      }

      const allTournaments = await getTournaments();
      setTournaments(allTournaments);
    }
    fetchData();
  }, []);

  const handleSelectTournament = (slug: string) => {
    router.push(`/admin/tournament/${slug}`);
  };

  const handleNavigateToNewTournament = () => {
    router.push("/admin/tournament/new-tournament");
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      Alert.alert("Logout", "Se ha eliminado el userId del almacenamiento.");
      router.replace("/auth");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al eliminar el userId.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Panel del Admin {user?.name}</Text>

      {/* Botón para crear nuevo torneo */}
      <TouchableOpacity onPress={handleNavigateToNewTournament} style={styles.createButton}>
        <Text style={styles.buttonText}>Crear Nuevo Torneo</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Seleccione un torneo para gestionar:</Text>
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => handleSelectTournament(item.id)}
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.tournamentName}>{item.name}</Text>
              <Text style={styles.tournamentDate}>{item.date}</Text>
            </View>
          </Pressable>
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
    fontSize: 28,
    color: "#FFFFFF",
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 12,
  },
  tournamentName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  tournamentDate: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1d4ed8",
    padding: 16,
    borderRadius: 8,
    margin: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  createButton: {
    backgroundColor: "#10B981", // Color verde para destacar el botón de creación de torneo
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
});
