// app/admin/tournament/[slug]/matches/new.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importación actualizada
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  getTeamsByTournament,
  Team,
  createMatch,
  Match,
} from '../../../../../lib/services/mockDataTournify';

export default function AdminMatchForm() {
  const { slug } = useLocalSearchParams();
  const [teams, setTeams] = useState<Team[]>([]);
  const [equipo1, setEquipo1] = useState<string>('');
  const [equipo2, setEquipo2] = useState<string>('');
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    async function fetchTeams() {
      const teamsData = await getTeamsByTournament(slug as string);
      setTeams(teamsData);
    }
    fetchTeams();
  }, [slug]);

  const handleCreateMatch = async () => {
    if (!equipo1 || !equipo2 || !fecha || !hora) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (equipo1 === equipo2) {
      Alert.alert('Error', 'Los equipos deben ser diferentes.');
      return;
    }

    const newMatch: Match = {
      id: `match${Date.now()}`,
      fecha,
      hora,
      equipo1,
      equipo2,
      resultado: '',
      torneoSlug: slug as string,
      estado: 'Pendiente',
    };

    await createMatch(newMatch);

    Alert.alert('Partido creado', 'El partido ha sido creado exitosamente.');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Partido</Text>

      <Text style={styles.label}>Equipo 1:</Text>
      <Picker
        selectedValue={equipo1}
        onValueChange={(itemValue: string) => setEquipo1(itemValue)} // Tipo especificado
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un equipo" value="" />
        {teams.map((team) => (
          <Picker.Item key={team.id} label={team.nombre} value={team.nombre} />
        ))}
      </Picker>

      <Text style={styles.label}>Equipo 2:</Text>
      <Picker
        selectedValue={equipo2}
        onValueChange={(itemValue: string) => setEquipo2(itemValue)} // Tipo especificado
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un equipo" value="" />
        {teams.map((team) => (
          <Picker.Item key={team.id} label={team.nombre} value={team.nombre} />
        ))}
      </Picker>

      <Text style={styles.label}>Fecha:</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#B0B0B0"
        value={fecha}
        onChangeText={setFecha}
      />

      <Text style={styles.label}>Hora:</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM"
        placeholderTextColor="#B0B0B0"
        value={hora}
        onChangeText={setHora}
      />

      <Pressable style={styles.button} onPress={handleCreateMatch}>
        <Text style={styles.buttonText}>Crear Partido</Text>
      </Pressable>
    </View>
  );
}

// Asegúrate de que la función createMatch existe en tu mockDataTournify.ts
// y que está correctamente implementada.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1A1A1D',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 12,
  },
  picker: {
    backgroundColor: '#2C2C2E',
    color: '#FFFFFF',
    marginTop: 8,
  },
  input: {
    backgroundColor: '#2C2C2E',
    color: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: '#1A1A1D',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
