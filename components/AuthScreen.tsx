import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Switch,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { TextInput } from "react-native";
import { useRouter } from "expo-router";
import { getUserDataByToken, login, register } from "@/lib/services/auth";

import useUserStore from "@/stores/useUserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthView: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");

  const router = useRouter();

  const { user, setUser } = useUserStore();

  const handleAuth = async () => {
    try {
      let response;
      if (isRegister) {
        response = await register({
          email: email,
          password,
          role: role,
          gender: gender,
        });
      } else {
        response = await login({
          email: email,
          password,
        });
      }

      console.log("ESTA ES LA RESPONSE", response);
      console.log("ESTE ES EL USERID", response.userId);
      if (response) {
        const fetchedUser = await getUserDataByToken(response.userId);
        console.log("ESTE ES EL FETCHED USER", fetchedUser);
        setUser(fetchedUser);
        await AsyncStorage.setItem("userId", response.userId.toString());
        console.log(
          "Este es el async storage",
          await AsyncStorage.getItem("userId"),
        );

        // Reemplaza la pantalla de autenticación por la pantalla principal
        router.replace("/home"); // Cambia "/home" por la ruta a la que quieres redirigir después de autenticarse
      } else {
        throw new Error("No se pudo autenticar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.formContainer}>
        <Text style={styles.title}>¡Bienvenido!</Text>

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Iniciar Sesión</Text>
          <Switch value={isRegister} onValueChange={setIsRegister} />
          <Text style={styles.toggleLabel}>Registrarse</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>email</Text>
          <TextInput
            style={styles.input}
            placeholder="juan.perez34@gmail.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
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

        {/* Campos adicionales para registro */}
        {isRegister && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tipo de persona</Text>
              <RNPickerSelect
                onValueChange={(value) => setRole(value)}
                items={[
                  { label: "Organizador", value: "Organizador" },
                  { label: "Jugador", value: "Jugador" },
                ]}
                style={{
                  inputIOS: styles.input,
                  inputAndroid: styles.input,
                  placeholder: { color: "#9ca3af" },
                }}
                placeholder={{
                  label: "Selecciona una clasificación",
                  value: "",
                }}
                value={role}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Género</Text>
              <RNPickerSelect
                onValueChange={(value) => setGender(value)}
                items={[
                  { label: "Hombre", value: "Hombre" },
                  { label: "Mujer", value: "Mujer" },
                ]}
                style={{
                  inputIOS: styles.input,
                  inputAndroid: styles.input,
                  placeholder: { color: "#9ca3af" },
                }}
                placeholder={{
                  label: "Selecciona un género",
                  value: "",
                }}
                value={gender}
              />
            </View>
          </>
        )}

        <TouchableOpacity onPress={handleAuth} style={styles.button}>
          <Text style={styles.buttonText}>
            {isRegister ? "Registrarse" : "Iniciar Sesión"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

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
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: 16,
    color: "white",
    marginHorizontal: 8,
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

export default AuthView;
