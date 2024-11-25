import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { getTournaments, Tournament } from "../lib/services/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard } from "../components/GameCard";
import useUserStore from "@/stores/useUserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Main() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  console.log("Tournaments con error:");
  console.log(tournaments);
  
  const insets = useSafeAreaInsets();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const fetchTournaments = async () => {
      const data = await getTournaments();
      setTournaments(data);
    };
    fetchTournaments();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userId"); // Cambia "userId" si usas otra clave
      Alert.alert("Logout", "Se ha eliminado el userId del almacenamiento.");
      router.replace("/auth");
      // Puedes agregar aquí redirección a la pantalla de login, si es necesario
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al eliminar el userId.");
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {tournaments.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#ffffff" />
        </View>
      ) : (
        <>
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Panel del jugador {user?.name}</Text>
          <FlatList
            data={tournaments}
            keyExtractor={(item) => item.slug}
            renderItem={({ item, index }) => (
              <AnimatedGameCard game={item} index={index} />
            )}
            contentContainerStyle={styles.listContent}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1D",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    color: "#FFFFFF",
    marginBottom: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    width: "80%",
  },
  buttonText: {
    color: "#1A1A1D",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
