import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import axios from "axios"; // Importamos axios para hacer la solicitud POST

const NewTournament: React.FC = () => {
  const [tournamentName, setTournamentName] = useState("Campeonato Invierno");
  const [location, setLocation] = useState("Estadio Central");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [classification, setClassification] = useState("Profesional");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const router = useRouter();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleCreateTournament = async () => {
    const newTournament = {
      name: tournamentName,
      date: date.toISOString().split("T")[0],
      location: location,
      state: "Disponible",
      rol: "Participante",
      Description: "Torneo de prueba",
      Slug: tournamentName.toLowerCase().replace(/ /g, "-"), // Genera un slug simple
      image: imageUri ? imageUri.split("/").pop() : "default.jpg", // Extrae el nombre de la imagen si existe
      organizer: 1, // Puedes cambiar el valor según sea necesario
    };

    try {
      const response = await axios.post("http://localhost:3000/tournaments", newTournament, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      Alert.alert("Torneo Creado", `El torneo "${response.data.name}" ha sido creado.`);
      router.replace('/admin/Home');
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || error.message);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Se requiere permiso para acceder a tus fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>Crear Nuevo Torneo</Text>

        {/* Nombre del Torneo */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre del Torneo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el nombre del torneo"
            placeholderTextColor="#B0B0B0"
            value={tournamentName}
            onChangeText={setTournamentName}
          />
        </View>

        {/* Ubicación */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ubicación</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese la ubicación"
            placeholderTextColor="#B0B0B0"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Fecha */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha</Text>
          <Pressable onPress={showDatePicker} style={styles.datePicker}>
            <Text style={styles.dateText}>
              {date.toISOString().split("T")[0]}
            </Text>
          </Pressable>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale="es-ES"
            isDarkModeEnabled={true}
          />
        </View>

        {/* Clasificación */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Clasificación</Text>
          <RNPickerSelect
            onValueChange={(value) => setClassification(value)}
            items={[
              { label: "Profesional", value: "Profesional" },
              { label: "Aficionado", value: "Aficionado" },
            ]}
            style={{
              inputIOS: styles.picker,
              inputAndroid: styles.picker,
              placeholder: { color: "#9ca3af" },
            }}
            placeholder={{ label: "Selecciona una clasificación", value: "" }}
            value={classification}
          />
        </View>

        {/* Imagen del Torneo */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Imagen del Torneo</Text>
          <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
            <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
          </TouchableOpacity>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          )}
        </View>

        {/* Botón para Crear Torneo */}
        <TouchableOpacity onPress={handleCreateTournament} style={styles.button}>
          <Text style={styles.buttonText}>Crear Torneo</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1D",
  },
  formContainer: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4B5563",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#374151",
    color: "#FFFFFF",
    fontSize: 16,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#4B5563",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#374151",
    justifyContent: "center",
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#4B5563",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#374151",
    color: "#FFFFFF",
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  imageButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default NewTournament;
