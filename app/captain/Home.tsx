// app/captain/Home.tsx

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";

import useUserStore from "@/stores/useUserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CaptainHome() {
  const router = useRouter();
  const navigation = useNavigation();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    async function checkCaptain() {
      if (user?.role !== "Capitan") {
        // Si el usuario no es capitán, redirigir al inicio
        router.replace("/");
      } else {
        navigation.setOptions({
          headerShown: false,
        });
      }
    }
    checkCaptain();
  }, []);

  const handleNavigateToTournaments = () => {
    router.push("/captain/Tournaments");
  };

  const handleNavigateToTeam = () => {
    router.push("/captain/team");
  };

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
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Panel del Capitán {user?.name}</Text>
      <Pressable style={styles.button} onPress={handleNavigateToTournaments}>
        <Text style={styles.buttonText}>Ver Torneos Disponibles</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleNavigateToTeam}>
        <Text style={styles.buttonText}>Gestionar Mi Equipo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1A1A1D",
    alignItems: "center",
    justifyContent: "center",
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
