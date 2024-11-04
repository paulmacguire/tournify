// components/StandingsTable.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Team } from '../lib/services/mockDataTournify';

interface StandingsTableProps {
  standings: Team[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({ standings }) => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerCell, { flex: 3 }]}>Equipo</Text>
        <Text style={[styles.cell, styles.headerCell]}>Pts</Text>
        <Text style={[styles.cell, styles.headerCell]}>PJ</Text>
        <Text style={[styles.cell, styles.headerCell]}>G</Text>
        <Text style={[styles.cell, styles.headerCell]}>E</Text>
        <Text style={[styles.cell, styles.headerCell]}>P</Text>
        <Text style={[styles.cell, styles.headerCell]}>GF</Text>
        <Text style={[styles.cell, styles.headerCell]}>GC</Text>
        <Text style={[styles.cell, styles.headerCell]}>DG</Text>
      </View>
      {standings.map((team) => (
        <View style={styles.row} key={team.id}>
          <Text style={[styles.cell, { flex: 3 }]} numberOfLines={1} ellipsizeMode="tail">{team.nombre}</Text>
          <Text style={styles.cell}>{team.puntos}</Text>
          <Text style={styles.cell}>{team.partidosJugados}</Text>
          <Text style={styles.cell}>{team.partidosGanados}</Text>
          <Text style={styles.cell}>{team.partidosEmpatados}</Text>
          <Text style={styles.cell}>{team.partidosPerdidos}</Text>
          <Text style={styles.cell}>{team.golesFavor}</Text>
          <Text style={styles.cell}>{team.golesContra}</Text>
          <Text style={styles.cell}>{team.diferenciaGoles}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    width: '100%',
    marginBottom: 24,
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  headerRow: {
    backgroundColor: '#3A3A3D',
  },
  cell: {
    flex: 1,
    color: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 4,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1D',
  },
  headerCell: {
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1D',
  },
});

export default StandingsTable;