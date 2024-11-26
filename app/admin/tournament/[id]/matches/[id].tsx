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
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  getMatchById,
  Match,
  MatchEvent,
  updateMatch,
  addEventToMatch,
  getTournament,
  Tournament,
  Team,
  Player,
} from "../../../../../lib/services/common";
import { Picker } from "@react-native-picker/picker";

export default function AdminMatchDetail() {
  const { id, slug } = useLocalSearchParams();
  const router = useRouter();
  const [match, setMatch] = useState<Match | undefined>();
  const [eventType, setEventType] = useState<
    "Gol" | "Tarjeta Amarilla" | "Tarjeta Roja" | "Sustitución"
  >("Gol");
  const [minute, setMinute] = useState<string>("");
  const [playerId, setPlayerId] = useState<string>("");
  const [player, setPlayer] = useState<Player | undefined>();
  const [team, setTeam] = useState<Team | undefined>();
  const [detail, setDetail] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [resultInput, setResultInput] = useState<string>("");
  const [firstTeam, setFirstTeam] = useState<Team | undefined>();
  const [secondTeam, setSecondTeam] = useState<Team | undefined>();
  const [playerMap, setPlayerMap] = useState<Map<string, Player>>(new Map());

  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener los datos del partido
        const matchData = await getMatchById(id as string);
        console.log("Esta es la matchData", matchData);
        setMatch(matchData);

        // Obtener el ID del torneo desde matchData
        const tournamentId = matchData.tournamentId.toString();

        // Obtener los datos del torneo, incluyendo equipos y jugadores
        const tournamentResponse = await getTournament(tournamentId);
        const { data: tournamentData } = tournamentResponse;
        console.log("Tournament data:", tournamentData);

        // Encontrar los equipos correspondientes al partido dentro de los equipos del torneo
        const firstTeamId = matchData.team1.toString();
        const secondTeamId = matchData.team2.toString();

        const firstTeamData = tournamentData.Teams.find(
          (team: Team) => team.id.toString() === firstTeamId
        );
        const secondTeamData = tournamentData.Teams.find(
          (team: Team) => team.id.toString() === secondTeamId
        );

        if (firstTeamData && secondTeamData) {
          setFirstTeam(firstTeamData);
          setSecondTeam(secondTeamData);

          // Crear un mapa de jugadores para fácil acceso
          const allPlayers = [
            ...(firstTeamData.Players || []),
            ...(secondTeamData.Players || []),
          ];
          const playerMap = new Map<string, Player>();
          allPlayers.forEach((player) => {
            playerMap.set(player.id.toString(), player);
          });
          setPlayerMap(playerMap);
        } else {
          console.error("No se encontraron los equipos en el torneo.");
          Alert.alert("Error", "No se pudieron cargar los equipos del partido.");
        }
      } catch (error) {
        console.error("Error al obtener datos del partido o torneo:", error);
        Alert.alert("Error", "No se pudieron cargar los datos del partido.");
      }
    }
    fetchData();
  }, [id]);

  const handleAddEvent = async () => {
    if (!minute || !player || !team || !eventType) {
      Alert.alert(
        "Error",
        "Por favor, completa todos los campos del evento correctamente."
      );
      return;
    }
    console.log(minute, eventType, player, team, detail);

    const newEvent: MatchEvent = {
      minute: parseInt(minute),
      type: eventType,
      player: player.name,
      team: team.name,
      detail: detail,
    };

    console.log("Evento a enviar:", newEvent);

    try {
      await addEventToMatch(match!.id.toString(), newEvent);
      Alert.alert("Evento agregado", "El evento ha sido agregado al partido.");
      setMinute("");
      setPlayerId("");
      setPlayer(undefined);
      setTeam(undefined);
      setDetail("");
      // Actualizar el partido
      const updatedMatch = await getMatchById(id as string);
      console.log("Este es el updatedMatch", updatedMatch);
      setMatch(updatedMatch);
    } catch (error) {
      console.error("Error al agregar evento:", error);
      Alert.alert("Error", "No se pudo agregar el evento.");
    }
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
      try {
        await updateMatch(updatedMatch);
        Alert.alert(
          "Resultado actualizado",
          "El resultado del partido ha sido actualizado."
        );
        setMatch(updatedMatch);
        setModalVisible(false);
        setResultInput("");
      } catch (error) {
        console.error("Error al actualizar resultado:", error);
        Alert.alert("Error", "No se pudo actualizar el resultado.");
      }
    } else {
      Alert.alert("Error", "Por favor, ingresa un resultado válido.");
    }
  };

  if (!match || !firstTeam || !secondTeam) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando partido...</Text>
      </View>
    );
  }

  // Definir el color basado en la plataforma
  const backgroundColor = Platform.OS === "android" ? "#000000" : "#FFFFFF";

  // Crear opciones para el Picker de equipos
  const teamOptions = [firstTeam, secondTeam].map((team: Team) => (
    <Picker.Item label={team.name} value={team.name} key={team.id} />
  ));

  // Crear opciones para el Picker de jugadores
  const playersTeam1 = firstTeam.Players?.map((player: Player) => (
    <Picker.Item
      label={`${player.name} - ${firstTeam.name}`}
      value={player.id.toString()}
      key={player.id}
    />
  )) ?? [];

  const playersTeam2 = secondTeam.Players?.map((player: Player) => (
    <Picker.Item
      label={`${player.name} - ${secondTeam.name}`}
      value={player.id.toString()}
      key={player.id}
    />
  )) ?? [];

  const playerOptions = [...playersTeam1, ...playersTeam2];

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
        <Picker.Item label="Gol" value="Gol" color={backgroundColor} />
        <Picker.Item
          label="Tarjeta Amarilla"
          value="Tarjeta Amarilla"
          color={backgroundColor}
        />
        <Picker.Item
          label="Tarjeta Roja"
          value="Tarjeta Roja"
          color={backgroundColor}
        />
        <Picker.Item
          label="Sustitución"
          value="Sustitución"
          color={backgroundColor}
        />
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

      <Text style={styles.label}>Nombre del equipo:</Text>
      <Picker
        selectedValue={team?.name}
        onValueChange={(itemValue) => {
          const selectedTeam =
            itemValue === firstTeam.name ? firstTeam : secondTeam;
          setTeam(selectedTeam);
        }}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona un equipo" value="" />
        {teamOptions}
      </Picker>

      <Text style={styles.label}>Nombre jugador:</Text>
      <Picker
        selectedValue={playerId}
        onValueChange={(itemValue) => {
          setPlayerId(itemValue);
          const selectedPlayer = playerMap.get(itemValue);
          setPlayer(selectedPlayer);
        }}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona un jugador" value="" />
        {playerOptions}
      </Picker>

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
              {event.minute}' - {event.type} -{" "}
              {event.player ? event.player.name : "Sin jugador"} (
              {event.team ? event.team.name : "Sin equipo"})
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

// Styles
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
  // Styles for modal
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
