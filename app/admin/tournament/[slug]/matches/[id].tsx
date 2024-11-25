// app/admin/tournament/[slug]/matches/[id].tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  getMatchById,
  Match,
  MatchEvent,
  updateMatch,
  addEventToMatch,
  getTeamById,
  Team,
} from "../../../../../lib/services/common";
import { Picker } from "@react-native-picker/picker";

export default function AdminMatchDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [match, setMatch] = useState<Match | undefined>();
  const [eventType, setEventType] = useState<
    "Gol" | "Tarjeta Amarilla" | "Tarjeta Roja" | "Sustitución"
  >();
  const [minute, setMinute] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [resultInput, setResultInput] = useState<string>("");
  const [firstTeam, setFirstTeam] = useState<Team>();
  const [secondTeam, setSecondTeam] = useState<Team>();

  useEffect(() => {
    async function fetchMatch() {
      const matchData = await getMatchById(id as string);
      setMatch(matchData);
      console.log("Esta es la matchData", matchData);

      // Fetch team data
      const firstTeamData = await getTeamById(matchData?.team1 as string);
      setFirstTeam(firstTeamData);

      const secondTeamData = await getTeamById(matchData?.team2 as string);
      setSecondTeam(secondTeamData);
    }
    fetchMatch();
  }, [id]);

  const handleAddEvent = async () => {
    if (!minute || !playerName || !teamName) {
      Alert.alert("Error", "Por favor, completa todos los campos del evento.");
      return;
    }

    const newEvent: MatchEvent = {
      minute: parseInt(minute),
      type: eventType,
      player: playerName,
      team: teamName,
      detail: detail,
    };

    await addEventToMatch(match!.id, newEvent);
    Alert.alert("Evento agregado", "El evento ha sido agregado al partido.");
    setMinute("");
    setPlayerName("");
    setTeamName("");
    setDetail("");
    // Actualizar el partido
    const updatedMatch = await getMatchById(id as string);
    console.log("Este es el updatedMatch", updatedMatch);
    setMatch(updatedMatch);
  };

  const handleUpdateResult = () => {
    setModalVisible(true);
  };

  const confirmUpdateResult = async () => {
    if (resultInput) {
      const updatedMatch: Match = {
        ...match!,
        result: resultInput,
        status: "Finalizado",
      };
      await updateMatch(updatedMatch);
      Alert.alert(
        "Resultado actualizado",
        "El resultado del partido ha sido actualizado.",
      );
      setMatch(updatedMatch);
      setModalVisible(false);
      setResultInput("");
    } else {
      Alert.alert("Error", "Por favor, ingresa un resultado válido.");
    }
  };

  if (!match) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando partido...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {firstTeam?.name} vs {secondTeam?.name}
      </Text>
      <Text style={styles.detail}>Fecha: {match.date}</Text>
      <Text style={styles.detail}>Hora: {match.time}</Text>
      <Text style={styles.detail}>Estado: {match.status}</Text>
      <Text style={styles.detail}>
        Resultado: {match.result || "No definido"}
      </Text>

      <Pressable style={styles.button} onPress={handleUpdateResult}>
        <Text style={styles.buttonText}>Actualizar Resultado</Text>
      </Pressable>

      {/* Modal para ingresar el resultado */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Ingresa el resultado del partido (ejemplo: 2-1)
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Resultado"
              placeholderTextColor="#B0B0B0"
              value={resultInput}
              onChangeText={setResultInput}
            />
            <Pressable style={styles.modalButton} onPress={confirmUpdateResult}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, { backgroundColor: "#2C2C2E" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text style={styles.subtitle}>Agregar Evento</Text>

      <Text style={styles.label}>Tipo de Evento:</Text>
      <Picker
        selectedValue={eventType}
        onValueChange={(itemValue) => setEventType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Gol" value="Gol" color="#FFFFFF" />
        <Picker.Item label="Tarjeta Amarilla" color="#FFFFFF" />
        <Picker.Item label="Tarjeta Roja" color="#FFFFFF" />
        <Picker.Item label="Sustitución" color="#FFFFFF" />
      </Picker>

      <Text style={styles.label}>Minuto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Minuto del evento"
        placeholderTextColor="#B0B0B0"
        value={minute}
        onChangeText={setMinute}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Nombre jugador:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del jugador"
        placeholderTextColor="#B0B0B0"
        value={playerName}
        onChangeText={setPlayerName}
      />

      <Text style={styles.label}>Nombre del equipo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del equipo"
        placeholderTextColor="#B0B0B0"
        value={teamName}
        onChangeText={setTeamName}
      />

      {eventType === "Sustitución" && (
        <>
          <Text style={styles.label}>Detalle:</Text>
          <TextInput
            style={styles.input}
            placeholder="Detalle de la sustitución"
            placeholderTextColor="#B0B0B0"
            value={detail}
            onChangeText={setDetail}
          />
        </>
      )}

      <Pressable style={styles.button} onPress={handleAddEvent}>
        <Text style={styles.buttonText}>Agregar Evento</Text>
      </Pressable>

      <Text style={styles.subtitle}>Eventos del Partido</Text>

      {match.Events && match.Events.length > 0 ? (
        match.Events.map((event, index) => (
          <View key={index} style={styles.eventItem}>
            <Text style={styles.eventText}>
              {event.minute}' - {event.type} - {event.player.name} ({event.team.name})
            </Text>
            {event.detail && (
              <Text style={styles.eventDetail}>{event.detail}</Text>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noEventsText}>No hay eventos registrados.</Text>
      )}


    </ScrollView>
  );
}

// Asegúrate de que las funciones updateMatch y addEventToMatch están correctamente implementadas en mockDataTournify.ts

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
    fontWeight: "bold",
    textAlign: "center",
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
    marginTop: 16,
  },
  buttonText: {
    color: "#1A1A1D",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 24,
    marginBottom: 12,
    fontWeight: "bold",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 12,
  },
  picker: {
    backgroundColor: "#2C2C2E",
    color: "#FFFFFF",
    marginTop: 8,
  },
  input: {
    backgroundColor: "#2C2C2E",
    color: "#FFFFFF",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
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
  eventDetail: {
    color: "#B0B0B0",
    fontSize: 14,
  },
  noEventsText: {
    color: "#B0B0B0",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  },
  // Estilos para el modal
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(26, 26, 29, 0.8)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#2C2C2E",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: "#FFFFFF",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  modalInput: {
    backgroundColor: "#1A1A1D",
    color: "#FFFFFF",
    padding: 8,
    borderRadius: 8,
    width: "100%",
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    width: "100%",
  },
});
