import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import ModalDateTimePicker from "react-native-modal-datetime-picker";
import { useRouter } from "expo-router";

const CreateTournament: React.FC = () => {
  const [tournamentName, setTournamentName] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [classification, setClassification] = useState("");

  const router = useRouter();

  // Funciones para manejar la visibilidad del selector de fecha
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Función para manejar la selección de fecha
  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  // Función para manejar la creación del torneo
  const handleCreateTournament = () => {
    console.log({
      tournamentName,
      location,
      date: date.toISOString().split("T")[0],
      classification,
    });

    // Redirigir a la página de home después de la creación del torneo
    router.push("/home");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.formContainer}>
        <Text style={styles.title}>Crear Torneo</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="juan.perez34"
            value={tournamentName}
            onChangeText={setTournamentName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="•••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>

        {/* Dropdown para clasificación */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tipo de persona</Text>
          <RNPickerSelect
            onValueChange={(value) => setClassification(value)}
            items={[
              { label: "Organizador", value: "Organizador" },
              { label: "Jugador", value: "Jugador" },
            ]}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
              placeholder: { color: "#9ca3af" },
            }}
            placeholder={{ label: "Selecciona una clasificación", value: "" }}
            value={classification}
          />
        </View>

        <TouchableOpacity
          onPress={handleCreateTournament}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCreateTournament}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

import { TextInput } from "react-native";
import { Link } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
  },
  formContainer: {
    backgroundColor: "black",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f9fafb",
    color: "#1f2937",
    justifyContent: "center",
  },
  dateText: {
    color: "#1f2937",
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
});

export default CreateTournament;
