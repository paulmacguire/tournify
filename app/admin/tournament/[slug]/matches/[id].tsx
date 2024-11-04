// app/admin/tournament/[slug]/matches/[id].tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, TextInput, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getMatchById, Match, MatchEvent, updateMatch, addEventToMatch } from '../../../../../lib/services/mockDataTournify';
import { Picker } from '@react-native-picker/picker';

export default function AdminMatchDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [match, setMatch] = useState<Match | undefined>();
  const [eventType, setEventType] = useState<'Gol' | 'Tarjeta Amarilla' | 'Tarjeta Roja' | 'Sustitución'>('Gol');
  const [minute, setMinute] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');
  const [detail, setDetail] = useState<string>('');

  useEffect(() => {
    async function fetchMatch() {
      const matchData = await getMatchById(id as string);
      setMatch(matchData);
    }
    fetchMatch();
  }, [id]);

  const handleAddEvent = async () => {
    if (!minute || !playerName || !teamName) {
      Alert.alert('Error', 'Por favor, completa todos los campos del evento.');
      return;
    }

    const newEvent: MatchEvent = {
      minuto: parseInt(minute),
      tipo: eventType,
      jugador: playerName,
      equipo: teamName,
      detalle: detail,
    };

    await addEventToMatch(match!.id, newEvent);
    Alert.alert('Evento agregado', 'El evento ha sido agregado al partido.');
    setMinute('');
    setPlayerName('');
    setTeamName('');
    setDetail('');
    // Actualizar el partido
    const updatedMatch = await getMatchById(id as string);
    setMatch(updatedMatch);
  };

  const handleUpdateResult = async () => {
    // Aquí puedes implementar la lógica para actualizar el resultado
    // Por simplicidad, vamos a pedir al administrador que ingrese el resultado manualmente
    Alert.prompt(
      'Actualizar Resultado',
      'Ingresa el resultado del partido (ejemplo: 2-1)',
      async (text) => {
        if (text) {
          match!.resultado = text;
          match!.estado = 'Finalizado';
          await updateMatch(match!);
          Alert.alert('Resultado actualizado', 'El resultado del partido ha sido actualizado.');
          setMatch({ ...match! });
        }
      },
      'plain-text',
      match?.resultado || ''
    );
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
      <Text style={styles.title}>{match.equipo1} vs {match.equipo2}</Text>
      <Text style={styles.detail}>Fecha: {match.fecha}</Text>
      <Text style={styles.detail}>Hora: {match.hora}</Text>
      <Text style={styles.detail}>Estado: {match.estado}</Text>
      <Text style={styles.detail}>Resultado: {match.resultado || 'No definido'}</Text>

      <Pressable style={styles.button} onPress={handleUpdateResult}>
        <Text style={styles.buttonText}>Actualizar Resultado</Text>
      </Pressable>

      <Text style={styles.subtitle}>Agregar Evento</Text>

      <Text style={styles.label}>Tipo de Evento:</Text>
      <Picker
        selectedValue={eventType}
        onValueChange={(itemValue) => setEventType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Gol" value="Gol" />
        <Picker.Item label="Tarjeta Amarilla" value="Tarjeta Amarilla" />
        <Picker.Item label="Tarjeta Roja" value="Tarjeta Roja" />
        <Picker.Item label="Sustitución" value="Sustitución" />
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

      <Text style={styles.label}>Jugador:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del jugador"
        placeholderTextColor="#B0B0B0"
        value={playerName}
        onChangeText={setPlayerName}
      />

      <Text style={styles.label}>Equipo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del equipo"
        placeholderTextColor="#B0B0B0"
        value={teamName}
        onChangeText={setTeamName}
      />

      {eventType === 'Sustitución' && (
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
      {match.eventos && match.eventos.length > 0 ? (
        match.eventos.map((event, index) => (
          <View key={index} style={styles.eventItem}>
            <Text style={styles.eventText}>
              {event.minuto}' - {event.tipo} - {event.jugador} ({event.equipo})
            </Text>
            {event.detalle && <Text style={styles.eventDetail}>{event.detalle}</Text>}
          </View>
        ))
      ) : (
        <Text style={styles.noEventsText}>No hay eventos registrados.</Text>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Estilos aquí
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1A1A1D',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detail: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#1A1A1D',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 24,
    marginBottom: 12,
    fontWeight: 'bold',
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
  eventItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  eventText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  eventDetail: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  noEventsText: {
    color: '#B0B0B0',
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  },
});
