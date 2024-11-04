// app/admin/tournament/[slug]/registrations.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {
  getTeamRegistrationsByTournament,
  TeamRegistration,
  updateTeamRegistrationStatus,
  getTeamById,
  Team,
} from '../../../../lib/services/mockDataTournify';

export default function AdminRegistrations() {
  const { slug } = useLocalSearchParams();
  const [registrations, setRegistrations] = useState<TeamRegistration[]>([]);
  const [teams, setTeams] = useState<Record<string, Team>>({});

  useEffect(() => {
    async function fetchData() {
      const regs = await getTeamRegistrationsByTournament(slug as string);
      setRegistrations(regs);

      // Obtener los equipos correspondientes
      const teamsData: Record<string, Team> = {};
      for (const reg of regs) {
        const team = await getTeamById(reg.equipoId);
        if (team) {
          teamsData[team.id] = team;
        }
      }
      setTeams(teamsData);
    }
    fetchData();
  }, [slug]);

  const handleUpdateStatus = async (registrationId: string, estado: 'Aceptado' | 'Rechazado') => {
    await updateTeamRegistrationStatus(registrationId, estado);
    Alert.alert('Estado actualizado', `La inscripción ha sido ${estado.toLowerCase()}.`);
    // Refrescar la lista de inscripciones
    const regs = await getTeamRegistrationsByTournament(slug as string);
    setRegistrations(regs);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Inscripciones</Text>
      {registrations.map((reg) => (
        <View key={reg.id} style={styles.card}>
          <Text style={styles.teamName}>{teams[reg.equipoId]?.nombre}</Text>
          <Text style={styles.status}>Estado: {reg.estado}</Text>
          {reg.estado === 'Pendiente' && (
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.acceptButton]}
                onPress={() => handleUpdateStatus(reg.id, 'Aceptado')}
              >
                <Text style={styles.buttonText}>Aceptar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.rejectButton]}
                onPress={() => handleUpdateStatus(reg.id, 'Rechazado')}
              >
                <Text style={styles.buttonText}>Rechazar</Text>
              </Pressable>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

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
  card: {
    backgroundColor: '#2C2C2E',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  teamName: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 8,
  },
  status: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  acceptButton: {
    backgroundColor: '#00FF00',
  },
  rejectButton: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: '#1A1A1D',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
