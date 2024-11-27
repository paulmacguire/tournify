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
  ActivityIndicator,
} from "react-native";
import { getTournaments, Tournament } from "../../lib/services/common";
import { useRouter } from "expo-router";
import useUserStore from "@/stores/useUserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdminHome() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    async function fetchData() {
      try {
        if (user?.role !== "Admin") {
          router.replace("/");
          return;
        }

        const allTournaments = await getTournaments();
        setTournaments(allTournaments);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user, router]);

  const handleSelectTournament = (id: string) => {
    router.push(`/admin/tournament/${id}`);
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#ffffff" size="large" />
        <Text style={styles.loadingText}>Cargando torneos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Panel del Admin {user?.name}</Text>

      {/* Botón para crear nuevo torneo */}
      <TouchableOpacity onPress={handleNavigateToNewTournament} style={styles.createButton}>
        <Text style={styles.buttonText}>Crear Nuevo Torneo</Text>
      </TouchableOpacity>

      {/* Subtítulo */}
      <Text style={styles.subtitle}>Seleccione un torneo para gestionar:</Text>

      {/* Lista de Torneos */}
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.id.toString()} // Usar item.id para claves únicas
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => handleSelectTournament(String(item.id))}
          >
            {item.image ? (
              <Image
                source={{ uri: item.image }} // Usar { uri: item.image } para imágenes remotas
                style={styles.image}
                resizeMode="cover"
                onError={(error) => {
                  console.error("Error cargando la imagen:", error.nativeEvent.error);
                }}
              />
            ) : null}
            <View style={styles.textContainer}>
              <Text style={styles.tournamentName}>{item.name}</Text>
              <Text style={styles.tournamentDate}>{item.date}</Text>
            </View>
          </Pressable>
        )}
        contentContainerStyle={styles.listContent}
      />
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
  button: {
    backgroundColor: "#1d4ed8",
    padding: 16,
    borderRadius: 8,
    marginVertical: 12,
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  createButton: {
    backgroundColor: "#10B981", // Color verde para destacar el botón de creación de torneo
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 8,
    textAlign: "center",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 18,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 180,
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
  listContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
});
