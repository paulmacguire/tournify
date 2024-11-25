import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Team,
  createMatch,
  Match,
  getTournament
} from "../../../../../lib/services/common";
import useUserStore from "@/stores/useUserStore";


export default function AdminMatchForm() {
  const { slug } = useLocalSearchParams();
  const [teams, setTeams] = useState<Team[]>([]);
  const [team1, setTeam1] = useState<string>("");
  const [team2, setTeam2] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    async function fetchTeams() {
      const teamsData = await getTournament("3");
      if (teamsData.data.length > 0) {
        console.log("Teams desde new:", teamsData.data[0]);
        const firstTournament = teamsData.data[0];
        setTeams(firstTournament.Teams);
      } else {    
        setTeams([]);
      }
    }
    fetchTeams();
  }, [user?.id]);


  const handleCreateMatch = async () => {
    if (!team1 || !team2) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (team1 === team2) {
      Alert.alert("Error", "Los equipos deben ser diferentes.");
      return;
    }

    const dateString = date.toISOString().split("T")[0];
    const timeString = time.toTimeString().split(" ")[0].substring(0, 5);

    const newMatch: Match = {
      id: `match${Date.now()}`,
      date: dateString,
      time: timeString,
      team1,
      team2,
      result: "",
      tournamentSlug: slug as string,
      status: "Pendiente",
    };

    await createMatch(newMatch);

    Alert.alert("Partido creado", "El partido ha sido creado exitosamente.");
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Nuevo Partido</Text>

      <Text style={styles.label}>Equipo 1:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={team1}
          onValueChange={(itemValue: string) => setTeam1(itemValue)}
          style={styles.picker}
          dropdownIconColor="#FFFFFF"
          mode="dropdown"
        >
          <Picker.Item label="Seleccione un equipo" value="" color="#FFFFFF" />
          {teams.map((team) => (
            <Picker.Item
              key={team.id}
              label={team.name}
              value={team.name}
              color="#FFFFFF"
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Equipo 2:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={team2}
          onValueChange={(itemValue: string) => setTeam2(itemValue)}
          style={styles.picker}
          dropdownIconColor="#FFFFFF"
          mode="dropdown"
        >
          <Picker.Item label="Seleccione un equipo" value="" color="#FFFFFF" />
          {teams.map((team) => (
            <Picker.Item
              key={team.id}
              label={team.name}
              value={team.name}
              color="#FFFFFF"
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Fecha:</Text>
      <Pressable
        style={styles.input}
        onPress={() => setDatePickerVisible(true)}
      >
        <Text style={styles.inputText}>{date.toLocaleDateString()}</Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={(selectedDate) => {
          setDate(selectedDate);
          setDatePickerVisible(false);
        }}
        onCancel={() => setDatePickerVisible(false)}
        locale="es-ES"
        isDarkModeEnabled={true}
        textColor="#FFFFFF"
      />

      <Text style={styles.label}>Hora:</Text>
      <Pressable
        style={styles.input}
        onPress={() => setTimePickerVisible(true)}
      >
        <Text style={styles.inputText}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={timePickerVisible}
        mode="time"
        onConfirm={(selectedTime) => {
          setTime(selectedTime);
          setTimePickerVisible(false);
        }}
        onCancel={() => setTimePickerVisible(false)}
        locale="es-ES"
        is24Hour={true}
        isDarkModeEnabled={true}
        textColor="#FFFFFF"
      />

      <Pressable style={styles.button} onPress={handleCreateMatch}>
        <Text style={styles.buttonText}>Crear Partido</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#1A1A1D",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    color: "#FFFFFF",
    marginBottom: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 12,
    marginBottom: 4,
  },
  pickerContainer: {
    backgroundColor: "#2C2C2E",
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  picker: {
    color: "#FFFFFF",
  },
  input: {
    backgroundColor: "#2C2C2E",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  inputText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: "#1A1A1D",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
